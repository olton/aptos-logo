const template = document.createElement(`template`)

template.innerHTML = `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Consolas, serif;
        }

        .aptos-logo {
          height: 300px;
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
          flex: 1 1 300px;
        }
        
        .logo-container {
          display: block;
          position: relative;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          flex-shrink: 0;
          flex-grow: 0;
        }
        
        .logo {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: white;
          border: 1px solid #000;
          overflow: hidden;
          transform: scale(.7);
        }
        
        .line {
          height: calc(100% / 7 - 4px);
          position: relative;
          overflow: visible;
        }
        .line:nth-child(1) {
            height: calc(100% / 7 + 20px);
        }
        .line:nth-child(odd) {
            background: #fff;
        }
        .line:nth-child(even) {
            background: #000;
          }
        }
        
        .line .triangle {
        }
        
        .line:nth-child(odd) .triangle, .line:nth-child(even) .triangle{
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 15px solid black;
          position: absolute;
          top: -14px;
          z-index: 1;
          transform: translateX(-300px);
          animation: slide 2s infinite;
        }
        
        .line:nth-child(odd) .triangle {
            border-bottom-color: #fff;
        }
        
        .line:nth-child(2) .triangle{
          left: 225px;
          animation-delay: 0.5s;
        }
        .line:nth-child(3) .triangle{
          left: 190px;
          animation-delay: 0.6s;
        }
        .line:nth-child(4) .triangle{
          left: 155px;
          animation-delay: 0.7s;
        }
        .line:nth-child(5) .triangle{
          left: 120px;
          animation-delay: 0.8s;
        }
        .line:nth-child(6) .triangle{
          left: 85px;
          animation-delay: 0.9s;
        }
        .line:nth-child(7) .triangle{
          left: 50px;
          animation-delay: 1s;
        }
        
        @keyframes slide {
          30% {transform: translateX(0)}
          70% {transform: translateX(0)}
          100% {
            transform: translateX(300px);
            animation-delay: 1s;
          }
        }
        
        .text {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: rotateText 10s linear infinite;
        }
        
        .text span {
          position: absolute;
          left: 50%;
          font-size: 1.4em;
          transform-origin: 0 150px;
          font-weight: bold;
          /*border: 1px solid red;*/
        }
        
        @keyframes rotateText {
          0%{
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }    
        
        .aptos-logo.dark {
            background: #1e2228;
        }
        .aptos-logo.dark .text {
            color:#adbaa9;
        }
        .aptos-logo.dark .logo {
            border-color: #1e2228;
        }
    </style>
    
    <div class="aptos-logo">
        <div class="logo-container">
            <div class="text">
                <p>APTOS * BLOCKCHAIN * LAYER 1 *</p>
            </div>
            <div class="logo">
                <div class="line"></div>
                <div class="line">
                    <div class="triangle"></div>
                </div>
                <div class="line">
                    <div class="triangle"></div>
                </div>
                <div class="line">
                    <div class="triangle"></div>
                </div>
                <div class="line">
                    <div class="triangle"></div>
                </div>
                <div class="line">
                    <div class="triangle"></div>
                </div>
                <div class="line">
                    <div class="triangle"></div>
                </div>
            </div>
        </div>
    </div>
`

export class AptosLogo extends HTMLElement {
    static get observedAttributes() {
        return [ 'data-theme' ];
    }

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.element = this._shadowRoot.querySelector(".aptos-logo")

        const text = this.element.querySelectorAll(".aptos-logo .text p")
        for(let el of text) {
            el.innerHTML = el.innerText
                .split("")
                .map((char, i) => `<span style="transform: rotate(${i * 11.5}deg)">${char}</span>`)
                .join("")
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            switch(name) {
                case 'data-theme':
                    if (!['dark', 'light'].includes(newVal)) return
                    this.theme = newVal;
                    this.element.classList.remove("dark")
                    this.element.classList.remove("light")
                    this.element.classList.add(this.theme)
                    break;
            }
        }
    }
}

window.customElements.define('aptos-logo', AptosLogo);