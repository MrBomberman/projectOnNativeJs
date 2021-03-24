function checkNumInputs(selector) {
    const numInputs = document.querySelectorAll(selector);
    
    numInputs.forEach(item => {
        item.addEventListener('input', () => { // каждый раз, когда пользователь что-то вводит, запускаем функцию
            item.value = item.value.replace(/\D/, '') // ищем все не цифры и меняем на пустую строку
        })
    });
}

export default checkNumInputs;