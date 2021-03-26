import { LitElement, html, css } from 'lit-element';

export default class DottiesApp extends LitElement {
    static get properties() {
        return {
            title: { type: String, reflect: true },
        };
    }

    constructor() {
        super();
        this.title = 'Welcome to dotties';
    }


    render() {
        return html`
            <h2>${this.title}</h2>
            <a href="/profile">To profile view</a>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                font-size: 1.6rem;
                width: 100%;
                height: 100vh;
                align-items: center;
                justify-content: center;
                color: #fff;
                overflow: hidden;
            }

            a {
                color: inherit;
            }
        `;
    }
}

if (!customElements.get('dotties-app')) {
    customElements.define('dotties-app', DottiesApp);
}
