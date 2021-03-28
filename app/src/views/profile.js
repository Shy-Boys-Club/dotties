import { LitElement, html, css } from 'lit-element';
import '../components/github-signin';

class ProfileView extends LitElement {
    static get properties() {
        return {
            user: { type: Object },
        };
    }

    constructor() {
        super();
        this.user = null;
    }

    loggedIn() {
        return this.user !== null;
    }

    render() {
        return html`<h2>Profile view</h2>
            <github-signin></github-signin> `;
    }

    static get styles() {
        return [css`
            :host {
                padding-top: 10%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `];
    }
}

if (!customElements.get('profile-view')) {
    customElements.define('profile-view', ProfileView);
}
