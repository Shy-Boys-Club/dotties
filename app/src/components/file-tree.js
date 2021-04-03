import { css, html, LitElement } from 'lit-element';

class FileTree extends LitElement {
    static get properties() {
        return {
            tree: { type: Array },
            parsedTree: { type: Array }
        };
    }

    constructor() {
        super();
        this.tree = [];
        this.parsedTree = [];
    }

    updated(_changedProperties) {
        if (_changedProperties.get("tree")) {
            this.parseTree();
        }
    }

    parseTree() {
        const parsedTree = [];

        for (const branch of this.tree) {
            const isInFolder = branch.path.includes("/");
            const isFolder = branch.type = "tree";

            if (isInFolder) {
                const folderName = branch.path.split("/")[0];
                const folder = parsedTree.find(b => b.path === folderName);
                if (!folder.files)
                    folder.files = [];

                folder.files.push(branch);
            } else {
                parsedTree.push(branch);
            }
            console.log(branch);
        }

        this.parsedTree = parsedTree;
        console.log(this.parsedTree);
        // TODO: Implement rendering of file tree and actions on items in tree
    }

    render() {
        return html`
            ${this.tree.map(branch => html`

            `)}
        `;
    }

    static get styles() {
        return css``;
    }
}

if (!customElements.get('file-tree')) {
    customElements.define('file-tree', FileTree);
}
