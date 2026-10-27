(() => {
  const grid = document.querySelector("#news-grid");
  const status = document.querySelector("#update-status");
  const count = document.querySelector("#result-count");
  const emptyFilter = document.querySelector("#empty-filter");
  const buttons = [...document.querySelectorAll(".filter")];
  let stories = [];
  let selected = "Todas";

  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateLabel = value => {
    if (!value) return "Fecha no informada";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "Fecha no informada" : new Intl.DateTimeFormat("es-AR",{day:"numeric",month:"short",year:"numeric"}).format(d);
  };
  const render = () => {
    const shown = stories.filter(item => selected === "Todas" || item.category === selected);
    count.textContent = shown.length + (shown.length === 1 ? " publicación" : " publicaciones");
    emptyFilter.hidden = shown.length > 0;
    if (!shown.length) {
      grid.innerHTML = '<article class="empty-state"><p>No hay publicaciones para mostrar en esta categoría por ahora.</p><p>El sistema volverá a consultar las fuentes automáticamente.</p></article>';
      return;
    }
    grid.innerHTML = shown.map(item => `
      <article class="news-card">
        <div class="card-meta"><span class="category">${escapeHTML(item.category || "Región")}</span><time class="date" datetime="${escapeHTML(item.date || "")}">${escapeHTML(dateLabel(item.date))}</time></div>
        <h3>${escapeHTML(item.title || "Publicación sin título")}</h3>
        <p>${escapeHTML(item.summary || "Consultá la publicación original para conocer todos los detalles.")}</p>
        <div class="card-footer"><span>${escapeHTML(item.source || "Fuente original")}</span><a class="read-link" href="${escapeHTML(item.link || "#")}" target="_blank" rel="noopener noreferrer">Leer fuente ↗</a></div>
      </article>`).join("");
  };
  buttons.forEach(button => button.addEventListener("click", () => {
    selected = button.dataset.category;
    buttons.forEach(b => b.classList.toggle("active", b === button));
    render();
  }));
  fetch("noticias.json?actualizacion=" + Date.now(), {cache:"no-store"})
    .then(response => { if (!response.ok) throw new Error("No se pudo cargar el archivo de noticias"); return response.json(); })
    .then(data => {
      stories = Array.isArray(data.items) ? data.items : [];
      const updated = data.updated_at ? new Date(data.updated_at) : null;
      status.textContent = updated && !Number.isNaN(updated.getTime())
        ? "Fuentes consultadas: " + new Intl.DateTimeFormat("es-AR",{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"short"}).format(updated)
        : "Actualización automática habilitada";
      render();
    })
    .catch(() => {
      status.textContent = "No se pudo actualizar la información en este momento.";
      count.textContent = "Sin conexión";
      grid.innerHTML = '<article class="empty-state"><p>Las novedades no están disponibles ahora.</p><p>Probá nuevamente más tarde. No mostramos titulares inventados.</p></article>';
    });
})();