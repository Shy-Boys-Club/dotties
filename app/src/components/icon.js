import { css, html, LitElement } from 'lit-element';

class IconSVG extends LitElement {
    static get properties() {
        return {
            path: { type: String },
        };
    }

    constructor() {
        super();
        this.path = '';
    }

    render() {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="${this.path}" />
            </svg>
        `;
    }

    static get styles() {
        return css`
            svg {
                width: inherit;
                height: inherit;
                fill: inherit;
            }
        `;
    }
}

if (!customElements.get('icon-svg')) {
    customElements.define('icon-svg', IconSVG);
}
