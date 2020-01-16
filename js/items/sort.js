class TableSort {
	constructor(container) {
		this.container = container;
	}

	create() {
		if (!this.container.querySelector('thead')) {
			this.createHead().after( document.createElement('tbody') );
		}

		//item creating

		this.container.querySelector('tbody').append( this.getData() );
	}

	getData() {

		let firstName = this.container.querySelector('[name="firstName"]'),
			lastName = this.container.querySelector('[name="lastName"]'),
			age = this.container.querySelector('[name="age"]');
		
		let $item = document.createElement('tr');

		$item.insertAdjacentHTML('afterbegin', `<td>${firstName.value}</td><td>${lastName.value}</td><td>${age.value}</td>`);

		return $item;
	}

	createHead() {
		let thead = document.createElement('thead');
		this.container.querySelector('table').append(thead);

		let tr = document.createElement('tr');
		thead.append(tr);

		tr.insertAdjacentHTML('afterbegin', '<th data-type="string">First Name</th><th data-type="string">Second Name</th><th data-type="number">Age</th>');

		return thead;
	}

	handleEvent(event) {
		if (event.target.tagName == 'TH' ) this.sort(event);
	}

	sort(event) {
		if (event.target.tagName != 'TH') return;

		const tbody = this.container.querySelector('tbody');

		let callIndex;
		for (let i = 0; i < event.target.parentElement.children.length; i++ ) {
			if (event.target.parentElement.children[i] == event.target)  callIndex = i;
		}

		let allTrItems = tbody.querySelectorAll('tr'), items = [];
		for (let elem of allTrItems) {
			items.push(elem.children[callIndex].innerHTML);
		}

		(event.target.dataset.type == 'number') ? items.sort((a, b) => +(a - b) ) : items.sort();

		while(tbody.lastElementChild) {
			tbody.lastElementChild.remove();
		}

		for (let item of items ) {
			for (let elem of allTrItems)
				if (item == elem.children[callIndex].innerHTML) tbody.append(elem);
		}
	}

	sortByNumber (event) {

	}

}

let tableSort = new TableSort(document.querySelector('#sortList'));

document.querySelector('#sortList').onsubmit = () => {
	tableSort.create();
	// tableSort.sortAll();
	return false;
}

document.querySelector('#sortList').querySelector('table').addEventListener('click', tableSort);



