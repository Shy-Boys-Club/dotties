import { LitElement, html, css } from 'lit-element';
import '../components/github-signin';
import { getGithubUser } from '../services/github-user-service';
import { getLoggedUser, getUser } from '../services/user-service';

class ProfileView extends LitElement {
    static get properties() {
        return {
            username: { type: Object },
            user: { type: Object },
            isOwner: { type: Boolean },
            userInfoInitialized: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.user = null;
        this.isOwner = false;
        this.username = null;
        this.userInfoInitialized = false;
    }

    firstUpdated() {
        this.initializeUserInformation();
    }

    async initializeUserInformation() {
        if (this.username) {
            await this.getUserInformation();
        } else {
            await this.getLoggedUserInformation();
        }
        // TODO: Delete Mock
        this.user = {
            username: 'Matsuuu', repositories: [
                { id: 123, name: "Matsuuu/dotfiles" }
            ]
        };
        if (this.user) {
            await this.getGithubUserInformation(this.user.username);
        }
        console.log(this.user);

        this.userInfoInitialized = true;
    }

    async getUserInformation() {
        return; // Waiting for API implementation
        this.user = await getUser(this.username);
    }

    async getLoggedUserInformation() {
        return; // Waiting for API implementation
        this.user = await getLoggedUser();
    }

    async getGithubUserInformation(username) {
        const githubUser = await getGithubUser(username);
        this.user = { ...this.user, ...githubUser };
    }

    render() {
        return html`<h2>Profile view</h2>
            ${this.userInfoInitialized && this.user ? this.renderUserProfile() : this.renderLogin()} `;
    }
    renderLogin() {
        return html` <github-signin></github-signin> `;
    }
    renderUserProfile() {
        return html`
            <div class="profile-picture">
                <img src=${this.user.avatar_url} />
                <h3>${this.user.username}</h3>
                <a href="https://twitter.com/${this.user.twitter_username}" target="_blank">Twitter</a>
                <a href=${this.user.html_url} target="_blank">GitHub</a>

                <h3>Repositories</h3>
                ${this.user.repositories.map(repo => html`
                    <a href="/gallery/${repo.name}">${repo.name}</a>
                `)}
            </div>
        `;
    }

    static get styles() {
        return [
            css`
                :host {
                    padding-top: 10%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .profile-picture {
                }

                .profile-picture img {
                    width: 100%;
                }

                a {
                    color: #fff;
                }
            `,
        ];
    }
}

if (!customElements.get('profile-view')) {
    customElements.define('profile-view', ProfileView);
}
