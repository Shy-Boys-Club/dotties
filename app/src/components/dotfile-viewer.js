import { css, html, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import './loading-animation';

class DotfileViewer extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            dotfile: { type: Object },
            content: { type: String },
            contentHTML: { type: String },
            loading: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.dotfile = {};
        this.content = '';
        this.contentHTML = '';
        this.loading = false;
    }

    firstUpdated() { }

    getContent() {
        if (!this.dotfile || this.content.length > 0) return;
        this.loading = true;
        fetch(this.dotfile.download_url)
            .then(res => res.text())
            .then(res => {
                this.content = res;

                window.shiki.getHighlighter({ theme: 'github-dark' }).then(highlighter => {
                    this.contentHTML = highlighter.codeToHtml(this.content, this.determineFiletype());
                    this.loading = false;
                });
            });
    }

    determineFiletype() {
        const filename = this.dotfile.download_url.split('/').pop();
        console.log(filename);
        // Add checks from https://github.com/shikijs/shiki/blob/master/docs/languages.md#literal-values
        if (filename.includes('vim')) return 'viml';
        if (filename.includes('json')) return 'json';
        if (filename.includes('bash')) return 'shellscript';
        return 'ini';
    }

    render() {
        return html`
            <details>
                <summary @click=${this.getContent}>${this.title}</summary>
                ${this.loading ? html`<loading-animation></loading-animation>` : ''} ${unsafeHTML(this.contentHTML)}
            </details>
        `;
    }

    static get styles() {
        return css`
            details {
                width: 100%;
                border: 1px solid #323333;
                border-radius: 4px;
                background: #1a1a1b;
                margin-bottom: 1rem;
            }

            summary {
                padding: 1rem;
                cursor: pointer;
                outline: none;
            }

            pre {
                margin: 1rem;
                overflow: auto;
                padding: 1rem;
                box-sizing: border-box;
                max-height: 70vh;
            }

            code {
                width: 100%;
            }
        `;
    }
}

if (!customElements.get('dotfile-viewer')) {
    customElements.define('dotfile-viewer', DotfileViewer);
}
