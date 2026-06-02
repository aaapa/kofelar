class PhoneMask {
  selectors = {
    input: '[data-js-phone-mask]',
  };

  constructor() {
    this.inputElements = document.querySelectorAll(this.selectors.input);

    this.bindEvents();
  }

  bindEvents() {
    this.inputElements.forEach(input => {
      input.addEventListener('input', event => this.format(event));
    });
  }

  format(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (value.length > 11) value = value.slice(0, 11);
    let formatted = '';
    if (value.length > 0) formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.slice(1, 4);
    if (value.length >= 5) formatted += ') ' + value.slice(4, 7);
    if (value.length >= 8) formatted += '-' + value.slice(7, 9);
    if (value.length >= 10) formatted += '-' + value.slice(9, 11);
    event.target.value = formatted;
  }
}

if (document.querySelectorAll('[data-js-phone-mask]').length > 0) {
  new PhoneMask();
}
