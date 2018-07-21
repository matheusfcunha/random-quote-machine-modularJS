{/* <div id="quote-div" class="center">
            <div id="quote-box">
                <h1 id="quote-text">Together we can change the world, just one random act of kindness at a time.</h1>         
            </div>
            <img id="shuffle-icon" src="img/shuffle.png">
        </div>        */}

var Quote = (function() {
    // placeholder for cached DOM elements
    let DOM = {};
  
    /* =================== private methods ================= */
    // cache DOM elements

    

    function cacheDom(property, value) {
      DOM.quoteDiv = document.getElementById("quote-div");
      if (property != null) {
        DOM[property] = value;
      }
    }

    function getQuote() {
   
      var api = {
        endpoint: 'https://quotesondesign.com/wp-json/posts',
        params: {
          'filter[orderby]'       : 'rand',
          'filter[posts_per_page]': 10,
          'cachingHack'           : (new Date()).getTime()
        }
      };
      
      $.getJSON(api.endpoint, api.params)
      .then(formatQuote)
      .catch(handleError);

      // handle errors
      function handleError(err) {
      console.log(err);
        
      }
    }

    function formatQuote(response) {

      response = response.filter( (x) => x.content.length < 89 )
      console.log(response)
      let quoteText = response[0].content;
      quoteText.length > 89 ? getQuote() : renderQuoteText(quoteText);
    }

    function renderQuoteText(text) {
      if (document.getElementById("quote-box") === null) {renderQuoteBox()}
      $("#quote-text").fadeIn(1200, () => {
        DOM.shuffleIcon.src = "img/shuffle.png"
        DOM.shuffleIcon.style.pointerEvents = "all";
      });
       document.getElementById("quote-text").innerHTML = text;
       
    }

    // bind events
    function bindEvents() {
      let shuffleIcon = document.getElementById("shuffle-icon");
      shuffleIcon.addEventListener("click", () => {handleClick(shuffleIcon)})
      
      
    }
    

    //  handle click events
    function handleClick(e) { 
      let shuffleIcon = DOM.shuffleIcon;
      setTimeout(function(){ 
        Background.changeBackground();
        changeQuote();
      }, 1500);
        shuffleIcon.src = "img/loading2.gif"
        shuffleIcon.style.pointerEvents = "none";
        $("#quote-text").fadeOut(2000);
       
    }

    // render DOM
    function render() { 
      getQuote();
     
    }

    function renderQuoteBox() {


      let quoteBox = document.createElement('div');
      quoteBox.setAttribute("id", "quote-box");
      let textElement = document.createElement("h1");
      let quoteText = document.createTextNode("");
      textElement.appendChild(quoteText);
      textElement.setAttribute("id", "quote-text");
      quoteBox.appendChild(textElement);
      let shuffleIcon = document.createElement("IMG");
      shuffleIcon.src = "img/shuffle.png";
      shuffleIcon.setAttribute("id", "shuffle-icon");


      DOM
        .quoteDiv.appendChild(quoteBox);
      DOM
        .quoteDiv.appendChild(shuffleIcon);

      cacheDom("shuffleIcon", document.getElementById("shuffle-icon"));  
      bindEvents();
    }

    function changeQuote() {
      getQuote();
    }
  
    /* =================== public methods ================== */
    // main init method
    function init() {
      cacheDom();
      render();
    
    }
  
    /* =============== export public methods =============== */
    return {
      init: init, render: render
    };
  }());