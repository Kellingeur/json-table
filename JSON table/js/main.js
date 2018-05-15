var userBase = [
    {"name": "Oleksii", "age": "12"},
    {"name": "Andrii", "age": "23"},
    {"name": "Oleksandr", "age": "33"}
    ]; 
        
function createRow() {
	var table = document.getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	var cellNav = row.insertCell(0);
	var cellName = row.insertCell(1);
	var cellAge = row.insertCell(2);
	var cellBtn = row.insertCell(3);
	table.appendChild(row);
	userBase.push({"name": 'new name', "age": 'new age'});
	cellNav.innerHTML = '<button class="btn btn-arrow" onclick="moveUp(this)" value="Up">▲</button><button class="btn btn-arrow" onclick="moveDown(this)" value="Down">▼</button>';
	cellName.innerHTML = '<input class="data" id="name-'+(userBase.length - 1)+'" value="new name">';
	cellAge.innerHTML = '<input class="data" id="age-'+(userBase.length - 1)+'" value="new age">';
	cellBtn.innerHTML = '<button class="btn btn-delete" onclick="deleteRow(this)" value="delete">Удалить</button>';
	cellName.childNodes[0].addEventListener('change', changeValue);
	cellAge.childNodes[0].addEventListener('change', changeValue);
	storage()
}

function getRowId(el) {
	var rows = Array.prototype.slice.call(document.getElementsByTagName('tr'));
	var row = el.closest('tr');
	var rowId = rows.indexOf(row);
	console.log(rowId);
	return rowId;
}

function changeValue() {
	var temp = this.getAttribute('id').split('-');
	var key = temp[0];
	var id = getRowId(this);
	userBase[id][key] = this.value;
	storage()
}

function moveUp(el) {
	var parent = document.getElementsByTagName('tbody')[0];
	var rows = Array.prototype.slice.call(document.getElementsByTagName('tr'));
	var currentId = getRowId(el);
	if (currentId != 0) {
		parent.insertBefore(rows[currentId], rows[--currentId]);
		var temp = userBase[currentId];
		userBase[currentId] = userBase[++currentId];
		userBase[currentId] = temp;
	}
	storage()		
}

function moveDown(el) {
	var parent = document.getElementsByTagName('tbody')[0];
	var rows = Array.prototype.slice.call(document.getElementsByTagName('tr'));
	var currentId = getRowId(el);
	if (currentId != rows.length - 1) {
		parent.insertBefore(rows[currentId], rows[currentId + 2]);
		var temp = userBase[currentId];
		userBase[currentId] = userBase[++currentId];
		userBase[currentId] = temp;
	}
	storage()
}

function deleteRow(el) {
	var rowId = getRowId(el);
	userBase.splice(rowId, 1);
	document.getElementsByTagName('table')[0].deleteRow(rowId);
	storage()
}

function parse() {
    var text = document.getElementById('textArea').value;
    var parse = JSON.parse(text);
	document.getElementById('textArea').value = parse;
    userBase = parse;
    document.getElementsByTagName('table')[0].remove();
    render();
}
function stringify() {
    var stringify = JSON.stringify(userBase);
    document.getElementById('textArea').value = stringify;
    storage()
}

function prettyPrint() {
    var stringify = JSON.stringify(userBase, undefined, 4);
    document.getElementById('textArea').value = stringify;
}

function storage() {
	var storage = JSON.stringify(userBase);
	localStorage.setItem('table', storage);
}

function render() {
	var html = '<table>';
	html += '<button class="btn btn-add" onclick="createRow()" value="addRow">+ Добавить ячейку</button>';
	html += '<tbody>';
	for (var i = 0; i < userBase.length; i++) {
		var user = userBase[i];

		html += '<tr>';
		html += '<td><button class="btn btn-arrow" onclick="moveUp(this)" value="Up">▲</button><button class="btn btn-arrow" onclick="moveDown(this)" value="Down">▼</button></td>';
		for (var key in user) {
			html += '<td>';
			html += '<input class="data" id="'+key+'-'+i+'" value="'+user[key]+'">';
			html += '</td>';
		}
		html += '<td><button class="btn btn-delete" onclick="deleteRow(this)" value="delete">Удалить</button></td>';
		html += '</tr>';	
	}
	html += '</tbody>';
	html += '</table>';

	document.getElementById('root').innerHTML = html;

	var elements = document.getElementsByClassName('data');
        [].forEach.call(elements, function (el) {
        	el.addEventListener('change', changeValue);
        });
        storage()
}


window.onload = function () {
        render();      

};
