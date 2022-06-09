
const api = () => {
    let host;
    switch (window.location.hostname) {
        case 'extension-test.ru':
            host = 'https://api.extension-test.ru'
            break;

        case 'test1.datsy.ru':  // if (x === 'value2')
            host = 'https://api.datsy.ru'
            break;
        case 'sharescreen.datsy.ru':  // if (x === 'value2')
            host = 'https://api.datsy.ru'
            break;
        case 'app.datsy-test.ru':  // if (x === 'value2')
            host = 'https://api.datsy-test.ru'
            break;
        case 'datsy-app-test.ru':  // if (x === 'value2')
            host = 'https://api.datsy-test.ru'
            break;
        default:
            host = 'https://api.extension-test.ru'
            break;
    }
    return host
}

const shedulePath = () => {
    const url = `/api/new-schedule`
    // const url = `/api/schedule`
    return url
}

const sheduleReservPath = () => {
    const url = `/api/new-reservation`
    // const url = `/api/reservation`
    return url
}

export { api, shedulePath, sheduleReservPath }