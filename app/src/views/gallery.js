import { css, html, LitElement } from "lit-element";

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

            <a href="/gallery/Matsuuu/dotfiles">Matsuuu/dotfiles</a>
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
