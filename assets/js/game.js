
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP to choose.");
    
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = playerInfo.money - 10
            return true;
        }
    }
    return false;
}

var fight = function(enemy) {
    
    var isPlayerTurn = true;

    if (Math.random() < 0.5) {
        isPlayerTurn = false;
    }
    // Alert players that they are starting the round
    // Subtract the value of 'playerInfo.attack ' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {

            if (fightOrSkip()) {

                break;
            }
   
            var damage = randomNumber(playerInfo.attack -3, playerInfo.attack );
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked" + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //Check enemy's health

            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.")
            }
        }
        else {
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked" + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
            }
        }
    isPlayerTurn = !isPlayerTurn;
    }
};


var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i=0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i+1) + " BEGIN!");
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40,60);
        fight(pickedEnemyObj);
        // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
    
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                } 
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
        }
    }
    // play again
    endGame();
};

var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var highScore = localStorage.getItem('highScore')
   
    if (highScore === null) {
        highScore = 0;
    }

    if (playerInfo.money > highScore){
        localStorage.setItem('highScore', playerInfo.money);
        localStorage.setItem('playerName', playerInfo.name);
        window.alert("Congratulations! The new high score is " + playerInfo.money + " !");
    }

    else {
       window.alert("Sorry you did not break the high score of " + highScore + ".");
    }
    
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        // restart game
        startGame()
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come Back Soon")
    }
}

var shop = function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
    )
    shopOptionPrompt = parseInt(shopOptionPrompt)
    switch (shopOptionPrompt) {
        case 1: 
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.")
            break;

        default:
            window.alert ("You did not pick a valid option. Try again.")
            
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor((Math.random() * (max-min+1)) + min);

    return value;
}

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name);
    return name;
}
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >=7) {
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

var enemyInfo = [
    {
    name: "Roborto",
    attack: randomNumber(10, 14)
 },
 { 
    name: "Amy Android",
  attack: randomNumber(10, 14)
 },
 {name: "Robo Trumble",
attack: randomNumber(10, 14)
}
];



startGame();



// Game States 
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less