function OnlyPhone(){
   /* 保证手机号的唯一 */
   var judge = 0;
   var Phone = document.getElementById('phone').value;
   var items = document.getElementsByName('item');
   for(var i=0;i<items.length;i++){
   if(listTable.rows[i].cells[1].innerHTML === Phone){
    judge = 1;
    listTable.rows[i].style.backgroundColor = '#5bc1f8';
    listTable.rows[i].cells[0].firstElementChild.checked = true;
       }
   }
   return judge;
}

/* 增加记录 */
function addList() {
    var Phone = document.getElementById('phone').value;
    var Username = document.getElementById('username').value;
    var Sex = document.getElementById('sex').value;
    var Age = document.getElementById('age').value;
    var ID = document.getElementById('ID').value;
    var job = document.getElementById('Job').value;
    var HomePlace = document.getElementById('homePlace').value;
    var money = document.getElementById('money').value;
    var judge = OnlyPhone();
    /* 判断记录是否有效 */
    if(Phone.length!=11){
        alert('请输入正确的手机号');
    }
    else{
        if(judge === 1){
          alert('当前手机号已经存在');
        }
        else{
        if(ID.length!=18){
            alert('请输入正确的身份证号');
        }else{
            if(ID =='' ||Phone =='' ||Username =='' ){
                alert('手机号、身份证号、用户名不得为空');
            }else{
                    if(Age<0||Age>150){
                        alert('请输入正确的年龄');
                    }
                    else{
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
                var Tdnew = document.createElement('td');
                    Tdnew.innerHTML = money;    
                var Td9 = document.createElement('td');
                var Input2 = document.createElement('input');
                var Input3 = document.createElement('input');
                    Input2.setAttribute('type','button');
                    Input2.setAttribute('value','注销');
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
                    Tr.appendChild(Tdnew);
                    Tr.appendChild(Td9);
                var listTable = document.getElementById('listTable');
                    listTable.appendChild(Tr);
                }
            }
        }
     }
    } 
}

function menuReset(){
    var items = document.getElementsByName('item');
    for(var i=0;i<items.length;i++){
     listTable.rows[i].style.backgroundColor = '';
     listTable.rows[i].cells[0].firstElementChild.checked = false;
        }
}
/* 单条删除 */
function del(obj){
    var record = obj.parentNode.parentNode;
    var listTable = document.getElementById('listTable');
    listTable.removeChild(record);
}
/* 全选按钮 */
function checkAll(obj){
    var status = obj.checked;
    var items = document.getElementsByName('item');
    for(var i =0;i<items.length;i++){
        items[i].checked = status ;
    }
}
/* 删除全部 */
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
/* 保存数据 */
function saveAll(){
    // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
    var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[0].outerHTML + "</body></html>";
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    var blob = new Blob([html], { type: "application/vnd.ms-excel" });
    var a = document.getElementById('save');
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    a.href = URL.createObjectURL(blob);
    // 设置文件名
    a.download = "移动营业厅登记表.xls";

}

function importXLS(fileName)
{  
     objCon = new ActiveXObject("ADODB.Connection");
     objCon.Provider = "Microsoft.Jet.OLEDB.4.0";
     objCon.ConnectionString = "Data Source=" + fileName + ";Extended Properties=Excel 8.0;";
     objCon.CursorLocation = 1;
     objCon.Open;
     var strQuery;
     //Get the SheetName
     var strSheetName = "Sheet1$";
     var rsTemp =   new ActiveXObject("ADODB.Recordset");
     rsTemp = objCon.OpenSchema(20);
     if(!rsTemp.EOF)
     strSheetName = rsTemp.Fields("Table_Name").Value;
     rsTemp = null;
     rsExcel =   new ActiveXObject("ADODB.Recordset");
     strQuery = "SELECT * FROM [" + strSheetName + "]";
     rsExcel.ActiveConnection = objCon;
     rsExcel.Open(strQuery);
     while(!rsExcel.EOF)
     {
     for(i = 0;i<rsExcel.Fields.Count;++i)
     {
     alert(rsExcel.Fields(i).value);
     }
     rsExcel.MoveNext; 
     }
     // Close the connection and dispose the file
     objCon.Close;
     objCon =null;
     rsExcel = null;
}

