import { LitElement, html, css } from 'lit-element';

class GalleryView extends LitElement {
    static get properties() {
        return {
            users: { type: Array }
        };
    }

    constructor() {
        super();
        this.users = [];
    }

    firstUpdated() {
    }


    render() {
        return html`
            <h2>Gallery</h2>

            <a href="/gallery/Matsuuu">Matsuuu</a>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                padding-top: 5%;
                width: 60%;
                margin: 0 auto;
            }

        `;
    }
}

if (!customElements.get('gallery-view')) {
    customElements.define('gallery-view', GalleryView);
}
