import { css, html, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import './loading-animation';

class DotfileViewer extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            dotfile: { type: Object },
            content: { type: String },
            loading: { type: Boolean },
            language: { type: String }
        };
    }

    constructor() {
        super();
        this.dotfile = {};
        this.content = '';
        this.contentHTML = '';
        this.loading = false;
        this.language = "ini";
    }

    firstUpdated() { }

    getContent() {
        if (!this.dotfile || this.content.length > 0) return;
        this.loading = true;
        fetch(this.dotfile.download_url)
            .then(res => res.text())
            .then(res => {
                this.content = res;
                this.language = this.determineFiletype()

                window.requestAnimationFrame(() => {
                    // @ts-ignore
                    window.hljs.highlightElement(this.shadowRoot.querySelector("code"))
                });
                console.log(this.content);
                this.loading = false;
            });
    }

    determineFiletype() {
        const filename = this.dotfile.download_url.split('/').pop();
        // Add checks from https://github.com/shikijs/shiki/blob/master/docs/languages.md#literal-values
        if (filename.includes('vim')) return 'vim';
        if (filename.includes('json')) return 'json';
        if (filename.includes('bash')) return 'bash';
        if (filename.includes('sh')) return 'sh';
        if (filename.includes('zsh')) return 'zsh';
        return 'properties';
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@10.7.2/styles/railscasts.min.css" />
            <details>
                <summary @click=${this.getContent}>${this.title}</summary>
                ${this.loading ? html`<loading-animation></loading-animation>` : ''}
                <pre><code class="language-${this.language}">${this.content}</code></pre>
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
                margin: 1rem 0;
                width: 98.5%;
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
