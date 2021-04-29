import { css, html, LitElement } from 'lit-element';

class RepositoryAddPhaseFour extends LitElement {
    static get properties() {
        return {
            username: { type: String },
            repository: { type: String },
        };
    }

    constructor() {
        super();
        this.username = '';
        this.repository = '';
    }

    render() {
        return html`

            <h2>Submit repository</h2>

            <p>Are you sure you want to submit the repository <a target="_blank" href="https://github.com/${this.username}/${this.repository}">${this.username}/${this.repository}</a></p>

            <p>It is recommended to upload a image of your configuration in use. You can do so with the field below</p>
            <p>TODO</p>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

        a {
            color: inherit; 
        }
        `;
    }
}

if (!customElements.get('repository-add-phase-four')) {
    customElements.define('repository-add-phase-four', RepositoryAddPhaseFour);
}
