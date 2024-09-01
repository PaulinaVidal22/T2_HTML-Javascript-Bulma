
document.addEventListener('DOMContentLoaded', () => {
    const addCardLinks = document.querySelectorAll('.column-footer-item');
    const addCardModal = document.getElementById('addCardModal');
    const editCardModal = document.getElementById('editCardModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const addCardButton = document.getElementById('addCardButton');
    const updateCardButton = document.getElementById('updateCardButton');
    let currentColumn;
    let currentCard;

    // Abrir el modal para añadir una tarjeta nueva
    addCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentColumn = link.closest('.column');
            addCardModal.classList.add('is-active');
        });
    });

    // Cerrar los modales
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            addCardModal.classList.remove('is-active');
            editCardModal.classList.remove('is-active');
        });
    });

    // Añadir tarjeta nueva
    addCardButton.addEventListener('click', () => {
        const title = document.getElementById('cardTitle').value;
        const description = document.getElementById('cardDescription').value;
        const dueDate = document.getElementById('cardDueDate').value;
        const cardStatus = document.getElementById("cardStatus").value;
        const responsible = document.getElementById('cardResponsible').value;
        const priority = document.getElementById('cardPriority').value;

        if (title && description && dueDate && responsible && priority) {
            const newCard = document.createElement('div');
            newCard.classList.add('card', 'clickable-card');
            // newCard.innerHTML = `
            //     <div class="card-content">
            //         <p class="title">${title}</p>
            //         <div class="content">${description}</div>
            //         <p><strong>Due Date:</strong> ${dueDate}</p>
            //         <p><strong>Status:</strong> ${cardStatus}</p>
            //         <p><strong>Assigned to:</strong> ${responsible}</p>
            //         <p><strong>Priority:</strong> ${priority}</p>
            //     </div>
            //     <button class="button is-small is-info edit-card">Edit</button>
            // `;
            newCard.innerHTML = `
            <header class="card-header">
                <a class="card-tag">${priority}</a>
            </header>
            <div class="card-content">
                <p class="card-title">${title}</p>
            </div>
        `;
            
            // currentColumn.appendChild(newCard);
            currentColumn.insertBefore(newCard, currentColumn.querySelector('.column-footer'));

            // Limpiar los campos y cerrar el modal
            document.getElementById('cardTitle').value = '';
            document.getElementById('cardDescription').value = '';
            document.getElementById('cardDueDate').value = '';
            document.getElementById('cardResponsible').value = '';
            document.getElementById('cardPriority').value = '';

            addCardModal.classList.remove('is-active');
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Editar tarjeta
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-card')) { // clickable-card
            const card = event.target.closest('.card');
            currentCard = card;
            const title = card.querySelector('.title').textContent;
            const description = card.querySelector('.content').textContent;
            const dueDate = card.querySelector('p:nth-of-type(1)').textContent.split(": ")[1];
            const status = card.querySelector('p:nth-of-type(2)').textContent.split(": ")[1];
            const responsible = card.querySelector('p:nth-of-type(3)').textContent.split(": ")[1];
            const priority = card.querySelector('p:nth-of-type(4)').textContent.split(": ")[1];

            document.getElementById('editCardTitle').value = title;
            document.getElementById('editCardDescription').value = description;
            document.getElementById('editCardDueDate').value = dueDate;
            document.getElementById('editCardStatus').value = status;
            document.getElementById('editCardResponsible').value = responsible;
            document.getElementById('editCardPriority').value = priority;

            editCardModal.classList.add('is-active');
        }
    });

    // Actualizar tarjeta
    updateCardButton.addEventListener('click', () => {
        if (currentCard) {
            const title = document.getElementById('editCardTitle').value;
            const description = document.getElementById('editCardDescription').value;
            const dueDate = document.getElementById('editCardDueDate').value;
            const cardStatus = document.getElementById("editCardStatus").value;
            const responsible = document.getElementById('editCardResponsible').value;
            const priority = document.getElementById('editCardPriority').value;

            if (title && description && dueDate && responsible && priority) {
                currentCard.innerHTML = `
                    <div class="card-content">
                        <p class="title">${title}</p>
                        <div class="content">${description}</div>
                        <p><strong>Due Date:</strong> ${dueDate}</p>
                        <p><strong>Status:</strong> ${cardStatus}</p>
                        <p><strong>Assigned to:</strong> ${responsible}</p>
                        <p><strong>Priority:</strong> ${priority}</p>
                    </div>
                    <button class="button is-small is-info edit-card">Edit</button>
                `;

                editCardModal.classList.remove('is-active');
            } else {
                alert("Please fill in all fields.");
            }
        }
    });
});



