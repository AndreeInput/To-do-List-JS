const todoList = document.getElementById("todo-list");
const inputElement = document.getElementById("new-item");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Codigo de las listas 
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function refreshN(){
  location.reload();
}

function renderTodos() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].completed) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(todos[i].text));
      li.className += "list__li";
      li.setAttribute("id","idlist"); 
      
      const editButton = document.createElement("button");
      editButton.className += "list__btn edit";
      editButton.innerHTML = "Edit";
      editButton.addEventListener("click", function() {
        const newText = prompt("Enter new text:", todos[i].text);
        if (newText !== null && newText !== "") {
          todos[i].text = newText;
          saveTodos();
          renderTodos();
          refreshN();
          
        }
      });
      const deleteButton = document.createElement("button");
      deleteButton.className += "list__btn delete";
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function() {
        const confirmation = confirm("Are you sure you want to delete this item?");
        if (confirmation) {
          todos.splice(i, 1);
          saveTodos();
          renderTodos();
          refreshN();
        }
      });
      const completeButton = document.createElement("button");
      completeButton.innerHTML = "Completada";
      completeButton.className += "list__btn complete";
      completeButton.addEventListener("click", function() {
        todos[i].completed = true;
        saveTodos();
        renderTodos();
        alert("Task completed!");
        refreshN();
        if (todos.every(todo => todo.completed)) {
          todos = [];
          saveTodos();
          renderTodos();
          alert("All tasks completed!");
        }
      });
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      li.appendChild(completeButton);
      todoList.appendChild(li);
    }
  }
}

function addItem() {
  const newItem = inputElement.value.trim();
  if (newItem !== "") {
    todos.push({ text: newItem, completed: false });
    saveTodos();
    renderTodos();
   refreshN();
    inputElement.value = "";
  } else {
    alert("The input cannot be empty.");
  }
}

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function() {
  addItem();
});

renderTodos();



// Darkmode
function toggleDarkMode() {
  const bodydark = document.getElementById("body_dark");
  const maindark = document.getElementById("main_dark");
  const containerdark = document.getElementById("container_dark");
  const contentdark = document.getElementById("content_dark");
  const footerdark = document.getElementById("footer_dark");
  const svgdark = document.getElementById("svg1");
  const svgdark1 = document.getElementById("svg2");
  const modal = document.getElementById("modalD");

  bodydark.classList.toggle("dark-mode");
  maindark.classList.toggle("main-dark");
  containerdark.classList.toggle("container-dark");
  contentdark.classList.toggle("container-dark");
  footerdark.classList.toggle("container-dark");
  svgdark.classList.toggle("svg");
  svgdark1.classList.toggle("svg");
  modal.classList.toggle("modal-dark");
}
function oftoggleDarkMode() {
  const bodydark = document.getElementById("body_dark");
  const maindark = document.getElementById("main_dark");
  const containerdark = document.getElementById("container_dark");
  const contentdark = document.getElementById("content_dark");
  const footerdark = document.getElementById("footer_dark");
  const svgdark = document.getElementById("svg1");
  const svgdark1 = document.getElementById("svg2");
  const modal = document.getElementById("modalD");

  bodydark.classList.remove("dark-mode");
  maindark.classList.remove("main-dark");
  containerdark.classList.remove("container-dark");
  contentdark.classList.remove("container-dark");
  footerdark.classList.remove("container-dark");
  svgdark.classList.remove("svg");
  svgdark1.classList.remove("svg");
  modal.classList.remove("modal-dark");
}

const btnSwitch = document.querySelector('#darkmode');
btnSwitch.addEventListener('click', () => {
	toggleDarkMode();
	btnSwitch.classList.toggle('active');

	// Guardamos el modo en localstorage.
	if(document.body.classList.contains('dark-mode')){
		localStorage.setItem('dark-mode', 'true');
	} else {
		localStorage.setItem('dark-mode', 'false');
	}
});

// Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
  toggleDarkMode()
  btnSwitch.classList.add('active');
} else {
  oftoggleDarkMode()
  btnSwitch.classList.remove('active');
}

// -------------------------------------------codigo modal
const openModal = () => {
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close");
  modal.style.display = "block";
  closeButton.addEventListener("click", closeModal);
}
const closeModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
const myButton = document.getElementById("myButton");
myButton.addEventListener("click", openModal);



// ---------------------------Personalizacion de estilo en la pagina
const longitudidlist = idlist.length; 
const btnlist = document.getElementById("parr-btn");
const titlefull =  document.querySelector("#fulltitle")
const mmm = document.querySelectorAll(".list__btn")
let mmml = mmm.length;

btnlist.addEventListener("click",() => {
  const listbox = document.getElementById("list_option");
  const listcolor = document.getElementById("list_color");

  const valorseleccioncolor = listcolor.value;
  const valorSeleccionado = listbox.value;
  
  // modifica cada elemento de una cadena de caracteres
  for (let i = 0; i < longitudidlist; i++) {
    idlist[i].style.listStyleType  = valorSeleccionado;
    localStorage.setItem("typelist", valorSeleccionado);
  }
  for (let e = 0; e < longitudidlist; e++) {
    idlist[e].style.color  = valorseleccioncolor;
    localStorage.setItem("listcolor", valorseleccioncolor);
  }
  
  for (let a = 0; a < mmml; a++) {
    mmm[a].style.color  = valorseleccioncolor;
    localStorage.setItem("btnEdit", valorseleccioncolor);

  }

  
  localStorage.setItem("titlecolor",valorseleccioncolor);
  
  closeModal()
  window.onload()
  
  
})

// al recargar la pagina recupero los datos guardados de local storage y el tipo de lista le paso el valor almacenado en localStorage 
window.onload = () => {
  
  
  for (let i = 0; i < longitudidlist; i++) {
    idlist[i].style.listStyleType= localStorage.getItem("typelist");
  }
  for (let e = 0; e < longitudidlist; e++) {
    idlist[e].style.color= localStorage.getItem("listcolor");
  }
  for (let a = 0; a < mmml; a++) {
    mmm[a].style.color= localStorage.getItem("btnEdit");
  }
  
  titlefull.style.color = localStorage.getItem("titlecolor");
}


// guardar la posicion de la opcion de lista seleccionada
// Event listener para el evento 'change' del select
// Guardar el valor seleccionado en localStorage
// Obtener la selección guardada en localStorage y establecerla como la selección actual del select

const miSelect = document.getElementById("list_option");
const miSelect2 = document.getElementById("list_color");
miSelect.addEventListener("change", () => {
  localStorage.setItem("seleccion", miSelect.value);
});
miSelect2.addEventListener("change", () => {
  localStorage.setItem("colorseletion2", miSelect2.value);
});
const seleccionGuardada = localStorage.getItem("seleccion");
const seleccionGuardada2 = localStorage.getItem("colorseletion2");
if (seleccionGuardada) {
  miSelect.value = seleccionGuardada;
}
if (seleccionGuardada2) {
  miSelect2.value = seleccionGuardada2;
}
// ------------------------------------------guardar el color de preferencia 

