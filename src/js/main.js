import "./slider";
import modalWindow from './modules/modalWindow';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';

document.addEventListener("DOMContentLoaded", () => { // назначаем глобальный обработчик событий - наши скрипты будут выполняться, когда наша дом структура на старнцие готова
    
    let modalState = {};// объект с данными для отправки с нескольких модальных окон
    changeModalState(modalState); // постоянно изменяем глобальное состояние
    modalWindow();
    tabs('.glazing_slider','.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click'); // строгое соответствие в селекторе
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    forms(modalState);
    timer();
  });

