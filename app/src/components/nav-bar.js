import { changeView } from '@simplr-wc/router';
import { css, html, LitElement } from 'lit-element';
import { sub, read } from '@stoxy/core';
import { logOut } from '../services/auth-service';

class NavBar extends LitElement {
    static get properties() {
        return {
            links: { type: Array },
            currentPage: { type: String },
            userData: { type: Object },

            dropdownActions: { type: Array },
            dropdownOpen: { type: Boolean },
        };
    }

    constructor() {
        super();

        sub('userData', e => {
            this.userData = e.data;
        });

        this.currentPage = '/';
        this.links = [
            { title: 'Dashboard', url: '/' },
            { title: 'Gallery', url: '/gallery' },
        ];

        this.dropdownActions = [
            { title: 'Profile', action: '/user', requiresLogin: false },
            { title: 'Settings', action: '/settings', requiresLogin: true },
            { title: 'Log out', action: this.logout.bind(this), requiresLogin: true },
        ];
        this.dropdownOpen = false;
    }

    firstUpdated() { }

    logout() {
        this.dropdownOpen = false;
        logOut();
    }

    renderLinks() {
        return html`
            ${this.links.map(
            link =>
                html` ${link.url === this.currentPage
                    ? html` <a href=${link.url} class="navigation-item" aria-current="page">${link.title}</a> `
                    : html` <a href=${link.url} class="navigation-item">${link.title}</a> `}`,
        )}
        `;
    }

    renderDropdown() {
        if (!this.dropdownOpen) {
            return '';
        }
        const isLoggedIn = this.userData != undefined;
        return html`
            <div class="dropdown" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                ${this.dropdownActions.map(ddaction => {
            if (ddaction.requiresLogin && !isLoggedIn) return '';
            return html`
                        <div class="dropdown-item" role="none">
                            ${typeof ddaction.action === 'function'
                    ? html`
                                      <button role="menuitem" @click=${ddaction.action}>
                                          ${ddaction.title}
                                      </button>
                                  `
                    : html`
                                      <a
                                          role="menuitem"
                                          @click=${() => (this.dropdownOpen = false)}
                                          href=${ddaction.action}
                                      >
                                          ${ddaction.title}
                                      </a>
                                  `}
                        </div>
                    `;
        })}
            </div>
        `;
    }

    render() {
        return html`
            <nav>
                <span>
                    <a href="/">
                        <img id="logo" src="/assets/logo_transparent.png" />
                    </a>
                    ${this.renderLinks()}
                </span>

                <span class="dropdown-span">
                    <button @click=${() => (this.dropdownOpen = !this.dropdownOpen)} class="profile-image-dropdown">
                        <img src="${this.userData ? this.userData.avatarUrl : '/assets/user_icon_placeholder.svg'}" />
                    </button>

                    ${this.renderDropdown()}
                </span>
            </nav>
        `;
    }

    static get styles() {
        return [
            css`
                nav {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 100;
                    width: 100%;
                    background: #1f2936;
                    color: #c1c6cd;
                    display: flex;
                    height: 4rem;
                    padding: 0 15%;
                    align-items: center;
                    box-sizing: border-box;
                    justify-content: space-between;
                }

                .dropdown-span {
                    position: relative;
                }

                .dropdown {
                    position: absolute;
                    top: 150%;
                    right: 0;

                    display: flex;
                    background: #1f2936;
                    flex-direction: column;
                    width: max-content;
                }

                .dropdown-item {
                    padding: 0.6rem 1rem;
                    cursor: pointer;
                }

            .dropdown-item button,
            .dropdown-item a {
                    font-size: 1.4rem;
                    background: none;
                    color: inherit;
                    border: none;
                    cursor: pointer;
                }

                .dropdown-item:hover {
                    background: #111826;
                    color: #fff;
                }

                span {
                    display: flex;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .navigation-item {
                    padding: 0.6rem 1rem;
                    border-radius: 4px;
                }

                .navigation-item[aria-current='page'] {
                    background: #111826;
                    color: #fff;
                }

                img {
                    height: 3.6rem;
                }

                #logo {
                    padding-right: 3rem;
                }

                .profile-image-dropdown {
                    border-radius: 50%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    background: none;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                }

                .profile-image-dropdown img {
                    height: 2.2rem;
                    justify-self: flex-end;
                }
            `,
        ];
    }
}

if (!customElements.get('nav-bar')) {
    customElements.define('nav-bar', NavBar);
}
