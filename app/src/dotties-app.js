import { LitElement, html, css } from 'lit-element';
import "./views/main-page-hero";

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
            <main-page-hero></main-page-hero>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                height: 100%;
            }
        `;
    }
}

if (!customElements.get('dotties-app')) {
    customElements.define('dotties-app', DottiesApp);
}
