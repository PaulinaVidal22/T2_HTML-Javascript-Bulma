// const tasks = [];
let tasks = [];

const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.column');
    
const addCardLinks = document.querySelectorAll('.column-footer-item');
const addCardModal = document.getElementById('addCardModal');
const editCardModal = document.getElementById('editCardModal');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const addCardButton = document.getElementById('addCardButton');
const updateCardButton = document.getElementById('updateCardButton');
const deleteCardButton = document.getElementById('deleteCardButton');

let currentColumn;
let selectedColumn;
let currentCard;

const url = "http://localhost:5500/tasks";

async function fetchTasks() {
    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Tasks fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        alert("Error fetching tasks: " + error.message); 
    }
}

//tasksPromise = fetchTasks();



async function updateTask(task) {
    try {
        const response = await fetch(url + `/${task.id}`,
            { method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task) });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching task: ", error);
    }
}

async function postTask(task) {
    try {
        const response = await fetch(url,
            { method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task) });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching task: ", error);
    }
}

async function deleteTask(task) {
    try {
        const response = await fetch(url + `/${task.id}`,
            { method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching task: ", error);
    }
}

function cleanFields(){
     document.getElementById('cardTitle').value = '';
     document.getElementById('cardDescription').value = '';
     document.getElementById('cardDueDate').value = '';
     document.getElementById('cardResponsible').value = '';
     document.getElementById('cardPriority').value = '';

     closeModals();
}

function closeModals() {
    addCardModal.classList.remove('is-active');
    editCardModal.classList.remove('is-active');
}

function openAddCardModal(link) {
    currentColumn = link.closest('.column');
    addCardModal.classList.add('is-active');
}

function openEditCardModal(card) {
    currentCard = card;
    const title = card.querySelector('.card-title').textContent;
    const priority = card.querySelector('.card-tag').textContent;
    const description = card.getAttribute('data-description');
    const dueDate = card.getAttribute('data-due-date');
    const status = card.getAttribute('data-status');
    const responsible = card.getAttribute('data-responsible');

    document.getElementById('editCardTitle').value = title;
    document.getElementById('editCardDescription').value = description;
    document.getElementById('editCardDueDate').value = dueDate;
    document.getElementById('editCardStatus').value = status;
    document.getElementById('editCardResponsible').value = responsible;
    document.getElementById('editCardPriority').value = priority;

    editCardModal.classList.add('is-active');
}


function getColumnForStatus(status) {
    return document.querySelector(`.column[data-status="${status}"]`);
}

function loadTasks(tasks){
    document.querySelectorAll('.tasks').forEach(column => column.innerHTML = '');
    tasks.forEach(task => addTaskToDOM(task));

}

function addCard() {

    const title = document.getElementById('cardTitle').value;
    const description = document.getElementById('cardDescription').value;
    const dueDate = document.getElementById('cardDueDate').value;
    const cardStatus = document.getElementById("cardStatus").value;
    const responsible = document.getElementById('cardResponsible').value;
    const priority = document.getElementById('cardPriority').value;

    if (title && description && dueDate && responsible && priority) {
        
        let cardId;
        do {
            // Generar un ID único para la tarjeta
            cardId = 'card-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        } while (tasks.some(task => task.id === cardId)); 

        const task = {
            id: cardId,
            title: title,
            description: description,
            dueDate: dueDate,
            status: cardStatus,
            responsible: responsible,
            priority: priority
        };

        tasks.push(task);

        addTaskToDOM(task);

        postTask(task);
        
        cleanFields();
    
    } else {
        alert("Please fill in all fields.");
    }
}

function addTaskToDOM(task){
    const newCard = document.createElement('div');

    newCard.classList.add('card', 'clickable-card');
    newCard.draggable = true;
    newCard.id = task.id;

    newCard.setAttribute('card-title', task.title);
    newCard.setAttribute('data-description', task.description);
    newCard.setAttribute('data-due-date', task.dueDate);
    newCard.setAttribute('data-status', task.status);
    newCard.setAttribute('card-tag', task.priority);
    newCard.setAttribute('data-responsible', task.responsible);
    // newCard.dataset.title = task.title;
    // newCard.dataset.description = task.description;
    // newCard.dataset.dueDate = task.dueDate;
    // newCard.dataset.status = task.status;
    // newCard.dataset.priority = task.priority;
    // newCard.dataset.responsible = task.responsible;

    newCard.innerHTML = `
        <header class="card-header">
            <a class="card-tag">${task.priority}</a>
        </header>
        <div class="card-content">
            <p class="card-title">${task.title}</p>
        </div>
    `;

    selectedColumn = getColumnForStatus(task.status);
    if (selectedColumn) {
        selectedColumn.querySelector('.tasks').appendChild(newCard);
        //selectedColumn.insertBefore(newCard, selectedColumn.querySelector('.column-footer'));
    }
}

function updateCard() {
    if (currentCard) {
        const title = document.getElementById('editCardTitle').value;
        const description = document.getElementById('editCardDescription').value;
        const dueDate = document.getElementById('editCardDueDate').value;
        const cardStatus = document.getElementById("editCardStatus").value;
        const responsible = document.getElementById('editCardResponsible').value;
        const priority = document.getElementById('editCardPriority').value;

        if (title && description && dueDate && responsible && priority) {
            
            // Actualizar el elemento en el DOM
            const oldStatus = currentCard.getAttribute('data-status');
            const newStatus = cardStatus;

            currentCard.querySelector('.card-title').textContent = title;
            currentCard.querySelector('.card-tag').textContent = priority;
            currentCard.setAttribute('data-description', description);
            currentCard.setAttribute('data-due-date', dueDate);
            currentCard.setAttribute('data-status', newStatus);
            currentCard.setAttribute('data-responsible', responsible);


            if (oldStatus !== newStatus) {
                const oldColumn = document.querySelector(`.column[data-status="${oldStatus}"]`);
                const newColumn = getColumnForStatus(newStatus);

                oldColumn.querySelector('.tasks').removeChild(currentCard);
                //oldColumn.removeChild(currentCard);

                newColumn.querySelector('.tasks').appendChild(currentCard);
                // newColumn.insertBefore(currentCard, newColumn.querySelector('.column-footer'));
            }

            // Actualizar el elemento correspondiente en el array tasks
            const cardId = currentCard.id;
            const taskIndex = tasks.findIndex(task => task.id === cardId);

            if (taskIndex !== -1) {
                tasks[taskIndex].title = title;
                tasks[taskIndex].description = description;
                tasks[taskIndex].dueDate = dueDate;
                tasks[taskIndex].status = newStatus;
                tasks[taskIndex].responsible = responsible;
                tasks[taskIndex].priority = priority;

                updateTask(tasks[taskIndex]); // en la bd
            }

            closeModals();
        } else {
            alert("Please fill in all fields.");
        }
    }
}

function deleteCard() {
    if (currentCard){
        const cardId = currentCard.id;
        deleteTask(cardId);
        deleteCardFromDOM();
        
        // Limpiar la referencia de la tarjeta actual
        currentCard = null;

        closeModals();
    }
}

function deleteTask(taskId) {
    // tasks = tasks.filter(task => task.id !== taskId);
    // loadTasks();

        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1); 
            deleteTask(tasks[taskIndex]); // en la bd
        }
}

function deleteCardFromDOM() {
    const status = currentCard.getAttribute('data-status');
    const column = getColumnForStatus(status);
    // column.removeChild(currentCard);
    column.querySelector('.tasks').removeChild(currentCard);
}

function updateCardStatus(cardId, newStatus) {
    const taskIndex = tasks.findIndex(task => task.id === cardId);

    if (taskIndex !== -1) {
        // Actualizar el estado en el array tasks
        tasks[taskIndex].status = newStatus;
        
        // Actualizar el estado en el DOM
        const card = document.getElementById(cardId);
        if (card) {
            card.setAttribute('data-status', newStatus);
        }

        // Actualizar en la bd
        updateTask(tasks[taskIndex]);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
}

function handleDragEnd(e) {
    e.target.style.display = 'block';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    const column = e.target.closest('.column');

    if (column && card) {
        const columnFooter = column.querySelector('.column-footer');
        column.insertBefore(card, columnFooter); 
        
        const newStatus = column.getAttribute('data-status');
        updateCardStatus(cardId, newStatus);
    }
}

// Event listeners

document.addEventListener('DOMContentLoaded', async () => {
    taskPromise = await fetchTasks(); 
    tasksPromise.then((incomingTask) =>{
        tasks = [...incomingTask];
        
        tasks.forEach((task) => {
            addTaskToDOM(task);
        })});

    loadTasks(tasks); 
});

// Abrir el modal para añadir una tarjeta nueva
addCardLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        openAddCardModal(link);
    });
});

// Cerrar los modales
modalCloseButtons.forEach(button => {
    button.addEventListener('click', closeModals);
});

// Añadir tarjeta nueva
addCardButton.addEventListener('click', addCard);

// Editar tarjeta
document.body.addEventListener('click', (event) => {
    const card = event.target.closest('.clickable-card');
    if (card) {
        openEditCardModal(card);
    }
});

// Actualizar tarjeta
updateCardButton.addEventListener('click', updateCard);

// Eliminar tarjeta
deleteCardButton.addEventListener('click', deleteCard);


// drag and drop
cards.forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
});

columns.forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('drop', handleDrop);
});

