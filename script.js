// document.addEventListener('DOMContentLoaded', () => {
//     // Seleccionamos todos los enlaces para añadir tarjetas
//     const addCardLinks = document.querySelectorAll('.column-footer-item');

//     // Iteramos sobre los enlaces y les añadimos un evento de clic
//     addCardLinks.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();
            
//             // Obtener el contenedor de la columna correspondiente
//             const column = link.closest('.column');

//             // Crear un nuevo elemento de tarjeta
//             const newCard = document.createElement('div');
//             newCard.classList.add('card');
//             newCard.innerHTML = `
//                 <div class="card-content">
//                     <div class="content">Nueva tarjeta</div>
//                 </div>
//             `;

//             // Insertar la nueva tarjeta antes del pie de columna
//             column.insertBefore(newCard, column.querySelector('.column-footer'));
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const addCardLinks = document.querySelectorAll('.column-footer-item');
//     const modal = document.getElementById('addCardModal');
//     const modalCloseButton = modal.querySelector('.modal-close');
//     const addCardButton = document.getElementById('addCardButton');
//     let currentColumn;

//     addCardLinks.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();

//             // Guardamos la columna actual para añadir la tarjeta después
//             currentColumn = link.closest('.column');

//             // Mostramos el modal
//             modal.classList.add('is-active');
//         });
//     });

//     // Cerrar el modal cuando se hace clic en el botón de cerrar
//     modalCloseButton.addEventListener('click', () => {
//         modal.classList.remove('is-active');
//     });

//     // Añadir tarjeta cuando se hace clic en el botón de "Añadir"
//     addCardButton.addEventListener('click', () => {
//         const title = document.getElementById('cardTitle').value;
//         const description = document.getElementById('cardDescription').value;

//         if (title && description) {
//             // Crear la nueva tarjeta
//             const newCard = document.createElement('div');
//             newCard.classList.add('card');
//             newCard.innerHTML = `
//                 <div class="card-content">
//                     <p class="title">${title}</p>
//                     <div class="content">${description}</div>
//                 </div>
//             `;

//             // Añadir la tarjeta a la columna correspondiente
//             currentColumn.insertBefore(newCard, currentColumn.querySelector('.column-footer'));

//             // Limpiar los campos del modal
//             document.getElementById('cardTitle').value = '';
//             document.getElementById('cardDescription').value = '';

//             // Cerrar el modal
//             modal.classList.remove('is-active');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const addCardLinks = document.querySelectorAll('.column-footer-item');
    const modal = document.getElementById('addCardModal');
    const modalCloseButton = modal.querySelector('.modal-close');
    const addCardButton = document.getElementById('addCardButton');
    let currentColumn;

    addCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Guardamos la columna actual para añadir la tarjeta después
            currentColumn = link.closest('.column');

            // Mostramos el modal
            modal.classList.add('is-active');
        });
    });

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    modalCloseButton.addEventListener('click', () => {
        modal.classList.remove('is-active');
    });

    // Añadir tarjeta cuando se hace clic en el botón de "Añadir"
    addCardButton.addEventListener('click', () => {
        const title = document.getElementById('cardTitle').value;
        const description = document.getElementById('cardDescription').value;
        const dueDate = document.getElementById('cardDueDate').value;
        const cardStatus = document.getElementById("cardStatus").value;
        const responsible = document.getElementById('cardResponsible').value;
        const priority = document.getElementById('cardPriority').value;

        if (title && description && dueDate && responsible && priority) {
            // Crear la nueva tarjeta
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.innerHTML = `
                <div class="card-content">
                    <p class="title">${title}</p>
                    <div class="content">${description}</div>
                    <p><strong>Fecha de vencimiento:</strong> ${dueDate}</p>
                    <p><strong>Estado:</strong> ${cardStatus}</p>
                    <p><strong>Responsable:</strong> ${responsible}</p>
                    <p><strong>Prioridad:</strong> ${priority}</p>
                </div>
            `;

            // Añadir la tarjeta a la columna correspondiente
            //currentColumn.insertBefore(newCard, currentColumn.querySelector('.column-footer'));
            column.appendChild(card);

            // Limpiar los campos del modal
            document.getElementById('cardTitle').value = '';
            document.getElementById('cardDescription').value = '';
            document.getElementById('cardDueDate').value = '';
            document.getElementById('cardResponsible').value = '';
            document.getElementById('cardPriority').value = 'media';

            // Cerrar el modal
            modal.classList.remove('is-active');
        }
    });
});
