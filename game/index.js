let game;
let elem = document.getElementById('body');
console.log(elem)
let keya;
var event = new Event('build');
document.getElementById('body').focus()
document.getElementById('body').addEventListener('keydown', logKey);

function logKey(key) {
  keya = key
  elem.dispatchEvent(event);
}

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  });
}

function eucDiv(D, d) {
  return (D - (D % d)) / d
}

function waitForKey(key) {
  return new Promise((resolve, reject) => {
    var evl = elem.addEventListener('build', function(e) {
      console.log(keya)
      if (keya.key.toLowerCase() === key.toLowerCase()) {
        elem.removeEventListener('build', evl)
        resolve()
      }
    }, false);
  });
}

function ra(n, l) {
  if (!l) {
    l = 5
  }
  console.log('called me!')
  //ra for randomise asset
  return (Math.floor(Math.random() * l) + n)
}

function preload() {
  txtPxl = loadFont('http://localhost:3000/fonts/LCD_Solid.ttf');
  class Game {
    constructor(assets) {
      this.bg = 255;
      this.i = [];
      this.spriteUdlr = 'U';
      this.blockSize = 50;
      this.assets = []
      this.sprite = {}
      this.sprite.U = {}
      this.sprite.D = {}
      this.sprite.L = {}
      this.sprite.R = {}
      this._spriteX = 0
      this._spriteY = 0
      this.varOff = false
      for (this.i[0] = 0; this.i[0] < assets.length; this.i[0]++) {
        this.assets[this.i[0]] = loadImage('http://localhost:3000/assets/' + assets[this.i[0]])
      }
      this.walking = 'NW'
      setInterval(() => {
        if (keyIsPressed === true && (key.toUpperCase() == 'Z' || key.toUpperCase() == 'Q' || key.toUpperCase() == 'S' || key.toUpperCase() == 'D')) {
          this.movePers(key.toUpperCase())
          console.log(this.spriteX, this.spriteY)
          this.moving = true
        } else {
          this.moving = false
        }
      }, 100);
      setInterval(() => {
        if (this.moving) {
          this.walking = (this.walking == 'NW') ? 'W' : 'NW'
        }
      }, 500);
    }
    defPers(sprite) {
      this.sprite.U.NW = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'U.png');
      this.sprite.U.W = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'UW.png');
      this.sprite.D.NW = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'D.png');
      this.sprite.D.W = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'DW.png');
      this.sprite.L.NW = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'L.png');
      this.sprite.L.W = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'LW.png');
      this.sprite.R.NW = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'R.png');
      this.sprite.R.W = loadImage('http://localhost:3000/assets/sprites/' + sprite + 'RW.png');
    }
    setBgColor(Bg) {
      this.bg = Bg
    }
    movePers(udlr) {
      switch (udlr) {
        case 'Z':
          this.spriteUdlr = 'U';
          if (this.spriteY - 5 > 0) {
            this.spriteY -= 5
          }
          break;
        case 'S':
          this.spriteUdlr = 'D';
          if (this.spriteY + 5 < this.map.length * this.blockSize) {
            this.spriteY += 5
          }
          break;
        case 'D':
          this.spriteUdlr = 'L';
          if (this.spriteX + 5 < this.map[0].length * this.blockSize) {
            this.spriteX += 5
            console.log('boop')
          }
          break;
        case 'Q':
          this.spriteUdlr = 'R';
          if (this.spriteX - 5 > 0) {
            this.spriteX -= 5
            console.log('beep')
          }
          break;
        default:
          throw 'f'
      }
      console.log(this.spriteUdlr)
    }
    off() {
      this.defPers('void')
      this.setBgColor('s')
      this.varOff = true
      this.setMap([
        [23]
      ])
    }
    setMap(arr) {
      if (!this.varOff) {
        background(this.bg)
      }
      this.map = arr
      for (this.i[1] = 0; this.i[1] < arr.length; this.i[1]++) {
        for (this.i[2] = 0; this.i[2] < arr[this.i[1]].length; this.i[2]++) {
          if (Array.isArray(arr[this.i[1]][this.i[2]])) {
            for (this.i[3] = 0; this.i[3] < arr[this.i[1]][this.i[2]].length; this.i[3]++) {
              image(this.assets[arr[this.i[1]][this.i[2]][this.i[3]]], this.i[2] * this.blockSize, this.i[1] * this.blockSize, this.blockSize, this.blockSize)
              console.log(this.i)
            }
          } else {
            image(this.assets[arr[this.i[1]][this.i[2]]], this.i[2] * this.blockSize, this.i[1] * this.blockSize, this.blockSize, this.blockSize)
            console.log(this.i)
          }
        }
      }
      image(this.sprite[this.spriteUdlr][this.walking], this._spriteX, this._spriteY, this.blocksize, this.blocksize)
    }
    get spriteX() {
      return (this._spriteX)
    }
    set spriteX(d) {
      if (!this.varOff) {
        background(this.bg)
      }
      var arr = this.map
      this._spriteX = (arr[0].length * this.blockSize < d || 0 > d) ? this._spriteX : d;
      for (this.i[1] = 0; this.i[1] < arr.length; this.i[1]++) {
        for (this.i[2] = 0; this.i[2] < arr[this.i[1]].length; this.i[2]++) {
          if (Array.isArray(arr[this.i[1]][this.i[2]])) {
            for (this.i[3] = 0; this.i[3] < arr[this.i[1]][this.i[2]].length; this.i[3]++) {
              image(this.assets[arr[this.i[1]][this.i[2]][this.i[3]]], this.i[2] * this.blockSize - (eucDiv(this._spriteX, width) * width), this.i[1] * this.blockSize - (eucDiv(this._spriteY, height) * height), this.blockSize, this.blockSize)
            }
          } else {
            image(this.assets[arr[this.i[1]][this.i[2]]], this.i[2] * this.blockSize - (eucDiv(this._spriteX, width) * width), this.i[1] * this.blockSize - (eucDiv(this._spriteY, height) * height), this.blockSize, this.blockSize)
          }
        }
      }
      console.log(this.sprite[this.spriteUdlr][this.walking], this.sprite, this.spriteUdlr, this.walking)
      image(this.sprite[this.spriteUdlr][this.walking], this._spriteX % width, this._spriteY % height, this.blockSize, this.blockSize)
    }
    get spriteY() {
      return (this._spriteY)
    }
    set spriteY(d) {
      if (!this.varOff) {
        background(this.bg)
      }
      var arr = this.map
      this._spriteY = (arr.length * this.blockSize < d || 0 > d) ? this._spriteY : d;
      for (this.i[1] = 0; this.i[1] < arr.length; this.i[1]++) {
        for (this.i[2] = 0; this.i[2] < arr[this.i[1]].length; this.i[2]++) {
          if (Array.isArray(arr[this.i[1]][this.i[2]])) {
            for (this.i[3] = 0; this.i[3] < arr[this.i[1]][this.i[2]].length; this.i[3]++) {
              image(this.assets[arr[this.i[1]][this.i[2]][this.i[3]]], this.i[2] * this.blockSize - (eucDiv(this._spriteX, width) * width), this.i[1] * this.blockSize - (eucDiv(this._spriteY, height) * height), this.blockSize, this.blockSize)
            }
          } else {
            image(this.assets[arr[this.i[1]][this.i[2]]], this.i[2] * this.blockSize - (eucDiv(this._spriteX, width) * width), this.i[1] * this.blockSize - (eucDiv(this._spriteY, height) * height), this.blockSize, this.blockSize)
          }
        }
      }
      console.log(this.sprite[this.spriteUdlr][this.walking], this.sprite, this.spriteUdlr, this.walking)
      image(this.sprite[this.spriteUdlr][this.walking], this._spriteX % width, this._spriteY % height, this.blockSize, this.blockSize)
    }
  }
  game = new Game(['tile_00.png', 'tile_01.png', 'tile_02.png', 'tile_03.png', 'tile_04.png', 'tile_05.png', 'tile_06.png', 'tile_07.png', 'tile_08.png', 'tile_09.png', 'tile_10.png', 'tile_11.png', 'tile_12.png', 'tile_13.png', 'tile_14.png', 'tile_15.png', 'tile_16.png', 'tile_17.png', 'tile_18.png', 'tile_19.png', 'tile_20.png', 'tile_21.png', 'tile_22.png', 'void.png']);
}

