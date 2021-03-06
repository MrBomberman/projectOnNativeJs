import checkNumInputs from './checkNumInputs';

function forms(state) {
    const form = document.querySelectorAll('form'); // получаем по тегу
    const inputs = document.querySelectorAll('input');
    // const phoneInputs = document.querySelectorAll('input[name="user_phone"]'); // берем все инпуты телефонных номеров со свойством name

    checkNumInputs('input[name="user_phone"]');



    const message = {
        loading: 'Loading....',
        success: 'Thank you! We will call you as soon as possible',
        failure: 'Something went wrong'
    };

    //  нужен адрес и данные, которые будут уходить на сервер
    async function postData(url, data) { // этот блок создается только в момент отправки
        document.querySelector('.status').innerHTML = message.loading;
        
        let res = await fetch(url,{
            method: 'POST',
            body: data // отправляем наши данные
        });

        return await res.text();
        // вернется промис  - уже отдаст текстовый формат

    };

    function clearInputs() {
        inputs.forEach(item => {
            item.value = ''; // очищаем все инпуты
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) =>{ // мы подтверждаем эту форму
            e.preventDefault(); // теперь в момент отправки данных страница перезагружаться не будет

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');

            item.appendChild(statusMessage); // помещаем созданный блок в конец нашей формы
            // собираем все данные с формы
            const formData = new FormData(item); // во внутрь помещаем форму, из которой хотим вытащить все данные
            // объект найдет все инпуты, соберет все данные в специальную структуру и мы ее поместим в переменную

            if (item.getAttribute('[data-calc]') === 'end') { // проверяем та ли форма нам пришла
                for (let key in state) { // перебираем каждую пару в объекте и помещаем в нашу formData
                    formData.append(key, state[key]); // передаем ключ и его значение
                }
            }

            // отправляем запрос на сервер с определенными данными
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove(); // просто удаляем элемент со страницы
                    }, 5000)
                });

        })
    });
}

export default forms;