/* 修改单条数据 */
function modify(obj){
    var Phone = document.getElementById('phone');
    var Username = document.getElementById('username');
    var Sex = document.getElementById('sex');
    var Age = document.getElementById('age');
    var ID = document.getElementById('ID');
    var job = document.getElementById('Job');
    var HomePlace = document.getElementById('homePlace');
    var money = document.getElementById('money');
    var Tr=obj.parentNode.parentNode;
    var Td = Tr.getElementsByTagName('td'); 
    Phone.value = Td[1].innerHTML;
    Username.value = Td[2].innerHTML;
    Sex.value = Td[3].innerHTML;
    Age.value = Td[4].innerHTML;
    ID.value = Td[5].innerHTML;
    job.value = Td[6].innerHTML;
    HomePlace.value = Td[7].innerHTML;
    money.value = Td[8].innerHTML;
    rowIndex = obj.parentNode.parentNode.rowIndex; 
}
/* 修改后更新数据 */
function update(){
    var Phone = document.getElementById('phone');
    var Username = document.getElementById('username');
    var Sex = document.getElementById('sex');
    var Age = document.getElementById('age');
    var ID = document.getElementById('ID');
    var job = document.getElementById('Job');
    var HomePlace = document.getElementById('homePlace');
    var Mytable = document.getElementById('mytable');
    var money = document.getElementById('money');
    /* 判断记录是否有效 */
   if(Phone.value!=Mytable.rows[rowIndex].cells[1].innerHTML){
        alert('手机号不可更改');
    }
    else{
        if(ID.value.length!=18){
            alert('请输入正确的身份证号');
        }else{
            if(ID.value =='' ||Phone.value =='' ||Username.value =='' ){
                alert('手机号、身份证号、用户名不得为空');
            }else{ 
                if(Age.value<0||Age.value>150){
                    alert('请输入正确的年龄');
                }
                 else{
                /* Mytable.rows[rowIndex].cells[1].innerHTML = Phone.value; */
                Mytable.rows[rowIndex].cells[2].innerHTML = Username.value;
                Mytable.rows[rowIndex].cells[3].innerHTML = Sex.value;
                Mytable.rows[rowIndex].cells[4].innerHTML = Age.value;
                Mytable.rows[rowIndex].cells[5].innerHTML = ID.value;
                Mytable.rows[rowIndex].cells[6].innerHTML = job.value;
                Mytable.rows[rowIndex].cells[7].innerHTML = HomePlace.value;
                Mytable.rows[rowIndex].cells[8].innerHTML = money.value;
                 }
            }
    }
}

}
/* 查找 */
function searchObj(){
    var big = document.getElementById('searchBox');
    var obj = big.getElementsByTagName('option');
    var listTable = document.getElementById('listTable');
    var content = document.getElementById('searchFor').value;
    //获取查找方式
    var m = 0;
    for(var j=0;j<4;j++){
    if( obj[j].selected === true){
            m = j;
    }
    }
    //手机号查找
    if(m === 0){
    var judge = 0;
    var items = document.getElementsByName('item');
    for(var i=0;i<items.length;i++){
    if(listTable.rows[i].cells[1].innerHTML === content){
     listTable.rows[i].style.backgroundColor = '#5bc1f8';
     listTable.rows[i].cells[0].firstElementChild.checked = true;
     judge = 1;
        }
    }
    if(judge === 0){
        alert("无法查到");
    }
    }
    //用户名查找
    if(m === 1){
        var judge = 0;
        var items = document.getElementsByName('item');
        for(var i=0;i<items.length;i++){
        if(listTable.rows[i].cells[2].innerHTML === content){
         listTable.rows[i].style.backgroundColor = '#5bc1f8';
         listTable.rows[i].cells[0].firstElementChild.checked = true;
         judge = 1;
            }
        }
        if(judge === 0){
            alert("无法查到");
        }
        }
    //身份证号查找
    if(m === 2){
        var judge = 0;
        var items = document.getElementsByName('item');
        for(var i=0;i<items.length;i++){
        if(listTable.rows[i].cells[5].innerHTML === content){
         listTable.rows[i].style.backgroundColor = '#5bc1f8';
         listTable.rows[i].cells[0].firstElementChild.checked = true;
         judge = 1;
            }
        }
        if(judge === 0){
            alert("无法查到");
        }
        }
    
    //话费查找
    if(m === 3){
        var judge = 0;
        var items = document.getElementsByName('item');
        for(var i=0;i<items.length;i++){
        if(listTable.rows[i].cells[8].innerHTML === content){
         listTable.rows[i].style.backgroundColor = '#5bc1f8';
         listTable.rows[i].cells[0].firstElementChild.checked = true;
         judge = 1;
            }
        }
        if(judge === 0){
            alert("无法查到");
        }
        }
}
/* 查找菜单的重置按钮 */
function reset(){
    var items = document.getElementsByName('item');
    for(var i=0;i<items.length;i++){
     listTable.rows[i].style.backgroundColor = '';
     listTable.rows[i].cells[0].firstElementChild.checked = false;
        }
    var searchFor = document.getElementById('searchFor');
       searchFor.value = '';    
    } 

