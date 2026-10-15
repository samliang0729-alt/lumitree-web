# 🌳 LumiTree (靈光樹) - 部署包

這是一個免安裝、免伺服器，**直接點擊即可使用**的現代化全前端心智圖應用程式部署包。

## ✨ 包含的最新強大功能：
*   **雙向智慧排版 (Dual-sided Auto-Layout)**：節點會自動向左右兩側平衡伸展。
*   **AI 文字匯入神器**：點擊「模板匯入」按鈕，貼上帶有縮排的文字（例如 ChatGPT 生成的大綱），1 秒自動變身成精美心智圖。
*   **PDF 無損匯出**：點擊匯出按鈕，系統會自動精準擷取整張心智圖並儲存為高畫質 PDF。
*   **純本地運行**：隱私 100% 安全，所有的編輯都在你的瀏覽器內完成，資料不會傳送至任何外部伺服器。

---

## 🚀 如何使用與部署？

這是一個單純的 `HTML` 檔案（內部封裝了 React 與 Tailwind CSS），您有兩種方式可以使用它：

### 方式一：直接離線使用 (最簡單)
1. 將資料夾中的 `LumiTree_Web.html` 直接拖曳進您的網頁瀏覽器（Google Chrome, Edge, Safari 皆可）。
2. **完成！** 您現在可以直接開始繪製心智圖。
3. *附註：若要使用「匯出 PDF」功能，使用時電腦需要連上網路（用來載入 PDF 轉換套件）。*

### 方式二：將它變成線上網站 (透過 Google Sites)
如果您希望有一個專屬的網址可以隨時隨地連線，或是分享給別人使用：
1. 用「記事本」或任何文字編輯器打開 `LumiTree_Web.html`。
2. 複製裡面**所有的程式碼**。
3. 登入 [Google Sites (協作平台)](https://sites.google.com/)。
4. 新增一個「完整頁面內嵌 (Full page embed)」類型的頁面（或在一般頁面點擊右側的「內嵌」`< >` 按鈕）。
5. 選擇「內嵌程式碼」，將剛剛複製的所有程式碼貼上，點擊插入。
6. 將區塊拉到最大，點擊右上角的「發布」，您的雲端心智圖 App 就正式上線了！

### 方式三：將它發佈到 GitHub Pages (適合開發者)
1. 將 `LumiTree_Web.html` 重新命名為 `index.html`。
2. 在您的 GitHub 建立一個公開的 Repository。
3. 將 `index.html` 與此 `README.md` 上傳至該 Repository 的 `main` 分支。
4. 進入 Repository 的 **Settings > Pages**，將 Source 選擇為 `Deploy from a branch`，Branch 選擇 `main`，然後按 Save。
5. 等待 1~2 分鐘，您的網站即可透過 GitHub 分配的專屬網址公開存取！

---
*Powered by React, Tailwind CSS, and your AI Assistant.*