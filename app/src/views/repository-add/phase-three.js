import { css, html, LitElement } from 'lit-element';

class RepositoryAddPhaseThree extends LitElement {
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
            <button>
                <h2>Copy Dotties.json to Clipboard</h2>
                <p>
                    Add the copied content to <code>dotties.json</code> in your repository root to enable viewing in
                    dotties.io
                </p>
            </button>
            <button>
                <h2>Download dotties.json</h2>
                <p>Add the downloaded file to your repository root to enable viewing in dotties.io</p>
            </button>
            <button>
                <h2>Export as a Pull Request</h2>
                <p>Dotties Bot creates a pull request containing the new dotties.json in your repository</p>
            </button>
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

            button {
                padding: 2rem 2rem;
                margin: 1rem 0;
                width: 60%;
                background: rgba(121, 192, 255, 0.1);
                border: 1px solid #79c0ff;
                color: #fff;
                cursor: pointer;
                transition: 100ms ease-in-out;
                border-radius: 2px;
            }

            button:hover {
                background: rgba(121, 192, 255, 0.2);
            }
        `;
    }
}

if (!customElements.get('repository-add-phase-three')) {
    customElements.define('repository-add-phase-three', RepositoryAddPhaseThree);
}
