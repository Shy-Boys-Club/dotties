import { css, html, LitElement } from 'lit-element';
import { getTW } from '../util/twind-util';

const { tw, sheet } = getTW();

class NavBar extends LitElement {
    render() {
        return html`
            <nav class=${tw`bg-gray-800`}>
                <div class=${tw`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8`}>
                    <div class=${tw`relative flex items-center justify-between h-16`}>
                        <div class=${tw`absolute inset-y-0 left-0 flex items-center sm:hidden`}>
                            <!-- Mobile menu button-->
                            <button
                                type="button"
                                class=${tw`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span class=${tw`sr-only`}>Open main menu</span>
                                <svg
                                    class=${tw`block h-6 w-6`}
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
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                <svg
                                    class=${tw`hidden h-6 w-6`}
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
                        <div class=${tw`flex-1 flex items-center justify-center sm:items-stretch sm:justify-start`}>
                            <div class=${tw`flex-shrink-0 flex items-center`}>
                                <img
                                    class=${tw`block lg:hidden h-14 w-auto`}
                                    src="/assets/logo_transparent.png"
                                    alt="Workflow"
                                />
                                <img
                                    class=${tw`hidden lg:block h-14 w-auto`}
                                    src="/assets/logo_transparent.png"
                                    alt="Workflow"
                                />
                            </div>
                            <div class=${tw`hidden sm:block sm:ml-6 md:flex items-center`}>
                                <div class=${tw`flex space-x-4`}>
                                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                    <a
                                        href="/"
                                        class=${tw`bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium`}
                                        aria-current="page"
                                        >Dashboard</a
                                    >

                                    <a
                                        href="/profile"
                                        class=${tw`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                                        >Profile</a
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            class=${tw`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}
                        >
                            <button
                                class=${tw`bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                            >
                                <span class=${tw`sr-only`}>View notifications</span>
                                <!-- Heroicon name: outline/bell -->
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
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>

                            <!-- Profile dropdown -->
                            <div class=${tw`ml-3 relative`}>
                                <div>
                                    <button
                                        type="button"
                                        class=${tw`bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                                        id="user-menu"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <span class=${tw`sr-only`}>Open user menu</span>
                                        <img
                                            class=${tw`h-8 w-8 rounded-full`}
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile menu, show/hide based on menu state. -->
                <div class=${tw`sm:hidden`} id="mobile-menu">
                    <div class=${tw`px-2 pt-2 pb-3 space-y-1`}>
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <a
                            href="/"
                            class=${tw`bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium`}
                            aria-current="page"
                            >Dashboard</a
                        >

                        <a
                            href="/profile"
                            class=${tw`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                            >Profile</a
                        >
                    </div>
                </div>
            </nav>
        `;
    }

    static get styles() {
        return [
            sheet.target,
            css`
                :host {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 100;
                    width: 100%;
                }
            `,
        ];
    }
}

if (!customElements.get('nav-bar')) {
    customElements.define('nav-bar', NavBar);
}
