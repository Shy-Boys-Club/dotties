import { css, html, LitElement } from 'lit-element';
import { getRepositoryInformation } from '../services/repository-service';
import './file-tree';
import { repeat } from 'lit-html/directives/repeat';
import { write, read } from '@stoxy/core';

class DottiesFileGenerator extends LitElement {
    static get properties() {
        return {
            username: { type: String },
            repository: { type: String },

            fileTree: { type: Array },
            selectedFiles: { type: Array },
        };
    }

    constructor() {
        super();
        this.repository = '';
        this.fileTree = [];
        this.selectedFiles = [];
        this.repository = '';
        this.username = '';
    }

    firstUpdated() {
        if (this.repository && this.username) {
            this.getRepositoryInfo();
            read("repository-selected-files").then(data => {
                this.selectedFiles = data
                this.requestUpdate();
            });
        }
    }

    onInputChange(e) {
        this.repository = e.target.value;
    }

    getRepositoryString() {
        return `${this.username}/${this.repository}`;
    }

    async getRepositoryInfo() {
        const fileTree = await getRepositoryInformation(this.getRepositoryString());
        if (fileTree == null) {
            this.errorMessage = `Can't find repository ${this.getRepositoryString()}`;
            return;
        }
        this.errorMessage = '';
        this.fileTree = fileTree;
    }

    onFileSelected(e) {
        const selectedFiles = e.detail.selectedFiles;
        this.selectedFiles = selectedFiles;
        this.requestUpdate();
        this.updateState();
    }

    onFilenameChange(e) {
        const target = e.target;
        const filepath = target.name;
        const selectedFile = this.selectedFiles.find(f => f.filepath === filepath);
        selectedFile.filename = target.value;
        this.updateState();
    }

    updateState() {
        write("repository-selected-files", this.selectedFiles);
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
        const el = document.createElement('textarea');
        el.value = JSON.stringify(dottiesJson, null, 2);

        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');

        el.remove();
    }

    onExportAsJson() {
        const dottiesJson = this.parseSelectedFilesIntoDottiesJsonFormat();

        const el = document.createElement('a');
        el.setAttribute(
            'href',
            'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dottiesJson, null, 2)),
        );
        el.setAttribute('download', 'dotties.json');
        el.style.display = 'none';
        document.body.appendChild(el);

        el.click();
        el.remove();
    }

    onExportAsPR(e) {
        const dottiesJson = this.parseSelectedFilesIntoDottiesJsonFormat();
        alert('Coming soon');
    }

    export() {
        this.updateState();
    }

    render() {
        return html`
            <div class="active-area">
                <div class="file-tree-area">
                    <h3>Repository files</h3>
                    <file-tree @file-selected=${this.onFileSelected} .tree=${this.fileTree} .selectedFiles=${this.selectedFiles}></file-tree>
                </div>

                <div class="file-naming-area">
                    <h3>Selected files</h3>
        <p class="subtitle">You can rename the files here. The renamed versions will be displayed in the UI</p>

                    ${repeat(
            this.selectedFiles,
            file => file.filepath,
            file => html`
                            <div class="file-nameing-field">
                                <label>${file.filepath}</label>
                                <input
                                    class="selected-file-input"
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

            .subtitle {
                opacity: 0.7;
                font-size: 0.9rem;
            }

            .selected-file-input {
                margin: 0.25rem 0 1rem 0;
                padding: 0.25rem;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-bottom: 1px solid #fff;
                color: #fff;
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
                color: #fff;
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
