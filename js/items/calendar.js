class Calendar {
  constructor(container, year, month) {
    this.container = container;

    this.timeStop = new Date(year, month);

    this._year = year;
    this._month = month;

    this.create(this.timeStop, this._year, this._month);
  }

  create(timestop, year, month) {
    let table = document.createElement('table');
    this.container.append(table);
    table.append( this.createHead(), this.createBody(timestop), this.createFoot(year, month) );
  }

  createHead() {
    const daysNames = ['Mn', 'Ts', 'Wd', 'Th', 'Fr', 'St', 'Sn'];
    let head = document.createElement('thead');

    let tr = head.append(document.createElement('tr'));
    
    for (let i = 0; i < daysNames.length; i++) {
      let th = document.createElement('th');
      th.textContent = daysNames[i];
      head.append(th);
    }

    return head;
  }

  createBody(currentMonth) {
    let tbody = document.createElement('tbody');

    let dayOfWeek = currentMonth.getDay(), currentDay = 1, iterable = false;

    (dayOfWeek == 0) ? dayOfWeek = 6 : dayOfWeek--;

    let daysQty = function (month) {
      month.setDate(32);
      const days = 32 - month.getDate(); 
      month.setDate(1);
      month.setYear
      return days;

    }(currentMonth);

    for (let i = 0; i < 6; i++) {
      let tr = document.createElement('tr');
      tbody.append(tr);

      for(let j = 0; j < 7; j++) {
        let td = document.createElement('td');
        tr.append(td);

        if (dayOfWeek == j) iterable = true;

        if (iterable) td.textContent = currentDay++;

        if (currentDay > daysQty) {
          iterable = false;
          dayOfWeek = null;
        }
      }
    }

    if (!tbody.lastElementChild.firstElementChild.textContent) tbody.lastElementChild.remove();  

    return tbody;
  }

  createFoot(year, month) {
    let tfoot = document.createElement('tfoot'), tr = document.createElement('tr');
    tfoot.append(tr);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let enty = document.createElement('td');
    
    enty.colSpan = '7';
    enty.textContent = `${ year } ${ months[ month ] }`;

    tr.append(enty);

    return tfoot;
  }

}

class CalendarForm  {
  constructor(container){
    this.container = container;
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();

    new Calendar(container, this.year, this.month);
    

    this.createForm();
  }

  createForm () {
    let tfoot = this.container.querySelector('tfoot');

    let form = document.createElement('form');
    form.className = 'calendar-setting';
    form.hidden = true;
    this.container.querySelector('table').after(form);

    form.append(this.createInput(this.year, this.month), this.createSubmit());
    
    tfoot.onclick = () => form.hidden = !form.hidden;

    form.onsubmit = () => {
      let yearAndMonth = form.querySelector('[type="month"]').value.split('-');

      this.year = yearAndMonth[0];
      
      (yearAndMonth[1].slice(0, 1) == 0) ? this.month = +(yearAndMonth[1].slice(1)) - 1 : this.month = yearAndMonth[1] - 1 ;
      
      this.removeCalendar();

      new Calendar(this.container, this.year, this.month);

      form.hidden = true;

      form.remove();

      this.createForm();

      return false;
    };

    return form;
  }


  createInput(year, month) {
    let inputEl = document.createElement('input');
    inputEl.type = 'month';
    inputEl.required = true;

    (month < 9) ? inputEl.value = `${year}-0${month+1}` : inputEl.value = `${year}-${month+1}`;

    return inputEl;
  }

  createSubmit() {
    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'OK';

    return submit;
  }

  removeCalendar() {
    this.container.querySelector('table').remove();
  }

}

new CalendarForm(document.querySelector('#cal'));
