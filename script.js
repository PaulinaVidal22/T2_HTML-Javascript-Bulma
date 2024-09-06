const tasks = [];

document.addEventListener('DOMContentLoaded', () => {
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

    // Función para abrir el modal para añadir una tarjeta nueva
    function openAddCardModal(link) {
        currentColumn = link.closest('.column');
        addCardModal.classList.add('is-active');
    }

    // Función para cerrar los modales
    function closeModals() {
        addCardModal.classList.remove('is-active');
        editCardModal.classList.remove('is-active');
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

    function addCard() {

        const title = document.getElementById('cardTitle').value;
        const description = document.getElementById('cardDescription').value;
        const dueDate = document.getElementById('cardDueDate').value;
        const cardStatus = document.getElementById("cardStatus").value;
        const responsible = document.getElementById('cardResponsible').value;
        const priority = document.getElementById('cardPriority').value;

        if (title && description && dueDate && responsible && priority) {
            
            // Agregar la tarea al array
            let cardId;
            do {
                // Generar un ID único para la tarjeta
                cardId = 'card-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            } while (tasks.some(task => task.id === cardId));  // Verificar que el ID no esté ya en uso

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


            // Agregar la tarea en el DOM
            const newCard = document.createElement('div');

            newCard.classList.add('card', 'clickable-card');
            newCard.draggable = true;
            newCard.id = cardId;

            newCard.setAttribute('card-title', title);
            newCard.setAttribute('data-description', description);
            newCard.setAttribute('data-due-date', dueDate);
            newCard.setAttribute('data-status', cardStatus);
            newCard.setAttribute('card-tag', priority);
            newCard.setAttribute('data-responsible', responsible);
            
            newCard.innerHTML = `
                <header class="card-header">
                    <a class="card-tag">${priority}</a>
                </header>
                <div class="card-content">
                    <p class="card-title">${title}</p>
                </div>
            `;
            
            selectedColumn = getColumnForStatus(cardStatus);
            selectedColumn.insertBefore(newCard, selectedColumn.querySelector('.column-footer'));

            // Limpiar los campos y cerrar el modal
            document.getElementById('cardTitle').value = '';
            document.getElementById('cardDescription').value = '';
            document.getElementById('cardDueDate').value = '';
            document.getElementById('cardResponsible').value = '';
            document.getElementById('cardPriority').value = '';

            closeModals();
        } else {
            alert("Please fill in all fields.");
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

                    oldColumn.removeChild(currentCard);

                    newColumn.insertBefore(currentCard, newColumn.querySelector('.column-footer'));
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
                }

                closeModals();
            } else {
                alert("Please fill in all fields.");
            }
        }
    }

    function deleteCard() {
        if (currentCard){

            // Eliminar la tarjeta del DOM
            const status = currentCard.getAttribute('data-status');
            const column = getColumnForStatus(status);
            column.removeChild(currentCard);

            // Eliminar la tarea en el array tasks
            const cardId = currentCard.id;
            
            const taskIndex = tasks.findIndex(task => task.id === cardId);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1); 
            }

            // Limpiar la referencia de la tarjeta actual
            currentCard = null;

            closeModals();
        }
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
    
});



