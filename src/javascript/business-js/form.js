
document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // ELEMENTOS DO FORMULÁRIO
    // =====================================

    const form = document.querySelector('.form-wizard');

    const progress = form.querySelector('.progress');
    const stepsContainer = form.querySelector('.steps-container');
    const steps = form.querySelectorAll('.step');
    const stepsIndicators = form.querySelectorAll('.progress-container li');

    const prevButton = form.querySelector('.prev-btn');
    const nextButton = form.querySelector('.next-btn');
    const submitButton = form.querySelector('.submit-btn');

    document.documentElement.style.setProperty(
        "--steps",
        stepsIndicators.length
    );

    let currentStep = 0;


    // =====================================
    // ATUALIZAR PROGRESSO
    // =====================================

    const updateProgress = () => {

        let width = currentStep / (stepsIndicators.length - 1);

        progress.style.transform = `scaleX(${width})`;

        // Atualizar indicadores
        stepsIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('current', currentStep === index);
            indicator.classList.toggle('done', currentStep > index);
        });

        // Atualizar etapas
        steps.forEach((step, index) => {
            step.style.transform = `translateX(-${currentStep * 100}%)`;
            step.classList.toggle('current', currentStep === index);
        });

        updateButton();

        // Calcular a altura depois de atualizar as etapas
        requestAnimationFrame(() => {
            const activeStep = steps[currentStep];

            stepsContainer.style.height =
                `${activeStep.getBoundingClientRect().height}px`;
        });
    };


    // =====================================
    // ATUALIZAR BOTÕES
    // =====================================

    const updateButton = () => {

        prevButton.hidden = currentStep === 0;

        nextButton.hidden =
            currentStep >= stepsIndicators.length - 1;

        submitButton.hidden = !nextButton.hidden;
    };


    // =====================================
    // VALIDAR ETAPA ATUAL
    // =====================================

    const isValidStep = () => {

        const fields = steps[currentStep].querySelectorAll(
            'input, textarea'
        );

        return [...fields].every((field) => field.reportValidity());
    };


    // =====================================
    // ABRIR MODAL
    // =====================================

    const openModais = document.querySelectorAll('.open-modal');

    openModais.forEach(openModal => {

        openModal.addEventListener('click', () => {

            const modalId = openModal.getAttribute('data-modal');

            const modal = document.getElementById(modalId);

            modal.showModal();

            requestAnimationFrame(() => {
                updateProgress();
            });

        });

    });


    // =====================================
    // FECHAR MODAL
    // =====================================

    const closeModais = document.querySelectorAll('.close-modal');

    closeModais.forEach(closeModal => {

        closeModal.addEventListener('click', () => {

            const modalId = closeModal.getAttribute('data-modal');

            const modal = document.getElementById(modalId);

            modal.close();

        });

    });


    // =====================================
    // EVENTOS DOS INPUTS
    // =====================================

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {

        input.addEventListener('focus', (e) => {

            const focusedElement = e.target;

            const focusedStep = [...steps].findIndex(step =>
                step.contains(focusedElement)
            );

            if (focusedStep !== -1 && focusedStep !== currentStep) {

                if (!isValidStep()) {
                    return;
                }

                currentStep = focusedStep;

                updateProgress();

                stepsContainer.scrollTop = 0;
                stepsContainer.scrollLeft = 0;

            }

        });

    });


    // =====================================
    // ENVIAR FORMULÁRIO
    // =====================================

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        if (!form.checkVisibility()) return;

        const formData = new FormData(form);

        console.log(Object.fromEntries(formData));

        submitButton.disabled = true;

        submitButton.textContent = 'Submitting...';

        setTimeout(() => {

            document.querySelector('.completed').hidden = false;

        });

    });


    // =====================================
    // BOTÃO ANTERIOR
    // =====================================

    prevButton.addEventListener('click', (e) => {

        e.preventDefault();

        if (currentStep > 0) {

            currentStep--;

            updateProgress();

        }

    });


    // =====================================
    // BOTÃO SEGUINTE
    // =====================================

    nextButton.addEventListener('click', (e) => {

        e.preventDefault();

        if (!isValidStep()) return;

        if (currentStep < stepsIndicators.length - 1) {

            currentStep++;

            updateProgress();

        }

    });


    // =====================================
    // INICIALIZAR
    // =====================================

    updateProgress();

});
