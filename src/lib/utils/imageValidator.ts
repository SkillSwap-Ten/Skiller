export const validateImageUrl = (url: string | undefined) => {
    return typeof url === 'string' &&
        url.trim() !== '' &&
        (url.startsWith("https") || url.startsWith("http"));
};
