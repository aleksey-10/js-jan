// header opacity setting

document.querySelector('.items').style.marginTop = document.querySelector('header').clientHeight + 'px';

function setOpacity(container) {
	let opacityIs = false;

	return (value) => {
		if (value) {
			for (let item of container.children)	item.style.opacity = 0.75;
			return opacityIs = value;
		}

		for (let item of container.children)		item.style.opacity = 1;
		return opacityIs = value;
	}
}

let opacitySettingHeader = setOpacity(document.querySelector('header'));

opacitySettingHeader(true);

document.querySelector('header').onclick = () => { opacitySettingHeader(false) };

document.querySelector('main').onclick = () => { opacitySettingHeader(true) };

addEventListener('scroll', () => { opacitySettingHeader(true) } );


// header form filter

let $filter = document.querySelector('.filter');

class Option {
	constructor(containerWhere, containerFrom) {
		this.containerWhere = containerWhere;
		this.containerFrom = containerFrom;
	}

	create() {
		for (let key of this.containerFrom.children) {
			let option = document.createElement('option');
			option.textContent = key.title;
			option.value = key.id;
			this.containerWhere.append(option);
		}
	}
}

new Option($filter.querySelector('select'), document.querySelector('.items')).create();

function filterItems() {
	for (let item of document.querySelector('.items').children ) item.hidden = false;

	let notSelectedItemsIDs = [];

	for (let key of $filter.querySelector('select').children ) {
		if (key.selected) continue; 
		notSelectedItemsIDs.push(key.value);
	}

	notSelectedItemsIDs.forEach( (itemId) => document.querySelector(`#${itemId}`).hidden = true );
}

$filter.onsubmit = () => { filterItems(); return false };


