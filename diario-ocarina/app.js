(() => {
  const groups = ["Chañar","Cercanías","Patagonia","Argentina y mundo"];
  const buttons = [...document.querySelectorAll(".filter")];
  const status = document.querySelector("#update-status");
  const updateTime = document.querySelector("#update-time");
  let stories = [];
  let selected = "Todos";
  const escapeHTML = (v="") => String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const plain = value => String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const dateLabel = value => { if(!value)return "Fecha no informada";const d=new Date(value);return Number.isNaN(d.getTime())?"Fecha no informada":new Intl.DateTimeFormat("es-AR",{day:"numeric",month:"short",year:"numeric"}).format(d); };
  function territory(item){
    if(item.territory && groups.includes(item.territory)) return item.territory;
    const text=plain([item.title,item.summary,item.link].join(" "));
    if(/san patricio del chanar|san patricio del chanyar|el chanar|chañar|chanar|epea 3|epet 26|cef 10/.test(text)) return "Chañar";
    if(/alto valle|villa regina|general roca|cipolletti|cinco saltos|centenario|anielo|añelo|plottier|vista alegre|contralmirante cordero|barda del medio/.test(text)) return "Cercanías";
    if(/neuquen|neuquén|rio negro|río negro|patagonia|limay|collon cura|collón curá|junin de los andes|junín de los andes|san martin de los andes|san martín de los andes|zapala|andacollo|las coloradas|chubut|santa cruz|tierra del fuego/.test(text)) return "Patagonia";
    return "Argentina y mundo";
  }
  function render(){
    const visible=stories.filter(s=>selected==="Todos"||s.territory===selected);
    groups.forEach(group=>{
      const items=visible.filter(s=>s.territory===group);
      const container=document.querySelector("#cards-"+group);
      document.querySelector("#count-"+group).textContent=items.length+" "+(items.length===1?"nota":"notas");
      if(!items.length){container.innerHTML='<article class="empty">'+(group==="Chañar"?"Todavía no hay noticias locales verificadas en los feeds automáticos. Esta ausencia es visible: no la llenamos con noticias ajenas.":"No hay publicaciones disponibles en esta sección por ahora.")+'</article>';return;}
      container.innerHTML=items.map(s=>'<article class="story"><div class="story-top"><span class="tag">'+escapeHTML(s.category||"Publicación")+'</span><time datetime="'+escapeHTML(s.date||"")+'">'+escapeHTML(dateLabel(s.date))+'</time></div><h3>'+escapeHTML(s.title||"Publicación sin título")+'</h3><p>'+escapeHTML(s.summary||"Leé la publicación original para conocer todos los detalles.")+'</p><div class="story-bottom"><span>'+escapeHTML(s.source||"Fuente original")+'</span><a href="'+escapeHTML(s.link||"#")+'" target="_blank" rel="noopener noreferrer">Leer fuente ↗</a></div></article>').join("");
    });
    document.querySelectorAll(".territory").forEach(section=>{
      const id=section.querySelector(".cards")?.id||"";
      const group=id.replace("cards-","");
      section.classList.toggle("hidden",selected!=="Todos"&&group!==selected);
    });
  }
  buttons.forEach(b=>b.addEventListener("click",()=>{selected=b.dataset.region;buttons.forEach(x=>x.classList.toggle("active",x===b));render();}));
  fetch("noticias.json?actualizacion="+Date.now(),{cache:"no-store"})
    .then(r=>{if(!r.ok)throw Error("No se pudo leer la edición");return r.json();})
    .then(data=>{
      stories=(Array.isArray(data.items)?data.items:[]).map(item=>({...item,territory:territory(item)}));
      // Prioridad territorial antes que cronología: dentro de cada territorio, lo más reciente primero.
      stories.sort((a,b)=>groups.indexOf(a.territory)-groups.indexOf(b.territory)||String(b.date||"").localeCompare(String(a.date||"")));
      status.textContent="Última consulta automática";
      if(data.updated_at){const d=new Date(data.updated_at);updateTime.textContent=Number.isNaN(d.getTime())?"":new Intl.DateTimeFormat("es-AR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(d);}
      render();
    })
    .catch(()=>{status.textContent="Actualización temporalmente no disponible";updateTime.textContent="";groups.forEach(g=>{document.querySelector("#cards-"+g).innerHTML='<article class="empty">No pudimos cargar la edición. No mostramos titulares inventados.</article>';});});
})();