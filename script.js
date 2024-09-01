
// document.addEventListener('DOMContentLoaded', () => {
//     const addCardLinks = document.querySelectorAll('.column-footer-item');
//     const addCardModal = document.getElementById('addCardModal');
//     const editCardModal = document.getElementById('editCardModal');
//     const modalCloseButtons = document.querySelectorAll('.modal-close');
//     const addCardButton = document.getElementById('addCardButton');
//     const updateCardButton = document.getElementById('updateCardButton');
//     let currentColumn;
//     let currentCard;

//     // Abrir el modal para añadir una tarjeta nueva
//     addCardLinks.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();
//             currentColumn = link.closest('.column');
//             addCardModal.classList.add('is-active');
//         });
//     });

//     // Cerrar los modales
//     modalCloseButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             addCardModal.classList.remove('is-active');
//             editCardModal.classList.remove('is-active');
//         });
//     });

//     // Añadir tarjeta nueva
//     addCardButton.addEventListener('click', () => {
//         const title = document.getElementById('cardTitle').value;
//         const description = document.getElementById('cardDescription').value;
//         const dueDate = document.getElementById('cardDueDate').value;
//         const cardStatus = document.getElementById("cardStatus").value;
//         const responsible = document.getElementById('cardResponsible').value;
//         const priority = document.getElementById('cardPriority').value;

//         if (title && description && dueDate && responsible && priority) {
//             const newCard = document.createElement('div');
//             newCard.classList.add('card', 'clickable-card');
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
//             newCard.innerHTML = `
//             <header class="card-header">
//                 <a class="card-tag">${priority}</a>
//             </header>
//             <div class="card-content">
//                 <p class="card-title">${title}</p>
//             </div>
//         `;
            
//             // currentColumn.appendChild(newCard);
//             currentColumn.insertBefore(newCard, currentColumn.querySelector('.column-footer'));

//             // Limpiar los campos y cerrar el modal
//             document.getElementById('cardTitle').value = '';
//             document.getElementById('cardDescription').value = '';
//             document.getElementById('cardDueDate').value = '';
//             document.getElementById('cardResponsible').value = '';
//             document.getElementById('cardPriority').value = '';

//             addCardModal.classList.remove('is-active');
//         } else {
//             alert("Please fill in all fields.");
//         }
//     });

//     // Editar tarjeta
//     document.body.addEventListener('click', (event) => {
//             const card = event.target.closest('.clickable-card');
//             currentCard = card;
//             const title = card.querySelector('.title').textContent;
//             const description = card.querySelector('.content').textContent;
//             const dueDate = card.querySelector('p:nth-of-type(1)').textContent.split(": ")[1];
//             const status = card.querySelector('p:nth-of-type(2)').textContent.split(": ")[1];
//             const responsible = card.querySelector('p:nth-of-type(3)').textContent.split(": ")[1];
//             const priority = card.querySelector('p:nth-of-type(4)').textContent.split(": ")[1];

//             document.getElementById('editCardTitle').value = title;
//             document.getElementById('editCardDescription').value = description;
//             document.getElementById('editCardDueDate').value = dueDate;
//             document.getElementById('editCardStatus').value = status;
//             document.getElementById('editCardResponsible').value = responsible;
//             document.getElementById('editCardPriority').value = priority;

//             editCardModal.classList.add('is-active');
//     });

//     // Actualizar tarjeta
//     updateCardButton.addEventListener('click', () => {
//         if (currentCard) {
//             const title = document.getElementById('editCardTitle').value;
//             const description = document.getElementById('editCardDescription').value;
//             const dueDate = document.getElementById('editCardDueDate').value;
//             const cardStatus = document.getElementById("editCardStatus").value;
//             const responsible = document.getElementById('editCardResponsible').value;
//             const priority = document.getElementById('editCardPriority').value;

//             if (title && description && dueDate && responsible && priority) {
//                 currentCard.innerHTML = `
//                     <div class="card-content">
//                         <p class="title">${title}</p>
//                         <div class="content">${description}</div>
//                         <p><strong>Due Date:</strong> ${dueDate}</p>
//                         <p><strong>Status:</strong> ${cardStatus}</p>
//                         <p><strong>Assigned to:</strong> ${responsible}</p>
//                         <p><strong>Priority:</strong> ${priority}</p>
//                     </div>
//                     <button class="button is-small is-info edit-card">Edit</button>
//                 `;

//                 editCardModal.classList.remove('is-active');
//             } else {
//                 alert("Please fill in all fields.");
//             }
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const addCardLinks = document.querySelectorAll('.column-footer-item');
    const addCardModal = document.getElementById('addCardModal');
    const editCardModal = document.getElementById('editCardModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const addCardButton = document.getElementById('addCardButton');
    const updateCardButton = document.getElementById('updateCardButton');
    let currentColumn;
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
            

            currentColumn.insertBefore(newCard, currentColumn.querySelector('.column-footer'));

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
                currentCard.querySelector('.card-title').textContent = title;
                currentCard.querySelector('.card-tag').textContent = priority;
                currentCard.setAttribute('data-description', description);
                currentCard.setAttribute('data-due-date', dueDate);
                currentCard.setAttribute('data-status', cardStatus);
                currentCard.setAttribute('data-responsible', responsible);

                closeModals();
            } else {
                alert("Please fill in all fields.");
            }
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
});



