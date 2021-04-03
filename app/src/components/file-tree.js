import { css, html, LitElement } from 'lit-element';
import './icon';
import { fileIcon, folderIcon } from '../icons/file-tree-icons';

class FileTree extends LitElement {
    static get properties() {
        return {
            tree: { type: Array },
            parsedTree: { type: Array },
        };
    }

    constructor() {
        super();
        this.tree = [];
        this.parsedTree = [];
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
            console.log(branch);
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
        console.log(this.parsedTree);
        this.requestUpdate();
        // TODO: Implement rendering of file tree and actions on items in tree
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

    renderTree() {
        return html` ${this.parsedTree.map(branch => this.renderBranch(branch))} `;
    }

    renderBranch(branch) {
        console.log(branch);
        const splitPath = branch.path.split('/');
        let spacers = html``;
        for (let i = 0; i < splitPath.length - 1; i++) {
            spacers = html`${spacers}<span class="spacer"></span>`;
        }
        const icon =
            branch.type === 'tree'
                ? html`<icon-svg path=${folderIcon}></icon-svg>`
                : html`<icon-svg path=${fileIcon}></icon-svg>`;
        return html`<div class="tree-row">
                ${spacers} ${icon}
                <p>${splitPath[splitPath.length - 1]}</p>
            </div>
            ${branch.files ? branch.files.map(b => this.renderBranch(b)) : ''} `;
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
