import { LitElement, html, css } from 'lit-element';
import '../components/github-signin';
import '../components/icon';
import '../components/loading-animation';
import { getGithubUser } from '../services/github-user-service';
import { getLoggedUser, getUser } from '../services/user-service';
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
        // If username is provided with the url, get the info for that user.
        // If no usernae is provided, we're on the user profile page
        // and need to get the info of current logged in user
        if (this.username) await this.getUserInformation();
        else await this.getLoggedUserInformation();

        if (this.userDataIsSet()) {
            await this.getGithubUserInformation(this.user.github_username);
        }
        console.log(this.user);

        this.userInfoInitialized = true;
    }

    userDataIsSet() {
        return Object.keys(this.user).length > 0;
    }

    async getUserInformation() {
        this.user = await getUser(this.username);
    }

    async getLoggedUserInformation() {
        this.user = await getLoggedUser();
    }

    async getGithubUserInformation(username) {
        const githubUser = await getGithubUser(username);
        this.user = { ...this.user, ...githubUser };
    }

    render() {
        // If still loading info
        if (!this.userInfoInitialized) return html`<loading-animation></loading-animation>`;
        // If loaded other user info but no-one was found
        if (this.userInfoInitialized && this.username && !this.userDataIsSet()) return html`<p>404</p>`;
        return html`
            ${this.userDataIsSet() ? this.renderUserProfile() : this.renderLogin()}
        `;
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
                <h3>${this.user.github_username}</h3>
                <span class="socials">
                    <a href="https://twitter.com/${this.user.twitter_username}" target="_blank"
                        ><icon-svg path=${twitter}></icon-svg
                    ></a>
                    <a href=${this.user.html_url} target="_blank"><icon-svg path=${github}></icon-svg></a>
                </span>

                <span class="repositories-title">
                    <h3>Repositories</h3>
                    <a href="/gallery/new" class="add-repository">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
                            />
                        </svg>
                        Add a repository</a
                    >
                </span>
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

                span.repositories-title {
                    display: flex;
                    justify-content: space-between;
                    width: 95%;
                }

                span.repositories-title a {
                    background: #238636;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 18px;
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    padding: 0 0.5rem;
                    transition: 100ms ease-in-out;
                }

                span.repositories-title a:hover {
                    background: #1f7630;
                }

                span.repositories-title svg {
                    fill: #fff;
                    margin-right: 0.5rem;
                }

                icon-svg {
                    height: 48px;
                    width: 48px;
                    fill: #fff;
                }

                a {
                    color: #fff;
                    text-decoration: none;
                }
            `,
        ];
    }
}

if (!customElements.get('profile-view')) {
    customElements.define('profile-view', ProfileView);
}
