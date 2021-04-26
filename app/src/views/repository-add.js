import { css, html, LitElement } from 'lit-element';
import '../components/dotties-file-generator';
import './repository-add/phase-one';
import './repository-add/phase-two';
import './repository-add/phase-three';

class RepositoryAddView extends LitElement {
    static get properties() {
        return {
            phase: { type: Number },
            username: { type: String },
            repository: { type: String },
            loading: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.phase = 1;
        this.username = null;
        this.repository = null;
        this.loading = true;

        this.updateComplete.then(() => this.loading = false);
    }

    firstUpdated() {
        if (this.username && this.repository) {
            this.phase = 2;
        }

        if (window.location.href.split("/").pop() === "export") {
            this.phase = 3;
        }

    }

    render() {
        if (this.loading) return html``;

        switch (this.phase) {
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
        return html`<repository-add-phase-two .repository=${this.repository} .username=${this.username}></repository-add-phase-two>`;
    }

    renderPhaseThree() {
        return html`<repository-add-phase-three .repository=${this.repository} .username=${this.username}></repository-add-phase-three>`;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                width: 80%;
                margin: 10% auto;
                flex-direction: column;
            }
        `;
    }
}

if (!customElements.get('repository-add-view')) {
    customElements.define('repository-add-view', RepositoryAddView);
}
