// @ts-check
customElements.define(
  "its-snale",
  class extends HTMLElement {
    vx = Math.random() * 20 + 55;
    //vx = this.MAX_X / 10
    vy = Math.random() * 20 + 55;
    //vy = this.MAX_Y / 10
    xdir = Math.random() >= 0.5 ? 1 : -1;
    ydir = Math.random() >= 0.5 ? 1 : -1;
    MIN_X = 0;

    get MAX_X() {
      return document.body.clientWidth - this.clientWidth;
    }
    MIN_Y = 0;
    get MAX_Y() {
      return document.body.clientHeight - this.clientHeight;
    }

    #__x = Math.random() * this.MAX_X + this.MIN_X;
    //#__x = 0;
    set x(value) {
      this.#__x = value;
      this.style.setProperty("--x", `${Math.round(value)}px`);
    }
    get x() {
      return this.#__x;
    }

    #__y = Math.random() * this.MAX_Y + this.MIN_Y;
    //#__y = 0;
    set y(value) {
      this.#__y = value;
      this.style.setProperty("--y", `${Math.round(value)}px`);
    }
    get y() {
      return this.#__y;
    }

    get img() {
      return this.querySelector("img");
    }

    connectedCallback() {
      this.innerHTML = '<img src="/images/snale.png" width="100%" />';
      const counter = document.querySelector("corner-hit-counter");
      let paused = false;
      document.addEventListener("visibilitychange", (e) => {
        if (document.hidden) paused = true;
      });

      const margin = 2;

      this.setupClickHandler();

      let prevT = 0;
      let hitting = false;
      /** @param {number} t */
      const step = (t) => {
        if (paused) {
          prevT = t;
          paused = false;
        }
        const dt = t - prevT;
        const dx = (this.vx * dt * this.xdir) / 500;
        const dy = (this.vy * dt * this.ydir) / 500;
        prevT = t;

        let newX = clamp(this.MIN_X, this.x + dx, this.MAX_X);
        let newY = clamp(this.MIN_Y, this.y + dy, this.MAX_Y);
        if (newX >= this.MAX_X) this.xdir = -1;
        else if (newX <= this.MIN_X) this.xdir = 1;
        if (newY >= this.MAX_Y) this.ydir = -1;
        else if (newY <= this.MIN_Y) this.ydir = 1;

        if (
          (newX <= this.MIN_X + margin || newX >= this.MAX_X - margin) &&
          (newY <= this.MIN_Y + margin || newY >= this.MAX_Y - margin)
        ) {
          if (!hitting) {
            const count = Number(counter?.getAttribute("count")) || 0;
            counter?.setAttribute("count", String(count + 1));
          }
          hitting = true;
        } else if (hitting) hitting = false;

        this.x = newX;
        this.y = newY;

        requestAnimationFrame(step);
      };
      step(prevT);
    }

    setupClickHandler() {
      this.draggable = true;
      this.ondragstart = (event) => {
        this.xdir = 0;
        this.ydir = 0;
      };
    }
  },
);

/**
 * @param {number} min
 * @param {number} target
 * @param {number} max
 */
function clamp(min, target, max) {
  return Math.max(min, Math.min(target, max));
}
