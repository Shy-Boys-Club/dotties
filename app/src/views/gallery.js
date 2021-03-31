import { LitElement, html, css } from 'lit-element';
import { getDotfiles } from '../services/repository-service';
import '../components/dotfile-viewer';

class GalleryView extends LitElement {
    static get properties() {
        return {
            dotfiles: { type: Array },
        };
    }

    constructor() {
        super();
        this.dotfiles = {};
    }

    firstUpdated() {
        getDotfiles('Matsuuu/dotfiles').then(dotfiles => {
            console.log(dotfiles);
            this.dotfiles = dotfiles;
        });
    }

    renderFiles() {
        return Object.keys(this.dotfiles).map(dotfileKey => {
            console.log(dotfileKey);
            return html` <dotfile-viewer title=${dotfileKey} .dotfile=${this.dotfiles[dotfileKey]}></dotfile-viewer> `;
        });
    }

    render() {
        return html`
            <h2>Gallery view</h2>

            <div class="dotfile-list">
                ${this.renderFiles()}
            </div>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                padding-top: 10%;
                width: 60%;
                margin: 0 auto;
            }
        `;
    }
}

if (!customElements.get('gallery-view')) {
    customElements.define('gallery-view', GalleryView);
}
