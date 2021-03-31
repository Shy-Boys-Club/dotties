import { css, html, LitElement } from 'lit-element';

const clientID = '4cdb63b7fafee549f81d';
const redirectURI = 'http://127.0.0.1:3000/oauth/redirect';

class GithubSignin extends LitElement {
    render() {
        return html`
            <a
                class="github-login-button"
                href="https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}"
                ><span>Sign in with Github</span> <img src="/assets/GitHub-Mark-64px.png" /></a
            >
        `;
    }

    static get styles() {
        return [
            css`
                .github-login-button {
                    color: #000;
                    text-decoration: none;
                    font-size: 1.4rem;
                    background: #fff;
                    padding: 0.5rem;
                    border-radius: 4px;
                    border: 1px solid #d9d9d9;
                    display: flex;
                    align-items: center;
                }

            img {
                margin-top: -3px;
                width: 32px;
                padding-left: 16px;
            }
            `,
        ];
    }
}

if (!customElements.get('github-signin')) {
    customElements.define('github-signin', GithubSignin);
}
