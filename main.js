// initialize game object
const game = {
  score: 0,
  upgrades: [],
  powers: [],
  clickPower: 1,
  passivePower: 0,
  comboPower: 1,
  totalClicks: 0,  //use to score at end
  startGameTime: Date.now() / 1000  //use to score at end, seconds
}
const clickUpgrade = {
  name: 'click-upgrade',
  cost: [10, 100, 1000, 15000, 500000, 5500000, 100000000, 75000000000],
  power: [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000],
  maxed: false,
}
// somehow set timer for this
const passiveUpgrade = {
  name: 'passive-upgrade',
  cost: [1000, 100000, 300000, 25000000, 50000000, 1000000000, 100000000000, 10000000000000, 10000000000000000, 1000000000000000000, 100000000000000000000, 10000000000000000000000, 1000000000000000000000000, 100000000000000000000000000],
  power: [.01, .015, .02, .025, .03, .04, .05, .6, .08, .1, .12, .15, .18, .21],
  maxed: false,
}

const comboUpgrade = {
  name: 'combo-upgrade',
  cost: [100, 3000, 100000, 2500000, 7000000, 800000000, 14000000000, 2100000000000],
  power: [1.2, 1.4, 1.6, 1.8, 2.0, 3.0, 5.0, 10.0],
  maxed: false,
}


// get DOM variables
const codeBtn = document.getElementById('coding-btn');
const scoreText = document.getElementById('score-text');
const clickUpgradeBtn = document.getElementById('click-upgrade');
const clickUpgradeCost = document.getElementById('upgrade-cost');
const upgradeStats = document.getElementById('upgrade-stats');
// other upgrades
const passiveUpgradeBtn = document.getElementById('passive-upgrade');
const passiveUpgradeCost = document.getElementById('passive-cost');
const comboUpgradeBtn = document.getElementById('combo-upgrade');
const comboUpgradeCost = document.getElementById('combo-cost');
// powers
const clickPower = document.getElementById('click-power');
const passivePower = document.getElementById('passive-power');
const comboPower = document.getElementById('combo-power');

// ATTACH EVENT
// code button click listener
codeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  game.score += game.clickPower * game.comboPower; // add timing thing later
  scoreText.textContent = game.score.toFixed();
  game.totalClicks++;
});
/*window.addEventListener('keydown', (e) => {
  e.preventDefault();
  if (e.keyCode === 32) {
    game.score += game.clickPower * game.comboPower; // add timing thing later
    scoreText.textContent = Math.round(game.score);
    game.totalClicks++;
  }
});*/

// upgrade button click listeners
clickUpgradeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkIfUpgradable(clickUpgrade);
});
passiveUpgradeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkIfUpgradable(passiveUpgrade);
});
comboUpgradeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkIfUpgradable(comboUpgrade);
});
// keyboard listeners
window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 65:
      checkIfUpgradable(clickUpgrade);
      break;
    case 83:
      checkIfUpgradable(passiveUpgrade);
      break;
    case 68:
      checkIfUpgradable(comboUpgrade);
      break;
    default:
      break;
  }
})

function checkIfUpgradable(upgrade) {
  if (upgrade.cost[0] <= game.score) {
    game.score -= upgrade.cost[0];
    upgrade.cost.splice(0, 1);
    updateUIAfterUpgrade();
    //checkMaxUpgrade() function body is in the switch statement:
    switch (upgrade.name) {
      case 'click-upgrade':
        clickUpgradeCost.textContent = clickUpgrade.cost[0];
        game.clickPower += upgrade.power[0];
        clickPower.textContent = game.clickPower.toFixed();
        if (!upgrade.cost[0]) {
          clickUpgradeBtn.classList.add('max-upgrade');
          clickUpgrade.maxed = true;
          checkGameEnded();
        }
        break;
      case 'passive-upgrade':
        if (passiveUpgrade.power.length === 14) //first time upgrading
          startTimer();
        passiveUpgradeCost.textContent = passiveUpgrade.cost[0];
        passivePower.textContent = game.passivePower = upgrade.power[0];
        if (!upgrade.cost[0]) {
          passiveUpgradeBtn.classList.add('max-upgrade');
          passiveUpgrade.maxed = true;
          checkGameEnded();
        }
        break;
      case 'combo-upgrade':
        comboUpgradeCost.textContent = comboUpgrade.cost[0];
        game.comboPower += upgrade.power[0];
        comboPower.textContent = game.comboPower.toFixed();
        if (!upgrade.cost[0]) {
          comboUpgradeBtn.classList.add('max-upgrade');
          comboUpgrade.maxed = true;
          checkGameEnded();
        }
        break;
    }
    upgrade.power.splice(0, 1);
    game.upgrades.push(upgrade.name);
  }
}

function updateUIAfterUpgrade() {
  scoreText.textContent = game.score.toFixed();
  upgradeStats.textContent = game.upgrades[0] ? (game.upgrades.join(', ')) : 'none';
}
upgradeStats.textContent = game.upgrades[0] ? (game.upgrades.join(', ')) : 'none';

function checkGameEnded() {
  if (clickUpgrade.maxed && passiveUpgrade.maxed && comboUpgrade.maxed) {
    // game has ended. 1) disable code button 2) log results
    codeBtn.removeEventListener('click', () => {
      alert('Game Completed!!');
    });
    // calculate total game time
    const totalGameTime = Math.floor((Date.now() / 1000) - game.startGameTime);
    // game stats
    document.getElementById('total-clicks').textContent = game.totalClicks;
    document.getElementById('total-time').textContent = totalGameTime;
    document.getElementById('results').style.display = 'block';

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', () => {
      // reset game
      console.log('you want to reset the game');
    })
    // local storage stuff
    /*for (score in gameScores) {
      if (game.totalClicks > score.totalClicks) {
        // update click high score

      }
      if (game.totalGameTime > score.totalGameTime) {
        // update time high score

      }
    }
    gameScores.push({
      clicks: totalClicks,
      time: totalGameTime
    });*/
  }
}

// LOCAL STORAGE
/*let gameScores = [];
let highScore = [];
localStorage.setItem('codingIdler', JSON.stringify(gameScores));
const data = JSON.parse(localStorage.getItem('codingIdler'));*/

function startTimer() {
  setInterval(() => {
    // will make all powers slowly rise
    game.clickPower += game.clickPower.toFixed() * game.passivePower;
    game.comboPower += game.comboPower.toFixed() * game.passivePower;
    //game.passivePower += game.passivePower * game.passivePower / 2;
    clickPower.textContent = game.clickPower.toFixed();
    comboPower.textContent = game.comboPower.toFixed();
    //passivePower.textContent = Math.round(game.passivePower);
  }, 1000);
}