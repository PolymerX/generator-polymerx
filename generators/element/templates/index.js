
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
// For courtesy...
// import '@polymer/polymer/lib/elements/dom-if';

import css from './style.postcss';
import template from './template.html';

export default class <%= pascalElementName %> extends PolymerElement {

  static get properties() {
    return {
      name: {
        type: String
      }
    };
  }

  static get template() {
    return `<style>${css}</style> ${template}`;
  }

  constructor() {
    super();
    console.log('<%= pascalElementName %>: Old ready() callback');
  }


}

window.customElements.define('<%= elementName %>', <%= pascalElementName %>);