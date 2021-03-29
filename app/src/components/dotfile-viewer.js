import { css, html, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class DotfileViewer extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            dotfile: { type: Object },
            content: { type: String },
            contentHTML: { type: String },
        };
    }

    constructor() {
        super();
        this.dotfile = {};
        this.content = '';
        this.contentHTML = '';
    }

    firstUpdated() { }

    getContent() {
        if (!this.dotfile || this.content.length > 0) return;
        fetch(this.dotfile.download_url)
            .then(res => res.text())
            .then(res => {
                this.content = res;

                console.log("aa");
                window.shiki.getHighlighter({ theme: "github-dark" }).then(highlighter => {
                    console.log(this.contentHTML);
                    this.contentHTML = highlighter.codeToHtml(this.content, this.determineFiletype());
                });
            });
    }

    determineFiletype() {

        const filename = this.dotfile.download_url.split("/").pop()
        console.log(filename);
        // Add checks from https://github.com/shikijs/shiki/blob/master/docs/languages.md#literal-values
        if (filename.includes("vim")) return "viml";
        if (filename.includes("json")) return "json";
        if (filename.includes("bash")) return "shellscript";
        return "ini";
    }

    render() {
        return html`
            <details>
                <summary @click=${this.getContent}>${this.title}</summary>
                ${unsafeHTML(this.contentHTML)}
            </details>
        `;
    }

    static get styles() {
        return css`
            details {
                width: 100%;
                border: 1px solid #fff;
                border-radius: 4px;
            }

            summary {
                padding: 1rem;
                cursor: pointer;
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
