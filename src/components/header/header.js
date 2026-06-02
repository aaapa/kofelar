class Header {
  selectors = {
    root: '[data-js-header]',
    menuButton: '[data-js-header-menu-button]',
    menu: '[data-js-header-menu]',
    navLink: '[data-page]',
    main: '.main',
  };

  stateClasses = {
    open: 'is-open',
  };

  mq = window.matchMedia('(max-width: 1100px)');

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.menuButtonElement = this.rootElement.querySelector(this.selectors.menuButton);
    this.menuElement = this.rootElement.querySelector(this.selectors.menu);
    this.navLinkElements = this.rootElement.querySelectorAll(this.selectors.navLink);
    this.mainElement = document.querySelector(this.selectors.main);

    this.setActivePage();
    this.setMainPadding();
    new ResizeObserver(() => this.setMainPadding()).observe(this.rootElement);
    window.addEventListener('load', () => this.setMainPadding());

    this.mq.addEventListener('change', () => this.handleBreakpointChange());
    this.handleBreakpointChange();
  }

  rootFontSize() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  setMainPadding() {
    if (!this.mainElement) return;
    this.mainElement.style.paddingBlockStart = `${this.rootElement.offsetHeight / this.rootFontSize()}rem`;
  }

  handleBreakpointChange() {
    if (this.mq.matches) {
      this.menuButtonElement.addEventListener('click', this.toggle);
    } else {
      this.menuButtonElement.removeEventListener('click', this.toggle);
      this.close();
    }
  }

  toggle = () => {
    const isOpen = this.menuElement.classList.toggle(this.stateClasses.open);
    this.menuButtonElement.classList.toggle(this.stateClasses.open);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      document.addEventListener('keydown', this.onEscape);
      this.menuElement.addEventListener('click', this.onOverlayClick);
    } else {
      document.removeEventListener('keydown', this.onEscape);
      this.menuElement.removeEventListener('click', this.onOverlayClick);
    }
  };

  onEscape = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  onOverlayClick = (event) => {
    if (event.target === this.menuElement) {
      this.close();
    }
  };

  setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    this.navLinkElements.forEach((link) => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add(this.stateClasses.open);
      }
    });
  }

  close() {
    this.menuElement.classList.remove(this.stateClasses.open);
    this.menuButtonElement.classList.remove(this.stateClasses.open);
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.onEscape);
    this.menuElement.removeEventListener('click', this.onOverlayClick);
  }
}

if (
  document.querySelector('[data-js-header]') &&
  document.querySelector('[data-js-header-menu-button]') &&
  document.querySelector('[data-js-header-menu]')
) {
  new Header();
}
