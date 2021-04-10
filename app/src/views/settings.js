import { LitElement, html, css } from 'lit-element';
import { deleteUser, getLoggedUser, updateUser } from '../services/user-service';
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
            email_address: formData.get('email'),
        };
        updateUser(updateObject);
    }

    onDelete() {
        deleteUser();
    }

    render() {
        if (this.loading) return html`<loading-animation></loading-animation>`;
        return html`<h2>Settings view</h2>

            <form @submit=${this.onSubmit}>
                <label for="email">Email</label>
                <input type="text" name="email" id="email" value="${this.user.email_address}" />
                <input type="submit" value="Update information" />
            </form>

            <button @click=${this.onDelete} class="delete-button" type="button">DELETE USER</button> `;
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

            .delete-button {
                background: red;
                color: #fff;
                font-size: 24px;
                padding: 0.5rem 1rem;
                cursor: pointer;
                border: none;
                margin-top: 4rem;
                width: fit-content;
                transition: 100ms ease-in-out;
            }

            .delete-button:hover {
                background: darkred;
            }
        `;
    }
}

if (!customElements.get('settings-view')) {
    customElements.define('settings-view', SettingsView);
}
