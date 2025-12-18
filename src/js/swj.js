import "../css/swj.css";

const SWJ = {
	config: {
		timeout: 2500,
		classes: {
			default: "swj-button-default",
			copied: "swj-button-copied",
			error: "swj-button-error",
		},
		autoInit: true,
	},

	init(options = {}) {
		if (options) {
			this.config = {
				...this.config,
				...options,
				classes: {
					...this.config.classes,
					...(options.classes || {}),
				},
			};
		}
		this.attachEventListeners();
	},

	refresh() {
		this.attachEventListeners();
	},

	attachEventListeners() {
		const copyButtons = document.querySelectorAll(
			"[data-swj-copy]:not([data-swj-attached])"
		);
		copyButtons.forEach((button) => {
			button.addEventListener("click", () => this.handleCopy(button));
			button.setAttribute("data-swj-attached", "true");
			button.setAttribute("aria-label", "Copy to clipboard");
			this.setDefaultButtonState(button);
		});
	},

	async handleCopy(button) {
		const targetId = button.getAttribute("data-swj-copy");
		if (!targetId) {
			console.warn(
				"SWJ: Button is missing data-swj-copy attribute or its value is empty."
			);
			this.setErrorButtonState(button, "No ID");
			return;
		}

		const sourceElement = document.querySelector(
			`[data-swj-id="${targetId}"][data-swj-value]`
		);

		if (!sourceElement) {
			console.warn(
				`SWJ: No source element found with data-swj-id="${targetId}" and data-swj-value attribute.`
			);
			this.setErrorButtonState(button, "No Src");
			return;
		}

		let textToCopy;
		if (
			sourceElement.tagName === "INPUT" ||
			sourceElement.tagName === "TEXTAREA"
		) {
			textToCopy = sourceElement.value;
		} else {
			textToCopy = sourceElement.textContent;
		}

		if (textToCopy === null || textToCopy.trim() === "") {
			console.warn(
				`SWJ: Source element with data-swj-id="${targetId}" has no content to copy.`
			);
			this.setErrorButtonState(button, "Empty");
			return;
		}

		try {
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(textToCopy);
				this.setCopiedButtonState(button);
			} else if (document.execCommand) {
				// Fallback
				const tempTextArea = document.createElement("textarea");
				tempTextArea.value = textToCopy;
				tempTextArea.style.position = "absolute";
				tempTextArea.style.left = "-9999px";
				document.body.appendChild(tempTextArea);
				tempTextArea.select();
				document.execCommand("copy");
				document.body.removeChild(tempTextArea);
				this.setCopiedButtonState(button);
			} else {
				throw new Error("SWJ: Clipboard API not supported.");
			}
		} catch (err) {
			console.error("SWJ: Failed to copy text: ", err);
			this.setErrorButtonState(button, "Failed!");
		}
	},

	hasChildStateElements(button) {
		return button.querySelector("[data-swj-state]") !== null;
	},

	setDefaultButtonState(button) {
		// Store original content if not already stored
		if (!button.hasAttribute("data-swj-original-html")) {
			button.setAttribute("data-swj-original-html", button.innerHTML);
		}

		// Update classes
		button.classList.add("swj-button", this.config.classes.default);
		button.classList.remove(this.config.classes.copied, this.config.classes.error);
		button.setAttribute("aria-label", "Copy to clipboard");

		// If using child element approach, visibility is handled by CSS
		if (this.hasChildStateElements(button)) {
			return;
		}

		// Data attribute approach - use custom content or original
		const customDefault = button.getAttribute("data-swj-default");
		const originalHtml = button.getAttribute("data-swj-original-html");
		button.innerHTML = customDefault || originalHtml;
	},

	setCopiedButtonState(button) {
		// Update classes
		button.classList.add("swj-button", this.config.classes.copied);
		button.classList.remove(this.config.classes.default, this.config.classes.error);
		button.setAttribute("aria-label", "Copied successfully");

		// If using child element approach, visibility is handled by CSS
		if (!this.hasChildStateElements(button)) {
			// Data attribute approach
			const customCopied = button.getAttribute("data-swj-copied");
			button.innerHTML = customCopied || "Copied!";
		}

		setTimeout(() => {
			this.setDefaultButtonState(button);
		}, this.config.timeout);
	},

	setErrorButtonState(button, message = "Failed!") {
		// Update classes
		button.classList.add("swj-button", this.config.classes.error);
		button.classList.remove(this.config.classes.default, this.config.classes.copied);
		button.setAttribute("aria-label", "Copy failed");

		// If using child element approach, visibility is handled by CSS
		if (!this.hasChildStateElements(button)) {
			// Data attribute approach
			const customError = button.getAttribute("data-swj-error");
			button.innerHTML = customError || message;
		}

		setTimeout(() => {
			this.setDefaultButtonState(button);
		}, this.config.timeout);
	},
};

if (typeof document !== "undefined") {
	document.addEventListener("DOMContentLoaded", () => {
		if (SWJ.config.autoInit) {
			SWJ.init();
		}
	});
}

export default SWJ;