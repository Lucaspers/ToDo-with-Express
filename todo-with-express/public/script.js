window.onload = main

/**
 * The start of our program!!
 */
function main() {
    loadTodosFromServer()
    addEventListeners()
}

function printTodos(todos) {
    const ul = document.querySelector('ul')

    for (const todo of todos) {
        printTodo(todo, ul)
    }
}

function addEventListeners() {
    const button = document.querySelector('#spara')
    button.onclick = addTodo
}

function addTodo() {
    const ul = document.querySelector('ul')
    const input = document.querySelector('input')
    const todo = input.value
    input.value = ""

    printTodo(todo, ul)
    saveTodoToServer(todo)
}

function printTodo(todo, ul) {
    const li = document.createElement('li')
    li.innerHTML = todo
    li.classList = "li"

    const removeButtonTodo = document.createElement('button')
    removeButtonTodo.innerText = "✓"
    removeButtonTodo.classList = "removeButton"
    removeButtonTodo.data = todo
    removeButtonTodo.onclick = RemoveTodoToServer
   
    ul.append(li)
    li.append(removeButtonTodo)

}

async function loadTodosFromServer() {
    const response = await fetch('http://localhost:3000/api/todos')
    const todos = await response.json();
    printTodos(todos)
}

async function saveTodoToServer(todo) {
    const url = 'http://localhost:3000/api/todos'
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ todo }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
async function RemoveTodoToServer(event) {
    const url = 'http://localhost:3000/api/todos'
    const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ todoToRemove: event.srcElement.data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    location.reload()
}
