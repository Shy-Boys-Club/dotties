import { LitElement, html, css } from 'lit-element';

class GalleryView extends LitElement {
    render() {
        return html`<h2>Gallery view</h2>`;
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

if (!customElements.get('gallery-view')) {
    customElements.define('gallery-view', GalleryView);
}
