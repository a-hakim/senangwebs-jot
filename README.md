# SenangWebs Jot (SWJ)

A lightweight JavaScript tool for copying text from HTML elements with a single click.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

![SenangWebs Jot](https://raw.githubusercontent.com/a-hakim/senangwebs-jot/refs/heads/main/swj_preview.gif)

## Features

- **Simple Integration**: Add data attributes to your HTML, and SWJ handles the rest.
- **Flexible Sources**: Copy text from inputs, textareas, divs, spans, and more.
- **Visual Feedback**: Built-in states for "Copy", "Copied!", and "Failed!".
- **Modern & Fallback**: Uses the Clipboard API with a fallback to `execCommand`.
- **Error Handling**: Logs warnings for missing targets or unsupported features.
- **Automatic Initialization**: Runs automatically on `DOMContentLoaded`.

## Demo

Run `npm run build`, then open `examples/index.html` in your browser.

## Installation

### Option 1: npm

```bash
npm install senangwebs-jot
```

Import the JavaScript and CSS in your application:

```javascript
import SWJ from "senangwebs-jot";
import "senangwebs-jot/dist/swj.css";

// SWJ initializes automatically on DOMContentLoaded.
// Call SWJ.refresh() after adding copy buttons dynamically.
```

The package also supports CommonJS:

```javascript
const SWJ = require("senangwebs-jot");
```

### Option 2: CDN

Include the files directly in your HTML:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/senangwebs-jot@latest/dist/swj.min.css"
/>
<script src="https://unpkg.com/senangwebs-jot@latest/dist/swj.min.js"></script>
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

## Custom Button Content

Customize button content for different states (default, copied, error) using two approaches:

### Approach 1: Data Attributes

Use `data-swj-default`, `data-swj-copied`, and `data-swj-error` attributes on the button for HTML content:

```html
<button
  data-swj-copy="my-id"
  data-swj-copied="<i class='icon-check'></i> Copied!"
  data-swj-error="<i class='icon-x'></i> Error!"
>
  <i class="icon-copy"></i> Copy
</button>
```

### Approach 2: Child Elements

Use `data-swj-state` on child elements for visibility toggling:

```html
<button data-swj-copy="my-id">
  <span data-swj-state="default"><i class="icon-copy"></i> Copy</span>
  <span data-swj-state="copied"><i class="icon-check"></i> Copied!</span>
  <span data-swj-state="error"><i class="icon-x"></i> Failed!</span>
</button>
```

Child elements are automatically shown/hidden based on the button's current state.

## Dynamic Content

If you add elements dynamically, call `SWJ.refresh()` to attach event listeners to the new buttons.

```javascript
setTimeout(() => {
  const contentToCopy = document.createElement("textarea");
  contentToCopy.setAttribute("data-swj-id", "code-snippet");
  contentToCopy.setAttribute("data-swj-value", "");
  contentToCopy.hidden = true;
  contentToCopy.value = "console.log('Hello World');";
  document.body.appendChild(contentToCopy);

  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("data-swj-copy", "code-snippet");
  button.textContent = "Copy Code";
  document.body.appendChild(button);

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
