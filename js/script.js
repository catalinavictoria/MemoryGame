//variables

// we need to create a counter to store the guesses and
// let the user make only two selections at a time
let count = 0
//these variables stores the first and the second guesses
let firstGuess = ''
let secondGuess = ''
//variable to not being able to select the same element twice
let previousTarget = null
//variable for delaying the user's selection
let delay = 1200

//array of card objects
const cardsArray = [
  {
    name: 'ampharos',
    img: 'img/250px-ampharos.png',
  },
  {
    name: 'bulbasaur',
    img: 'img/250px-bulbasaur.png',
  },
  {
    name: 'espeon',
    img: 'img/250px-espeon.png',
  },
  {
    name: 'gengar',
    img: 'img/250px-gengar.png',
  },
  {
    name: 'gulpin',
    img: 'img/250px-gulpin.png',
  },
  {
    name: 'hitmontop',
    img: 'img/250px-hitmontop.png',
  },
  {
    name: 'mimikyu',
    img: 'img/250px-mimikyu.png',
  },
  {
    name: 'oddish',
    img: 'img/250px-oddish.png',
  },
  {
    name: 'riolu',
    img: 'img/250px-riolu.png',
  },
  {
    name: 'rockruff',
    img: 'img/250px-rockruff.png',
  },
  {
    name: 'snorlax',
    img: 'img/250px-snorlax.png',
  },
  {
    name: 'wobbuffet',
    img: 'img/250px-wobbuffet.png'
  },
]

// duplicate array to create a match for each card
let gameGrid = cardsArray.concat(cardsArray)

//randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random())

//taking the div with an id of root
const game = document.getElementById('game')

//create a section with a grid class
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')

//append the grid section to the game div
game.appendChild(grid)

//loop for going trough each element of the cardsArray
gameGrid.forEach((item) => {
  // create a div
  const card = document.createElement('div')
  //apply a card class
  card.classList.add('card')
  card.dataset.name = item.name

  //create front of card
  const front = document.createElement('div')
  front.classList.add('front')

  //create back of card, which contains
  const back = document.createElement('div')
  back.classList.add('back')
  back.style.backgroundImage = `url(${item.img})`

  //append card to grid, and front and back to each card
  grid.appendChild(card)
  card.appendChild(front)
  card.appendChild(back)

  //set the data-name attribute of the div to the cardsArray name
  //card.dataset.name = item.name

  //apply the background image of the div to the cardsArray images
  //card.style.backgroundImage = `url(${item.img})`

  //append the div to the grid section
  //grid.appendChild(card)
});

//create a function for checking matching elements that will
//loop thorough all selected elements when callend and
//add them to the match class
const match = () => {
  var selected = document.querySelectorAll('.selected')
  selected.forEach((card) => {
    card.classList.add('match')
  });
};

//create a function to allow multiple guesses by
//resetting the guess count after two guesses whether they matched or not
//this function also removes the selected css
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected')
  selected.forEach((card) => {
    card.classList.remove('selected')
  });
};

// adding an event listener to the entire grid
// any time an element is clicked, the selected class will be applied to it

//add event listener to grid
grid.addEventListener('click', function (event) {
  //the event target is the clicked item
  let clicked = event.target

  //do not allow the grid section itself to be selected;
  if (clicked.nodeName === 'SECTION' || clicked == previousTarget ) {
    return
  }

  //set an if statement that counts to two, and only
  //adds selected to two cards.
  if (count < 2) {
    count++;
    if (count === 1) {
      //assign first guess to variable
      firstGuess = clicked.parentNode.dataset.name
      console.log(firstGuess)
      //add selected class
      clicked.parentNode.classList.add('selected')
    } else {
      //assign second guess to variable
      secondGuess = clicked.parentNode.dataset.name
      console.log(secondGuess)
      //add selected class
      clicked.parentNode.classList.add('selected')
    }
    //set if statement to check that both casses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      // check if the first guess and second guess match
      if (firstGuess === secondGuess) {
        //run the match function and set timeout
        setTimeout(match, delay)
        //call the resetGuesses function
        setTimeout(resetGuesses, delay)
      } else {
        setTimeout(resetGuesses, delay)
      }
    }
    //set previous target to clicked
    previousTarget = clicked;
  }
});
