const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// loading
function loading (){
loader.hidden = false;
quoteContainer.hidden = true;
}


function complete(){
if(!loader.hidden)
quoteContainer.hidden = false;
loader.hidden = true;

}


// get quote from api

async function getQuote(){

    loading();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
try{

    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    console.log(data);
    // for blank author put unknown
    if(data.quoteAuthor === ''){
        authorText.innerText = "Unknown";
    }
    else{
        authorText.innerText = data.quoteAuthor;}

  if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
  quoteText.innerText = data.quoteText;
   
  complete();

}catch (error)
{  
    getQuote();
    
   
}

}

function tweetQuote(){

const quote = quoteText.innerText;
const author = authorText.innerText;
const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
 
window.open(twitterUrl, '_blank');

}

// evenlistener 
newQuoteBtn.addEventListener('click' , getQuote);
twitterBtn.addEventListener('click', tweetQuote)

// on load 

getQuote();
