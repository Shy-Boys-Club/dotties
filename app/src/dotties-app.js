import { persistKey, write } from '@stoxy/core';
import { LitElement, html, css } from 'lit-element';
import "./views/main-page-hero";

export default class DottiesApp extends LitElement {

    constructor() {
        super();
        persistKey("userData");
    }

    firstUpdated() {
        this.verifyCookies()
    }

    async verifyCookies() {

        const userData = await fetch("http://127.0.0.1:3000/auth/verify", {
            credentials: "include"
        }).then(res => res.json());

        write("userData", userData);
        console.log(userData);
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
