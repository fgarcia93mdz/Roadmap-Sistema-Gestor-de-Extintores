// renderer.js
// Render de UI: selector, timeline, bindings

function renderProjectSelector() {
  const select = document.getElementById('projectSelector');
  select.innerHTML = '';
  state.projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.nombre;
    if (project.id === state.currentProjectId) option.selected = true;
    select.appendChild(option);
  });
  select.onchange = (e) => {
    setCurrentProject(e.target.value);
    renderAll();
  };
}

function renderTimeline() {
  const project = getCurrentProject();
  const container = document.getElementById('timeline-dynamic');
  container.innerHTML = '';
  project.timeline.forEach((step, index) => {
    const div = document.createElement('div');
    div.className = `timeline-item ${step.status}`;
    div.innerHTML = `
      <div class="timeline-card">
        <h3>${step.semana}</h3>
        <p><b>${step.titulo}</b></p>
        <p>${step.detalle}</p>
        <div class="progress-bar"><div style="width:${step.progreso}%"></div></div>
      </div>
      <div class="dot"></div>
    `;
    div.onclick = () => toggleStatus(index);
    container.appendChild(div);
  });
}

function renderBindings() {
  const project = getCurrentProject();
  document.querySelectorAll('[data-bind]').forEach(el => {
    el.innerText = getValue(el.dataset.bind, project.content) || '';
  });
}

function getValue(path, obj) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function renderAll() {
  renderProjectSelector();
  renderTimeline();
  renderBindings();
  // ...otros renders globales (métricas, etc.)
}
