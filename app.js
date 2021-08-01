var list = document.getElementById("todoList");
function addTodo() {
  //create todo item and add in list
  var todo_item = document.getElementById("todo-item");
  var database = firebase.database().ref("todos");
  var key = database.push().key;
  // console.log(key);
  var todos = {
    value: todo_item.value,
    key: key,
  };
  database.child(key).set(todos);
  todo_item.value = "";
}



  firebase.database().ref('todos').on('child_added',function(data){
   var li = document.createElement("li");
  li.setAttribute("id","list");
  var liText = document.createTextNode(data.val().value);
  li.appendChild(liText);
  list.appendChild(li);
 

  

  // //create delete button to remove a todo
  var delbtn = document.createElement("button");
  var deltext = document.createTextNode("Delete");
  delbtn.appendChild(deltext);
  li.appendChild(delbtn);
  delbtn.setAttribute("onclick", "remove(this)");
  delbtn.setAttribute("id","delbtn")
  delbtn.setAttribute("class",data.val().key)
  // //create edit button
  var edit = document.createElement("button");
  var edittext = document.createTextNode("Edit");
  edit.appendChild(edittext);
  li.appendChild(edit);
  edit.setAttribute("onclick","editTodo(this)")
  edit.setAttribute("id","editbtn")
  edit.setAttribute('class',data.val().key)
  })



  

function editTodo(e) {
  var val = e.parentNode.firstChild.nodeValue;
  var editval = prompt("Edit your todo", val);
  e.parentNode.firstChild.nodeValue = editval;
  var editTodo={
      value : editval,
      key : e.className
  }
  firebase.database().ref('todos').child(e.className).set(editTodo);
 
}

function remove(r) {
  firebase.database().ref('todos').child(r.className).remove();
  r.parentNode.remove();
}
//removing all todos

function removeAll() {
  firebase.database().ref('todos').remove();
  list.innerHTML = "";
}
