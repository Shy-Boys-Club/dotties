import { LitElement, html, css } from 'lit-element';
import { getDotfiles } from '../services/repository-service';
import '../components/dotfile-viewer';

class GalleryEntryView extends LitElement {
    static get properties() {
        return {
            dotfiles: { type: Array },
            username: { type: String },
            repository: { type: String },
        };
    }

    constructor() {
        super();
        this.dotfiles = {};
        this.username = '';
        this.repository = 'Matsuuu/dotfiles';
    }

    firstUpdated() {
        getDotfiles(this.repository).then(dotfiles => {
            console.log(dotfiles);
            this.dotfiles = dotfiles;
        });
    }

    renderFiles() {
        return Object.keys(this.dotfiles).map(dotfileKey => {
            return html` <dotfile-viewer title=${dotfileKey} .dotfile=${this.dotfiles[dotfileKey]}></dotfile-viewer> `;
        });
    }

    render() {
        return html`
            <h2>${this.username}</h2>

            <img src="https://raw.githubusercontent.com/Matsuuu/dotfiles/master/unixpr_3.png" />

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
                padding-top: 5%;
                width: 60%;
                margin: 0 auto;
            }

            .dotfile-list {
                margin-top: 2rem;
            }
        `;
    }
}

if (!customElements.get('gallery-entry-view')) {
    customElements.define('gallery-entry-view', GalleryEntryView);
}
