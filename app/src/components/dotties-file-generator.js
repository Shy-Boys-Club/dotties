import { css, html, LitElement } from "lit-element";
import { getRepositoryInformation } from "../services/repository-service";

import "./file-tree";

class DottiesFileGenerator extends LitElement {

    static get properties() {
        return {
            repository: { type: String },
            fileTree: { type: Array }
        };
    }

    constructor() {
        super();
        this.repostiory = "";
        this.fileTree = [];

    }

    onInputChange(e) {
        this.repository = e.target.value;
        this.getRepositoryInfo();
    }

    async getRepositoryInfo() {

        this.fileTree = await getRepositoryInformation(this.repository);
        console.log(this.fileTree);

    }

    render() {
        return html`

            <input @change=${this.onInputChange} type="text" name="repository" placeholder="e.g. Matsuuu/dotfiles" value="Matsuuu/dotfile">
            <button>Fetch repository information</button>

            <file-tree .tree=${this.fileTree}></file-tree>
        `;
    }

    static get styles() {
        return css`

        input {
    font-size: 1.4rem;
        }
    `;
    }
}

if (!customElements.get("dotties-file-generator")) {
    customElements.define("dotties-file-generator", DottiesFileGenerator);
}
