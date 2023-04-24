// Hent score fra lokal lagring, eller opret en ny score, hvis den ikke findes
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Opdater lokal eller ny score på siden
updateScoreElement();

// Funktion til at spille spillet
function playGame(playerMove) {
  // Vælg computerens træk
  const computerMove = pickComputerMove();

  // Start resultatet som tom string
  let result = ''; 

  // Logik for at afgøre resultatet af spillet, baseret på spillerens træk og computerens træk
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'You Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'You Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  // Opdater scoren baseret på resultatet af spillet
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'You Tie.') {
    score.ties += 1;
  }

  // Gem scoren i lokal lagring
  localStorage.setItem('score', JSON.stringify(score));

  // Opdater den faktiske score på siden
  updateScoreElement();

  // Vis resultatet af spillet på siden
  document.querySelector('.js-result').innerHTML = result;

  // Viser emojis ud fra x træk i spillet
  document.querySelector('.js-moves').innerHTML = `You 
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
}
// Funktion til at opdatere scoren på siden
function updateScoreElement() {
  // Finder HTML-elementet, hvor scoren skal opdateres, og opdater det med den nye score
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Funktion til at vælge computerens træk
function pickComputerMove() {
  // Generer et tilfældigt tal mellem 0 og 1
  const randomNumber = Math.random();

  let computerMove = '';

  // Vælg computerens træk baseret på det tilfældige tal
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  // Returner computerens valgte træk
  return computerMove;
};