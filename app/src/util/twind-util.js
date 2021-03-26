import { create, cssomSheet } from "twind";

const sheets = {};

export function getTW() {
    const sheet = cssomSheet({ target: new CSSStyleSheet() });
    const { tw } = create({ sheet });
    return { tw, sheet };
}
