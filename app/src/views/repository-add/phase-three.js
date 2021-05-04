import { read } from '@stoxy/core';
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

    async parseSelectedFilesIntoDottiesJsonFormat() {
        const dottiesJson = {};
        const selectedFiles = await read("repository-selected-files");
        for (const entry of selectedFiles) {
            dottiesJson[entry.filename] = entry.filepath;
        }
        return dottiesJson;
    }

    async onCopyToClipboard() {
        const dottiesJson = await this.parseSelectedFilesIntoDottiesJsonFormat();
        const el = document.createElement('textarea');
        el.value = JSON.stringify(dottiesJson, null, 2);

        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');

        el.remove();
    }

    async onExportAsJson() {
        const dottiesJson = await this.parseSelectedFilesIntoDottiesJsonFormat();

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

    async onExportAsPR(e) {
        const dottiesJson = await this.parseSelectedFilesIntoDottiesJsonFormat();
        alert('Coming soon');
    }


    render() {
        return html`
            <h2>Export the dotties.json</h2>
            <p>To display your dotfiles in dotties.io, a <code>dotties.json</code> -file is required to exist in your dotfiles root</p>
            <p>You can later on just update the dotties.json file to update the file listing in dotties.io</p>

            <button class="export-button" @click=${this.onExportAsPR}>
                <h2>Export as a Pull Request</h2>
                <p>Dotties Bot creates a pull request containing the new dotties.json in your repository</p>
            </button>
            <button class="export-button" @click=${this.onCopyToClipboard}>
                <h2>Copy Dotties.json to Clipboard</h2>
                <p>
                    Add the copied content to <code>dotties.json</code> in your repository root to enable viewing in
                    dotties.io
                </p>
            </button>
            <button class="export-button" @click=${this.onExportAsJson}>
                <h2>Download dotties.json</h2>
                <p>Add the downloaded file to your repository root to enable viewing in dotties.io</p>
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

            .export-button {
                padding: 2rem 2rem;
                margin: 1rem 0;
                width: 30%;
                background: rgba(121, 192, 255, 0.1);
                border: 1px solid #79c0ff;
                color: #fff;
                cursor: pointer;
                transition: 100ms ease-in-out;
                border-radius: 2px;
            }

            .export-button:hover {
                background: rgba(121, 192, 255, 0.2);
            }

        `;
    }
}

if (!customElements.get('repository-add-phase-three')) {
    customElements.define('repository-add-phase-three', RepositoryAddPhaseThree);
}
