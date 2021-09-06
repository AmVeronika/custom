const CLASS_NAME_SELECT = 'select';
const CLASS_NAME_ACTIVE = 'select_show';
const CLASS_NAME_SELECTED = 'select__option_selected';
const SELECTOR_ACTIVE = '.select_show';
const SELECTOR_DATA = '[data-select]';
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
const SELECTOR_OPTION_SELECTED = '.select__option_selected';

// value – позволяет как получить выбранную опцию, так и установить её;
// selectedIndex – индекс выбранного элемента (нумерация начинается с 0);
// show() – показывает выпадающий список с опциями;
// hide() – скрывает dropdown меню;
// toggle() – переключает видимость выпадающего меню;
// dispose() - удаляет обработчики событий, связанных с этим селектом.







class CustomSelect {
  constructor(target, params) {
    this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    if (this._params['options']) {
      this._elRoot.classList.add(CLASS_NAME_SELECT);
      this._elRoot.innerHTML = CustomSelect.template(this._params);
    }
    this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);
    this._elRoot.addEventListener('click', this._onClick.bind(this));
  }
  _onClick(e) {// Нажатие (открытие селекта)
    const target = e.target; // получение данных с отображаемого на данный момент элемента
    const type = target.closest(SELECTOR_DATA).dataset.select; // Поиск ближайшего элемента с селектом data-select и получаем значение его data атрибута (data-select) (в итоге этотже элемент со значением togget(сделано, в случае нескольких селекторов на странице))
    switch (type) {
      case 'toggle':
        this.toggle();// переключает список с опциями
        break;
      case 'option':
        this._changeValue(target);// при изменении выбранной опции
        break;
    }
  }
  _update(option) { // обновляет значения атрибутов в зависимости от выбранной опции, генерирует событие 'select.change'
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    option.classList.add(CLASS_NAME_SELECTED);
    this._elToggle.textContent = option.textContent;
    this._elToggle.value = option.dataset['value'];
    this._elToggle.dataset.index = option.dataset['index'];
    this._elRoot.dispatchEvent(new CustomEvent('select.change')); //CustomEvent имеет дополнительное свойство detail,  в котором можно указывать информацию для передачи в событие.
    this._params.onSelected ? this._params.onSelected(this, option) : null;
    return option.dataset['value'];
  }
  _reset() { // сбрасывает состояние, генерирует событие 'select.change'
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    this._elToggle.textContent = 'Выберите из списка';
    this._elToggle.value = '';
    this._elToggle.dataset.index = -1;
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, null) : null;
    return '';
  }
  _changeValue(option) { // при изменении выбранной опции
    if (option.classList.contains(CLASS_NAME_SELECTED)) {
      return;
    }
    this._update(option);
    this.hide();  // скрывает список с опциями
  }
  show() {  // включает отображение выпадающего списка
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
    this._elRoot.classList.add(CLASS_NAME_ACTIVE);
  }
  hide() {  // скрывает список с опциями
    this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
  }
  toggle() {// переключает список с опциями
    if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
      this.hide();  // скрывает список с опциями
    } else {
      this.show();  // включает отображение выпадающего списка
    }
  }
  dispose() {// удаления слушателей события click селекта
    this._elRoot.removeEventListener('click', this._onClick);
  }
  get value() {  // возвращает значение выбранной опции
    return this._elToggle.value;
  }
  set value(value) {  // позволяет установить опцию по значению
    let isExists = false;
    this._elRoot.querySelectorAll('.select__option').forEach((option) => {
      if (option.dataset['value'] === value) {
        isExists = true;
        return this._update(option);
      }
    });
    if (!isExists) {
      return this._reset();
    }
  }
  get selectedIndex() {   // возвращает индекс выбранной опции
    return this._elToggle.dataset['index'];
  }
  set selectedIndex(index) {  // позволяет выбрать опцию по её индексу
    const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`);
    if (option) {
      return this._update(option);
    }
    return this._reset();
  }
}

CustomSelect.template = params => { // функция для генерации HTML-кода селекта в зависимости от переданных аргументов
  const name = params['name'];
  const options = params['options'];
  const targetValue = params['targetValue'];
  let items = [];
  let selectedIndex = -1;
  let selectedValue = '';
  let selectedContent = 'Выберите из списка';
  options.forEach((option, index) => {
    let selectedClass = '';
    if (option[0] === targetValue) {
      selectedClass = ' select__option_selected';
      selectedIndex = index;
      selectedValue = option[0];
      selectedContent = option[1];
    }
    items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
  });
  return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
  <div class="select__dropdown">
    <ul class="select__options">${items.join('')}</ul>
  </div>`;
};


document.addEventListener('click', (e) => { // для закрытия открытого селекта при клике вне его
  if (!e.target.closest('.select')) {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
  }
});
