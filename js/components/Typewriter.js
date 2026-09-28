export default class Typewriter {
  constructor(elementId, roles, typeSpeed = 90, deleteSpeed = 55, pause = 1900) {
    this.el = document.getElementById(elementId);
    this.roles = roles;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pause = pause;
    this.ri = 0;
    this.ci = 0;
    this.del = false;

    if (this.el) {
      setTimeout(() => this.tick(), 900);
    }
  }

  tick() {
    const w = this.roles[this.ri];
    if (!this.del) {
      this.el.textContent = w.slice(0, ++this.ci);
      if (this.ci === w.length) {
        this.del = true;
        return setTimeout(() => this.tick(), this.pause);
      }
    } else {
      this.el.textContent = w.slice(0, --this.ci);
      if (this.ci === 0) {
        this.del = false;
        this.ri = (this.ri + 1) % this.roles.length;
        return setTimeout(() => this.tick(), 350);
      }
    }
    setTimeout(() => this.tick(), this.del ? this.deleteSpeed : this.typeSpeed);
  }
}
