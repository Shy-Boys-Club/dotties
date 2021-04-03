import { LitElement, html, css } from 'lit-element';
import '../components/github-signin';
import { getGithubUser } from '../services/github-user-service';
import { getLoggedUser, getUser } from '../services/user-service';
import '../components/icon';
import { github, twitter } from '../icons/social';

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
            username: 'Matsuuu',
            repositories: [{ id: 123, name: 'Matsuuu/dotfiles' }],
        };
        this.user = null;
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
        return html` ${this.userInfoInitialized && this.user ? this.renderUserProfile() : this.renderLogin()} `;
    }
    renderLogin() {
        return html`
            <div class="sign-in-page">
                <h2>Please log in to Dotties to view your profile page</h2>

                <github-signin></github-signin>
            </div>
        `;
    }
    renderUserProfile() {
        return html`
            <div class="profile-picture">
                <img src=${this.user.avatar_url} />
            </div>
            <div class="profile-info">
                <label>Username</label>
                <h3>${this.user.username}</h3>
                <span class="socials">
                    <a href="https://twitter.com/${this.user.twitter_username}" target="_blank"
                        ><icon-svg path=${twitter}></icon-svg
                    ></a>
                    <a href=${this.user.html_url} target="_blank"><icon-svg path=${github}></icon-svg></a>
                </span>

                <h3>Repositories</h3>
                <p>This will be replaced with similiar cards as the gallery page will have</p>
                ${this.user.repositories.map(repo => html` <a href="/gallery/${repo.name}">${repo.name}</a> `)}
            </div>
        `;
    }

    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    width: 60%;
                    max-width: 1000px;
                    margin: 0 auto;
                    background: rgb(31, 41, 54);
                    margin-top: 7.5%;
                    border-radius: 4px;
                    overflow: hidden;
                    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                        0px 1px 8px 0px rgba(0, 0, 0, 0.12);
                    padding: 2rem 0;
                }

                .sign-in-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                .profile-picture {
                    width: 40%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .profile-picture img {
                    width: 90%;
                    border-radius: 10%;
                }

                .profile-info {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 60%;
                }

                label {
                    font-size: 1.4rem;
                }

                h3 {
                    font-size: 1.6rem;
                    margin: 0.5rem 0;
                }

                span {
                }

                span.socials {
                    margin: 2rem 0;
                }

                span.socials a {
                    padding-right: 1rem;
                }

                icon-svg {
                    height: 48px;
                    width: 48px;
                    fill: #fff;
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
