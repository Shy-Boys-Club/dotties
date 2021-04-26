import { css, html, LitElement } from 'lit-element';

class MainPageHero extends LitElement {
    render() {
        return html`
            <main>
                <div>
                    <h1>
                        <span class="main-text">The perfect place</span>
                        <span class="highlight-text">for your dotfiles</span>
                    </h1>
                    <p>
                        Dotties provides a perfect platform for storing and showcasing your configuration files
                    </p>
                    <div class="buttons">
                            <a class="main-button" href="/profile">
                                Get started
                            </a>
                            <a class="secondary-button" href="#">Gallery</a>
                    </div>
                </div>
            <svg
                class="splitter"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            </main>

            <div class="image-side">
                <img
                    src="https://images.unsplash.com/photo-1554306274-f23873d9a26c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
            </div>
        `;
    }

    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    width: 100%;
                    height: 85%;
                    margin-top: 64px;
                    position: relative;

                    --highlight-color: #059669;
                    --secondary-color: #6b7280;
                }

            h1 {
            font-size: 3.6rem;
            }

            p {
                color: var(--secondary-color);
                font-size: 1.6rem;
            }

            .main-text {
                color: #000;
            }

            .highlight-text {
                color: var(--highlight-color);
            }

            .buttons {
                margin-top: 5rem;
            }

            .main-button {
                font-size: 1.1rem;
                padding: 1rem 2rem;
                background: var(--highlight-color);
                color: inherit;
                text-decoration: none;
                border-radius: 4px;
            }

            .secondary-button {
                font-size: 1.1rem;
                padding: 1rem 2rem;
                background: #e0e7fe;
                color: #5851cc;
                text-decoration: none;
                border-radius: 4px;
                margin-left: 1rem;
            }

            main {
                background: #FFF;
                flex-basis: 50%;
                display: flex;
                position: relative;
                padding: 7.5% 0 0 15%;
                box-sizing: border-box;
            }



            .image-side {
                flex-basis: 50%;
                max-width: 50%;
                overflow: hidden;
            }

            .image-side img {
                overflow: hidden;
                height: 100%;
            }

                .splitter {
                    position: absolute;
                    right: -10%;
                    top: 0;
                    height: 100%;
                    width: 20%;
                }
            `,
        ];
    }
}

if (!customElements.get('main-page-hero')) {
    customElements.define('main-page-hero', MainPageHero);
}
