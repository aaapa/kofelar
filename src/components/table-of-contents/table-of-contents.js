class TableOfContents {
  selectors = {
    root: '[data-js-table-of-contents]',
    link: '[data-js-table-of-contents-link]',
  };

  stateClasses = {
    active: 'is-active',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    if (!this.rootElement) return;
    this.linkElements = this.rootElement.querySelectorAll(this.selectors.link);
    this.sectionElements = Array.from(this.linkElements).map(link =>
      document.querySelector(link.getAttribute('href'))
    );

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY + 150;
    let activeIndex = 0;
    this.sectionElements.forEach((section, index) => { if (section && section.offsetTop <= scrollY) activeIndex = index; });
    this.linkElements.forEach((link, index) => link.classList.toggle(this.stateClasses.active, index === activeIndex));
  }
}

if (
  document.querySelector('[data-js-table-of-contents]') &&
  document.querySelectorAll('[data-js-table-of-contents-link]').length > 0
) {
  new TableOfContents();
}
