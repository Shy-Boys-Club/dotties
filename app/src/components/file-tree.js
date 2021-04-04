import { css, html, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import './icon';
import { fileIcon, folderIcon } from '../icons/file-tree-icons';

class FileTree extends LitElement {
    static get properties() {
        return {
            tree: { type: Array },
            parsedTree: { type: Array },
            selectedFiles: { type: Array },
        };
    }

    constructor() {
        super();
        this.tree = [];
        this.parsedTree = [];
        this.selectedFiles = [];
    }

    updated(_changedProperties) {
        if (_changedProperties.get('tree')) {
            this.parseTree();
        }
    }

    parseTree() {
        const parsedTree = [];
        const tree = [...this.tree];

        for (const branch of tree) {
            const isInFolder = branch.path.includes('/');

            if (isInFolder) {
                const splitName = branch.path.split('/');
                splitName.pop();
                const folderName = splitName.reduce((a, b) => `${a}/${b}`);
                const folder = this.findFolderInTree(tree, folderName);

                if (!folder.files) folder.files = [];
                folder.files.push(branch);
            } else {
                parsedTree.push(branch);
            }
        }

        this.parsedTree = parsedTree;
        this.requestUpdate();
    }

    findFolderInTree(tree, folder) {
        const folderPartsSplit = folder.split('/');
        let parentFolderPath = '';

        while (folderPartsSplit.length > 2) {
            parentFolderPath += folderPartsSplit.shift();
            tree = tree.find(b => (b.path = parentFolderPath));
        }
        return tree.find(b => b.path === folder);
    }

    onFileSelect(e) {
        let target = e.target;
        const path = e.path || (e.composedPath && e.composedPath());
        while (target.className !== "tree-row") {
            target = path.shift();
        }
        if (target.hasAttribute('is-folder')) return;

        const isSelected = target.hasAttribute('selected');
        const filepath = target.dataset.filePath;
        const filename = filepath.split('/').pop();

        if (isSelected) {
            this.selectedFiles = this.selectedFiles.filter(file => file.filepath !== filepath);
            target.removeAttribute('selected');
        } else {
            this.selectedFiles.push({ filepath, filename });
            target.setAttribute('selected', '');
            this.requestUpdate();
        }

        this.dispatchEvent(new CustomEvent('file-selected', { detail: { selectedFiles: this.selectedFiles } }));
    }

    renderTree() {
        return html`${repeat(
            this.parsedTree,
            branch => branch.path,
            branch => this.renderBranch(branch),
        )}`;
    }

    renderBranch(branch) {
        const splitPath = branch.path.split('/');
        const spacers = this.getSpacers(splitPath);
        const icon = this.getBranchIcon(branch);

        return html`<div
                class="tree-row"
                @click=${this.onFileSelect}
                data-file-path=${branch.path}
                ?is-folder=${branch.type === 'tree'}
            >
                ${spacers} ${icon}
                <p>${splitPath[splitPath.length - 1]}</p>
            </div>
            ${branch.files ? branch.files.map(b => this.renderBranch(b)) : ''}`;
    }

    getSpacers(splitPath) {
        let spacers = html``;
        for (let i = 0; i < splitPath.length - 1; i++) {
            spacers = html`${spacers}<span class="spacer"></span>`;
        }
        return spacers;
    }

    getBranchIcon(branch) {
        return branch.type === 'tree'
            ? html`<icon-svg path=${folderIcon}></icon-svg>`
            : html`<icon-svg path=${fileIcon}></icon-svg>`;
    }

    render() {
        return html`${this.renderTree()}`;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                margin-top: 3rem;
            }

            .tree-row {
                display: flex;
                align-items: center;
                padding: 1rem;
                background: #292c31;
                border: 1px solid rgba(224, 224, 224, 1);
                cursor: pointer;
            }

            .tree-row[selected] {
                background: #3c7c3f;
            }

            .tree-row[selected]:hover {
                background: #366f38;
            }

            .tree-row:hover {
                background: #24272c;
            }

            .spacer {
                width: 2rem;
                height: 100%;
            }

            icon-svg {
                fill: #fff;
                margin-right: 1rem;
            }

            p {
                margin: 0.25rem 0;
                font-size: 1.1rem;
            }
        `;
    }
}

if (!customElements.get('file-tree')) {
    customElements.define('file-tree', FileTree);
}
