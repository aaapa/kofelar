class Tehplatforma {
  selectors = {
    root: '[data-js-eco-platform]',
    tabs: '[data-js-eco-tabs]',
    pane: '[data-js-eco-pane]',
    tab: '[data-js-eco-tab]',
    cards: '.eco__cards',
    art: '.eco__art',
  };

  ecoImages = {
    business: 'imgs/home/glass-twist.webp',
    tech: 'imgs/home/technology_platform .webp',
    service: 'imgs/home/seirvice_and_info.webp',
  };

  ecoImageSizes = {
    business: { width: '781px', height: '578px' },
    tech: { width: '781px', height: '578px' },
    service: { width: '1131px', height: '836px' },
  };

  ecoImageTops = {
    business: '220px',
    tech: '220px',
    service: '75px',
  };

  ecoImageLefts = {
    business: '686px',
    tech: '686px',
    service: '456px',
  };

  stateClasses = {
    active: 'is-active',
  };

  ecoData = {
    business: [
      { title: 'Контроль качества', description: 'Постоянный мониторинг и регламенты обслуживания обеспечивают стабильный вкус напитков и бесперебойную работу.' },
      { title: 'Операционная модель', description: 'Все процессы стандартизированы: от установки и настройки до регулярного контроля работы оборудования.' },
      { title: 'Оптимизация локаций', description: 'Анализ потока и подбор форматов под конкретную точку — от мини-кофейни до полноценного бара.' },
      { title: 'Собственные и партнёрские точки', description: 'Развиваем сеть кофе-точек в разных форматах, объединённых едиными стандартами качества и обслуживания.' }
    ],
    tech: [
      { title: 'ERP-система управления', description: 'Централизованный контроль продаж, оборудования, запасов и финансов в режиме реального времени.' },
      { title: 'Мобильные приложения', description: 'Цифровые инструменты упрощают обслуживание аппаратов, контроль состояния и взаимодействие с клиентами.' },
      { title: 'Аналитика и автоматизация', description: 'Система анализирует данные, прогнозирует загрузку точек и автоматически оптимизирует операционные процессы.' },
      { title: 'Удалённый мониторинг оборудования', description: 'Онлайн-контроль состояния аппаратов, уведомления о неисправностях и предотвращение простоев.' }
    ],
    service: [
      { title: 'Склад запчастей', description: 'Постоянное наличие комплектующих и расходных материалов для оперативного обслуживания.' },
      null,
      { title: 'Логистика и снабжение', description: 'Отлаженные поставки кофе, ингредиентов и расходников обеспечивают непрерывную работу оборудования.' },
      { title: 'Сервисная служба', description: 'Техническая поддержка, диагностика и обслуживание аппаратов гарантируют стабильную работу сети.' }
    ]
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.tabsElement = this.rootElement.querySelector(this.selectors.tabs);
    this.paneElement = this.rootElement.querySelector(this.selectors.pane);
    this.cardsElement = this.paneElement.querySelector(this.selectors.cards);
    this.artElement = this.rootElement.querySelector(this.selectors.art);

    this.bindEvents();
  }

  bindEvents() {
    this.tabsElement.addEventListener('click', event => {
      const tab = event.target.closest(this.selectors.tab);
      if (!tab) return;

      this.tabsElement.querySelectorAll(this.selectors.tab).forEach(tabItem => tabItem.classList.remove(this.stateClasses.active));
      tab.classList.add(this.stateClasses.active);

      const tabKey = tab.getAttribute('data-js-eco-tab');
      this.cardsElement.innerHTML = this.ecoData[tabKey].map(card =>
        card
          ? `<div class="eco-card"><div class="eco-card__title">${card.title}</div><div class="eco-card__text">${card.description}</div></div>`
          : `<div></div>`
      ).join('');
      if (this.artElement) {
        this.artElement.src = this.ecoImages[tabKey];
        const size = this.ecoImageSizes[tabKey];
        this.artElement.style.setProperty('width', size.width, 'important');
        this.artElement.style.setProperty('height', size.height, 'important');
        this.artElement.style.setProperty('top', this.ecoImageTops[tabKey], 'important');
        this.artElement.style.setProperty('left', this.ecoImageLefts[tabKey], 'important');
      }
    });
  }
}

if (
  document.querySelector('[data-js-eco-platform]') &&
  document.querySelector('[data-js-eco-tabs]') &&
  document.querySelector('[data-js-eco-pane]')
) {
  new Tehplatforma();
}
