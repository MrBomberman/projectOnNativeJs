function images(){
    const imgPopup = document.createElement('div'); // создаем модальное окно
    const workSection = document.querySelector('.works') // получаем всю секцию картинок
    const bigImg = document.createElement('img'); // создаем картинку

    imgPopup.classList.add('popup'); // добавляем класс нашему модальному окну
    workSection.appendChild(imgPopup); // помещаем модалку в нашу секцию картинок

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center'; // чтобы элементы были по центру модалки
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImg);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target; // то, куда мы нажали

        if(target && target.classList.contains('preview')){ // проверяем, есть ли в элементе, в который мы кликнули определенный класс
            imgPopup.style.display = 'flex'; // если правильно нажали, показываю модальное окно
            document.body.style.overflow = 'hidden';
            const path = target.parentNode.getAttribute('href'); // обращаемся к родителю элемента, куда кликнули и ищем нужный атрибут, вытаскиваем оттуда нужные данные
            bigImg.setAttribute('src', path) // задаем данные атрибуту нашей картинки из полученных данных с родителя элемента, в который кликнули
            bigImg.style.width = '650px'
        }

        if(target && target.matches('div.popup')){ // проверяем клик на подложку
            imgPopup.style.display = 'none'; // скрываем модальное окно
            document.body.style.overflow = '';
        }
    })
}

export default images;