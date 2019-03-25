function addList() {
    var Phone = document.getElementById('phone').value;
    var Username = document.getElementById('username').value;
    var Sex = document.getElementById('sex').value;
    var Age = document.getElementById('age').value;
    var ID = document.getElementById('ID').value;
    var job = document.getElementById('Job').value;
    var HomePlace = document.getElementById('homePlace').value;
    var Td1 = document.createElement('td');
    var Input = document.createElement('input');
    Td1.appendChild(Input);
    Input.setAttribute('type','checkbox');
    Input.setAttribute('name','item');
    var Td2 = document.createElement('td');
        Td2.innerHTML = Phone;
    var Td3 = document.createElement('td');
        Td3.innerHTML = Username;
    var Td4 = document.createElement('td');
        Td4.innerHTML = Sex;
    var Td5 = document.createElement('td');
        Td5.innerHTML = Age; 
    var Td6 = document.createElement('td');
        Td6.innerHTML = ID;
    var Td7 = document.createElement('td');
        Td7.innerHTML = job;
    var Td8 = document.createElement('td');
        Td8.innerHTML = HomePlace;
    var Td9 = document.createElement('td');
    var Input2 = document.createElement('input');
    var Input3 = document.createElement('input');
        Input2.setAttribute('type','button');
        Input2.setAttribute('value','删除');
        Input2.setAttribute('onclick','del(this)');
        Input2.className = 'btn btn-danger';
        Input3.setAttribute('type','button');
        Input3.setAttribute('value','修改');
        Input3.setAttribute('onclick','modify(this)');
        Input3.className = 'btn btn-info';
        Td9.appendChild(Input2);
        Td9.appendChild(Input3);
    var Tr = document.createElement('tr');
        Tr.appendChild(Td1);
        Tr.appendChild(Td2);
        Tr.appendChild(Td3);
        Tr.appendChild(Td4);
        Tr.appendChild(Td5);
        Tr.appendChild(Td6);
        Tr.appendChild(Td7);  
        Tr.appendChild(Td8);
        Tr.appendChild(Td9);
    var listTable = document.getElementById('listTable');
        listTable.appendChild(Tr);
    }

function del(obj){
    var record = obj.parentNode.parentNode;
    var listTable = document.getElementById('listTable');
    listTable.removeChild(record);
}

function checkAll(obj){
    var status = obj.checked;
    var items = document.getElementsByName('item');
    for(var i =0;i<items.length;i++){
        items[i].checked = status ;
    }
}

function delAll(){
    var listTable = document.getElementById('listTable');
    var items = document.getElementsByName("item");
    for(var j=0;j<items.length;j++){    
        if(items[j].checked)
        {
            var record = items[j].parentNode.parentNode;
            listTable.removeChild(record);
            j--;
        }
    }
}

function modify(obj){
    var Phone = document.getElementById('phone');
    var Username = document.getElementById('username');
    var Sex = document.getElementById('sex');
    var Age = document.getElementById('age');
    var ID = document.getElementById('ID');
    var job = document.getElementById('Job');
    var HomePlace = document.getElementById('homePlace');
    var Tr=obj.parentNode.parentNode;
    var Td = Tr.getElementsByTagName('td'); 
    Phone.value = Td[1].innerHTML;
    Username.value = Td[2].innerHTML;
    Sex.value = Td[3].innerHTML;
    Age.value = Td[4].innerHTML;
    ID.value = Td[5].innerHTML;
    job.value = Td[6].innerHTML;
    HomePlace.value = Td[7].innerHTML;
    rowIndex = obj.parentNode.parentNode.rowIndex; 
}

function update(){
    var Phone = document.getElementById('phone');
    var Username = document.getElementById('username');
    var Sex = document.getElementById('sex');
    var Age = document.getElementById('age');
    var ID = document.getElementById('ID');
    var job = document.getElementById('Job');
    var HomePlace = document.getElementById('homePlace');
    var Mytable = document.getElementById('mytable');
    Mytable.rows[rowIndex].cells[1].innerHTML = Phone.value;
    Mytable.rows[rowIndex].cells[2].innerHTML = Username.value;
    Mytable.rows[rowIndex].cells[3].innerHTML = Sex.value;
    Mytable.rows[rowIndex].cells[4].innerHTML = Age.value;
    Mytable.rows[rowIndex].cells[5].innerHTML = ID.value;
    Mytable.rows[rowIndex].cells[6].innerHTML = job.value;
    Mytable.rows[rowIndex].cells[7].innerHTML = HomePlace.value;
}