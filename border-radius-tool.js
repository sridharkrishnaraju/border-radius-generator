/**
 * <border-radius-tool> — visual CSS border-radius generator with live preview + copy.
 * Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class BorderRadiusTool extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this.v = { tl: 24, tr: 24, br: 24, bl: 24 }; }
  connectedCallback() { this.render(); }
  _css() { const { tl, tr, br, bl } = this.v; return `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`; }
  _update() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    $("#box").style.borderRadius = `${this.v.tl}px ${this.v.tr}px ${this.v.br}px ${this.v.bl}px`;
    $("#out").textContent = this._css();
  }
  render() {
    const c = [["tl", "Top-left"], ["tr", "Top-right"], ["br", "Bottom-right"], ["bl", "Bottom-left"]];
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:520px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        .stage{display:flex;justify-content:center;padding:18px 0 22px}
        #box{width:150px;height:150px;background:linear-gradient(135deg,#EB0028,#ff6b6b)}
        .ctrl{display:flex;align-items:center;gap:10px;margin:8px 0}
        .ctrl label{font-size:12px;font-weight:600;color:#555;width:96px;flex:0 0 auto}
        input[type=range]{flex:1;min-width:0;accent-color:#EB0028}
        .ctrl output{font-size:12px;font-family:ui-monospace,monospace;color:#333;width:42px;text-align:right;flex:0 0 auto}
        .outwrap{margin-top:14px;display:flex;align-items:center;gap:8px}
        pre{flex:1;min-width:0;background:#1a1a1a;color:#f4f4f4;border-radius:8px;padding:10px 12px;font-family:ui-monospace,monospace;font-size:13px;margin:0;overflow-x:auto}
        .copy{font:inherit;font-size:12px;font-weight:700;color:#fff;background:#EB0028;border:0;border-radius:8px;padding:9px 13px;cursor:pointer;flex:0 0 auto}
        .reset{font:inherit;font-size:12px;font-weight:700;color:#555;background:#fff;border:1px solid #ccc;border-radius:8px;padding:9px 13px;cursor:pointer;flex:0 0 auto}
      </style>
      <div class="card">
        <div class="stage"><div id="box"></div></div>
        ${c.map(([k, lab]) => `<div class="ctrl"><label>${lab}</label>
          <input type="range" id="r-${k}" min="0" max="75" value="${this.v[k]}"><output id="o-${k}">${this.v[k]}px</output></div>`).join("")}
        <div class="outwrap"><pre id="out">${this._css()}</pre><button class="reset" id="reset">Reset</button><button class="copy" id="copy">Copy</button></div>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    c.forEach(([k]) => $(`#r-${k}`).addEventListener("input", (e) => {
      this.v[k] = +e.target.value; $(`#o-${k}`).textContent = e.target.value + "px"; this._update();
    }));
    $("#copy").addEventListener("click", () => {
      navigator.clipboard && navigator.clipboard.writeText(this._css());
      const b = $("#copy"), o = b.textContent; b.textContent = "Copied"; setTimeout(() => { b.textContent = o; }, 900);
    });
    $("#reset").addEventListener("click", () => { this.v = { tl: 24, tr: 24, br: 24, bl: 24 }; this.render(); });
    this._update();
  }
}
if (!customElements.get("border-radius-tool")) customElements.define("border-radius-tool", BorderRadiusTool);
