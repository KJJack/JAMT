
export const validateAndFormatURL = (url) => {
    let formattedUrl = url.trim();

    if (!formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
    }

    if (!formattedUrl.endsWith('.com')) {
        formattedUrl = formattedUrl + '.com';
    }

    return formattedUrl;
}