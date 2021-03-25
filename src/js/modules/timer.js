function timer(timerSelector,deadline) { // принимает селектор таймера и дедлайн
    // const deadline = '2021-05-21'
    // время в js исчисляется в миллисекундах
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); // здесь получим кол-во миллисекунд, разницу, которая осталась до дедлайна, из нашего дедлайна вычитаем текущее время на компьютере
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // находим кол-во дней до дедлайна, округляя число
        const hours = Math.floor((t / 1000 * 60 * 60) % 24); // общее кол-во часов делим на 24 часа и получаем остаток , 
        // которого не хватает до полных суток
        const minutes = Math.floor((t / 1000 / 60) % 60); // общее кол-во минут делим на 60 минут и получаем остаток минут от 0 до 59
        const seconds = Math.floor((t / 1000) % 60); // делим на минуты и получаем остаток в секундах от 0 до 59

        return { // создаем объект и возвращаем его из функции
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num; // будет добавлять ноль к числу, если оно меньше 10
        }
    }

    function setClock(selector, endtime) { // принимает селектор и время дедлайна
        const timer = document.querySelector(selector); // вытаскиваем таймер и другие элементы таймера
        const days = timer.querySelector('#days'); 
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000); // будем обновлять таймер каждую секунду

        updateClock(); // вызываем первый раз функцию заранее, чтобы не было моргания времени

        function updateClock() {
            const t = getTimeRemaining(endtime); // получаем нужное время, которое осталось до конца в виде объекта

            days.innerHTML = getZero(t.days); // получив объект с разными свойствами обращаемся к каждому свойству объекта поочередно
            // также записывая это свойство в переменную на странице
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // если все время истекло
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
                clearInterval(timeInterval); // если время уже вышло, то остановить таймер
            }
        }
    }
    setClock(timerSelector, deadline);
}

export default timer;