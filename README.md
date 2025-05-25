# SenangWebs Jot (SWJ)

SenangWebs Jot (SWJ) is a lightweight, vanilla JavaScript library that enables easy copying of text from specified HTML elements to the user's clipboard. It uses Tailwind CSS for styling feedback buttons and prioritizes the modern `navigator.clipboard` API with a fallback for older browsers.

## Features

*   **Simple Integration:** Add a few data attributes to your HTML, and SWJ handles the rest.
*   **Flexible Source Elements:** Copy text from `<textarea>`, `<input>`, `<div>`, `<span>`, `<p>`, `<code>`, and more.
*   **User Feedback:** Buttons provide clear visual feedback for "Copy", "Copied!", and "Failed!" states using Tailwind CSS.
*   **Modern & Fallback Copy:** Uses `navigator.clipboard.writeText()` with a fallback to `document.execCommand('copy')`.
*   **Error Handling:** Gracefully handles missing targets or unsupported browser features, logging warnings to the console.

## Setup & Usage

SenangWebs Jot is now built using Webpack. The library's core files are located in the `src/` directory, and the distributable, production-ready files are generated in the `dist/` directory.

### For Developers (Building from Source)

1.  **Clone the Repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd senangwebs-jot
    ```

2.  **Install Dependencies**:
    Make sure you have Node.js and npm installed. Then, install the project dependencies:
    ```bash
    npm install
    ```

3.  **Build the Library**:
    *   For a production build (minified JS and CSS):
        ```bash
        npm run build
        ```
    *   For a development build (with source maps and unminified files) and to watch for changes:
        ```bash
        npm run dev
        ```
    This will generate `swj.min.js`, `swj.min.css` (for production) or `swj.js`, `swj.css` (for development) in the `dist/` folder, along with an updated `index.html` in `dist/` for testing.

### Using the Distributable Files

If you want to use the pre-built library in your project:

1.  **Include the CSS**:
    Link the `swj.min.css` (or `swj.css` for development) file in the `<head>` of your HTML:
    ```html
    <link rel="stylesheet" href="path/to/dist/swj.min.css">
    ```

2.  **Include the JavaScript**:
    Add the `swj.min.js` (or `swj.js` for development) script to your HTML file, preferably at the end of the `<body>` tag:
    ```html
    <script src="path/to/dist/swj.min.js"></script>
    ```
    The library initializes itself automatically on `DOMContentLoaded`.

3.  **Add Data Attributes to your HTML**:
    *   `data-swj-id="your-unique-id"`: Add this to the HTML element whose content you want to copy (e.g., a `<div>`, `<p>`, `<textarea>`, `<code>`).
    *   `data-swj-value`: This attribute **must** be present on the source element. For `<input>` and `<textarea>` elements, their `.value` will be copied. For other elements, their `.textContent` will be copied.
    *   `data-swj-copy="your-unique-id"`: Add this to the button element that will trigger the copy action. The value of this attribute must match the `data-swj-id` of the source element.

### Example

```html
<!-- Source Element: A textarea -->
<textarea data-swj-id="mySecretCode" data-swj-value>console.log('Hello from SWJ!');</textarea>

<!-- Copy Button: Linked to the textarea above -->
<button type="button" data-swj-copy="mySecretCode">Copy Code Snippet</button>


<!-- Source Element: A div -->
<div data-swj-id="shareableLink" data-swj-value>https://mysite.com/awesome-page</div>

<!-- Copy Button: Linked to the div above -->
<button type="button" data-swj-copy="shareableLink">Copy Link</button>
```

### Button States & Styling

The library uses CSS classes defined in `src/swj.css` (and bundled into `dist/swj.min.css` or `dist/swj.css`) to style the copy buttons according to their state. These classes are:

*   **Base Button Class**: `swj-button`
*   **Default State**: `swj-button-default`
    *   Text: "Copy" (or the button's original text if `data-swj-original-text` is set).
*   **Copied State** (shown for 2.5 seconds): `swj-button-copied`
    *   Text: "Copied!"
*   **Error State** (shown for 2.5 seconds): `swj-button-error`
    *   Text: "No ID", "No Src", "Empty", or "Failed!" depending on the error.

The default styling provides a look similar to Tailwind CSS buttons. You can customize these styles by modifying `src/swj.css` and rebuilding the library, or by overriding these classes in your own stylesheet.

The attribute `data-swj-original-text` can be pre-set on a button if you want its default text to be something other than "Copy". If not set, the library will use the button's existing text content as the original text.

## Demo

After running `npm run build` or `npm run dev`, an `index.html` file will be generated in the `dist/` directory. Open this `dist/index.html` in your browser to see SenangWebs Jot in action. This demo is based on the `examples/index.html` source file and showcases various use cases.

## Project Structure

```
senangwebs-jot/
├── dist/                 # Distribution folder (generated by Webpack)
│   ├── swj.min.js        # Minified JavaScript (production)
│   ├── swj.min.css       # Minified CSS (production)
│   ├── index.html        # Demo page (generated)
│   └── ...               # Other generated files (e.g., source maps)
├── examples/
│   └── index.html      # Source HTML for the demo page
├── src/
│   ├── swj.js          # Core JavaScript logic for the library
│   └── swj.css         # Styles for the library buttons
├── webpack.config.js   # Webpack configuration file
├── package.json        # Project metadata, scripts, and dependencies
└── README.md           # This file
```

## Known Limitations & Browser Compatibility

*   **Clipboard API Access:** The `navigator.clipboard.writeText()` API requires a secure context (HTTPS) in many browsers, or it might require user permission. When testing locally via `file://` protocol, it might not work as expected in some browsers due to security restrictions. The fallback `document.execCommand('copy')` is less secure and has some limitations but is provided for broader compatibility.
*   **Styling:** The default styling is provided by Tailwind CSS utility classes. If you are not using Tailwind CSS or want to customize the appearance, you will need to modify the class names directly in the `swj.js` file within the `setDefaultButtonState`, `setCopiedButtonState`, and `setErrorButtonState` methods.
*   **DOM Readiness:** SWJ initializes on the `DOMContentLoaded` event. Ensure your elements with `data-swj-*` attributes are present in the DOM when this event fires.

---

SenangWebs Jot - Making text copying simple!