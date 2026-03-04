# Slack Preferred Workspace Opener (Archives Only)

Slack の `archives` リンクを右クリックして、  
**指定した workspace（サブドメイン）で開く** Chrome 拡張です。

- 元リンクは変更しません（新しいタブで開きます）
- 右クリックメニューは **Slack の archives リンクだけ**に表示されます

---

## 例

元リンク（例）

https://example-workspace.slack.com/archives/C12345678/p123456789

右クリック → メニュー

Slack: abcd-workspace で開く

開かれるURL（例）

https://abcd-workspace.slack.com/archives/C12345678/p123456789

※ workspace を Options で別の値にしている場合は、その値に置き換わります。

---

## 対象URL

右クリックメニューが出るのは次のURLのみです。

https://*.slack.com/archives/*

---

## フォルダ構成

slack-workspace-opener/

manifest.json  
service_worker.js  
options.html  
options.js  
README.md  

---

## インストール（開発モード）

1. Chromeで次のURLを開く

chrome://extensions

2. 右上の **デベロッパーモード** をON

3. **「パッケージ化されていない拡張機能を読み込む」** をクリック

4. このリポジトリのフォルダ `slack-workspace-opener/` を選択

---

## 設定

拡張の **Options** を開き、workspace を入力します。

例

example-workspace

保存すると、右クリックメニューの表示が更新されます。

---

## 技術

Chrome Extension (Manifest V3)

使用API

- contextMenus
- chrome.storage.sync
- tabs

---

## データ保存

workspace 設定は次のAPIで保存されます。

chrome.storage.sync

Chrome にログインしている場合、設定はブラウザ間で同期されます。

---

## ライセンス

MIT License