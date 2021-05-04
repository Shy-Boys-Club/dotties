import { LitElement, html, css } from 'lit-element';
import { getDotfiles, getRepositoryDataFromAPI } from '../services/repository-service';
import '../components/dotfile-viewer';

class GalleryEntryView extends LitElement {
    static get properties() {
        return {
            dotfiles: { type: Array },
            repositoryData: { type: Object },
            username: { type: String },
            repository: { type: String },
        };
    }

    constructor() {
        super();
        this.dotfiles = {};
        this.repositoryData = {};
        this.username = '';
        this.repository = '';
    }

    firstUpdated() {
        const repoName = this.username + "/" + this.repository;
        getRepositoryDataFromAPI(repoName).then(repositoryData => {
            console.log(repositoryData);
            this.repositoryData = repositoryData;
        });
        getDotfiles(repoName).then(dotfiles => {
            console.log(dotfiles);
            this.dotfiles = dotfiles;
        });
    }

    renderFiles() {
        if (!this.dotfiles) {
            return html`<p>No dotties.json file is present in the repository</p>`;
        }
        return Object.keys(this.dotfiles).map(dotfileKey => {
            return html` <dotfile-viewer title=${dotfileKey} .dotfile=${this.dotfiles[dotfileKey]}></dotfile-viewer> `;
        });
    }

    render() {
        return html`
            <h2>${this.username}/${this.repository}</h2>

            <img src="https://raw.githubusercontent.com/Matsuuu/dotfiles/master/unixpr_3.png" />

            <p>${this.repositoryData?.Description}</p>

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
