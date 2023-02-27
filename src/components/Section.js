export class Section {
  //Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;//это функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = document.querySelector(containerSelector);
  }

  //Публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderCards(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  //Публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) { this._container.prepend(element) }
}