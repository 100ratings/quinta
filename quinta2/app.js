(function () {
  "use strict";

  const VERSION = "2.0.3";
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
      adaptive:"Treinamento adaptativo",adaptiveSettings:"Configurar velocidade",
      fastIf:"Rápido até (s)",slowIf:"Lento a partir de (s)",save:"Salvar",
      showPath:"Mostrar caminho da contagem nos erros",voice:"Voz",
      speakNumber:"Falar o número",chooseVoice:"Selecionar voz",voiceAuto:"Automático",
      speakErrors:"Falar os erros",tools:"Ferramentas",analyzeLabel:"Analisar número",
      analyze:"Analisar",rules:"Regras e guia rápido",reset:"Zerar treinamento",
      updates:"Atualizações",upToDate:"Atualizado",checkUpdates:"Verificar",
      updateApp:"Atualizar aplicativo",updateAvailable:"Nova versão disponível",
      checking:"Verificando…",checkFailed:"Não foi possível verificar",
      continueTraining:"Continuar treinamento",resetCounters:"Zerar contadores",
      nice:"Correto!",miss:"Incorreto!",youSelected:"Sua resposta",ideal:"Correto",
      type:"Tipo",startFrom:"Início",path:"Caminho",
      lockedHint:"Toque em Novo número para continuar",good:"Bom",slow:"Lento",
      invalidNumber:"Digite um número inteiro positivo",invalidThresholds:"Informe valores positivos, com Rápido menor que Lento",
      saved:"Configurações salvas",confirmReset:"Zerar acertos, erros e aprendizagem adaptativa do QUINTA 2?",
      milestoneTitle:(n) => n + " acertos!",milestoneMsg:"Excelente! Continue praticando até o método ficar automático",
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
      adaptiveSettings:"Speed settings",fastIf:"Fast at or below (s)",slowIf:"Slow at or above (s)",
      save:"Save",showPath:"Show counting path after a wrong answer",
      voice:"Voice",speakNumber:"Speak number",chooseVoice:"Choose voice",
      voiceAuto:"Automatic",speakErrors:"Speak errors",tools:"Tools",
      analyzeLabel:"Analyze number",analyze:"Analyze",rules:"Rules & quick guide",
      reset:"Reset training",updates:"Updates",upToDate:"Up to date",
      checkUpdates:"Check",updateApp:"Update app",updateAvailable:"New version available",
      checking:"Checking…",checkFailed:"Couldn't check for updates",
      continueTraining:"Continue training",resetCounters:"Reset counters",
      nice:"Correct!",miss:"Wrong!",youSelected:"Your answer",ideal:"Correct answer",
      type:"Type",startFrom:"Start",path:"Path",
      lockedHint:"Tap New number to continue",good:"Good",slow:"Slow",
      invalidNumber:"Enter a positive whole number",invalidThresholds:"Enter positive values, with Fast less than Slow",
      saved:"Settings saved",confirmReset:"Reset correct answers, mistakes and adaptive learning for QUINTA 2?",
      milestoneTitle:(n) => n + " reps!",milestoneMsg:"Excellent! Keep practicing until the method feels automatic",
      voiceWrong:"wrong",manualUse:"use N+1",noSpeech:"Speech is unavailable in this browser",
      helpHTML:'<h3>The QUINTA principle</h3><p>The <b>Force</b> is always the <b>second item from the left</b> out of five</p><p><b>Basic:</b> count each item, including the starting item<br><b>Bounce:</b> count moves between items, excluding the starting item</p><h3>Mathematical rule</h3><p>For <b>even</b> N, use <b>Basic</b><br>For <b>odd</b> N, use <b>Bounce</b> and calculate N + 1</p><p>Start on the <b>Left</b> when that number is <b>0 or 2 modulo 8</b>, otherwise start on the <b>Right</b></p><h3>Fast training</h3><ul><li>Read or listen to the number</li><li>Tap item 1 or Left, or item 5 or Right</li><li>Correct answers automatically advance after 350 ms</li><li>Wrong answers show the solution, tap New number to continue</li></ul><h3>Traditional mode</h3><p>Select Traditional in Settings, choose Basic or Bounce and Left or Right, then tap Check answer, correct answers advance after 500 ms</p><h3>Keyboard shortcuts</h3><p><b>N:</b> new number, <b>Enter:</b> check in Traditional mode, <b>H:</b> help, <b>Q:</b> help, <b>↑/↓:</b> Basic/Bounce and <b>←/→:</b> Left/Right</p>'
    }
  };

  const defaults = {language:"auto",mode:"fast",range:"1-40",minN:"1",maxN:"15",
    adaptive:true,tts:true,errTts:true,voice:"",type:"basic",side:"left",
    step:false,fastThreshold:3.0,slowThreshold:5.0,ok:0,err:0,
    weights:[1,1,1,1],lastEggMilestone:0};
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch (_) {}
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) stored = {};
  const settings = Object.assign({}, defaults);
  for (const key of Object.keys(defaults)) {
    if (Object.prototype.hasOwnProperty.call(stored,key)) settings[key] = stored[key];
  }
  if (!["auto","pt","en"].includes(settings.language)) settings.language = "auto";
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

  let N = null, lastN = null, locked = false, startTime = 0, elapsedStop = null;
  let pendingNext = null, feedbackInfo = null, remoteVersion = null, voices = [];
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
  function pickBucket(a,b) {
    const seen=[false,false,false,false];
    for(let i=0;i<400;i++) {
      const r=bucketFromRule(correctRule(randInt(a,b)));
      seen[r]=true;
      if(seen.every(Boolean)) break;
    }
    let total=0;
    const weights=seen.map((yes,i)=>yes?(settings.adaptive?Math.max(.05,settings.weights[i]):1):0);
    for(const w of weights) total+=w;
    let roll=Math.random()*total;
    for(let i=0;i<4;i++) {
      if(!seen[i]) continue;
      if(roll<weights[i]) return i;
      roll-=weights[i];
    }
    return seen.findIndex(Boolean);
  }
  function updateAdaptiveWeights(bucket,elapsed) {
    if(!settings.adaptive) return;
    if(elapsed>=settings.slowThreshold) settings.weights[bucket]=Math.min(3,settings.weights[bucket]+.3);
    else if(elapsed<=settings.fastThreshold) settings.weights[bucket]=Math.max(.2,settings.weights[bucket]-.2);
    else settings.weights[bucket]+=(1-settings.weights[bucket])*.05;
  }

  function setFeedback(info) {
    feedbackInfo=info;
    const el=$("#feedback");
    el.replaceChildren();
    if(!info) {el.classList.remove("visible");return;}
    el.classList.add("visible");
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
    $("#timeLegend").textContent=t("good")+" ≤ "+numSeconds(settings.fastThreshold)+" · "+t("slow")+" ≥ "+numSeconds(settings.slowThreshold);
  }
  function updateTimer() {
    const elapsed = N===null ? 0 : (elapsedStop===null ? (performance.now()-startTime)/1000 : elapsedStop);
    $("#timer").textContent=numSeconds(Math.max(0,elapsed));
    requestAnimationFrame(updateTimer);
  }
  function markActive(side) {
    $$(".tile.side").forEach(el=>el.dataset.active=String(el.dataset.idx===(side==="left"?"0":"4")));
    $("#leftBtn").dataset.active=String(side==="left");
    $("#rightBtn").dataset.active=String(side==="right");
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
  function speak(text,force) {
    if(!force && !settings.tts) return;
    if(!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    try {
      const u=new SpeechSynthesisUtterance(String(text));
      const active=voices.find(v=>v.name===settings.voice) || pickVoice(getVoiceLang());
      if(active) {u.voice=active;u.lang=active.lang;} else u.lang=getVoiceLang();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }
  function speakError() {
    if(!settings.errTts) return;
    const lang=getVoiceLang().toLowerCase();
    const words={pt:"errou",en:"wrong",es:"incorrecto",fr:"faux",de:"falsch",it:"sbagliato"};
    speak(words[lang.slice(0,2)]||t("voiceWrong"),true);
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
  }

  function newNumber() {
    if(pendingNext!==null) {clearTimeout(pendingNext);pendingNext=null;}
    const [a,b]=currentRange();
    const target=pickBucket(a,b);
    let selected=null,tries=0;
    while(tries++<400) {
      const x=randInt(a,b);
      if(x===lastN && b>a) continue;
      if(bucketFromRule(correctRule(x))===target) {selected=x;break;}
    }
    if(selected===null) {
      if(a===b) selected=a;
      else {
        selected=randInt(a,b);
        while(selected===lastN) selected=randInt(a,b);
      }
    }
    N=selected;lastN=N;locked=false;startTime=performance.now();elapsedStop=null;
    $("#number").textContent=String(N);
    setFeedback(null);clearActive();
    speak(N,false);
  }
  function checkMilestone() {
    if(settings.ok<=0 || settings.ok%100!==0 || settings.lastEggMilestone===settings.ok) return false;
    settings.lastEggMilestone=settings.ok;
    persist();
    $("#eggTitle").textContent=t("milestoneTitle")(settings.ok);
    $("#eggMsg").textContent=t("milestoneMsg");
    openModal("eggModal");
    speak($("#eggTitle").textContent+" "+$("#eggMsg").textContent,true);
    return true;
  }
  function record(correct,info,delay) {
    locked=true;elapsedStop=info.elapsed;
    if(correct) settings.ok++;
    else settings.err++;
    updateAdaptiveWeights(bucketFromRule(info.ideal),info.elapsed);
    updateStats();setFeedback(info);persist();
    if(!correct) speakError();
    const egg=checkMilestone();
    if(correct && !egg) pendingNext=setTimeout(newNumber,delay);
  }
  function fastTap(side) {
    if(settings.mode!=="fast" || N===null || locked) return;
    const ideal=correctRule(N),elapsed=(performance.now()-startTime)/1000;
    const correct=side===ideal.lado;
    markActive(side);
    record(correct,{mode:"fast",selection:side,ideal,correct,elapsed},350);
  }
  function verify() {
    if(settings.mode!=="traditional" || N===null || locked) return;
    const ideal=correctRule(N),elapsed=(performance.now()-startTime)/1000;
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
    $("#step").checked=!!settings.step;
    $("#fastTh").value=settings.fastThreshold.toFixed(1);
    $("#slowTh").value=settings.slowThreshold.toFixed(1);
    $("#adaptSettings").hidden=true;
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
    $("#modeSel").addEventListener("change",e=>{settings.mode=e.target.value;persist();syncMode();});
    $("#range").addEventListener("change",e=>{settings.range=e.target.value;$("#customWrap").hidden=settings.range!=="custom";persist();});
    for(const id of ["minN","maxN"]) $("#"+id).addEventListener("change",e=>{settings[id]=String(clampRange(e.target.value,id==="minN"?1:15));e.target.value=settings[id];persist();});
    for(const [id,key] of [["adaptiveCB","adaptive"],["ttsCB","tts"],["errTtsCB","errTts"],["step","step"]]) {
      $("#"+id).addEventListener("change",e=>{settings[key]=e.target.checked;persist();if(key==="adaptive")$("#adaptCfgBtn").disabled=!settings.adaptive;});
    }
    $("#voiceSel").addEventListener("change",e=>{settings.voice=e.target.value;persist();});
    for(const [id,key] of [["tBasic","type"],["tBounce","type"],["sLeft","side"],["sRight","side"]]) {
      $("#"+id).addEventListener("change",e=>{if(e.target.checked){settings[key]=e.target.value;persist();}});
    }
    $("#adaptCfgBtn").addEventListener("click",()=>{$("#adaptSettings").hidden=!$("#adaptSettings").hidden;});
    $("#saveAdapt").addEventListener("click",()=>{
      const fast=Number($("#fastTh").value),slow=Number($("#slowTh").value);
      if(!(fast>0 && slow>fast && Number.isFinite(slow))) {$("#adaptFeedback").textContent=t("invalidThresholds");return;}
      settings.fastThreshold=fast;settings.slowThreshold=slow;persist();
      updateTimeLegend();$("#adaptFeedback").textContent=t("saved");
    });
    $("#analyzeBtn").addEventListener("click",analyzeManual);
    $("#manualN").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();analyzeManual();}});
    $("#resetBtn").addEventListener("click",()=>{
      if(!window.confirm(t("confirmReset"))) return;
      settings.ok=0;settings.err=0;settings.weights=[1,1,1,1];settings.lastEggMilestone=0;
      updateStats();persist();newNumber();
    });
    $("#eggContinue").addEventListener("click",()=>{closeModal("eggModal");newNumber();});
    $("#eggReset").addEventListener("click",()=>{
      settings.ok=0;settings.err=0;settings.weights=[1,1,1,1];settings.lastEggMilestone=0;
      updateStats();persist();closeModal("eggModal");newNumber();
    });
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
    newNumber();
    updateTimer();
    checkUpdates();
    setInterval(checkUpdates,60000);
  }
  init();
})();