const DEFAULT_WORKSPACE = "example-workspace";
const MENU_ID = "open_in_preferred_slack_workspace";

function normalizeWorkspace(input) {
  return (input || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\.slack\.com.*$/i, "")
    .replace(/[^\w-]/g, "");
}

async function getWorkspace() {
  const { workspace } = await chrome.storage.sync.get({ workspace: DEFAULT_WORKSPACE });
  return normalizeWorkspace(workspace) || DEFAULT_WORKSPACE;
}

function isSlackArchivesUrl(url) {
  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" &&
      u.hostname.endsWith(".slack.com") &&
      u.pathname.startsWith("/archives/")
    );
  } catch {
    return false;
  }
}

function buildAltUrl(originalUrl, workspace) {
  const u = new URL(originalUrl);
  u.hostname = `${workspace}.slack.com`;
  return u.toString();
}

async function refreshMenuTitle() {
  const ws = await getWorkspace();
  try {
    await chrome.contextMenus.update(MENU_ID, { title: `Slack: ${ws} で開く` });
  } catch {
    // メニュー未作成などは無視
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  const ws = await getWorkspace();

  chrome.contextMenus.create({
    id: MENU_ID,
    title: `Slack: ${ws} で開く`,
    contexts: ["link"],
    // Slack の archives 配下だけに表示
    targetUrlPatterns: ["https://*.slack.com/archives/*"]
  });

  await refreshMenuTitle();
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== MENU_ID) return;

  const linkUrl = info.linkUrl;
  if (!linkUrl || !isSlackArchivesUrl(linkUrl)) return;

  const ws = await getWorkspace();
  const altUrl = buildAltUrl(linkUrl, ws);

  chrome.tabs.create({ url: altUrl });
});

// Optionsで workspace が変わったらメニュー表示も更新
chrome.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName === "sync" && changes.workspace) {
    await refreshMenuTitle();
  }
});