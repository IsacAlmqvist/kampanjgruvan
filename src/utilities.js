export const Utils = {

    formatStoreName(store) {
        return (store.replace(/\/$/, "")
                .replace(/-\d+$/, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase()));
    }

}