import "./slider";
import modalWindow from './modules/modalWindow';
import tabs from './modules/tabs';
import forms from './modules/forms';


document.addEventListener("DOMContentLoaded", () => { // назначаем глобальный обработчик событий - наши скрипты будут выполняться, когда наша дом структура на старнцие готова
    modalWindow();
    tabs('.glazing_slider','.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click'); // строгое соответствие в селекторе
    forms();
  });

