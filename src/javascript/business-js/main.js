// secção de modal

// open modal
const openModais = document.querySelectorAll('.open-modal');
openModais.forEach(openModal => {
    openModal.addEventListener('click', () => {
        const modalId = openModal.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.showModal();
    });
});

// close modal
const closeModais = document.querySelectorAll('.close-modal');
closeModais.forEach(closeModal => {
    closeModal.addEventListener("click", () => {
        const modalId = closeModal.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.close();
    });
});
