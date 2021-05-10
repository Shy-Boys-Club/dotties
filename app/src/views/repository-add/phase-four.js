import { changeView } from '@simplr-wc/router';
import { css, html, LitElement } from 'lit-element';
import { submitRepository } from '../../services/repository-service';

class RepositoryAddPhaseFour extends LitElement {
    static get properties() {
        return {
            username: { type: String },
            repository: { type: String },
            image: { type: Object },
            imageSrc: { type: String },
            error: { type: String }
        };
    }

    constructor() {
        super();
        this.username = '';
        this.repository = '';
        this.image = null;
        this.imageSrc = null;
        this.error = null;
    }

    onImageUpdate(e) {
        console.log(e.target.files[0]);
        if (e.target.files.length <= 0) {
            this.image = null;
            this.imageSrc = null;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.imageSrc = fileReader.result;
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    async onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const res = await submitRepository(formData);

        if (!res) {
            // TODO: Handle error
            this.error = "Something went wrong while attempting to submit";
            return;
        }

        if (res.error) {
            this.error = res.error;
            return;
        }

        changeView("/gallery/" + res.Name);
    }

    render() {
        return html`
            <h2>Submit repository</h2>

            <form @submit=${this.onSubmit}>
                <label for="repository">Repository name</label>
                <input type="text" readonly name="repository" value="${this.username}/${this.repository}" />
                <label for="description">Description</label>
                <textarea
                    cols="40"
                    rows="8"
                    name="description"
                    placeholder="This is my dotfile repository and I'm proud of it"
                ></textarea>
                <label for="image">Showcase image</label>
                <input @change=${this.onImageUpdate} type="file" name="image" />

                ${this.imageSrc ? html`<img src="${this.imageSrc}" />` : ''}

                ${this.error ? html`<p class="error-text">${this.error}</p>` : ''}
                <input type="submit" value="Submit ${this.username}/${this.repository}" />
            </form>
        `;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            a {
                color: inherit;
            }

            form {
                display: flex;
                flex-direction: column;
                max-width: 40%;
                width: 40%;
            }

            form > * {
                width: 100%;
                box-sizing: border-box;
            }

            form img {
                width: 100%;
                margin: 1rem 0;
            }

            input,
            textarea,
            label {
                font-size: 1.1rem;
            }

            input,
            textarea {
                margin-bottom: 1rem;
            }

            input,
            textarea {
                margin: 0.25rem 0 1rem 0;
                padding: 0.25rem;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-bottom: 1px solid #fff;
                color: #fff;

                font-family: 'Roboto', sans-serif;
            }

            input[type='submit'] {
                background: #238636;
                border: none;
                border-radius: 4px;
                color: #fff;
                font-size: 18px;
                cursor: pointer;
                transition: 100ms ease-in-out;
                padding: 0.5rem 1rem;
                text-align: center;
            }

            .error-text {
                color: red;
            }
        `;
    }
}

if (!customElements.get('repository-add-phase-four')) {
    customElements.define('repository-add-phase-four', RepositoryAddPhaseFour);
}
