
var Background = (function() {
    // placeholder for cached DOM elements
    let DOM = {};
  
    /* =================== private methods ================= */

    function renderBackground() {
      const url = 'https://source.unsplash.com/random';
      getImage(url);
    }

    function getImage(url) {
      let redirectedLink = "";
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(e) {
      xhr.addEventListener("error", () => {console.log(e.getAllResponseHeaders)})
        if (xhr.status == 200 && xhr.readyState == 4) {
          redirectedLink = xhr.responseURL;
          appendBackground(redirectedLink)
          
        }
      }
      xhr.open("GET", url, true);
      xhr.send();
    }


    function appendBackground(url) {    
        let backgroundImage = new Image();
        backgroundImage.onload = function () { 
          if (DOM.loadingGif != null) {DOM.loadingGif.remove()};          
            // DOM.body 
            // .background = "url('" + backgroundImage.src + "') no-repeat center center";
            // DOM.body.backgroundAttachment = "fixed";
            // DOM.body.backgroundSize = "cover";
            $.backstretch(backgroundImage.src);

         }
         
        backgroundImage.src = url;
    }

    function changeBackground() {
      renderBackground();
    }

    // cache DOM elements
    function cacheDom() {
      DOM.body = document.getElementsByTagName("body")['0'].style;
      DOM.main = document.getElementById('main');
      DOM.loadingGif = document.getElementById("loading-gif");
    }

    // // bind events
    // function bindEvents() {
    // }

    // // handle click events
    // function handleClick(e) { 
    // }

    // render DOM
    function render() { 
        renderBackground('https://source.unsplash.com/random#');
    }
  
    /* =================== public methods ================== */
    // main init method
    function init() {
      cacheDom();
      render();     
    }
  
    /* =============== export public methods =============== */
    return {
      init: init, changeBackground: changeBackground
    };
  }());