import { css, html, LitElement } from 'lit-element';
import { getTW } from '../util/twind-util';

const { tw, sheet } = getTW();

class MainPageHero extends LitElement {
    render() {
        return html`
            <div class=${tw`relative bg-white overflow-hidden h-4/5`}>
                <div class=${tw`max-w-7xl mx-auto h-full`}>
                    <div class=${tw`relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 h-full`}>
                        <svg
                            class=${tw`hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2`}
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <div class=${tw`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden`}>
                            <div class=${tw`rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden`}>
                                <div class=${tw`px-5 pt-4 flex items-center justify-between`}>
                                    <div>
                                        <img
                                            class=${tw`h-8 w-auto`}
                                            src="/assets/logo_transparent.png"
                                            alt=""
                                        />
                                    </div>
                                    <div class=${tw`-mr-2`}>
                                        <button
                                            type="button"
                                            class=${tw`bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
                                        >
                                            <span class=${tw`sr-only`}>Close main menu</span>
                                            <svg
                                                class=${tw`h-6 w-6`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <main class=${tw`mx-auto max-w-7xl px-4 sm:px-6  lg:px-8`}>
                            <div class=${tw`sm:text-center lg:text-left pt-48`}>
                                <h1
                                    class=${tw`text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl`}
                                >
                                    <span class=${tw`block xl:inline`}>The perfect place</span>
                                    <span class=${tw`block text-green-600 xl:inline mt-1 ml-2`}>for your dotfiles</span>
                                </h1>
                                <p
                                    class=${tw`mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0`}
                                >Dotties provides a perfect platform for storing and showcasing your configuration files</p>
                                <div class=${tw`mt-5 sm:mt-32 sm:flex sm:justify-center lg:justify-start`}>
                                    <div class=${tw`rounded-md shadow`}>
                                        <a
                                            href="#"
                                            class=${tw`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10`}
                                        >
                                            Get started
                                        </a>
                                    </div>
                                    <div class=${tw`mt-3 sm:mt-0 sm:ml-3`}>
                                        <a
                                            href="#"
                                            class=${tw`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10`}
                                        >Gallery</a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div class=${tw`lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2`}>
                    <img
                        class=${tw`h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full`}
                        src="https://images.unsplash.com/photo-1554306274-f23873d9a26c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt=""
                    />
                </div>
            </div>
        `;
    }

    static get styles() {
        return [sheet.target, css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                margin-top: 64px;
            }

    `];
    }
}

if (!customElements.get('main-page-hero')) {
    customElements.define('main-page-hero', MainPageHero);
}
