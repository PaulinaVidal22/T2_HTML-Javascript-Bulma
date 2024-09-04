document.addEventListener('DOMContentLoaded', () => {
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

    // Función para añadir una tarjeta nueva
    function addCard() {
        const title = document.getElementById('cardTitle').value;
        const description = document.getElementById('cardDescription').value;
        const dueDate = document.getElementById('cardDueDate').value;
        const cardStatus = document.getElementById("cardStatus").value;
        const responsible = document.getElementById('cardResponsible').value;
        const priority = document.getElementById('cardPriority').value;

        if (title && description && dueDate && responsible && priority) {
            const newCard = document.createElement('div');
            newCard.classList.add('card', 'clickable-card');
            newCard.setAttribute('data-description', description);
            newCard.setAttribute('data-due-date', dueDate);
            newCard.setAttribute('data-status', cardStatus);
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

    // Función para obtener la columna correspondiente al estado
    function getColumnForStatus(status) {
        return document.querySelector(`.column[data-status="${status}"]`);
    }

    // Función para abrir el modal de edición de tarjeta
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


    // Función para actualizar la tarjeta editada
    function updateCard() {
        if (currentCard) {
            const title = document.getElementById('editCardTitle').value;
            const description = document.getElementById('editCardDescription').value;
            const dueDate = document.getElementById('editCardDueDate').value;
            const cardStatus = document.getElementById("editCardStatus").value;
            const responsible = document.getElementById('editCardResponsible').value;
            const priority = document.getElementById('editCardPriority').value;

            if (title && description && dueDate && responsible && priority) {

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

                closeModals();
            } else {
                alert("Please fill in all fields.");
            }
        }
    }

    function deleteCard() {
        if (currentCard){
            const status = currentCard.getAttribute('data-status');
            const column = getColumnForStatus(status);
            column.removeChild(currentCard);
        }

        closeModals();
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
});



