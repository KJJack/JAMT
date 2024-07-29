
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

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    
    return `${month}-${day}-${year}`;
}