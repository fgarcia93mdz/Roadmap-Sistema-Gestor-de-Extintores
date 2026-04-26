// editor.js
// Editor modal desacoplado y persistente

let currentKey = null;

function openEditor(key) {
  currentKey = key;
  const project = getCurrentProject();
  document.getElementById('editorInput').value = getValue(key, project.content);
  document.getElementById('editorModal').classList.remove('hidden');
}

function closeEditor() {
  document.getElementById('editorModal').classList.add('hidden');
  currentKey = null;
}

function saveEdit() {
  const value = document.getElementById('editorInput').value;
  setValue(currentKey, value);
  saveState();
  renderBindings();
  closeEditor();
}

function setValue(path, value) {
  const project = getCurrentProject();
  const keys = path.split('.');
  let obj = project.content;
  keys.slice(0, -1).forEach(k => obj = obj[k]);
  obj[keys.at(-1)] = value;
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-bind]');
  if (!el) return;
  openEditor(el.dataset.bind);
});
