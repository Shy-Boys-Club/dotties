import { LitElement, html, css } from 'lit-element';

class SettingsView extends LitElement {
    render() {
        return html`<h2>Settings view</h2>`;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                padding-top: 5%;
            }
        `;
    }
}

if (!customElements.get('settings-view')) {
    customElements.define('settings-view', SettingsView);
}
