const createTimeList = () => {
    const x = 20;
    const times: any = {};
    let tt = 0;

    while (tt < 24.1 * 60) {
        const hh = Math.floor(tt / 60);
        const mm = (tt % 60);

        const timeTable = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2);
        times[timeTable] = '0';

        tt = tt + x;
    }
    return times;
}

export { createTimeList }