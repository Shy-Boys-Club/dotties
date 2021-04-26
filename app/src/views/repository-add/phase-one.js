import { read } from '@stoxy/core';
import { css, html, LitElement } from 'lit-element';
import { getUserRepositories } from '../../services/repository-service';
import { repeat } from 'lit-html/directives/repeat';

class RepositoryAddPhaseOne extends LitElement {
    static get properties() {
        return {
            repositories: { type: Array },
        };
    }

    constructor() {
        super();
        this.repositories = [];
    }

    firstUpdated() {
        this.getRepositories();
    }

    async getRepositories() {
        const username = await read('userData.userName');

        if (username) {
            this.repositories = await getUserRepositories(username);
            console.log(this.repositories);
        }
    }

    render() {
        return html`
            <h2>Select your dotfiles repository</h2>
            <div class="repository-container">
                ${repeat(
            this.repositories,
            repo => repo.id,
            repo => html` <a href="${window.location.href + "/" + repo.full_name}" class="repository" id="${repo.id}"><p>${repo.name}</p></a> `,
        )}
            </div>
        `;
    }

    static get styles() {
        return css`
            .repository-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                text-align: center;
            }

            .repository {
                flex-basis: 30%;
                border-radius: 4px;
                width: 30%;
                background: #0d1117;
                margin-bottom: 1rem;
                color: #58a6ff;
                font-weight: bold;
                font-size: 1.2rem;
                box-sizing: border-box;
                padding: 1rem 2rem;
            }

        a {
            color: inherit;
            text-decoration: none;
        }

            .repository p {
                margin: 0;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: 100%;
            }

            .repository:hover p {
                text-decoration: underline;
            }
        `;
    }
}

if (!customElements.get('repository-add-phase-one')) {
    customElements.define('repository-add-phase-one', RepositoryAddPhaseOne);
}
