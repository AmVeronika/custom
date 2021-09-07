const CLASS_NAME_SELECT = 'select'; //общий блок сортировки
const CLASS_NAME_ACTIVE = 'select_show'; // класс для отображения выподающего меню
const CLASS_NAME_SELECTED = 'select__option_selected'; // класс добавляется выбранному элементу
const SELECTOR_ACTIVE = '.select_show';
const SELECTOR_DATA = '[data-select]'; // атрибут определяет действие открытие меню или эллемент находится в выпадающем списке
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';//атрибута data-select="toggle" определяет открытие выпадающего списка
const SELECTOR_OPTION_SELECTED = '.select__option_selected';

// value – позволяет как получить выбранную опцию, так и установить её;
// selectedIndex – индекс выбранного элемента (нумерация начинается с 0);
// show() – показывает выпадающий список с опциями;
// hide() – скрывает dropdown меню;
// toggle() – переключает видимость выпадающего меню;
// dispose() - удаляет обработчики событий, связанных с этим селектом.


let buttonToggle = document.querySelectorAll(SELECTOR_DATA);//все эллементы data-select
let select = document.querySelector('.select');


buttonToggle.forEach(but => {
   but.addEventListener('click', onClick);
})


function onClick(e) {//нажатие на кнопку(открыть)
   const target = e.target; // получение кнопки на которую нажали
   const type = target.closest(SELECTOR_DATA).dataset.select; //  значение (data-select)
   switch (type) {
      case 'toggle':
         toggle();// переключает список с опциями
         break;
      case 'option':
         changeValue(target);// при изменении выбранной опции
         break;
   }
}
function toggle() { // раскрывает/скрывает выпадающий список
   select.classList.toggle(CLASS_NAME_ACTIVE);
}

function changeValue(option) {// при изменении выбранной опции
   console.log(option);
   if (option.classList.contains(CLASS_NAME_SELECTED)) {
      return;
    }
    update(option);
    hide();  // скрывает список с опциями



   console.log('changeValue');
}