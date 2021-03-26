import { LitElement, html, css } from "lit-element";

class ProfileView extends LitElement {
    render() {
        return html`<h2>Profile view</h2>`;
    }
}

if (!customElements.get("profile-view")) {
    customElements.define("profile-view", ProfileView);
}
