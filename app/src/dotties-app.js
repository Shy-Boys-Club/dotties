import { persistKey, write } from '@stoxy/core';
import { LitElement, html, css } from 'lit-element';
import { verifyAndSetUserdata } from './services/auth-service';
import "./views/main-page-hero";

export default class DottiesApp extends LitElement {

    constructor() {
        super();
        persistKey("userData");
    }

    firstUpdated() {
        verifyAndSetUserdata();
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
