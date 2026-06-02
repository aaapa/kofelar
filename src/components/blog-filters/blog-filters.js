class BlogFilters {
  selectors = {
    root: '[data-js-chips]',
    item: '[data-js-chip]',
  };

  stateClasses = {
    active: 'is-active',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.itemElements = this.rootElement.querySelectorAll(this.selectors.item);

    this.bindEvents();
  }

  bindEvents() {
    this.rootElement.addEventListener('click', event => {
      const target = event.target.closest(this.selectors.item);
      if (!target) return;

      this.itemElements.forEach(item => item.classList.remove(this.stateClasses.active));
      target.classList.add(this.stateClasses.active);
    });
  }
}

if (
  document.querySelector('[data-js-chips]') &&
  document.querySelectorAll('[data-js-chip]').length > 0
) {
  new BlogFilters();
}
