import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponent from '../../globals/js/mixins/init-component';

class Accordion extends mixin(createComponent, initComponent) {
  constructor(element, options) {
    super(element, options);

    this.buttons = Array.from(
      this.element.querySelectorAll(this.options.selectorAccordionItemHeading)
    );

    this.onClick = this._onClick.bind(this);

    this.attachEvents();
  }

  attachEvents() {
    this.buttons.map((button) =>
      button.addEventListener('click', this.onClick, false)
    );
  }

  _onClick(event) {
    const { target } = event;
    const item = target.closest(this.options.selectorAccordionItem);
    this._toggle(item);
  }

  _toggle(element) {
    const heading = element.querySelector(
      this.options.selectorAccordionItemHeading
    );
    const expanded = heading.getAttribute('aria-expanded');

    if (expanded !== null) {
      heading.setAttribute(
        'aria-expanded',
        expanded === 'true' ? 'false' : 'true'
      );
    }

    element.classList.toggle(this.options.classActive);
  }

  static get options() {
    return {
      selectorInit: '.accordion',
      selectorAccordionItem: '.accordion-item',
      selectorAccordionItemHeading: '.accordion-item-heading',
      selectorAccordionContent: '.accordion-item-content',
      classActive: 'accordion-item--active',
    };
  }

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  static components /* #__PURE_CLASS_PROPERTY__ */ = new WeakMap();
}

export default Accordion;
