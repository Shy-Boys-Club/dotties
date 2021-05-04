import { css, html, LitElement } from 'lit-element';

class GalleryItem extends LitElement {
    static get properties() {
        return {
            repository: { type: Object },
        };
    }

    constructor() {
        super();
        this.repository = {};
    }

    render() {
        return html`
            <a href="/gallery/${this.repository.Name}">
                <img src="https://raw.githubusercontent.com/Matsuuu/dotfiles/master/unixpr_3.png" />
                <h2>${this.repository.Name}</h2>
                <p>${this.repository.Description}</p>
            </a>
        `;
    }

    static get styles() {
        return css`
            :host {
                border: 1px solid #30363d;
                border-radius: 4px;
                font-size: 16px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                background: #212529;
                transition: 200ms ease-in-out;
                transform: scale(1);
            }

            :host(:hover) {
                background: #30363d;
                transform: scale(1.025);
            }

            img {
                width: 100%;
            }

            a {
                color: inherit;
                text-decoration: none;
                padding: 1rem;
            }
        `;
    }
}

if (!customElements.get('gallery-item')) {
    customElements.define('gallery-item', GalleryItem);
}
