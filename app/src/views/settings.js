import { LitElement, html, css } from 'lit-element';
import { getLoggedUser, updateUser } from '../services/user-service';
import '../components/loading-animation';

class SettingsView extends LitElement {
    static get properties() {
        return {
            loading: { type: Boolean },
            user: { type: Object },
        };
    }

    constructor() {
        super();
        this.user = null;
        this.loading = true;
    }

    firstUpdated() {
        this.getLoggedUserInformation();
    }

    async getLoggedUserInformation() {
        this.user = await getLoggedUser();
        this.loading = false;
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const updateObject = {
            email_address: formData.get("email")
        };
        updateUser(updateObject);
    }

    render() {
        if (this.loading) return html`<loading-animation></loading-animation>`;
        return html`<h2>Settings view</h2>

            <form @submit=${this.onSubmit}>
                <label for="email">Email</label>
                <input type="text" name="email" id="email" value="${this.user.email_address}" />
                <input type="submit" value="Update information" />
            </form> `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                padding-top: 5%;
                width: 60%;
                margin: 5% auto 0;
            }

            form {
                display: flex;
                flex-direction: column;
            }

        input[type='submit'] {
            width: min-content;
        }
        `;
    }
}

if (!customElements.get('settings-view')) {
    customElements.define('settings-view', SettingsView);
}
