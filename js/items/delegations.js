// delegation #1 (hidding article)

const container = document.querySelector('#delegation');

for (let article of container.querySelectorAll('article')) {
	let button = document.createElement('button');
		button.innerHTML = 'X';
		button.className = 'remove';
	article.append(button);
}

container.querySelector('#articles').addEventListener('click', function (event) {
	if (event.target.className != 'remove') return;

	event.target.parentElement.hidden = true;
});

// Ul elements

let data = {
  "Рыбы": {
    "форель": {},
    "лосось": {},
    "сьомга": {},
    "тунец": {},
    "кета": {}
  },

  "Деревья": {
    "Огромные": {
      "секвойя": {},
      "дуб": {}
    },
    "Цветковые": {
      "яблоня": {},
      "магнолия": {}
    }
  }
};

class Tree {
	constructor(container) {
		this.container = container;
	}

	create(obj, countAllow = true) {
	  	this.nesting(this.container, obj);

	  	if (countAllow)	this.counter( this.container.querySelector('ul') );
	}

	nesting(container, obj) {
		let ul = document.createElement('ul');
		container.append(ul);

		for (let [key, value] of Object.entries(obj) ) {
		    let li = document.createElement('li');
		    li.textContent = key; 
		    ul.append(li);

		    if (Object.keys(value).length != 0) this.nesting(li, value);
		}
	}

	counter(ul) {
		for (let key of ul.children) {
	    	if (key.lastElementChild )  this.counter(key.querySelector('ul'));
	  	}

	  	if (ul.previousSibling ) {
	   		let quantity = ul.querySelectorAll('li').length;
	  		ul.before(` (${quantity})`);
		}
	}


	handleEvent(event){

		switch (event.type) {
			case 'mouseover': 
				this.backlight(event, true);
				break;

			case 'mouseout': 
				this.backlight(event, false);
				break;

			case 'click': 
				this.hideLi(event);
				break;
		}
	}

	hideLi(event) {	
		for (let li of event.target.children) 
			li.hidden = !li.hidden;
	}

	backlight(event, cursorIsOnIt = true) {	
		for (let elem of this.container.querySelectorAll('li') ) 
			elem.style.fontWeight = '';

		if (!cursorIsOnIt) return;

		if (event.target.tagName == 'LI') event.target.style.fontWeight = 'bold';

		for (let elem of event.target.children ) 
			elem.style.fontWeight = 'normal';
	}

}

const nested = container.querySelector('#nestedList');

let tree = new Tree( nested );
	tree.create(data);

nested.addEventListener('mouseover', tree);
nested.addEventListener('mouseout', tree);
nested.addEventListener('click', tree);


// button prompt

const promptBlock = container.querySelector('#prompt');

promptBlock.addEventListener('mouseover', function(event) {
	if (event.target.tagName != 'BUTTON' ) return;

	let $span = document.createElement('span');
	this.append($span);

	$span.innerHTML = event.target.dataset.tooltip;

	let coor = calCoor(container, event, $span);

	$span.style.left = coor[0] +'px';
	$span.style.top = coor[1] + 'px';

	$span.style.minWidth = event.target.clientWidth + 'px'; 
});

function calCoor(container, event, elem) {
	let containerCoor = container.getBoundingClientRect(), 
		coor = event.target.getBoundingClientRect();

	let left = coor.left, 
		top = coor.top,
		marg = 5;

	if (top < containerCoor.top + elem.clientHeight) {
		top += coor.height + marg;
		return [left, top];
	}

	top -= elem.clientHeight + marg;
	
	return [left, top];
}

promptBlock.addEventListener('mouseout', function(event) {
	for (let elem of this.querySelectorAll('span'))
		elem.remove();
});