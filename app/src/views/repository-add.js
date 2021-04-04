import { css, html, LitElement } from "lit-element";
import "../components/dotties-file-generator";

class RepositoryAddView extends LitElement {

    static get properties() {
        return {

        };
    }

    render() {
        return html`
            <dotties-file-generator></dotties-file-generator>
        `;
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

if (!customElements.get("repository-add-view")) {
    customElements.define("repository-add-view", RepositoryAddView);
}
