# Exo Trivia Maintenance Applicative
> 8th April 2021
---

## Groupe : Jules PEGUET, Cédric MENANTEAU, Clément BARANGER, Anaïs TATIBOUET

## Trello

https://trello.com/b/HnN8cZsF/maintenance-evolutive

## Setup

```bash
# Install dependencies
yarn install
# Run game
node src/game.js
# Check fair category
NUMBER_TEST=500000 NODE_ENV=test node ./src/game.test_fair.js
# Check run out of deck
NUMBER_TEST=1000000 NODE_ENV=test node ./src/game_run_out_deck.test.js
```

---
> challenge from : https://github.com/jbrains/trivia/tree/master/nodejs
