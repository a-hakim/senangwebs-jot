import '../css/swj.css';

document.addEventListener('DOMContentLoaded', () => {
    const SWJ = {
        init() {
            this.attachEventListeners();
        },

        attachEventListeners() {
            const copyButtons = document.querySelectorAll('[data-swj-copy]');
            copyButtons.forEach(button => {
                button.addEventListener('click', () => this.handleCopy(button));
                // Apply default styling
                this.setDefaultButtonState(button);
            });
        },

        async handleCopy(button) {
            const targetId = button.getAttribute('data-swj-copy');
            if (!targetId) {
                console.warn('SWJ: Button is missing data-swj-copy attribute or its value is empty.');
                this.setErrorButtonState(button, 'No ID');
                return;
            }

            const sourceElement = document.querySelector(`[data-swj-id="${targetId}"][data-swj-value]`);

            if (!sourceElement) {
                console.warn(`SWJ: No source element found with data-swj-id="${targetId}" and data-swj-value attribute.`);
                this.setErrorButtonState(button, 'No Src');
                return;
            }

            let textToCopy;
            if (sourceElement.tagName === 'INPUT' || sourceElement.tagName === 'TEXTAREA') {
                textToCopy = sourceElement.value;
            } else {
                textToCopy = sourceElement.textContent;
            }

            if (textToCopy === null || textToCopy.trim() === '') {
                console.warn(`SWJ: Source element with data-swj-id="${targetId}" has no content to copy.`);
                this.setErrorButtonState(button, 'Empty');
                return;
            }

            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                    this.setCopiedButtonState(button);
                } else if (document.execCommand) { // Fallback
                    const tempTextArea = document.createElement('textarea');
                    tempTextArea.value = textToCopy;
                    tempTextArea.style.position = 'absolute';
                    tempTextArea.style.left = '-9999px';
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextArea);
                    this.setCopiedButtonState(button);
                } else {
                    throw new Error('SWJ: Clipboard API not supported.');
                }
            } catch (err) {
                console.error('SWJ: Failed to copy text: ', err);
                this.setErrorButtonState(button, 'Failed!');
            }
        },

        setDefaultButtonState(button, customText = null) {
            const originalText = button.getAttribute('data-swj-original-text') || (customText || 'Copy');
            if (!button.hasAttribute('data-swj-original-text')) {
                button.setAttribute('data-swj-original-text', button.textContent || originalText);
            }
            button.textContent = originalText;
            button.className = 'swj-button swj-button-default';
        },

        setCopiedButtonState(button) {
            const originalText = button.getAttribute('data-swj-original-text') || 'Copy';
            button.textContent = 'Copied!';
            button.className = 'swj-button swj-button-copied';
            setTimeout(() => {
                this.setDefaultButtonState(button, originalText);
            }, 2500);
        },

        setErrorButtonState(button, message = 'Failed!') {
            const originalText = button.getAttribute('data-swj-original-text') || 'Copy';
            button.textContent = message;
            button.className = 'swj-button swj-button-error';
            setTimeout(() => {
                this.setDefaultButtonState(button, originalText);
            }, 2500);
        }
    };

    SWJ.init();
});

export default SWJ;