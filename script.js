const QS = [
  { l: "A", t: "Empieza", q: "Provincia más al sur de la Comunitat Valenciana.", a: ["alicante", "alacant"] },
  { l: "B", t: "Empieza", q: "Ciudad de la Marina Baixa famosa por sus rascacielos.", a: ["benidorm"] },
  { l: "C", t: "Empieza", q: "Provincia más al norte de la Comunitat.", a: ["castellon", "castello"] },
  { l: "D", t: "Empieza", q: "Ciudad de la Marina Alta junto al Montgó.", a: ["denia"] },
  { l: "E", t: "Empieza", q: "Ciudad famosa por su Palmeral, Patrimonio de la Humanidad.", a: ["elche", "elx"] },
  { l: "F", t: "Empieza", q: "Ciudad costera de la Safor con gran playa.", a: ["gandia"] },
  { l: "G", t: "Empieza", q: "Localidad alicantina con dunas donde desemboca el río Segura: ... del Segura.", a: ["guardamar"] },
  { l: "H", t: "Contiene", q: "Ciudad de la Vega Baja atravesada por el río Segura.", a: ["orihuela"] },
  { l: "I", t: "Empieza", q: "Islote frente a Santa Pola habitado: Isla de ...", a: ["tabarca", "nueva tabarca"] },
  { l: "J", t: "Empieza", q: "Río que nace en Cuenca y desemboca en Cullera.", a: ["jucar", "xuquer"] },
  { l: "L", t: "Empieza", q: "Parque natural junto a Valencia con gran lago: La ...", a: ["albufera"] },
  { l: "M", t: "Empieza", q: "Sierra entre Alicante y Valencia, la 'montaña de las plantas medicinales'.", a: ["mariola"] },
  { l: "N", t: "Contiene", q: "Montaña de Calp que entra en el mar: Penyal d'...", a: ["ifac"] },
  { l: "O", t: "Empieza", q: "Ciudad de Castellón famosa por su playa y el Desert de les Palmes.", a: ["oropesa"] },
  { l: "P", t: "Empieza", q: "Ciudad amurallada sobre un peñón, sede del Papa Luna.", a: ["peniscola"] },
  { l: "Q", t: "Contiene", q: "Ciudad del interior de Valencia, famosa por sus vinos y su embutido, en la comarca Utiel-...", a: ["requena"] },
  { l: "R", t: "Empieza", q: "Comarca valenciana famosa por los cítricos: La ...", a: ["ribera"] },
  { l: "S", t: "Empieza", q: "Río que pasa por Murcia y Orihuela antes de llegar al mar.", a: ["segura"] },
  { l: "T", t: "Empieza", q: "Río que atraviesa la ciudad de Valencia.", a: ["turia"] },
  { l: "U", t: "Contiene", q: "Ciudad costera en la desembocadura del Júcar.", a: ["cullera"] },
  { l: "V", t: "Empieza", q: "Capital de la Comunitat Valenciana.", a: ["valencia"] },
  { l: "X", t: "Empieza", q: "Ciudad de La Costera con un castillo y famosa por los Borja.", a: ["xativa", "jativa"] },
  { l: "Y", t: "Contiene", q: "Ciudad del interior de Alicante famosa por los juguetes.", a: ["ibi"] },
  { l: "Z", t: "Contiene", q: "Comarca de Castellón cuya capital es Vinaròs: El Baix ...", a: ["maestrat", "maestrazgo"] },
];
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
let st,i,time,on,msg,timer;const $=id=>document.getElementById(id);
const rosco=$("rosco"),center=$("center");
QS.forEach((q,k)=>{const a=k/QS.length*2*Math.PI-Math.PI/2,d=document.createElement("div");d.className="l";d.textContent=q.l;d.style.left=(50+44*Math.cos(a))+"%";d.style.top=(50+44*Math.sin(a))+"%";rosco.appendChild(d)});
const dots=[...rosco.querySelectorAll(".l")];
function reset(){st=QS.map(()=>"p");i=0;time=180;on=false;msg="";clearInterval(timer);render()}
const done=()=>time<=0||st.every(s=>s!=="p");
function next(from){for(let k=1;k<=QS.length;k++){const j=(from+k)%QS.length;if(st[j]==="p")return j}return from}
function answer(pass,v){if(done())return;const q=QS[i];if(!pass){const g=q.a.some(a=>norm(a)===norm(v));st[i]=g?"o":"b";msg=g?"¡Correcto!":"Fallo: era «"+q.a[0]+"»"}else msg="¡Pasapalabra!";i=next(i);render()}
function start(){on=true;timer=setInterval(()=>{time--;if(done())clearInterval(timer);render(true)},1000);render()}
function render(tick){const ok=st.filter(s=>s==="o").length,bad=st.filter(s=>s==="b").length;
$("ok").textContent=ok;$("bad").textContent=bad;$("time").textContent=Math.max(time,0);$("left").textContent=st.filter(s=>s==="p").length;
dots.forEach((d,k)=>d.className="l"+(st[k]==="o"?" okk":st[k]==="b"?" badd":"")+(k===i&&on&&!done()?" cur":""));
if(tick&&!done())return;
if(!on){center.innerHTML='<button class="big" id="go">¡Empezar!</button>';$("go").onclick=start}
else if(done()){center.innerHTML=`<p style="font-size:24px;font-weight:900;margin:0">¡Fin del rosco!</p><p>Aciertos: ${ok} · Fallos: ${bad}</p><button class="y" id="again">Jugar otra vez</button>`;$("again").onclick=reset}
else{const q=QS[i];center.innerHTML=`<p class="t">${q.t} por <b>${q.l}</b></p><p class="q">${q.q}</p><form id="f" style="width:100%;display:flex;flex-direction:column;gap:8px"><input id="v" placeholder="Tu respuesta" autocomplete="off"><div style="display:flex;gap:8px;justify-content:center"><button class="g">Responder</button><button type="button" class="y" id="pass">Pasapalabra</button></div></form><p>${msg}</p>`;
$("f").onsubmit=e=>{e.preventDefault();answer(false,$("v").value)};$("pass").onclick=()=>answer(true);$("v").focus()}}
reset();
