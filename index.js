const quoteApiUrl = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
const quoteSection = document.getElementById('quote');
const userInput = document.getElementById('quote-input');

let quote = '';
let time = 60;
let timer = '';
let mistakes = 0;

const renderNewQuote = () => {
  //fetch quote from url
  let options = {
    method: 'GET',
    headers: { 'x-api-key': KEY },
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

window.onload = () => {
  userInput.value = '';
  document.getElementById('start-test').style.display = 'block';
  document.getElementById('stop-test').style.display = 'block';
  userInput.disabled = true;
  renderNewQuote();
};
