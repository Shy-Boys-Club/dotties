import { css, html, LitElement } from 'lit-element';
import '../components/dotties-file-generator';
import './repository-add/phase-one';
import './repository-add/phase-two';
import './repository-add/phase-three';
import './repository-add/phase-four';

class RepositoryAddView extends LitElement {
    static get properties() {
        return {
            phase: { type: Number },
            username: { type: String },
            repository: { type: String },
            loading: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.phase = 1;
        this.username = null;
        this.repository = null;
        this.loading = true;

        this.updateComplete.then(() => (this.loading = false));
    }

    firstUpdated() {
        if (this.username && this.repository) {
            this.phase = 2;
        }

        if (window.location.href.split('/').pop() === 'export') {
            this.phase = 3;
        }

        if (window.location.href.split('/').pop() === 'submit') {
            this.phase = 4;
        }
    }

    render() {
        if (this.loading) return html``;

        switch (this.phase) {
            case 4:
                return this.renderPhaseFour();
            case 3:
                return this.renderPhaseThree();
            case 2:
                return this.renderPhaseTwo();
            default:
                return this.renderPhaseOne();
        }
    }

    renderPhaseOne() {
        return html`<repository-add-phase-one></repository-add-phase-one>`;
    }

    renderPhaseTwo() {
        return html` <div class="repository-add-navigation">
                <button @click=${() => window.history.back()}>Back</button>
                <a href="${window.location.href}/export">Export</a>
            </div>

            <repository-add-phase-two
                .repository=${this.repository}
                .username=${this.username}
            ></repository-add-phase-two>`;
    }

    renderPhaseThree() {
        return html` <div class="repository-add-navigation">
                <button @click=${() => window.history.back()}>Back</button>
                <a href="submit">Finalize</a>
            </div>

            <repository-add-phase-three
                .repository=${this.repository}
                .username=${this.username}
            ></repository-add-phase-three>`;
    }

    renderPhaseFour() {
        return html` <div class="repository-add-navigation">
                <button @click=${() => window.history.back()}>Back</button>
            </div>

            <repository-add-phase-four
                .repository=${this.repository}
                .username=${this.username}
            ></repository-add-phase-four>`;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                width: 80%;
                margin: 5% auto;
                flex-direction: column;
            }

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

if (!customElements.get('repository-add-view')) {
    customElements.define('repository-add-view', RepositoryAddView);
}
