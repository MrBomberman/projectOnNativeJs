function modalWindow() {
    function addClassesForModal(btnSelector, modalSelector, closeModalSelector) {

        const btnCall = document.querySelectorAll(btnSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeModalSelector);

        btnCall.forEach(btn => {
            btn.addEventListener('click', () => { // на несколько одинаковых элементов вешаем одну функцию
                openModal();
            })
        })

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden'; // чтобы скролилось только модальное окно, а не весь сайт
        }
    
        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        close.addEventListener('click', () => {
            closeModal();
        })
    
    
        modal.addEventListener('click', (e) => { // обязательно следует передать событие
            if (e.target === modal) { // e.taget - то , куда кликнул пользователь, отслеживает
            // если элемент, куда мы кликнули строго равен элементу, который мы показывали - то мы его будем закрывать
            // когда мы кликаем вне окна - объект события и есть все модальное окно, но как только мы кликаем во внутрь модального окна - здесь e.target будет уже один из элементов внутри модального окна, а не оно само
               closeModal();
            }
        });
    
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) { // и если модальное окно открыто
                closeModal();
            } // отслеживает код кнопки на клавиатуре, которую мы нажимаем
        });
    
    }

    function showModalByTime(selector, time){
        setTimeout(() => {
            document.querySelector(selector).classList.add('show');
            document.body.style.overflow = 'hidden';
        }, time)
    }


    addClassesForModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
    addClassesForModal('.phone_link','.popup', '.popup .popup_close' );
    // showModalByTime('.popup', 12000)
}

export default modalWindow;