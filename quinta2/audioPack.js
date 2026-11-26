/* QUINTA audio pack, local IndexedDB storage, no Azure API credentials */
(function () {
  "use strict";
  const DB_NAME="quinta_humberto_audio_v1";
  const STORE="clips";
  const urls=new Map();
  let initialized=false;
  let initPromise=null;
  const clipBlobs=new Map();
  const decoded=new Map();
  let audioContext=null,activeSource=null,decodeGeneration=0;
  let preparedPromise=null;
  const DECODE_WORKERS=3;
  const preloadOrder=[
    "errou.mp3","mensagem_100_acertos.mp3",
    ...Array.from({length:40},(_,i)=>(i+1)+".mp3"),
    ...Array.from({length:60},(_,i)=>(i+41)+".mp3")
  ];

  function getAudioContext() {
    if(!clipBlobs.size)return null;
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return null;
    if(audioContext&&audioContext.state!=="closed")return audioContext;
    try {
      audioContext=new Ctx({latencyHint:"interactive"});
      return audioContext;
    }catch(_) {audioContext=null;return null;}
  }
  function unlock() {
    const ctx=getAudioContext();
    if(!ctx)return false;
    if(ctx.state!=="running"&&typeof ctx.resume==="function"){
      try {
        const promise=ctx.resume();
        if(promise&&typeof promise.catch==="function")promise.catch(()=>{});
      }catch(_) {}
    }
    return true;
  }
  function stop() {
    if(!activeSource)return;
    const source=activeSource;
    activeSource=null;
    source.onended=null;
    try{source.stop(0);}catch(_){}
    try{source.disconnect();}catch(_){}
  }
  function play(name,onDone) {
    const ctx=getAudioContext(),buffer=decoded.get(name);
    if(!ctx||!buffer)return false;
    stop();
    try {
      const source=ctx.createBufferSource();
      source.buffer=buffer;
      source.connect(ctx.destination);
      activeSource=source;
      source.onended=()=>{
        if(activeSource!==source)return;
        activeSource=null;
        try{source.disconnect();}catch(_){}
        if(onDone)onDone();
      };
      if(ctx.state!=="running")unlock();
      // Decoded samples start without creating or decoding a new MP3 player
      source.start(0);
      return true;
    }catch(_) {
      stop();
      return false;
    }
  }
  function preloadDecoded() {
    const ctx=getAudioContext();
    if(!ctx)return Promise.resolve(0);
    const generation=++decodeGeneration;
    const entries=preloadOrder.filter(name=>clipBlobs.has(name));
    const remaining=entries.filter(name=>!decoded.has(name));
    async function worker() {
      while(remaining.length&&generation===decodeGeneration) {
        const name=remaining.shift();
        if(!name)break;
        try {
          const data=await clipBlobs.get(name).arrayBuffer();
          const buffer=await ctx.decodeAudioData(data);
          if(generation===decodeGeneration)decoded.set(name,buffer);
        }catch(_) {}
      }
    }
    preparedPromise=Promise.all(Array.from({length:DECODE_WORKERS},()=>worker())).then(()=>decoded.size);
    preparedPromise.catch(()=>{});
    return preparedPromise;
  }
  function useClips(entries) {
    decodeGeneration++;
    stop();
    releaseUrls();
    clipBlobs.clear();
    decoded.clear();
    for(const item of entries){
      if(!item||typeof item.name!=="string"||!(item.blob instanceof Blob))continue;
      clipBlobs.set(item.name,item.blob);
      urls.set(item.name,URL.createObjectURL(item.blob));
    }
    // Predecode once after loading stored MP3s, no Azure API or remote requests
    preloadDecoded();
  }

  function openDatabase() {
    return new Promise((resolve,reject)=>{
      if(!("indexedDB" in window)) {reject(new Error("IndexedDB unavailable"));return;}
      const req=indexedDB.open(DB_NAME,1);
      req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE,{keyPath:"name"});};
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||new Error("Cannot open audio storage"));
      req.onblocked=()=>reject(new Error("Audio storage blocked"));
    });
  }
  function releaseUrls() {
    for(const url of urls.values())URL.revokeObjectURL(url);
    urls.clear();
  }
  async function init() {
    if(initialized)return urls.size;
    if(initPromise)return initPromise;
    initPromise=(async()=>{
      const db=await openDatabase();
      try {
        const entries=await new Promise((resolve,reject)=>{
          const req=db.transaction(STORE,"readonly").objectStore(STORE).getAll();
          req.onsuccess=()=>resolve(req.result||[]);
          req.onerror=()=>reject(req.error||new Error("Cannot read audio storage"));
        });
        useClips(entries);
        initialized=true;
        return urls.size;
      }finally{db.close();}
    })();
    try{return await initPromise;}finally{initPromise=null;}
  }
  function unzipMp3(arrayBuffer) {
    const view=new DataView(arrayBuffer),bytes=new Uint8Array(arrayBuffer);
    const length=bytes.length;
    const u16=o=>view.getUint16(o,true);
    const u32=o=>view.getUint32(o,true);
    let eocd=-1;
    for(let i=length-22;i>=Math.max(0,length-65557);i--) {
      if(u32(i)===0x06054b50){eocd=i;break;}
    }
    if(eocd<0)throw new Error("Invalid ZIP file");
    const count=u16(eocd+10),directoryOffset=u32(eocd+16);
    if(count>150||directoryOffset>=length)throw new Error("Invalid ZIP directory");
    let pos=directoryOffset;
    const clips=[];
    for(let i=0;i<count;i++) {
      if(pos+46>length||u32(pos)!==0x02014b50)throw new Error("Corrupt ZIP directory");
      const flags=u16(pos+8),method=u16(pos+10),compressed=u32(pos+20),uncompressed=u32(pos+24);
      const nameLength=u16(pos+28),extraLength=u16(pos+30),commentLength=u16(pos+32);
      const offset=u32(pos+42);
      if(pos+46+nameLength+extraLength+commentLength>length)throw new Error("Corrupt ZIP entry");
      const name=new TextDecoder("utf-8").decode(bytes.subarray(pos+46,pos+46+nameLength));
      pos+=46+nameLength+extraLength+commentLength;
      if(!/^(?:[1-9]\d?|100|errou|mensagem_100_acertos)\.mp3$/.test(name))continue;
      if((flags&1)!==0)throw new Error("Encrypted ZIP files are not supported");
      if(method!==0)throw new Error("This ZIP uses compression; export with ZIP Stored");
      if(compressed!==uncompressed||uncompressed>1024*1024)throw new Error("Invalid MP3 size");
      if(offset+30>length||u32(offset)!==0x04034b50)throw new Error("Invalid ZIP MP3 entry");
      const dataOffset=offset+30+u16(offset+26)+u16(offset+28);
      if(dataOffset+compressed>length)throw new Error("Incomplete MP3 in ZIP");
      const start=bytes[dataOffset],second=bytes[dataOffset+1];
      if(!(start===0x49&&second===0x44||start===0xff&&(second&0xe0)===0xe0))throw new Error("Invalid MP3 header: "+name);
      clips.push({name,blob:new Blob([bytes.slice(dataOffset,dataOffset+compressed)],{type:"audio/mpeg"})});
    }
    if(clips.length===0)throw new Error("No compatible MP3 files found");
    const names=new Set(clips.map(c=>c.name));
    for(let n=1;n<=100;n++)if(!names.has(n+".mp3"))throw new Error("Missing number "+n+".mp3");
    return clips;
  }
  async function importZip(file) {
    if(!file||file.size>50*1024*1024)throw new Error("Select a ZIP up to 50 MB");
    const buffer=await file.arrayBuffer();
    const clips=unzipMp3(buffer);
    const db=await openDatabase();
    try {
      await new Promise((resolve,reject)=>{
        const tx=db.transaction(STORE,"readwrite"),store=tx.objectStore(STORE);
        store.clear();
        clips.forEach(c=>store.put(c));
        tx.oncomplete=resolve;
        tx.onerror=()=>reject(tx.error||new Error("Cannot store audio pack"));
        tx.onabort=()=>reject(tx.error||new Error("Audio import aborted"));
      });
    }finally{db.close();}
    useClips(clips);
    initialized=true;
    return clips.length;
  }
  async function clear() {
    const db=await openDatabase();
    try {
      await new Promise((resolve,reject)=>{
        const tx=db.transaction(STORE,"readwrite");
        tx.objectStore(STORE).clear();
        tx.oncomplete=resolve;
        tx.onerror=()=>reject(tx.error||new Error("Cannot clear audio storage"));
      });
    }finally{db.close();}
    decodeGeneration++;stop();releaseUrls();clipBlobs.clear();decoded.clear();initialized=true;
  }
  window.QuintaAudioPack={
    init,importZip,clear,
    get:(name)=>urls.get(name)||null,
    count:()=>urls.size,
    readyCount:()=>decoded.size,
    unlock,play,stop
  };
})();