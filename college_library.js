function detail(name, place, amount, type) {
    this.name = name;
    this.place = place;
    this.amount = amount;
    this.type = type;
}
function display() {
}
display.prototype.add = function (person) {
    console.log('adding into table');
    let tablebody = document.getElementById('tablebody');
    let list = localStorage.getItem('list');
    if (list == null) {
        listobj = [];
    }
    else {
        listobj = JSON.parse(list);
    }
    listobj.push(person);
    localStorage.setItem('list', JSON.stringify(listobj));
    let uistring = '';
    listobj.forEach(function (element) {
        uistring += `<tr>
        <td>${element.name}</td>
        <td>${element.place}</td>
        <td>${element.amount}</td>
    </tr>`;
    });
    tablebody.innerHTML = uistring;
}
display.prototype.clear = function () {
    let form = document.getElementById('filling_form');
    form.reset();
}
display.prototype.show = function (str1, str2) {
    let alert = document.getElementById('alertmsg');
    alert.innerHTML = ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${str1}</strong>${str2}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    setTimeout(function () {
        alert.innerHTML = ``;
    }, 5000);
}
let form = document.getElementById('filling_form');
form.addEventListener('submit', fillingform);
function fillingform(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let place = document.getElementById('place').value;
    let donation = document.getElementById('donation').value;
    let male = document.getElementById('Male');
    let female = document.getElementById('Female');
    let other = document.getElementById('Other');
    let type;
    if (male.checked)
        type = male.value;
    else if (female.checked)
        type = female.value;
    else if (other.checked)
        type = other.value;
    let person = new detail(name, place, donation, type);
    console.log(person);
    console.log('click on form submission');
    let disp = new display();
    if (name.length > 2 && place.length > 2) {
        disp.add(person);
        disp.clear();
        disp.show("Great", "   Successfully addaed");
    }
    else {
        disp.show("Wrong", "   Entered name or place is incorrect");
    }
}
