// NUMBER_TEST=1000000 NODE_ENV=test node ./src/game.test_fair.js
const util = require('util')
const {Game,rl} = require('./game')

var game = new Game();
players = ['Jules','Cedric','Clement']

game.setModulableCategorie('Techno')

players.forEach(e=>game.add(e))


let tmp_consolelog = console.log
let output = []
console.log = e => output.push(e)

for(i=0;i<parseInt(process.env.NUMBER_TEST);i++){
  game.roll(Math.floor(Math.random() * 6) + 1)
  game.jokerAnswer()
}

rl.close()

console.log = tmp_consolelog
output=output.join`\n`

console.log('-----------')
console.log('-----------')
console.log(players)
console.log(
  players.map(e=>{
    let regex = `${e}.*\nThe category is (.*)\n`
    let re = new RegExp(regex, "g");
    return {player:e,search:[...output.matchAll(re)]}
  }).map(e=>e.search.reduce((r,v)=>v!=''?r.set(v[1],r.get(v[1])?r.get(v[1])+1:1):undefined,new Map()))
)