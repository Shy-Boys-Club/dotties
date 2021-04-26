import { css, html, LitElement } from 'lit-element';
import '../../components/dotties-file-generator';

class RepositoryAddPhaseTwo extends LitElement {
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
        return html` <div class="repository-add-navigation">
                <button @click=${() => window.history.back()}>Back</button>
                <a href="${window.location.href}/export">Export</a>
            </div>
            <h2>Select the files you want to showcase in dotties.io</h2>

            <dotties-file-generator
                .username=${this.username}
                .repository=${this.repository}
            ></dotties-file-generator>`;
    }

    static get styles() {
        return css`
            .repository-add-navigation {
                display: flex;
                width: 100%;
                justify-content: space-between;
                margin: 2rem 0;
            }

            .repository-add-navigation button,
            .repository-add-navigation a {
                background: #238636;
                border: none;
                border-radius: 4px;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                text-decoration: none;
                display: flex;
                align-items: center;
                transition: 100ms ease-in-out;
                padding: 0.5rem 1rem;
            }
        `;
    }
}

if (!customElements.get('repository-add-phase-two')) {
    customElements.define('repository-add-phase-two', RepositoryAddPhaseTwo);
}
