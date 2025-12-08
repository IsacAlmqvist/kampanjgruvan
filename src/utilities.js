export const Utils = {

    formatStoreName(store) {
        return (store?.replace(/\/$/, "")
                .replace(/-\d+$/, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase()));
    },

    // Function to insert line breaks in long text
    formatLongText(text, maxLength = 50) {
        if (!text) return "";
        
        // If text is too long, find a good breaking point
        if (text.length > maxLength) {
            // Try to break at the last space before maxLength
            const breakPoint = text.lastIndexOf(' ', maxLength);
            if (breakPoint > 0) {
                return text.substring(0, breakPoint) + '\n' + text.substring(breakPoint + 1);
            }
            // If no space found, force break at maxLength
            return text.substring(0, maxLength) + '\n' + text.substring(maxLength);
        }
        return text;
    }
}