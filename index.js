// const quoteApiUrl = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
const quoteSection = document.getElementById('quote');
const userInput = document.getElementById('quote-input');
import './style.css';

let quote = '';
let time = 60;
let timer = '';
let mistakes = 0;

userInput.addEventListener('input', () => {
  let quoteChars = document.querySelectorAll('.quote-chars');

  quoteChars = Array.from(quoteChars);

  let userInputChars = userInput.value.split('');

  quoteChars.forEach((char, index) => {
    //Check if the quote character is equal to the input character
    if (char.innerText === userInputChars[index]) {
      char.classList.add('success');
      //If user hasn't entered anything or backspaced
    } else if (userInputChars[index] === undefined) {
      if (char.classList.contains('success')) {
        char.classList.remove('success');
      } else {
        char.classList.remove('fail');
      }
      //If user enters wrong character
    } else {
      //Checks if we already have added fail class
      if (!char.classList.contains('fail')) {
        //increment and display mistakes
        mistakes++;
        char.classList.add('fail');
        console.log('MISTAKES-->', mistakes);
        document.getElementById('mistakes').innerText = mistakes;
      }
    }
    //Return true if all the characters are entered correctly
    let check = quoteChars.every(element => {
      return element.classList.contains('success');
    });
    //End test if all the characters are entered correctly
    if (check) {
      displayResult();
    }
  });
});

//End Test
const displayResult = () => {
  //display result div
  document.querySelector('.result').style.display = 'block';
  clearInterval(timer);
  document.getElementById('stop-test').style.display = 'none';
  userInput.disabled = true;
  let timeTaken = 1;
  if (time !== 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById('accuracy').innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + ' %';
  document.getElementById('wpm').innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + ' wpm';

  let startOver = (document.getElementById('reset').style.display = 'block');
  document.getElementById('reset').addEventListener('click', reset);
};

const renderNewQuote = () => {
  let headers = new Headers();

  headers.append('Origin', 'origin');
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  console.log(process.env.KEY);
  headers.append('x-api-key', process.env.KEY);

  let options = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
    'x-api-key': process.env.KEY,
    // {
    //   'x-api-key': process.env.KEY,
    // }
  };

  let url = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      let res = data;
      quote = res[0].quote;

      //array of characters
      let arr = quote.split('').map(value => {
        return "<span class='quote-chars'>" + value + '</span>';
      });

      //join array for displaying
      quoteSection.innerHTML += arr.join('');
    })
    .catch(err => {
      console.log(`err ${err}`);
    });
};

//Update Timer on screen
function updateTimer() {
  if (time === 0) {
    //End test if timer reaches 0
    displayResult();
  } else {
    document.getElementById('timer').innerText = --time + 's';
  }
}

//Sets Timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

const reset = () => {
  location.reload();
};

const startTest = () => {
  mistakes = 0;
  timer = '';
  userInput.disabled = false;
  timeReduce();
  document.getElementById('start-test').style.display = 'none';
  document.getElementById('stop-test').style.display = 'block';
};

window.onload = () => {
  userInput.value = '';
  document.getElementById('start-test').style.display = 'block';
  document.getElementById('stop-test').style.display = 'none';
  document.getElementById('reset').style.display = 'none';
  userInput.disabled = true;
  renderNewQuote();
};

let start = document.getElementById('start-test');
start.addEventListener('click', startTest);

let result = document.getElementById('stop-test');
result.addEventListener('click', displayResult);

window.addEventListener('load', function () {
  document.querySelector('.popup').style.display = 'block';
});

document.querySelector('#close').addEventListener('click', function () {
  document.querySelector('.popup').style.display = 'none';
});
