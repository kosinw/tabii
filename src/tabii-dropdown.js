import { LitElement, html } from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import { getBreeds } from './api.js';

export class TabiiDropdown extends LitElement {
    constructor() {
        // This is required by the specification.
        super();

        window.selected = -1;
        window.breeds = [];
    }

    createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();

        getBreeds(99).then(data => {
            window.breeds = data;
            this.requestUpdate();
        });
    }

    firstUpdated = (changedProperties) => {
        if (!this.dropdown) {
            this.dropdown = this.querySelector('.dropdown');
        }

        this.dropdown.addEventListener('click', event => {
            event.stopPropagation();
            this.dropdown.classList.toggle('is-active');
        });
    }

    handleClick = (idx) => {
        window.selected = idx;
        this.requestUpdate();
    }

    render() {
        return html`
        <style>
            .dropdown-content {
                max-height: 13em;
                overflow: auto;
            }
        </style>
        <div class="dropdown is-primary">
            <div class="dropdown-trigger">
                <button class="button ${window.selected == -1 ? "has-background-grey" : "has-background-primary"} has-text-white" aria-haspopup="true" aria-controls="dropdown-menu2">
                <span>${window.selected == -1 ? "Choose breed" : window.breeds[window.selected].name}</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                <div class="dropdown-content">
                    <div class="dropdown-item">
                        Choose what <strong>breed</strong> of cat you want to generate the ASCII art of.
                    </div>                    
                    <hr class="dropdown-divider">
                    ${window.breeds.map((cat, idx) => html`<a class="${idx == window.selected ? "has-background-primary has-text-white" : "has-text-black"} dropdown-item" @click="${() => this.handleClick(idx)}" href="#">${cat.name}</a>`)}
                </div>
            </div>
        </div>`;
    }
};