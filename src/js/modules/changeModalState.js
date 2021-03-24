import checkNumInputs from './checkNumInputs';

function changeModalState(state) {
    // получаем все элементы, данные которых нам необходимы
    const windowForm = document.querySelectorAll('.balcon_icons_img'); // форма(окна..)
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height') // получаем высоту окна
    const windowType = document.querySelectorAll('#view_type') // тип окна
    const windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');
    // даже если будет всего один элемент в псевдомассиве, forEach все равно правильно отработает
    function bindActionToElements(event, element, prop){
        element.forEach((item , i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName){ // вернет имя текущей ноды - тега
                    case 'SPAN' :
                        state[prop] = i // передаем элемент, на который кликнули, в состояние формы, которое в процессе и создали
                        break;
                    case 'INPUT' :
                        if(item.getAttribute('type') === 'checkbox'){ // условие выполнится только при клике в чекбокс
                            i === 0 ? state[prop] = 'Cold' : state[prop] = 'Warm'; // проверяем по id элемента, так как их у нас всего два 
                            element.forEach((box, j) => {
                                box.checked = false; // снимаем галочки со всех
                                if ( i == j) { // если совпадает по id галочку оставляем
                                    box.checked = true;
                                }
                            }); // перебираем все checkbox проверяя их на наличие галочки, чтобы можно было выбрать только один элемент
                        } else{
                            state[prop] = item.value; // если передает всего один элемент, вытаскиваем из него то, что ввели в поле
                        }    
                        break;

                    case 'SELECT':
                        state[prop] = item.value; // value выбранного текста
                         break;

                }
                console.log(state);    
            });
        })
    }

    bindActionToElements('click', windowForm, 'form');
    bindActionToElements('input', windowWidth, 'width');
    bindActionToElements('input', windowHeight, 'height');
    bindActionToElements('change', windowType, 'type');
    bindActionToElements('change', windowProfile, 'profile');



}

export default changeModalState;