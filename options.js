const DEFAULT_WORKSPACE = "example-workspace";

function normalizeWorkspace(input) {
  return (input || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\.slack\.com.*$/i, "")
    .replace(/[^\w-]/g, "");
}

function showMsg(text, kind = "ok") {
  const el = document.getElementById("msg");
  el.className = kind;
  el.textContent = text;
}

async function load() {
  const { workspace } = await chrome.storage.sync.get({ workspace: DEFAULT_WORKSPACE });
  document.getElementById("workspace").value = workspace;
}

async function save() {
  const input = document.getElementById("workspace").value;
  const normalized = normalizeWorkspace(input);

  if (!normalized) {
    showMsg("workspace が空です（例: example-workspace）", "err");
    return;
  }

  await chrome.storage.sync.set({ workspace: normalized });
  showMsg(`保存しました: ${normalized}`, "ok");
}

document.getElementById("save").addEventListener("click", save);
document.addEventListener("DOMContentLoaded", load);