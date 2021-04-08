const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const question = question_text => new Promise((resolve, reject) => rl.question(question_text, answer => resolve(answer)))
const chalk = require('chalk');

var Game = function () {
  var players = new Array();
  var places = new Array(6);
  var purses = new Array(6);
  var inPenaltyBox = new Array(6);
  var timePenaltyBox = new Array(6);
  var timeTurnPenaltyBox = new Array(6);
  var playersJokers = new Array(6);
  var winStreak = new Array(6);
  var scoreToWin = 6;
  var winners = new Array();

  var popQuestions = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions = new Array();
  var rockQuestions = new Array();
  var allCategories = new Array("Pop", "Science", "Sports");
  var modulableCategories = new Array("Rock", "Techno");
  var modulableCategorie = new String("")
  var nextCategorie = new String("");

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  this.resetGame = function () {
    players = new Array();
    places = new Array(6);
    purses = new Array(6);
    inPenaltyBox = new Array(6);
    timePenaltyBox = new Array(6);
    playersJokers = new Array(6);
    winStreak = new Array(6);
    winners = new Array();
    currentPlayer = 0;
    isGettingOutOfPenaltyBox = false;

    nextCategorie = new String("");
  }

  var didPlayerWin = function () {
    return !(purses[currentPlayer] >= scoreToWin)
  };

  var currentCategory = function () {
    if(nextCategorie !== "" ){
      let tempo = nextCategorie
      nextCategorie = "";
      return tempo;
    }
    if (places[currentPlayer] == 0)
      return 'Pop';
    if (places[currentPlayer] == 4)
      return 'Pop';
    if (places[currentPlayer] == 8)
      return 'Pop';
    if (places[currentPlayer] == 1)
      return 'Science';
    if (places[currentPlayer] == 5)
      return 'Science';
    if (places[currentPlayer] == 9)
      return 'Science';
    if (places[currentPlayer] == 2)
      return 'Sports';
    if (places[currentPlayer] == 6)
      return 'Sports';
    if (places[currentPlayer] == 10)
      return 'Sports';
    return modulableCategorie;
  };

  this.getmodulableCategories = function () {
    return modulableCategories;
  }
  
  this.getmodulableCategorie = function () {
    return modulableCategorie;
  }
  
  this.getAllCategories = function () {
    return allCategories;
  }

  this.setModulableCategorie = function (categorie) {
    console.log("------")
    console.log(categorie)
    modulableCategorie = new String(categorie);
    allCategories.push(modulableCategorie.toString());
  }
  
  this.setNextCategorie = function (categorie) {
    nextCategorie = new String(categorie);
  }
  
  this.setScoreToWin = function (score) {
    console.log("------")
    console.log("Score to WIN the game: ", score)
    scoreToWin = score;
  }

  this.createRockQuestion = function (categorie, index) {
    return categorie + " Question " + index;
  };


  this.createQuestion = function () {
    for (var i = 0; i < 50; i++) {
      popQuestions.push("Pop Question " + i);
      scienceQuestions.push("Science Question " + i);
      sportsQuestions.push("Sports Question " + i);
      rockQuestions.push(this.createRockQuestion(modulableCategorie, i));
    };
  }

  this.isPlayable = function (howManyPlayers) {
    if (this.howManyPlayers() <= 1 || this.howManyPlayers() >= 7) {
      return false
    }
    return true;
  };

  this.add = function (playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;
    playersJokers[this.howManyPlayers() - 1] = true;
    winStreak[this.howManyPlayers() - 1] = 0;
    timePenaltyBox[this.howManyPlayers() - 1] = 0;
    timeTurnPenaltyBox[this.howManyPlayers() - 1] = 0;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function () {
    return players.length;
  };


  var askQuestion = function () {
    if (currentCategory() == 'Pop')
      console.log(popQuestions[Math.floor(Math.random() * popQuestions.length)]);
      //console.log(popQuestions.shift());
    if (currentCategory() == 'Science')
      console.log(scienceQuestions[Math.floor(Math.random() * scienceQuestions.length)]);
    if (currentCategory() == 'Sports')
      console.log(sportsQuestions[Math.floor(Math.random() * sportsQuestions.length)]);
    if (currentCategory() == modulableCategorie)
      console.log(rockQuestions[Math.floor(Math.random() * rockQuestions.length)]);
  };

  this.roll = function (roll) {
    console.log(chalk.cyan(players[currentPlayer]) + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      let chance = ((1/timePenaltyBox[currentPlayer])*100) + ((timeTurnPenaltyBox[currentPlayer] * 0.1) * 100);
      let tirage = Math.floor(Math.random() * 100) + 1;
      console.log("Number of time in Prison: " + timePenaltyBox[currentPlayer]);
      console.log("Number of turn in same Prison: " + timeTurnPenaltyBox[currentPlayer]);
      console.log("Chance to escape: " + chalk.cyanBright(chance) + "%");
      console.log("Your escape roll: " + chalk.cyanBright(tirage));
      if (tirage <= chance) {
        isGettingOutOfPenaltyBox = true;
        inPenaltyBox[currentPlayer] = false;
        timeTurnPenaltyBox[currentPlayer] = 0;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {

      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.addScoreToPlayer = function () {
    console.log("Answer was correct!!!!");
    winStreak[currentPlayer] += 1;
    purses[currentPlayer] += winStreak[currentPlayer];
    console.log(players[currentPlayer] + " now has " +
    chalk.yellow(purses[currentPlayer]) + " Gold Coins.");

    console.log("Your current win streak: " + chalk.magentaBright(winStreak[currentPlayer]));


    if(!didPlayerWin()){
      console.log(chalk.yellow("New winner: " + players[currentPlayer]))
      winners.push(players[currentPlayer])
      this.removeCurrentPlayer()
    }

    if(!this.isPlayable()){
      let leaderboard = [...winners, ...players]
      console.log("Leaderboard")
      leaderboard.map((winner, index) => {
        console.log((index + 1) + " : " + winner)
      })
    }

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;

    return this.isPlayable();
  }

  this.wasCorrectlyAnswered = function () {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        return this.addScoreToPlayer();
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }
    } else {
      return this.addScoreToPlayer();
    }
  };

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered');
    console.log(players[currentPlayer] + " was sent to the penalty box");
    if(!inPenaltyBox[currentPlayer]){
      inPenaltyBox[currentPlayer] = true;
      timePenaltyBox[currentPlayer] += 1;
    } else {
      timeTurnPenaltyBox[currentPlayer] += 1;
    }
    winStreak[currentPlayer] = 0;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
    return true;
  };


  this.currentUserHaveJoker = function () {
    return playersJokers[currentPlayer]
  }

  this.jokerAnswer = function () {
    console.log(chalk.greenBright('Joker use'));
    playersJokers[currentPlayer] = false;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
  };

  this.removeCurrentPlayer = function () {
    players.splice(currentPlayer, 1)
    places.splice(currentPlayer, 1);
    purses.splice(currentPlayer, 1);
    inPenaltyBox.splice(currentPlayer, 1);
    playersJokers.splice(currentPlayer, 1);

    if (currentPlayer == players.length){
      currentPlayer = 0;
    }
  }

  this.abortPlayer = function () {
    console.log(chalk.red(players[currentPlayer] + " left the game"));
    
    this.removeCurrentPlayer()
  };
};

let init_player = ['Jules','Julian','Clement']

async function main() {

  var game = new Game();
  do {

  var notAWinner = true;

  console.log("-----")
  console.log(chalk.hex('#30c3bd')("New Game"))
  console.log("-----")

  init_player.forEach(e=>game.add(e))

  console.log('Number of players', game.howManyPlayers());

  if (game.isPlayable()) {
    if(game.getmodulableCategorie() == ""){
      let category
      do {
        category = await question(`Wich category do you want to play ? Rock or Techno : `)
      } while (!game.getmodulableCategories().includes(category))
      game.setModulableCategorie(category);
      game.createQuestion();

      let scoreToWin
      do {
        scoreToWin = await question(`Wich score the player need to win (minimun 6) : `)
      } while (scoreToWin < 6)

      game.setScoreToWin(scoreToWin)
    }
    
    do {

      if (game.isPlayable()) {
        console.log("-----")

        game.roll(Math.floor(Math.random() * 6) + 1);
        let abort_answer
      do {
        abort_answer = await question(`Do you want to quit the game ? ${chalk.underline("(YES or NO)")} :`)
      } while (!new Array("yes", "no").includes(abort_answer))

      if (abort_answer === "yes") {
        game.abortPlayer();
      }
      else {
        let joker_answer
        if (game.currentUserHaveJoker()) {

          do {
            joker_answer = await question(`Do you want to use a Joker ? ${chalk.underline("(YES or NO)")} :`)
          } while (!new Array("yes", "no").includes(joker_answer))
        }

        if (joker_answer === "yes") {
          game.jokerAnswer();
        } else {
          let answer
          do {
            answer = await question(`Your answer :`)
          } while (isNaN(answer))

          if (answer == 7) {
            notAWinner = game.wrongAnswer();
            console.log(game.getAllCategories());
            let nextCategorieAnswer
            do {
              nextCategorieAnswer = await question(`Choose the next category question : `)
            } while (!game.getAllCategories().includes(nextCategorieAnswer))

            game.setNextCategorie(nextCategorieAnswer);

          } else {
            notAWinner = game.wasCorrectlyAnswered();
          }
        }
      }
        
      } else {
        notAWinner = false;
        console.log("Not enought player to continue the game")
      }

    } while (notAWinner);
  } else {
    console.log(`Game is not playable, check the number of players`)
  }


  game.resetGame()
}
while(await question(`Replay with same configuration ${chalk.underline("(YES or NO)")} ? `) == "yes")

  rl.close()
}

if(process.env.NODE_ENV!='test'){
  main()
}

module.exports = {Game:Game,rl:rl};