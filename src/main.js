const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    backgroundColor: "#26292c",
    width: 1280,
    height: 800,
  });
  mainWindow.loadFile(
    path.join(__dirname, "..", "cinny", "dist", "index.html")
  );
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("web-contents-created", (_, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:", "https:", "mailto:")) {
      setImmediate(() => {
        shell.openExternal(url);
      });
    }
    return { action: "deny" };
  });
});
