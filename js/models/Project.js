import Model from './Model.js';

export default class Project extends Model {
  #url;
  #desc;
  #tech;
  #grad;
  #image;
  #emoji;

  constructor(data) {
    super(data.id, data.name);
    this.#url = data.url;
    this.#desc = data.desc;
    this.#tech = data.tech || [];
    this.#grad = data.grad || ['#000', '#fff'];
    this.#image = data.image || null;
    this.#emoji = data.emoji || null;
  }

  // Encapsulation - only expose what's needed via getters
  get url() { return this.#url; }
  get desc() { return this.#desc; }
  get tech() { return [...this.#tech]; } // Return a copy for immutability
  get grad() { return [...this.#grad]; }
  get image() { return this.#image; }
  get emoji() { return this.#emoji; }
}
