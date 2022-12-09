const form = document.getElementById('form')
const input = document.getElementById('todoInput')
const btn = document.getElementById('todoBtn')
const todoUl = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})


function addTodo () {
    let listAdded = document.createElement('li')
    const iAdded = document.createElement('i')
    let text = input.value


    listAdded.innerText = text

    if (input.value !== '') {    
        listAdded.innerText = text
        input.value = ''

        iAdded.className = 'fa-sharp fa-solid fa-trash'
        todoUl.appendChild(listAdded)
        listAdded.appendChild(iAdded)
    }


    listAdded.addEventListener('click', () => {
        listAdded.classList.toggle('done')
        updateLS()
        })
    iAdded.addEventListener('click', (e) => {
        e.preventDefault()
        listAdded.classList.add('skip')
        listAdded.addEventListener('transitionend', function() {
            listAdded.remove()
        })
       updateLS()
    })
    updateLS()

}
//Local Strorage fn
function updateLS() {
    todoList = document.querySelectorAll('li')

    const todos = [];

    todoList.forEach(list => {
        todos.push({
            text: list.innerText,
            done: list.classList.contains('done')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

new Sortable(todoUl, {
    Animation: 150
});

