import { css, html, LitElement } from 'lit-element';
import { getRepositoryInformation } from '../services/repository-service';
import './file-tree';
import { repeat } from 'lit-html/directives/repeat';

class DottiesFileGenerator extends LitElement {
    static get properties() {
        return {
            repository: { type: String },
            errorMessage: { type: String },
            fileTree: { type: Array },

            selectedFiles: { type: Array },
        };
    }

    constructor() {
        super();
        this.repository = 'Matsuuu/dotfiles';
        this.fileTree = [];
        this.selectedFiles = [];
    }

    onInputChange(e) {
        this.repository = e.target.value;
    }

    async getRepositoryInfo() {
        const fileTree = await getRepositoryInformation(this.repository);
        if (fileTree == null) {
            this.errorMessage = `Can't find repository ${this.repository}`;
            return;
        }
        this.errorMessage = '';
        this.fileTree = fileTree;
    }

    onFileSelected(e) {
        const selectedFiles = e.detail.selectedFiles;
        this.selectedFiles = selectedFiles;
        this.requestUpdate();
    }

    onFilenameChange(e) {
        const target = e.target;
        const filepath = target.name;
        const selectedFile = this.selectedFiles.find(f => f.filepath === filepath);
        selectedFile.filename = target.value;
    }

    parseSelectedFilesIntoDottiesJsonFormat() {
        const dottiesJson = {};
        for (const entry of this.selectedFiles) {
            dottiesJson[entry.filename] = entry.filepath;
        }
        return dottiesJson;
    }

    onCopyToClipboard() {
        const dottiesJson = this.parseSelectedFilesIntoDottiesJsonFormat();
        const el = document.createElement("textarea");
        el.value = JSON.stringify(dottiesJson, null, 2);

        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");

        el.remove();
    }

    onExportAsJson() {
        const dottiesJson = this.parseSelectedFilesIntoDottiesJsonFormat();

        const el = document.createElement("a");
        el.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dottiesJson, null, 2)));
        el.setAttribute("download", "dotties.json");
        el.style.display = "none";
        document.body.appendChild(el);

        el.click();
        el.remove();
    }

    onExportAsPR(e) {
        const dottiesJson = this.parseSelectedFilesIntoDottiesJsonFormat();
        alert("Coming soon");
    }

    render() {
        return html`
            <div class="export-area">
                <button class="export-button" @click=${this.onCopyToClipboard}>Copy to Clipboard</button>
                <button class="export-button" @click=${this.onExportAsJson}>Export to dotties.json</button>
                <button class="export-button" @click=${this.onExportAsPR}>Export as PR</button>
            </div>
            <div class="active-area">
                <div class="file-tree-area">
                    <h2>Repository files</h2>
                    <input
                        @change=${this.onInputChange}
                        type="text"
                        name="repository"
                        placeholder="e.g. Matsuuu/dotfiles"
                        value="Matsuuu/dotfiles"
                    />
                    <button @click=${this.getRepositoryInfo}>Fetch repository information</button>
                    <p class="error-message">${this.errorMessage}</p>

                    <file-tree @file-selected=${this.onFileSelected} .tree=${this.fileTree}></file-tree>
                </div>

                <div class="file-naming-area">
                    <h2>Selected files</h2>

                    ${repeat(
            this.selectedFiles,
            file => file.filepath,
            file => html`
                            <div class="file-nameing-field">
                                <label>${file.filepath}</label>
                                <input
                                    type="text"
                                    name=${file.filepath}
                                    value=${file.filename}
                                    @change=${this.onFilenameChange}
                                />
                            </div>
                        `,
        )}
                </div>
            </div>
        `;
    }

    static get styles() {
        return css`
            input {
                font-size: 1.4rem;
            }

            .export-area {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 0 auto 2rem;
                width: 60%;
            }

            .export-area button {
                border: 2px solid lightgreen;
                padding: 0.5rem;
                background: none;
                font-size: 2rem;
                color: #FFF;
                cursor: pointer;
            }

            .active-area {
                display: flex;
                justify-content: space-between;
            }

            .file-tree-area,
            .file-naming-area {
                flex-basis: 45%;
            }

            .file-nameing-field {
                display: flex;
                flex-direction: column;
            }

            label {
                font-size: 1.4rem;
            }

            .error-message {
                color: red;
            }
        `;
    }
}

if (!customElements.get('dotties-file-generator')) {
    customElements.define('dotties-file-generator', DottiesFileGenerator);
}
