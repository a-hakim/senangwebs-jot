---
name: senangwebs-jot
description: One-click text copying from HTML elements with Clipboard API, execCommand fallback, and visual feedback states.
version: 1.0.6
package: senangwebs-jot
---

# SenangWebs Jot (SWJ)

## Quick Reference

- **Purpose**: Click-to-copy utility for text from any HTML element
- **JavaScript entry**: `dist/swj.js` via the package root
- **Stylesheet**: `dist/swj.css`
- **CDN entry**: `dist/swj.min.js`
- **Dependencies**: none
- **Scripts**: `npm run build`, `npm run dev`

## Workflow

Start in `C:\wamp64\www\sw-libraries\senangwebs-jot`. Read `README.md`, `package.json`, and touched source files. Match existing patterns, CSS prefix `swj-`.

## HTML Data Attributes

| Attribute | Description |
|---|---|
| `data-swj-id` | Identifies the source element |
| `data-swj-value` | Required marker on the source element |
| `data-swj-copy` | Links a copy trigger to a `data-swj-id` value |
| `data-swj-default` | Button HTML in the default state (defaults to original HTML) |
| `data-swj-copied` | Button HTML after successful copy (default: "Copied!") |
| `data-swj-error` | Button HTML after failed copy (default: "Failed!") |

### State-based button content (child elements)
```html
<button data-swj-copy="snippet">
  <span data-swj-state="default">Copy</span>
  <span data-swj-state="copied">Copied!</span>
  <span data-swj-state="error">Failed!</span>
</button>
```

## JavaScript API

```js
SWJ.refresh()  // re-scan DOM for new copy triggers (dynamic content)
```

## Package Consumption

```js
import SWJ from "senangwebs-jot";
import "senangwebs-jot/dist/swj.css";
```

The npm package publishes only `dist/` plus its README, skill reference, and
license. Keep generated distribution files current by running `npm run build`
before publishing.

## Focus Areas

- Clipboard API (`navigator.clipboard.writeText`) as primary method
- `document.execCommand('copy')` fallback for older browsers
- Visual feedback states: default → copied/error → default (auto-reset)
- Text source resolution: inputs/textareas use `.value`; other elements use `.textContent`
- DOMContentLoaded auto-initialization
- CSS classes: `swj-button`, `swj-button-default`, `swj-button-copied`, `swj-button-error`

## Implementation Guidance

- Preserve backward compatibility for all attributes and CSS classes
- Handle missing target elements gracefully (console warning, not crash)
- Test Clipboard API permission states (granted, denied, prompt)
- Verify `SWJ.refresh()` picks up dynamically added elements

## Validation

```bash
npm run build
```