function setup() {
  createCanvas(500, 500)
  game.off();
  background(21);
  textFont(txtPxl);
  fill(100);
  textSize(20);
  textAlign(LEFT, TOP)
  text('>console.log(\'hello world\')', 10, 10)
  fill(255);
  text('>', 10, 10)
  waitForKey('c').then(() => {
    background(21);
    textFont(txtPxl);
    fill(100);
    textSize(20);
    textAlign(LEFT, TOP)
    text('>console.log(\'hello world\')', 10, 10)
    fill(255);
    text('>c', 10, 10)
    waitForKey('o').then(() => {
      background(21);
      textFont(txtPxl);
      fill(100);
      textSize(20);
      textAlign(LEFT, TOP)
      text('>console.log(\'hello world\')', 10, 10)
      fill(255);
      text('>co', 10, 10)
      waitForKey('n').then(() => {
        background(21);
        textFont(txtPxl);
        fill(100);
        textSize(20);
        textAlign(LEFT, TOP)
        text('>console.log(\'hello world\')', 10, 10)
        fill(255);
        text('>con', 10, 10)
        waitForKey('s').then(() => {
          background(21);
          textFont(txtPxl);
          fill(100);
          textSize(20);
          textAlign(LEFT, TOP)
          text('>console.log(\'hello world\')', 10, 10)
          fill(255);
          text('>cons', 10, 10)
          waitForKey('o').then(() => {
            background(21);
            textFont(txtPxl);
            fill(100);
            textSize(20);
            textAlign(LEFT, TOP)
            text('>console.log(\'hello world\')', 10, 10)
            fill(255);
            text('>conso', 10, 10)
            waitForKey('l').then(() => {
              background(21);
              textFont(txtPxl);
              fill(100);
              textSize(20);
              textAlign(LEFT, TOP)
              text('>console.log(\'hello world\')', 10, 10)
              fill(255);
              text('>consol', 10, 10)
              waitForKey('e').then(() => {
                background(21);
                textFont(txtPxl);
                fill(100);
                textSize(20);
                textAlign(LEFT, TOP)
                text('>console.log(\'hello world\')', 10, 10)
                fill(255);
                text('>console', 10, 10)
                waitForKey('.').then(() => {
                  background(21);
                  textFont(txtPxl);
                  fill(100);
                  textSize(20);
                  textAlign(LEFT, TOP)
                  text('>console.log(\'hello world\')', 10, 10)
                  fill(255);
                  text('>console.', 10, 10)
                  waitForKey('l').then(() => {
                    background(21);
                    textFont(txtPxl);
                    fill(100);
                    textSize(20);
                    textAlign(LEFT, TOP)
                    text('>console.log(\'hello world\')', 10, 10)
                    fill(255);
                    text('>console.l', 10, 10)
                    waitForKey('o').then(() => {
                      background(21);
                      textFont(txtPxl);
                      fill(100);
                      textSize(20);
                      textAlign(LEFT, TOP)
                      text('>console.log(\'hello world\')', 10, 10)
                      fill(255);
                      text('>console.lo', 10, 10)
                      waitForKey('g').then(() => {
                        background(21);
                        textFont(txtPxl);
                        fill(100);
                        textSize(20);
                        textAlign(LEFT, TOP)
                        text('>console.log(\'hello world\')', 10, 10)
                        fill(255);
                        text('>console.log', 10, 10)
                        waitForKey('(').then(() => {
                          background(21);
                          textFont(txtPxl);
                          fill(100);
                          textSize(20);
                          textAlign(LEFT, TOP)
                          text('>console.log(\'hello world\')', 10, 10)
                          fill(255);
                          text('>console.log(', 10, 10)
                          waitForKey('\'').then(() => {
                            background(21);
                            textFont(txtPxl);
                            fill(100);
                            textSize(20);
                            textAlign(LEFT, TOP)
                            text('>console.log(\'hello world\')', 10, 10)
                            fill(255);
                            text('>console.log(\'hello world', 10, 10)
                            waitForKey('\'').then(() => {
                              background(21);
                              textFont(txtPxl);
                              fill(100);
                              textSize(20);
                              textAlign(LEFT, TOP)
                              text('>console.log(\'hello world\')', 10, 10)
                              fill(255);
                              text('>console.log(\'hello world\'', 10, 10)
                              waitForKey(')').then(() => {
                                background(21);
                                textFont(txtPxl);
                                textSize(20);
                                textAlign(LEFT, TOP)
                                fill(255);
                                text('>console.log(\'hello world\')↵', 10, 10)
                                waitForKey('\n').then(() => {
                                  background(21);
                                  textFont(txtPxl);
                                  textSize(20);
                                  textAlign(LEFT, TOP)
                                  fill(255);
                                  text('>console.log(\'hello world\')\nhello world', 10, 10)
                                  wait(250).then(() => {
                                    game.setBgColor(225)
                                    game.defPers('prota')
                                    game.setMap([
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                      [ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18), ra(18)],
                                    ])
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
  //background(0, 255, 0);
  /*game.update([
    [00, 01, 02, 03, 04, 05, 06, 07, 08, 09],
    [ra(11), 11, 13, 14, 15, 18, 19, 20, 21, 22]
  ])*/
}
