// Selectors
const todoList = document.querySelector('.todos');
const formInput = document.querySelector('.form-input')
const inputText = document.querySelector('.input-text');
const submitBtn = document.querySelector('.submit-btn');
const updateBtn = document.querySelector('.update-btn');
const clearBtn = document.querySelector('.clear-btn');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
submitBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', manipulateTodo);
filterOption.addEventListener('click', filterTodo);
clearBtn.addEventListener('click', clearText)

// function
function addTodo(event) {
    event.preventDefault()

    // create id 
    const id = Date.now();

    // Todo div
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.setAttribute('id', id)

    //Create li
    const todoItem = document.createElement('li'); 

    // cek input value
    if(inputText.value === '') {
        return false
    }
    todoItem.textContent = inputText.value;
    todoItem.classList.add('todo-item');
    todo.appendChild(todoItem);

    // mark button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn')
    completeBtn.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    todo.appendChild(completeBtn);
    
    // edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    todo.appendChild(editBtn);

    // trash button
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(trashBtn);

    // append to todoList
    todoList.appendChild(todo);

    // clear value
    inputText.value = '';
}

function manipulateTodo(e) {
    const item = e.target;
    const firstClass = item.classList[0];
    const todo = item.parentNode;

    // complete
    if(firstClass === 'complete-btn') {
        todo.classList.toggle('completed');
    }

    // edit
    if(firstClass === 'edit-btn') {
        editTodo(todo)
    }

    // delete
    if(firstClass === 'trash-btn') {
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }
}

function editTodo(todo) {
    submitBtn.classList.add('hidden');
    updateBtn.classList.remove('hidden');
    let li = todo.firstChild;
    console.log(li.textContent)
    inputText.value = li.textContent;
    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        li.textContent = inputText.value;
        submitBtn.classList.remove('hidden');
        updateBtn.classList.add('hidden');
        inputText.value = '';
    })
}

// filterTodo
function filterTodo(e){
    const todos = todoList.querySelectorAll(".todo");

    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
                
        }
    })
}

function clearText(e) {
    e.preventDefault();
    inputText.value = '';
}