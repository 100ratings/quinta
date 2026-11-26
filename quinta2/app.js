(function () {
  "use strict";

  const VERSION = "2.2.0";
  const STORAGE_KEY = "quinta2_settings_v1";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const messages = {
    pt: {
      subtitle:"TREINAMENTO",language:"Idioma",settings:"Configurações",training:"TREINAMENTO",
      currentNumber:"NÚMERO ATUAL",tapHint:"Escolha o lado inicial",leftTile:"1, começar pela esquerda",rightTile:"5, começar pela direita",
      traditionalHint:"Escolha o tipo de contagem e o lado inicial",start:"INÍCIO",
      left:"Esquerda",right:"Direita",countingType:"TIPO DE CONTAGEM",
      startingSide:"LADO INICIAL",check:"Verificar resposta",newNumber:"Novo número",
      correct:"Acertos",wrong:"Erros",time:"Tempo",feedbackLink:"Enviar feedback",
      settingsTitle:"Configurações",practice:"Prática",mode:"Modo",modeDesc:"Treino rápido ou completo",
      traditional:"Tradicional",range:"Intervalo",rangeDefault:"1–40 (padrão)",
      custom:"Personalizado",customRange:"Intervalo personalizado",
      adaptive:"Treinamento adaptativo",adaptiveSettings:"Como funciona",
      adaptiveDescription:"O QUINTA aprende seu ritmo com respostas corretas, repete números difíceis e dá mais atenção aos tipos com erros ou lentidão, sem deixar de variar",
      calibrating:(n)=>"Aprendendo seu ritmo · "+n+"/8",personalPace:(t)=>"Ritmo habitual: "+t,
      adaptiveDisabled:"Treinamento adaptativo desativado",
      showPath:"Mostrar caminho da contagem nos erros",voice:"Voz",audioSource:"Fonte da voz",audioSourceAzure:"Azure Humberto (MP3)",audioSourceNative:"Voz do dispositivo",audioSourceOff:"Sem áudio",audioPack:"Pacote de áudios Humberto",audioImport:"Importar ZIP",audioMissing:"Nenhum pacote importado, usando voz nativa quando possível",audioReady:(n)=>n+" áudios prontos no aparelho",audioImporting:"Importando áudios…",audioImported:(n)=>n+" áudios importados e salvos neste aparelho",audioImportFailed:"Falha ao importar",audioClear:"Apagar pacote",audioClearConfirm:"Apagar os áudios importados deste aparelho?",audioStorageFailed:"Não foi possível acessar o armazenamento de áudio",
      speakNumber:"Falar o número",chooseVoice:"Selecionar voz",voiceAuto:"Automático",
      speakErrors:"Falar os erros",tools:"Ferramentas",analyzeLabel:"Analisar número",
      analyze:"Analisar",rules:"Regras e guia rápido",reset:"Zerar treinamento",
      updates:"Atualizações",upToDate:"Atualizado",checkUpdates:"Verificar",
      updateApp:"Atualizar aplicativo",updateAvailable:"Nova versão disponível",
      checking:"Verificando…",checkFailed:"Não foi possível verificar",
      resetCounters:"Zerar contadores",
      nice:"Correto!",miss:"Incorreto!",youSelected:"Sua resposta",ideal:"Correto",
      type:"Tipo",startFrom:"Início",path:"Caminho",
      lockedHint:"Toque em Novo número para continuar",waitingFeedback:"Aguardando sua resposta",good:"Bom",slow:"Lento",
      invalidNumber:"Digite um número inteiro positivo",invalidThresholds:"Informe valores positivos, com Rápido menor que Lento",
      saved:"Configurações salvas",confirmReset:"Zerar acertos, erros e aprendizagem adaptativa do QUINTA?",
      milestoneTitle:(n) => n + " acertos!",milestoneMsg:"Você completou mais 100 acertos! Quer continuar treinando?",
      continueTraining:"Sim, continuar",stopTraining:"Não, encerrar por agora",
      voiceWrong:"errou",manualUse:"usar N+1",noSpeech:"Voz indisponível neste navegador",
      helpHTML:'<h3>O princípio QUINTA</h3><p>O <b>Force</b> é sempre o <b>segundo objeto da esquerda</b>, entre cinco objetos</p><p><b>Basic:</b> conta os objetos, começando no objeto inicial<br><b>Bounce:</b> conta os movimentos entre objetos, sem contar o inicial</p><h3>Regra matemática</h3><p>Para N <b>par</b>, use <b>Basic</b><br>Para N <b>ímpar</b>, use <b>Bounce</b> e calcule N + 1</p><p>Use a <b>Esquerda</b> se o número considerado deixar resto <b>0 ou 2 na divisão por 8</b>, nos outros casos use a <b>Direita</b></p><h3>Treino rápido</h3><ul><li>Veja ou escute o número</li><li>Toque no objeto 1 ou no botão Esquerda, ou no objeto 5 ou no botão Direita</li><li>Quando acertar, um novo número aparecerá automaticamente após 350 ms</li><li>Quando errar, leia a resposta e toque em Novo número</li></ul><h3>Modo tradicional</h3><p>Ative Tradicional nas Configurações, escolha Basic ou Bounce, Esquerda ou Direita e toque em Verificar resposta, o avanço automático dos acertos leva 500 ms</p><h3>Atalhos de teclado</h3><p><b>N:</b> novo número, <b>Enter:</b> verificar no modo tradicional, <b>H:</b> ajuda, <b>Q:</b> ajuda, <b>↑/↓:</b> Basic/Bounce e <b>←/→:</b> Esquerda/Direita</p>'
    },
    en: {
      subtitle:"TRAINING",language:"Language",settings:"Settings",training:"TRAINING",
      currentNumber:"CURRENT NUMBER",tapHint:"Choose your starting side",leftTile:"1, start from the left",rightTile:"5, start from the right",
      traditionalHint:"Choose the counting type and starting side",start:"START",
      left:"Left",right:"Right",countingType:"COUNTING TYPE",
      startingSide:"STARTING SIDE",check:"Check answer",newNumber:"New number",
      correct:"Correct",wrong:"Wrong",time:"Time",feedbackLink:"Send feedback",
      practice:"Practice",mode:"Mode",modeDesc:"Quick or complete training",
      traditional:"Traditional",range:"Range",rangeDefault:"1–40 (default)",
      custom:"Custom",customRange:"Custom range",adaptive:"Adaptive training",
      adaptiveSettings:"How it works",
      adaptiveDescription:"QUINTA learns your personal pace from correct answers, revisits difficult numbers and practices error-prone or slower types more often while keeping variety",
      calibrating:(n)=>"Learning your pace · "+n+"/8",personalPace:(t)=>"Usual pace: "+t,
      adaptiveDisabled:"Adaptive training off",showPath:"Show counting path after a wrong answer",
      voice:"Voice",audioSource:"Voice source",audioSourceAzure:"Azure Humberto (MP3)",audioSourceNative:"Device voice",audioSourceOff:"No audio",audioPack:"Humberto audio pack",audioImport:"Import ZIP",audioMissing:"No pack imported, using the device voice when possible",audioReady:(n)=>n+" audio files ready on this device",audioImporting:"Importing audio…",audioImported:(n)=>n+" audio files imported and stored on this device",audioImportFailed:"Import failed",audioClear:"Delete pack",audioClearConfirm:"Delete imported audio from this device?",audioStorageFailed:"Cannot access audio storage",speakNumber:"Speak number",chooseVoice:"Choose voice",
      voiceAuto:"Automatic",speakErrors:"Speak errors",tools:"Tools",
      analyzeLabel:"Analyze number",analyze:"Analyze",rules:"Rules & quick guide",
      reset:"Reset training",updates:"Updates",upToDate:"Up to date",
      checkUpdates:"Check",updateApp:"Update app",updateAvailable:"New version available",
      checking:"Checking…",checkFailed:"Couldn't check for updates",
      resetCounters:"Reset counters",
      nice:"Correct!",miss:"Wrong!",youSelected:"Your answer",ideal:"Correct answer",
      type:"Type",startFrom:"Start",path:"Path",
      lockedHint:"Tap New number to continue",waitingFeedback:"Waiting for your answer",good:"Good",slow:"Slow",
      invalidNumber:"Enter a positive whole number",invalidThresholds:"Enter positive values, with Fast less than Slow",
      saved:"Settings saved",confirmReset:"Reset correct answers, mistakes and adaptive learning for QUINTA?",
      milestoneTitle:(n) => n + " correct!",milestoneMsg:"You've completed another 100 correct answers! Would you like to keep training?",
      continueTraining:"Yes, continue",stopTraining:"No, stop for now",
      voiceWrong:"wrong",manualUse:"use N+1",noSpeech:"Speech is unavailable in this browser",
      helpHTML:'<h3>The QUINTA principle</h3><p>The <b>Force</b> is always the <b>second item from the left</b> out of five</p><p><b>Basic:</b> count each item, including the starting item<br><b>Bounce:</b> count moves between items, excluding the starting item</p><h3>Mathematical rule</h3><p>For <b>even</b> N, use <b>Basic</b><br>For <b>odd</b> N, use <b>Bounce</b> and calculate N + 1</p><p>Start on the <b>Left</b> when that number is <b>0 or 2 modulo 8</b>, otherwise start on the <b>Right</b></p><h3>Fast training</h3><ul><li>Read or listen to the number</li><li>Tap item 1 or Left, or item 5 or Right</li><li>Correct answers automatically advance after 350 ms</li><li>Wrong answers show the solution, tap New number to continue</li></ul><h3>Traditional mode</h3><p>Select Traditional in Settings, choose Basic or Bounce and Left or Right, then tap Check answer, correct answers advance after 500 ms</p><h3>Keyboard shortcuts</h3><p><b>N:</b> new number, <b>Enter:</b> check in Traditional mode, <b>H:</b> help, <b>Q:</b> help, <b>↑/↓:</b> Basic/Bounce and <b>←/→:</b> Left/Right</p>'
    }
  };

  const defaults = {language:"auto",mode:"fast",range:"1-40",minN:"1",maxN:"15",
    adaptive:true,tts:true,errTts:true,voice:"",speechSource:"azure",type:"basic",side:"left",
    step:false,fastThreshold:3.0,slowThreshold:5.0,ok:0,err:0,
    weights:[1,1,1,1],lastEggMilestone:0,adaptiveData:null};
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch (_) {}
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) stored = {};
  const settings = Object.assign({}, defaults);
  for (const key of Object.keys(defaults)) {
    if (Object.prototype.hasOwnProperty.call(stored,key)) settings[key] = stored[key];
  }
  if (!["auto","pt","en"].includes(settings.language)) settings.language = "auto";
  if (!["azure","native","off"].includes(settings.speechSource)) settings.speechSource = "azure";
  if (!["fast","traditional"].includes(settings.mode)) settings.mode = "fast";
  if (!["basic","bounce"].includes(settings.type)) settings.type = "basic";
  if (!["left","right"].includes(settings.side)) settings.side = "left";
  if (!Array.isArray(settings.weights) || settings.weights.length !== 4 ||
      !settings.weights.every(v => Number.isFinite(Number(v)) && Number(v)>0)) settings.weights = [1,1,1,1];
  settings.weights = settings.weights.map(v => Math.max(.2,Math.min(3,Number(v))));
  settings.ok = Number.isSafeInteger(Number(settings.ok)) ? Math.max(0,Number(settings.ok)) : 0;
  settings.err = Number.isSafeInteger(Number(settings.err)) ? Math.max(0,Number(settings.err)) : 0;
  settings.lastEggMilestone = Number(settings.lastEggMilestone) || 0;
  settings.fastThreshold = Number(settings.fastThreshold);
  settings.slowThreshold = Number(settings.slowThreshold);
  if (!(settings.fastThreshold > 0 && settings.slowThreshold > settings.fastThreshold)) {
    settings.fastThreshold = 3; settings.slowThreshold = 5;
  }


  const ADAPTIVE_CALIBRATION=8;
  const ADAPTIVE_HISTORY=48;
  const ADAPTIVE_MAX_NUMBERS=250;
  function freshMode() {
    return {attempts:0,recentTimes:[],categories:Array.from({length:4},()=>({quality:0,seen:0,errors:0})),numbers:{}};
  }
  function freshAdaptive() {return {version:2,modes:{fast:freshMode(),traditional:freshMode()}};}
  function normalizeAdaptive(raw) {
    const next=freshAdaptive();
    if(!raw || raw.version!==2 || !raw.modes || typeof raw.modes!=="object") return next;
    for(const mode of ["fast","traditional"]) {
      const source=raw.modes[mode],target=next.modes[mode];
      if(!source || typeof source!=="object") continue;
      target.attempts=Number.isSafeInteger(source.attempts)?Math.max(0,source.attempts):0;
      if(Array.isArray(source.recentTimes)) {
        target.recentTimes=source.recentTimes.filter(x=>typeof x==="number"&&Number.isFinite(x)&&x>=.1&&x<=60).slice(-ADAPTIVE_HISTORY);
      }
      if(Array.isArray(source.categories)) {
        source.categories.slice(0,4).forEach((c,i)=>{
          if(!c||typeof c!=="object")return;
          target.categories[i]={
            quality:Number.isFinite(c.quality)?Math.max(0,Math.min(1,c.quality)):0,
            seen:Number.isSafeInteger(c.seen)?Math.max(0,c.seen):0,
            errors:Number.isSafeInteger(c.errors)?Math.max(0,c.errors):0
          };
        });
      }
      if(source.numbers && typeof source.numbers==="object" && !Array.isArray(source.numbers)) {
        for(const [key,v] of Object.entries(source.numbers).slice(0,ADAPTIVE_MAX_NUMBERS)) {
          const n=Number(key);
          if(!Number.isSafeInteger(n)||n<1||n>9999||!v||typeof v!=="object")continue;
          const difficulty=Number(v.difficulty);
          if(!Number.isFinite(difficulty)||difficulty<.1)continue;
          target.numbers[String(n)]={
            difficulty:Math.max(.1,Math.min(10,difficulty)),
            due:Number.isSafeInteger(v.due)?Math.max(0,v.due):0,
            last:Number.isSafeInteger(v.last)?Math.max(0,v.last):0
          };
        }
      }
    }
    return next;
  }
  settings.adaptiveData=normalizeAdaptive(settings.adaptiveData);
  let N = null, lastN = null, locked = false, startTime = 0, elapsedStop = null;
  let pendingNext = null, feedbackInfo = null, remoteVersion = null, voices = [];
  let activeFlashTimeout = null;
  let speechToken=0, speechSafetyTimer=null, awaitingSpeech=false;
  let audioPlayer=null, audioMessage=null;
  let focusedBeforeModal = null;

  function language() {
    return settings.language === "auto" ? (/^pt\b/i.test(navigator.language || "") ? "pt" : "en") : settings.language;
  }
  function t(key) { return messages[language()][key] || messages.en[key] || key; }
  function sideName(side) { return t(side); }
  function numSeconds(n) { return Number(n).toFixed(1).replace(".",language()==="pt"?",":".")+"s"; }
  function persist() {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(settings)); } catch (_) {}
  }
  function clampRange(v,fallback) {
    const n = Number(v);
    return Number.isSafeInteger(n) ? Math.max(1,Math.min(9999,n)) : fallback;
  }
  function currentRange() {
    if (settings.range !== "custom") {
      const p = settings.range.split("-").map(Number);
      if (p.length===2 && p.every(v => Number.isSafeInteger(v) && v>=1 && v<=9999)) return p;
      return [1,40];
    }
    const a=clampRange(settings.minN,1), b=clampRange(settings.maxN,15);
    return [Math.min(a,b),Math.max(a,b)];
  }

  // QUINTA principle, unchanged from the original trainer
  function correctRule(n) {
    const tipo = n%2===0 ? "basic" : "bounce";
    const m = tipo==="bounce" ? n+1 : n;
    const r = ((m%8)+8)%8;
    const lado = (r===0||r===2) ? "left" : "right";
    return {tipo,lado,r,m};
  }
  function bucketFromRule(rule) {
    if (rule.tipo==="basic" && rule.lado==="left") return 0;
    if (rule.tipo==="basic" && rule.lado==="right") return 1;
    if (rule.tipo==="bounce" && rule.lado==="left") return 2;
    return 3;
  }
  function simulate(n,tipo,lado,step) {
    const target=1;
    let pos=lado==="left"?0:4,dir=lado==="left"?1:-1;
    const log=[];
    if(tipo==="basic") {
      let count=0;
      while(count<n) {
        count++;
        if(step) log.push({count,pos});
        if(count===n) break;
        pos+=dir;
        if(pos===4||pos===0) dir*=-1;
      }
    } else {
      let moves=0;
      while(moves<n) {
        pos+=dir;moves++;
        if(step) log.push({count:moves,pos});
        if(pos===4||pos===0) dir*=-1;
      }
    }
    return {hit:pos===target,pos,log};
  }
  function randInt(a,b) { return Math.floor(Math.random()*(b-a+1))+a; }
  function modeLearning(mode=settings.mode) {
    return settings.adaptiveData.modes[mode];
  }
  function median(values) {
    const sorted=values.slice().sort((a,b)=>a-b);
    const i=Math.floor(sorted.length/2);
    return sorted.length%2?sorted[i]:(sorted[i-1]+sorted[i])/2;
  }
  function personalBaseline(mode=settings.mode) {
    const times=modeLearning(mode).recentTimes;
    return times.length>=ADAPTIVE_CALIBRATION?median(times):null;
  }
  function selectWeighted(items,weightOf) {
    const weights=items.map(item=>Math.max(.01,Number(weightOf(item))||0));
    const total=weights.reduce((a,b)=>a+b,0);
    let r=Math.random()*total;
    for(let i=0;i<items.length;i++) {
      r-=weights[i];
      if(r<0)return items[i];
    }
    return items[items.length-1];
  }
  function chooseNumber(a,b) {
    if(a===b)return a;
    const buckets=[[],[],[],[]];
    for(let n=a;n<=b;n++) {
      if(n!==lastN)buckets[bucketFromRule(correctRule(n))].push(n);
    }
    const learning=modeLearning();
    if(settings.adaptive) {
      const review=Object.entries(learning.numbers)
        .map(([key,v])=>({n:Number(key),...v}))
        .filter(v=>v.n>=a&&v.n<=b&&v.n!==lastN&&v.difficulty>=.5&&v.due<=learning.attempts);
      if(review.length&&Math.random()<.38) {
        return selectWeighted(review,v=>v.difficulty*(1+Math.min(3,(learning.attempts-v.due)/12))).n;
      }
    }
    const present=[0,1,2,3].filter(i=>buckets[i].length);
    const chosen=selectWeighted(present,i=>settings.adaptive?1+2.6*learning.categories[i].quality:1);
    const options=buckets[chosen];
    return options[Math.floor(Math.random()*options.length)];
  }
  function learnFromAnswer(correct,elapsed,mode,number,ideal) {
    if(!settings.adaptive||!Number.isFinite(elapsed)||elapsed<0)return;
    const learning=modeLearning(mode);
    const baseline=personalBaseline(mode);
    const category=learning.categories[bucketFromRule(ideal)];
    const slow=correct&&baseline!==null&&elapsed>Math.max(baseline*1.45,baseline+.35);
    const difficultySignal=!correct?1:slow?Math.min(1,(elapsed/baseline-1)/.85):0;
    category.quality=Math.max(0,Math.min(1,category.quality*.84+difficultySignal*.16));
    category.seen++;
    if(!correct)category.errors++;
    learning.attempts++;
    const key=String(number);
    const old=learning.numbers[key]||{difficulty:0,due:0,last:0};
    let difficulty=old.difficulty;
    if(!correct)difficulty+=3.2;
    else if(slow)difficulty+=1.35;
    else difficulty-=baseline!==null&&elapsed<=baseline*.9?1.0:.65;
    difficulty=Math.max(0,Math.min(10,difficulty));
    if(difficulty<.15)delete learning.numbers[key];
    else {
      const cooldown=!correct?3:slow?5:Math.round(6+difficulty);
      learning.numbers[key]={difficulty,due:learning.attempts+cooldown,last:learning.attempts};
    }
    if(correct&&elapsed>=.15&&elapsed<=45) {
      learning.recentTimes.push(elapsed);
      if(learning.recentTimes.length>ADAPTIVE_HISTORY)learning.recentTimes.shift();
    }
    const keys=Object.keys(learning.numbers);
    if(keys.length>ADAPTIVE_MAX_NUMBERS) {
      keys.sort((a,b)=>learning.numbers[a].difficulty-learning.numbers[b].difficulty||
        learning.numbers[a].last-learning.numbers[b].last);
      keys.slice(0,keys.length-ADAPTIVE_MAX_NUMBERS).forEach(key=>delete learning.numbers[key]);
    }
    updateTimeLegend();
  }

  function setFeedback(info) {
    feedbackInfo=info;
    const el=$("#feedback");
    el.replaceChildren();
    el.scrollTop=0;
    if(!info) {
      const placeholder=document.createElement("div");
      placeholder.className="feedback-placeholder";
      placeholder.textContent=t("waitingFeedback");
      el.appendChild(placeholder);
      return;
    }
    const title=document.createElement("strong");
    title.className=info.correct?"ok":"err";
    title.textContent=info.correct?t("nice"):t("miss");
    el.appendChild(title);
    const details=document.createElement("div");
    details.className="detail";
    const ideal=info.ideal;
    if(info.mode==="fast") {
      details.textContent= t("startFrom")+": "+sideName(info.selection)+" · "+t("type")+": "+(ideal.tipo==="basic"?"Basic":"Bounce")+" · "+numSeconds(info.elapsed);
      if(!info.correct) details.textContent += " · "+t("ideal")+": "+sideName(ideal.lado);
    } else {
      details.textContent=t("youSelected")+": "+(info.selection.tipo==="basic"?"Basic":"Bounce")+" + "+sideName(info.selection.lado)+" · "+numSeconds(info.elapsed);
      if(!info.correct) details.textContent+=" · "+t("ideal")+": "+(ideal.tipo==="basic"?"Basic":"Bounce")+" + "+sideName(ideal.lado);
    }
    el.appendChild(details);
    if(info.path && info.path.length) {
      const path=document.createElement("div");
      path.className="path";
      path.textContent=t("path")+": "+info.path.join(" → ");
      el.appendChild(path);
    }
    if(!info.correct) {
      const next=document.createElement("div");
      next.className="path";next.textContent=t("lockedHint");el.appendChild(next);
    }
  }
  function updateStats() {
    $("#ok").textContent=settings.ok;
    $("#err").textContent=settings.err;
  }
  function updateTimeLegend() {
    const times=modeLearning().recentTimes;
    const baseline=personalBaseline();
    const label=!settings.adaptive?t("adaptiveDisabled"):baseline===null?t("calibrating")(Math.min(times.length,ADAPTIVE_CALIBRATION)):t("personalPace")(numSeconds(baseline));
    $("#timeLegend").textContent=label;
    $("#adaptSummary").textContent=label;
  }
  function updateTimer() {
    const elapsed = N===null ? 0 : (elapsedStop===null ? (awaitingSpeech?0:(performance.now()-startTime)/1000) : elapsedStop);
    $("#timer").textContent=numSeconds(Math.max(0,elapsed));
    requestAnimationFrame(updateTimer);
  }
  function markActive(side) {
    if(activeFlashTimeout!==null) {clearTimeout(activeFlashTimeout);activeFlashTimeout=null;}
    $$(".tile.side").forEach(el=>el.dataset.active=String(el.dataset.idx===(side==="left"?"0":"4")));
    $("#leftBtn").dataset.active=String(side==="left");
    $("#rightBtn").dataset.active=String(side==="right");
    // Keep the visual flash identical on both sides, independent of correctness
    activeFlashTimeout=setTimeout(()=>{clearActive();activeFlashTimeout=null;},240);
  }
  function clearActive() {
    $$(".tile.side,.direction").forEach(el=>el.dataset.active="false");
  }

  function getVoiceLang() {
    if(settings.voice) {
      const v=voices.find(x=>x.name===settings.voice);
      if(v && v.lang) return v.lang;
    }
    return language()==="pt" ? "pt-BR" : "en-US";
  }
  function pickVoice(lang) {
    return voices.find(v=>v.lang && v.lang.toLowerCase()===lang.toLowerCase()) ||
      voices.find(v=>v.lang && v.lang.toLowerCase().startsWith(lang.split("-")[0].toLowerCase())) || null;
  }
  function finishSpeechTiming(token) {
    if(token!==speechToken||!awaitingSpeech)return;
    awaitingSpeech=false;
    if(speechSafetyTimer!==null) {clearTimeout(speechSafetyTimer);speechSafetyTimer=null;}
    if(N!==null&&!locked)startTime=performance.now();
  }
  function stopAudio() {
    if(!audioPlayer)return;
    const player=audioPlayer;
    audioPlayer=null;
    player.onended=null;player.onerror=null;
    try {player.pause();player.currentTime=0;} catch (_) {}
  }
  function speakNative(text,onDone) {
    if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window))return false;
    try {
      const u=new SpeechSynthesisUtterance(String(text));
      const active=voices.find(v=>v.name===settings.voice)||pickVoice(getVoiceLang());
      if(active) {u.voice=active;u.lang=active.lang;} else u.lang=getVoiceLang();
      if(onDone) {u.onend=onDone;u.onerror=onDone;}
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      return true;
    }catch(_){return false;}
  }
  function speak(text,force,onDone,filename) {
    if(settings.speechSource==="off"||(!force&&!settings.tts))return false;
    stopAudio();
    if(settings.speechSource==="azure"&&filename&&window.QuintaAudioPack) {
      const url=window.QuintaAudioPack.get(filename);
      if(url) {
        let player=null,handled=false;
        const fallback=()=>{
          if(handled||audioPlayer!==player)return;
          handled=true;stopAudio();
          if(!speakNative(text,onDone)&&onDone)onDone();
        };
        try {
          player=new Audio(url);
          audioPlayer=player;
          player.preload="auto";
          player.onended=()=>{
            if(audioPlayer!==player)return;
            audioPlayer=null;
            if(onDone)onDone();
          };
          player.onerror=fallback;
          const promise=player.play();
          if(promise&&typeof promise.catch==="function")promise.catch(fallback);
          return true;
        }catch(_){fallback();}
      }
    }
    return speakNative(text,onDone);
  }
  function responseSeconds() {
    // The spoken prompt should not count as thinking time
    return awaitingSpeech ? .2 : Math.max(.2,(performance.now()-startTime)/1000);
  }
  function speakError() {
    if(!settings.errTts) return;
    const lang=getVoiceLang().toLowerCase();
    const words={pt:"errou",en:"wrong",es:"incorrecto",fr:"faux",de:"falsch",it:"sbagliato"};
    speak(words[lang.slice(0,2)]||t("voiceWrong"),true,null,lang.startsWith("pt")?"errou.mp3":null);
  }

  function updateAudioUI(statusText) {
    const count=window.QuintaAudioPack?window.QuintaAudioPack.count():0;
    $("#audioPackStatus").textContent=statusText || (count?t("audioReady")(count):t("audioMissing"));
    $("#speechSourceSel").value=settings.speechSource;
    $("#voiceSel").disabled=settings.speechSource!=="native";
    $("#clearAudioPack").disabled=count===0;
  }
  function refreshVoices() {
    if(!("speechSynthesis" in window)) return;
    voices=window.speechSynthesis.getVoices() || [];
    const sel=$("#voiceSel"),current=settings.voice;
    sel.replaceChildren();
    const option=document.createElement("option");
    option.value="";option.textContent=t("voiceAuto");sel.appendChild(option);
    const dedupe=new Set();
    const list=voices.slice().sort((a,b)=>{
      const preferred=(v)=>v.lang.toLowerCase().startsWith(language()+"-")?0:1;
      return preferred(a)-preferred(b) || a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name);
    });
    for(const v of list) {
      const id=v.lang+"|"+v.name;
      if(dedupe.has(id)) continue;
      dedupe.add(id);
      const item=document.createElement("option");
      item.value=v.name;item.textContent=v.lang+" · "+v.name;
      sel.appendChild(item);
    }
    if(Array.from(sel.options).some(o=>o.value===current)) sel.value=current;
    sel.disabled=settings.speechSource!=="native";
  }

  function newNumber() {
    if(pendingNext!==null) {clearTimeout(pendingNext);pendingNext=null;}
    if(activeFlashTimeout!==null) {clearTimeout(activeFlashTimeout);activeFlashTimeout=null;}
    if(speechSafetyTimer!==null) {clearTimeout(speechSafetyTimer);speechSafetyTimer=null;}
    stopAudio();
    const token=++speechToken;
    const [a,b]=currentRange();
    N=chooseNumber(a,b);
    lastN=N;locked=false;startTime=performance.now();elapsedStop=null;
    $("#number").textContent=String(N);
    setFeedback(null);clearActive();
    awaitingSpeech=!!settings.tts&&settings.speechSource!=="off";
    if(awaitingSpeech) {
      speechSafetyTimer=setTimeout(()=>finishSpeechTiming(token),4000);
    }
    if(!speak(N,false,()=>finishSpeechTiming(token),N+".mp3"))finishSpeechTiming(token);
  }
  function checkMilestone() {
    if(settings.ok<=0 || settings.ok%100!==0 || settings.lastEggMilestone===settings.ok) return false;
    settings.lastEggMilestone=settings.ok;
    persist();
    $("#eggTitle").textContent=t("milestoneTitle")(settings.ok);
    $("#eggMsg").textContent=t("milestoneMsg");
    openModal("eggModal");
    speak($("#eggTitle").textContent+" "+$("#eggMsg").textContent,true,null,language()==="pt"?"mensagem_100_acertos.mp3":null);
    return true;
  }
  function record(correct,info,delay) {
    locked=true;elapsedStop=info.elapsed;
    if(correct) settings.ok++;
    else settings.err++;
    learnFromAnswer(correct,info.elapsed,info.mode,N,info.ideal);
    updateStats();setFeedback(info);persist();
    if(!correct) speakError();
    const egg=checkMilestone();
    if(correct && !egg) pendingNext=setTimeout(newNumber,delay);
  }
  function fastTap(side) {
    if(settings.mode!=="fast" || N===null || locked) return;
    const ideal=correctRule(N),elapsed=responseSeconds();
    const correct=side===ideal.lado;
    markActive(side);
    record(correct,{mode:"fast",selection:side,ideal,correct,elapsed},350);
  }
  function verify() {
    if(settings.mode!=="traditional" || N===null || locked) return;
    const ideal=correctRule(N),elapsed=responseSeconds();
    const selection={tipo:settings.type,lado:settings.side};
    const sim=simulate(N,selection.tipo,selection.lado,settings.step);
    record(sim.hit,{mode:"traditional",selection,ideal,correct:sim.hit,elapsed,path:!sim.hit?sim.log.map(x=>x.pos+1):null},500);
  }
  function syncMode() {
    const fast=settings.mode==="fast";
    $("#fastPanel").hidden=!fast;
    $("#traditionalPanel").hidden=fast;
    $("#modeBadge").textContent=fast?"Fast Tap":t("traditional");
    $("#hint").textContent=t(fast?"tapHint":"traditionalHint");
    $$(".tile.side").forEach(b=>b.disabled=!fast);
    $("#modeSel").value=settings.mode;
    updateTimeLegend();
  }
  function analyzeManual() {
    const raw=$("#manualN").value.trim();
    const out=$("#manualOut");
    if(!raw){out.textContent="";return;}
    const n=Number(raw);
    if(!Number.isSafeInteger(n)||n<=0) {out.textContent=t("invalidNumber");return;}
    const rule=correctRule(n);
    settings.type=rule.tipo;settings.side=rule.lado;syncTypeSide();persist();
    out.textContent=(rule.tipo==="basic"?"Basic":"Bounce")+" + "+sideName(rule.lado)+" (N="+n+(rule.tipo==="bounce"?", "+t("manualUse")+"="+rule.m:"")+"; mod 8="+rule.r+")";
  }
  function syncTypeSide() {
    $("#tBasic").checked=settings.type==="basic";$("#tBounce").checked=settings.type==="bounce";
    $("#sLeft").checked=settings.side==="left";$("#sRight").checked=settings.side==="right";
  }
  function applyLanguage() {
    document.documentElement.lang=language()==="pt"?"pt-BR":"en";
    $$("[data-i18n]").forEach(el=>{
      const val=t(el.dataset.i18n);
      if(typeof val==="string") el.textContent=val;
    });
    $$("[data-i18n-aria]").forEach(el=>el.setAttribute("aria-label",t(el.dataset.i18nAria)));
    $("#settingsBtn").setAttribute("aria-label",t("settings"));
    $("#helpContent").innerHTML=t("helpHTML");
    $("#manualN").placeholder=language()==="pt"?"Ex: 33":"e.g. 33";
    $("#languageSel").value=settings.language;
    refreshVoices();syncMode();updateTimeLegend();
    updateAudioUI();
    setFeedback(feedbackInfo);updateVersionUI();
    if($("#eggModal").hidden===false) {
      $("#eggTitle").textContent=t("milestoneTitle")(settings.ok);
      $("#eggMsg").textContent=t("milestoneMsg");
    }
  }
  function syncSettings() {
    $("#range").value=settings.range;
    $("#minN").value=settings.minN;$("#maxN").value=settings.maxN;
    $("#customWrap").hidden=settings.range!=="custom";
    $("#adaptiveCB").checked=!!settings.adaptive;
    $("#adaptCfgBtn").disabled=!settings.adaptive;
    $("#ttsCB").checked=!!settings.tts;$("#errTtsCB").checked=!!settings.errTts;
    $("#speechSourceSel").value=settings.speechSource;
    updateAudioUI();
    $("#step").checked=!!settings.step;
    $("#adaptSettings").hidden=true;
    updateTimeLegend();
    syncTypeSide();syncMode();
  }
  function openModal(id) {
    focusedBeforeModal=document.activeElement;
    const overlay=$("#"+id);
    overlay.hidden=false;
    document.body.style.overflow="hidden";
    const close=overlay.querySelector("[data-close]")||overlay.querySelector("button");
    if(close) close.focus();
  }
  function closeModal(id) {
    $("#"+id).hidden=true;
    if($$(".overlay:not([hidden])").length===0) document.body.style.overflow="";
    if(focusedBeforeModal && typeof focusedBeforeModal.focus==="function") focusedBeforeModal.focus();
  }

  function compareVersions(a,b) {
    const A=String(a).split(".").map(Number),B=String(b).split(".").map(Number);
    for(let i=0;i<Math.max(A.length,B.length);i++) {
      const x=A[i]||0,y=B[i]||0;
      if(x>y) return 1;if(x<y) return -1;
    }
    return 0;
  }
  function updateVersionUI(status) {
    $("#versionText").textContent="v"+VERSION;
    const available=remoteVersion && compareVersions(remoteVersion,VERSION)>0;
    $("#updateBtn").disabled=!available;
    $("#updateState").textContent=status ? t(status) : t(available?"updateAvailable":"upToDate");
  }
  async function checkUpdates() {
    updateVersionUI("checking");
    try {
      const r=await fetch("./version.json?check="+Date.now(),{cache:"no-store"});
      if(!r.ok) throw Error("HTTP "+r.status);
      const data=await r.json();
      if(!data || typeof data.version!=="string" || !/^\d+\.\d+\.\d+$/.test(data.version)) throw Error("Invalid version");
      remoteVersion=data.version;
      updateVersionUI();
    } catch(_) { updateVersionUI("checkFailed"); }
  }
  function updateApp() {
    if(!remoteVersion || compareVersions(remoteVersion,VERSION)<=0) return;
    const url=new URL("./",location.href);
    url.searchParams.set("v",remoteVersion);
    url.searchParams.set("t",String(Date.now()));
    window.location.replace(url.href);
  }

  function setupEvents() {
    $("#nextBtn").addEventListener("click",newNumber);
    $("#leftBtn").addEventListener("click",()=>fastTap("left"));
    $("#rightBtn").addEventListener("click",()=>fastTap("right"));
    $$(".tile.side").forEach(el=>el.addEventListener("click",()=>fastTap(el.dataset.idx==="0"?"left":"right")));
    $("#checkBtn").addEventListener("click",verify);
    $("#settingsBtn").addEventListener("click",()=>{syncSettings();openModal("settingsModal");});
    $("#helpBtn").addEventListener("click",()=>{closeModal("settingsModal");openModal("helpModal");});
    $$("[data-close]").forEach(el=>el.addEventListener("click",()=>closeModal(el.dataset.close)));
    $$(".overlay").forEach(el=>el.addEventListener("click",e=>{if(e.target===el && el.id!=="eggModal")closeModal(el.id);}));
    $("#languageSel").addEventListener("change",e=>{settings.language=e.target.value;persist();applyLanguage();});
    $("#modeSel").addEventListener("change",e=>{settings.mode=e.target.value;persist();syncMode();updateTimeLegend();});
    $("#range").addEventListener("change",e=>{settings.range=e.target.value;$("#customWrap").hidden=settings.range!=="custom";persist();});
    for(const id of ["minN","maxN"]) $("#"+id).addEventListener("change",e=>{settings[id]=String(clampRange(e.target.value,id==="minN"?1:15));e.target.value=settings[id];persist();});
    for(const [id,key] of [["adaptiveCB","adaptive"],["ttsCB","tts"],["errTtsCB","errTts"],["step","step"]]) {
      $("#"+id).addEventListener("change",e=>{settings[key]=e.target.checked;persist();if(key==="adaptive"){$("#adaptCfgBtn").disabled=!settings.adaptive;updateTimeLegend();}});
    }
    $("#voiceSel").addEventListener("change",e=>{settings.voice=e.target.value;persist();});
    $("#speechSourceSel").addEventListener("change",e=>{
      settings.speechSource=e.target.value;persist();updateAudioUI();
      if(settings.speechSource==="off") {stopAudio();if("speechSynthesis" in window)window.speechSynthesis.cancel();}
    });
    $("#audioPackFile").addEventListener("change",async e=>{
      const file=e.target.files&&e.target.files[0];if(!file)return;
      updateAudioUI(t("audioImporting"));
      try {
        const count=await window.QuintaAudioPack.importZip(file);
        settings.speechSource="azure";persist();updateAudioUI(t("audioImported")(count));
      }catch(error){updateAudioUI(t("audioImportFailed")+": "+error.message);}
      e.target.value="";
    });
    $("#clearAudioPack").addEventListener("click",async()=>{
      if(!window.confirm(t("audioClearConfirm")))return;
      try {await window.QuintaAudioPack.clear();updateAudioUI();}
      catch(error){updateAudioUI(t("audioImportFailed")+": "+error.message);}
    });
    for(const [id,key] of [["tBasic","type"],["tBounce","type"],["sLeft","side"],["sRight","side"]]) {
      $("#"+id).addEventListener("change",e=>{if(e.target.checked){settings[key]=e.target.value;persist();}});
    }
    $("#adaptCfgBtn").addEventListener("click",()=>{$("#adaptSettings").hidden=!$("#adaptSettings").hidden;});
    $("#analyzeBtn").addEventListener("click",analyzeManual);
    $("#manualN").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();analyzeManual();}});
    $("#resetBtn").addEventListener("click",()=>{
      if(!window.confirm(t("confirmReset"))) return;
      settings.ok=0;settings.err=0;settings.weights=[1,1,1,1];settings.lastEggMilestone=0;settings.adaptiveData=freshAdaptive();
      updateStats();updateTimeLegend();persist();newNumber();
    });
    $("#eggContinue").addEventListener("click",()=>{closeModal("eggModal");newNumber();});
    $("#eggFinish").addEventListener("click",()=>{closeModal("eggModal");});
    $("#checkUpdatesBtn").addEventListener("click",checkUpdates);
    $("#updateBtn").addEventListener("click",updateApp);
    document.addEventListener("keydown",e=>{
      if(e.key==="Escape") {
        const top=$$(".overlay:not([hidden])").at(-1);
        if(top && top.id!=="eggModal") {e.preventDefault();closeModal(top.id);}
        return;
      }
      if($$(".overlay:not([hidden])").length) return;
      const active=document.activeElement;
      const editing=active && (["INPUT","SELECT","TEXTAREA"].includes(active.tagName) || active.isContentEditable);
      if(editing || e.altKey || e.metaKey || e.ctrlKey) return;
      const k=e.key.toLowerCase();
      if(k==="n") {e.preventDefault();newNumber();}
      else if(k==="enter" && settings.mode==="traditional") {e.preventDefault();verify();}
      else if(k==="h"||k==="q") {e.preventDefault();openModal("helpModal");}
      else if(k==="arrowup"||k==="w") {e.preventDefault();settings.type="basic";syncTypeSide();persist();}
      else if(k==="arrowdown"||k==="s") {e.preventDefault();settings.type="bounce";syncTypeSide();persist();}
      else if(k==="arrowleft"||k==="a") {e.preventDefault();settings.side="left";syncTypeSide();persist();}
      else if(k==="arrowright"||k==="d") {e.preventDefault();settings.side="right";syncTypeSide();persist();}
      else if(k===" " && settings.mode==="traditional") {e.preventDefault();settings.type=settings.type==="basic"?"bounce":"basic";syncTypeSide();persist();}
    });
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)checkUpdates();});
    window.addEventListener("pageshow",e=>{if(e.persisted)checkUpdates();});
  }

  function init() {
    setupEvents();
    syncSettings();
    updateStats();
    applyLanguage();
    refreshVoices();
    if("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged=refreshVoices;
    if(window.QuintaAudioPack) {
      window.QuintaAudioPack.init().then(()=>updateAudioUI()).catch(()=>updateAudioUI(t("audioStorageFailed")));
    }
    newNumber();
    updateTimer();
    checkUpdates();
    setInterval(checkUpdates,60000);
  }
  init();
})();