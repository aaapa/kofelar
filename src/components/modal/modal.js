class Modal {
  selectors = {
    openButton: '[data-js-modal-open-button]',
    closeButton: '[data-js-modal-close-button]',
  };

  constructor() {
    this.bindEvents();
  }

  getModalElement(name) {
    return document.querySelector(`[data-js-modal-${name}]`);
  }

  bindEvents() {
    document.querySelectorAll(this.selectors.openButton).forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const name = btn.dataset.jsModalOpenButton;
        const modal = this.getModalElement(name);
        if (modal) modal.showModal();
      });
    });

    document.querySelectorAll(this.selectors.closeButton).forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = btn.closest('dialog');
        if (modal) modal.close();
      });
    });

    document.addEventListener('click', (event) => {
      const modal = event.target.closest('dialog[data-js-modal]');
      if (!modal) return;
      const content = modal.querySelector('[data-js-modal-content]');
      if (content && !event.target.closest('[data-js-modal-content]')) {
        modal.close();
      }
    });
  }
}

if (document.querySelector('[data-js-modal-open-button]')) {
  new Modal();
}
