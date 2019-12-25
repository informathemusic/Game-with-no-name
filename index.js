const express = require('express')
const appEx = express()

appEx.get('/', function(req, res) {
  res.sendFile(__dirname+'/game/index.html')
})

console.log("here!")
appEx.use(express.static("game"));
appEx.listen(3000, function() {
  console.log('Example app listening on port 3000!')
  /*const electron = require('electron');

  function createWindow() {
    // Cree la fenetre du navigateur.
    let win = new electron.BrowserWindow({
      width: 500,
      height: 525,
      webPreferences: {
        nodeIntegration: true
      }
    })

    // and load the index.html of the app.
    win.loadFile('/non-root/Bureau/wbpgs/Game/game/index.html')
  }

  electron.app.on('ready', createWindow)*/
})