/* 报废的代码（一个下午的头秃）
function load1(){
       var data = new Object();
       data[0]={
           phone:13867012157,
           Username:'周灿',
           sex:'女',
           age:19,
           ID:330821199910206028,
           job:'学生',
           homeplace:'江苏省南京市南京邮电大学',
           money:5000,
       }
   var listTable = document.getElementById('listTable');
   var items = document.getElementsByName('item');
   for(var i=1;i<items.length;i++){
   data[i].phone = listTable.rows[i].cells[1].innerHTML ;
   data[i].Username = listTable.rows[i].cells[2].innerHTML ;
   data[i].sex = listTable.rows[i].cells[3].innerHTML ;
   data[i].age = listTable.rows[i].cells[4].innerHTML ;
   data[i].ID = listTable.rows[i].cells[5].innerHTML ;
   data[i].job = listTable.rows[i].cells[6].innerHTML ;
   data[i].homeplace = listTable.rows[i].cells[7].innerHTML ;
   data[i].money = listTable.rows[i].cells[8].innerHTML ;
   }
} 

function rank(){
    var big = document.getElementById('chooseBox');
    var small = document.getElementById('rankBox');
    var obj1 = big.getElementsByTagName('option');
    var obj2 = small.getElementsByTagName('option');
    var listTable = document.getElementById('listTable');
    load1();
    //获取排序方式
     var m = 0;
     var n = 0;    
     for(var j=0;j<4;j++){
     if( obj1[j].selected === true){
            m = j;
     }
     }
     for(var k=0;k<2;k++){
     if( obj2[k].selected === true){
            n = k;
     }     
     }
     //话费排序m=3
       if(m === 3){   
        //从大到小排序
        if(n === 0){ 
              
        }
        //从小到大排序
        if(n === 1){         

        }
        }
    } */

/* 从小到大排序 */
function bigger(_i){
var table=document.getElementById("mytable");
var table_tbody=table.getElementsByTagName("tbody")[0];
var table_tr=table_tbody.getElementsByTagName("tr");
            var temp_arr=[];
            var temp_tr_arr=[];
            /* 存储 */
            for(var j=0;j<table_tr.length;j++){
                temp_arr.push(table_tr[j].getElementsByTagName("td")[_i].innerHTML);
                temp_tr_arr.push(table_tr[j].cloneNode(true));
            };
            /* 清除 */
            var tr_length=table_tr.length;
            for(var x=0;x<tr_length;x++){
                table_tbody.removeChild(table_tbody.getElementsByTagName("tr")[0]);
            }
            /* 排列 */
            var temp=parseInt(temp_arr[0])||temp_arr[0];
            if(typeof(temp)=='number'){
                temp_arr.sort(function(a,b){return a-b;});
            }else{
                temp_arr.sort();
            }
            /* 输出 */
            for(var k=0;k<temp_arr.length;k++){
                    for(var vv=0;vv<temp_tr_arr.length;vv++){
                        if(temp_arr[k]==temp_tr_arr[vv].getElementsByTagName("td")[_i].innerHTML){
                            table_tbody.appendChild(temp_tr_arr[vv]);
                        }
                    }
            }
}
/* 从大到小排序 */
function smaller(_i){
    var table=document.getElementById("mytable");
    var table_tbody=table.getElementsByTagName("tbody")[0];
    var table_tr=table_tbody.getElementsByTagName("tr");
                var temp_arr=[];
                var temp_tr_arr=[];
                /* 存储 */
                for(var j=0;j<table_tr.length;j++){
                    temp_arr.push(table_tr[j].getElementsByTagName("td")[_i].innerHTML);
                    temp_tr_arr.push(table_tr[j].cloneNode(true));
                };
                /* 清除 */
                var tr_length=table_tr.length;
                for(var x=0;x<tr_length;x++){
                    table_tbody.removeChild(table_tbody.getElementsByTagName("tr")[0]);
                }
                /* 排列 */
                var temp=parseInt(temp_arr[0])||temp_arr[0];
                if(typeof(temp)=='number'){
                    temp_arr.sort(function(a,b){return b-a;});
                }else{
                    temp_arr.sort();
                }
                /* 输出 */
                for(var k=0;k<temp_arr.length;k++){
                        for(var vv=0;vv<temp_tr_arr.length;vv++){
                            if(temp_arr[k]==temp_tr_arr[vv].getElementsByTagName("td")[_i].innerHTML){
                                table_tbody.appendChild(temp_tr_arr[vv]);
                            }
                        }
                }
    }

/* 排序菜单 */
function rank(){
    var big = document.getElementById('chooseBox');
    var small = document.getElementById('rankBox');
    var obj1 = big.getElementsByTagName('option');
    var obj2 = small.getElementsByTagName('option');
    var listTable = document.getElementById('listTable');
    //获取排序方式
     var m = 0;
     var n = 0;    
     for(var j=0;j<3;j++){
     if( obj1[j].selected === true){
            m = j;
     }
     }
     for(var k=0;k<2;k++){
     if( obj2[k].selected === true){
            n = k;
     }     
     }
     //话费排序m=2
       if(m === 2){   
        //从大到小排序
        if(n === 0){ 
            smaller(8);  
        }
        //从小到大排序
        if(n === 1){         
            bigger(8);
        }
        }
    //年龄排序m=0
    if(m === 0){   
        //从大到小排序
        if(n === 0){ 
           smaller(4);   
        }
        //从小到大排序
        if(n === 1){         
           bigger(4);
        }
        }
        //身份证号排序m=1
    if(m === 1){   
        //从大到小排序
        if(n === 0){ 
           smaller(5);   
        }
        //从小到大排序
        if(n === 1){         
           bigger(5);
        }
        }
    }
    
    




