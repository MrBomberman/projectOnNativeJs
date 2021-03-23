function tabs(headerSelector, tabSelector, contentSelector, activeClass, display= 'block') {

    const header = document.querySelector(headerSelector); // блок, который объединяет все табы
    const tab = document.querySelectorAll(tabSelector); // чтобы поулчить сразу все табы
    const content = document.querySelectorAll(contentSelector); // чтобы получить сразу все контенты

    // функция скрывает весь контент и убирает класс активности у ненужных табов
    function hideTabContent() { // здесь лежит коллекция контента
        content.forEach(item => {
            item.style.display = 'none'; // скрываем весь контент который есть
        })

        tab.forEach(item => {
            item.classList.remove(activeClass) // убираем класс активности у всех табов
        })
    }

    function showTabContent(i = 0) { // будем показывать по индексу определенный контент
        content[i].style.display = display

        tab[i].classList.add(activeClass) // даем класс активности определенному табу
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => { // обработчик события на область со всеми табами
        const target = e.target // тот элемент, куда кликнул пользователь
        if ( target &&
            target.classList.contains(tabSelector.replace(/\./, '')) ||  // находим точку и меняем ее на пустое поле -
        target.parentNode.classList.contains(tabSelector.replace(/\./, ''))){ // мы можем кликнуть не только в элемент по селектору, но и во внутрь его, элемент который будет относится к нашему селектору
        // проверяем куда кликнул пользователь при помощи класса таба
            tab.forEach((item, i) => { // перебираем все табы с индексом
                if(target == item || target.parentNode == item) { // если мы кликнули в элемент, который сейчас перебирается
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    })
};

export default tabs;