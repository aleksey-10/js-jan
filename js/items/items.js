// learning

// create timer

class Timer {
  constructor(date) {
    this.date = date;
  }

  getTime() {    
    return this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
  }
}


class TimerWithButtons {
  constructor(container){
    this.container = container;
    this.connectAll();
  }

  connectAll() {
    return this.container.append(this.createTimerElement(), this.createButtonStart(), this.createButtonStop() );
  }

  createTimerElement() {
    let timer = document.createElement('div');
    timer.textContent = new Timer(new Date()).getTime();
    return timer;
  }
 
  createButtonStart() {
    let button = document.createElement('button');
    button.textContent = 'Start';

    button.onclick = () => {
      if (this.timerIs) return;

      this.startTimer(); 
    };

    return button;
  }
  
  createButtonStop() {
    let button = document.createElement('button');
    button.textContent = 'Stop';
    
    button.onclick = () => {
      if (!this.timerIs) return;
      
      this.timerIs = false;
      clearInterval(this.timerId); 
    }; 

    return button;
  }

  startTimer() {
    if ( !this.container.firstElementChild) this.connectAll();

    this.timerIs = true;

    let replaceTimer = () => {
      let timer = this.container.firstElementChild;
      timer.replaceWith(this.createTimerElement());
    }

    this.timerId = setInterval(replaceTimer, 1000);
  }

}

new TimerWithButtons( document.querySelector('.theTimer') ).startTimer();



// Styles and Classes

function showNotification(container, options) {
  container.classList.add('hiddingByTaskStyles');

  let $div = document.createElement('div');
  $div.textContent = 'Hello';
  $div.className = 'notification';

  let str = '';

  for (let key in options) {
    (typeof options[key] == 'number') ? str += `${key}: ${options[key]}px;` :  str += `${key}: ${options[key]};`; 
  }

  $div.style.cssText = str;

  container.append($div);

  let text = $div.textContent;
      
  let timer = function loop () {
    setTimeout(() => { 
      $div.hidden = true; 
      container.classList.remove('hiddingByTaskStyles');

      setTimeout(() => { loop(); $div.hidden = false; container.classList.add('hiddingByTaskStyles'); }, 500);
    }, 500);

  } ();

}

let notificationCss = {
  html: 'Hello World!',
  top: 40,
  padding: 0,
  left: 0,
  right: 0
} 

showNotification(document.querySelector('#stylesAndClasses'), notificationCss );


// scroll learning

function getScrollBarWitdh(container) {
  let setOverflow = value =>  container.style.overflow = value;

  setOverflow('hidden');
  let containerWitdh = container.clientWidth;

  setOverflow('scroll');
  let containerWitdhWithoutScrollBar = container.clientWidth;

  setOverflow('');

  container.insertAdjacentHTML('afterbegin', `<span>Scrollbar width is ${containerWitdh - containerWitdhWithoutScrollBar}px</span>`); 
} 

function getScrollBottom(container) {
  const scrollBottom = document.documentElement.scrollHeight - ( window.pageYOffset + document.documentElement.clientHeight),
        $span = document.createElement('span');
  
  $span.id = 'scrollBottomId';
  $span.textContent = `To bottom ${scrollBottom}px`;

  return (!container.querySelector('#scrollBottomId')) ? container.append($span) : container.querySelector('#scrollBottomId').replaceWith($span);
};

// scrollBarWidth = document.querySelector('#scrollBarWidth');

getScrollBarWitdh( scrollBarWidth );
getScrollBottom( scrollBarWidth );

window.addEventListener( 'scroll', 
  () => getScrollBottom( scrollBarWidth ) 
);
