function modalWindow() {

    const btnCallMeasurer = document.querySelector('.popup_engineer_btn')
    const modal = document.querySelector('.popup_engineer')

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    btnCallMeasurer.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    })

    modal.addEventListener('click', (e) => { // обязательно следует передать событие
        if (e.target === modal || e.target.matches('.popup_engineer .popup_close') =='') { // e.taget - то , куда кликнул пользователь, отслеживает
           closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { // и если модальное окно открыто
            closeModal();
        } // отслеживает код кнопки на клавиатуре, которую мы нажимаем
    });



}

export default modalWindow;