function createDiv (container, id = '_child') {
	let $div = document.createElement('div');
	container.append($div);

	(id == '_child') ? $div.id = container.id + id + container.children.length 	: 	$div.id = id ; 

	return $div;
}

class Button {
	constructor(container) {
		this.container = container;
	}

	create(html) {
		this.$button = document.createElement('button');
		this.container.append(this.$button);

		this.$button.innerHTML = html;
	}

	delete() {
		this.$button.remove();
	} 
}

class ButtonEvents extends Button {
	setSpan(text) {
		this.$span = document.createElement('span');
		this.$span.textContent = text;
		this.$button.after(this.$span);
	}

	deleteSpan() {
		this.$span.remove();
	}

	removeSpanByClick() {
		this.$button.onclick = () => this.deleteSpan();
	}

	hideButtonByClick () {
		this.$button.onclick = () => { 
			this.$button.hidden = true;
			this.setSpan('Hidden :)');
		}
	}

	dropDownByClick (html) {
		let show = true;

		return () => {

			this.$button.onclick = () => {
			
				(show) ? this.setSpan(html) : this.deleteSpan();

				return show = !show;
			}
		}
	}

}

let events = createDiv(document.querySelector('#eventsIntroduce'), 'events');

let buttons = [];

buttons[0] = new ButtonEvents( createDiv(events) );
buttons[0].create('Delete text');
buttons[0].setSpan('SomeText');
buttons[0].removeSpanByClick();

buttons[1] = new ButtonEvents( createDiv(events) );
buttons[1].create('Hide this button');
buttons[1].hideButtonByClick();

buttons[2]= new ButtonEvents( createDiv(events) )
buttons[2].create('DropDown');
let button3Dropping = buttons[2].dropDownByClick('Any dropped text');
	button3Dropping();

// football

class Football {
	constructor(element) {
		this.element = element;
		this.container = this.element.parentElement; 
	}

	handleEvent(event) {
		this.getCoordinatesByEvent(event);
		this.setElementCoordinates();
	}

	getCoordinatesByEvent(event) {
		let coor = this.container.getBoundingClientRect();

		this.left = event.clientX - coor.left - this.element.clientWidth/2;
		this.top = event.clientY - coor.top - this.element.clientHeight/2;

	}

	setElementCoordinates() {
		this.element.style.left = this.getLeft() + 'px';
		this.element.style.top = this.getTop() + 'px';
	}

	getLeft() {
		if (this.left < 0) return this.element.style.left = 0; 
		if (this.left > this.container.clientWidth - this.element.clientWidth) 
			return this.element.style.left = this.container.clientWidth - this.element.clientWidth;

		return this.element.style.left = this.left;
	}

	getTop() {
		if (this.top < 0) return this.element.style.top = 0; 
		if (this.top > this.container.clientHeight - this.element.clientHeight) 
			return this.element.style.top = this.container.clientHeight - this.element.clientHeight;
		 
		return this.element.style.top = this.top;
	}
}

// field = document.querySelector('#field')  

let football = new Football(document.querySelector('#ball') );

field.addEventListener('click', football);




class Carousel {
	constructor(container) {
		this.container = container;
		return this;
	}

	create(URLs) {
		this.putIMGs(URLs);
		this.createButtons();
		return this;
	}

	putIMGs (URLs) {
		this.$imgContainer = createDiv(this.container, 'galery'); // <<< used global fn

		for (let url of URLs) {
			let img = document.createElement('img');
			img.src = url;
			this.$imgContainer.append(img);
		}
	}

	createButtons() {
		const $div = createDiv(this.container, 'buttons');

		let $left = document.createElement('button'),
			$right = document.createElement('button');

		$left.className = "fas fa-angle-double-left";
		$left.onclick = () => this.moveLeft();

		$right.className = "fas fa-angle-double-right";
		$right.onclick = () => this.moveRight();

		this.currentPosition = 0;

		$div.append($left, $right);
	}
 	
 	moveRight() {
		let imgWidth = this.$imgContainer.firstElementChild.clientWidth,
			galeryWidth = imgWidth*this.$imgContainer.children.length,
			margin = this.container.clientWidth - galeryWidth;

		this.currentPosition -= imgWidth;

		if (this.currentPosition < margin) {
			this.$imgContainer.style.marginLeft = `${margin}px`;
			return this.currentPosition = margin;
		}

		this.$imgContainer.style.marginLeft = `${this.currentPosition}px`;
	}

	moveLeft() {
		let imgWidth = this.$imgContainer.firstElementChild.clientWidth;

		this.currentPosition += imgWidth;

		if (this.currentPosition > 0) { 
			this.$imgContainer.style.marginLeft = 0;
			return this.currentPosition = 0;
		}

		this.$imgContainer.style.marginLeft = `${this.currentPosition}px`;
	}


} 

function setImgURLs(url, qty, exp = '.png') {
	let URLs = [];

	for (let i = 1; i <= qty; i++) {
		URLs.push(url + i + exp);
	}

	return URLs;
}

new Carousel(document.querySelector('#carousel')).create( setImgURLs('https://ru.js.cx/carousel/', '10') );
