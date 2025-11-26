# SenangWebs Jot (SWJ)

A lightweight JavaScript tool for copying text from HTML elements with a single click.

## Features

- **Simple Integration**: Add data attributes to your HTML, and SWJ handles the rest.
- **Flexible Sources**: Copy text from inputs, textareas, divs, spans, and more.
- **Visual Feedback**: Built-in states for "Copy", "Copied!", and "Failed!".
- **Modern & Fallback**: Uses the Clipboard API with a fallback to `execCommand`.
- **Error Handling**: Logs warnings for missing targets or unsupported features.
- **Automatic Initialization**: Runs automatically on `DOMContentLoaded`.

## Demo

Run `npm run dev` to generate a demo at `dist/index.html`. Open this file in your browser to see the library in action.

## Installation

### Option 1: NPM

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Build the library:
    ```bash
    npm run build
    ```
    This generates `swj.js` and `swj.css` in the `dist/` folder.

### Option 2: CDN

Include the files directly in your HTML:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/senangwebs-jot@latest/dist/swj.css"
/>
<script src="https://unpkg.com/senangwebs-jot@latest/dist/swj.js"></script>
```

## Usage

1.  **Include Files**: Ensure `swj.css` and `swj.js` are loaded.

2.  **Add Attributes**:

    - `data-swj-id="<id>"`: The element to copy from.
    - `data-swj-value`: Required on the source element.
    - `data-swj-copy="<id>"`: The button that triggers the copy.

3.  **Example**:

    ```html
    <!-- Source -->
    <textarea data-swj-id="code-snippet" data-swj-value>
    console.log('Hello World');
    </textarea>

    <!-- Button -->
    <button type="button" data-swj-copy="code-snippet">Copy Code</button>
    ```

## Dynamic Content

If you add elements dynamically, call `SWJ.refresh()` to attach event listeners to the new buttons.

```javascript
setTimeout(() => {
  // Create the content to copy
  const contentToCopy = document.createElement("textarea");
  contentToCopy.setAttribute("data-swj-id", "code-snippet");
  contentToCopy.setAttribute("data-swj-value", "console.log('Hello World');");
  contentToCopy.setAttribute("style", "display: none");
  contentToCopy.innerHTML = "console.log('Hello World'); Copy dynamic content";
  document.body.appendChild(contentToCopy);

  // Create the button
  const button = document.createElement("button");
  button.setAttribute("data-swj-copy", "code-snippet");
  button.textContent = "Copy Code";
  document.body.appendChild(button);

  // Refresh SWJ to attach event listeners to the new button
  SWJ.refresh();
}, 1000);
```

## Styling

The library uses the following classes for button states:

- `swj-button`: Base class.
- `swj-button-default`: Default state.
- `swj-button-copied`: Success state (lasts 2.5s).
- `swj-button-error`: Error state (lasts 2.5s).

Override these classes in your CSS to customize the appearance.

## Browser Support

- Works on all modern browsers.
- Requires a secure context (HTTPS) for the Clipboard API.
- Falls back to `execCommand` if the Clipboard API is unavailable.

## License

MIT License
