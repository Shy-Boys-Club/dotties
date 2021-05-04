import { css, html, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { getRepositories } from '../services/repository-service';
import '../components/gallery-item';

class GalleryView extends LitElement {
    static get properties() {
        return {
            repositories: { type: Array },
        };
    }

    constructor() {
        super();
        this.repositories = [];
    }

    firstUpdated() {
        getRepositories().then(repos => {
            this.repositories = repos;
            console.log(this.repositories);
        });
    }

    render() {
        return html`
            <h2>Gallery</h2>

            <div class="gallery-pane">
                ${repeat(
            this.repositories,
            repo => repo.ID,
            repo => html` <gallery-item .repository=${repo}></gallery-item>
<gallery-item .repository=${repo}></gallery-item>
                    <gallery-item .repository=${repo}></gallery-item>
            `,
        )}
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

            .gallery-pane {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .gallery-pane > * {
                flex-basis: 30%;
                margin: 0 0 3rem 0;

            }
        `;
    }
}

if (!customElements.get('gallery-view')) {
    customElements.define('gallery-view', GalleryView);
}
