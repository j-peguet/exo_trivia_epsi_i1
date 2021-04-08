// NUMBER_TEST=100 NODE_ENV=test node ./src/game_run_out_deck.test.js
const util = require('util')
const {Game,rl} = require('./game')

var game = new Game();
players = ['Jules','Cedric','Clement','Anais']


let tmp_consolelog = console.log
let output = []
console.log = e => output.push(e)


game.setModulableCategorie('Techno')
game.createQuestion()

players.forEach(e=>game.add(e))


for(i=0;i<parseInt(process.env.NUMBER_TEST);i++){
  game.roll(Math.floor(Math.random() * 6) + 1)
  game.jokerAnswer()
}

rl.close()


console.log = tmp_consolelog
output=output.join`\n`

console.log('--- Recherche de tour sans question ---')

let regex = `The category is .*\n(.*)`
let re = new RegExp(regex, "g");


res=[...output.matchAll(re)].reduce((r,e,i)=>{
  if(e[1]=='')
    r.push(`Aucune question trouvé pour le tour ${i}`)
  return r
},[])

if(res.length==0)
  console.log('Tous les tours de jeu on eu une question')
else
  console.log(res.join`\n`)

