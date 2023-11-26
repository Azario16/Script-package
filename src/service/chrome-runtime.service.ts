const getUrl = (path: string) => {
    switch (window.location.hostname) {
        case 'localhost':
            return 'http://localhost:3000/' + path;
        default:
            return chrome.runtime.getURL(path)
    }
}

const isExtensionContext = ()=>{
    return typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined';
}

export { getUrl, isExtensionContext } 