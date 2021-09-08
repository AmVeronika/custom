const CLASS_NAME_SELECT = 'select'; //общий блок сортировки
const CLASS_NAME_ACTIVE = 'select_show'; // класс для отображения выподающего меню
const CLASS_NAME_SELECTED = 'select__option_selected'; // класс добавляется выбранному элементу
const SELECTOR_ACTIVE = '.select_show';
const SELECTOR_DATA = '[data-select]'; // атрибут определяет действие открытие меню или эллемент находится в выпадающем списке
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';//атрибута data-select="toggle" определяет открытие выпадающего списка
const SELECTOR_OPTION_SELECTED = '.select__option_selected';

let buttonToggle = document.querySelectorAll(SELECTOR_DATA);//все эллементы data-select
let select = document.querySelector('.select');// общий див
let selected;//выбранный элемент
let elToggle = document.querySelector(SELECTOR_DATA_TOGGLE);// Кнопка, куда выводится выбранный элемент

buttonToggle.forEach(but => { // событие клик на кнопки с data-select
   but.addEventListener('click', onClick);
})


function onClick(e) {//нажатие на кнопки data-select
   const target = e.target; // получение кнопки на которую нажали с data-select
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
   if (option.classList.contains(CLASS_NAME_SELECTED)) { // Если на жали на уже выбранный элемент
      return;
   }
   update(option);
   toggle();  // скрывает список с опциями
   // console.log('changeValue');
}

function update(option) { // обновляет значения атрибутов в зависимости от выбранной опции, генерирует событие 'select.change' 

   buttonToggle.forEach(but => { // Получили предыдущий выбранный элемент
      if (but.classList.contains(CLASS_NAME_SELECTED)) {
         selected = but;
      }
   });
   if (selected) { // Удалили у предыдущего выбранного элемента класс 
      selected.classList.remove(CLASS_NAME_SELECTED);
   }
   option.classList.add(CLASS_NAME_SELECTED); // Новому выбранному элементу добавили класс
   elToggle.value = option.dataset['value'];
   elToggle.dataset.index = option.dataset['index'];
   // elToggle.dispatchEvent(new CustomEvent('select.change'));//CustomEvent имеет дополнительное свойство detail,  в котором можно указывать информацию для передачи в событие.
   elToggle.innerHTML = '';
   elToggle.innerHTML = option.innerHTML; // отображение выбранного элемента в селекте 
   
}
document.addEventListener('click', (e) => { // для закрытия открытого селекта при клике вне его
   if (!e.target.closest('.select')) {
     document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
       select.classList.remove(CLASS_NAME_ACTIVE);
     });
   }
 });