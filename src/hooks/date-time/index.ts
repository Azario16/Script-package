import { Logger } from "../../service/logger/logger.service";

const DATE_TIME_SLOT = {
    dateTimeslot: '',
    dateSlot: '',
    dateSlotForamte: '',
    formateDateTimeSlot: ''
}

const OPTION = {
    timeZone: 'Europe/Moscow',
};

const getBacktDate = () => {
    const nowDate = DATE_TIME_SLOT.dateSlotForamte === '' ? creatNowDateFormate() : DATE_TIME_SLOT.dateSlotForamte
    let nowDataTimeFuture = new Date(nowDate);
    nowDataTimeFuture.setDate(nowDataTimeFuture.getDate() - 1);
    const backDate = nowDataTimeFuture.toLocaleDateString('ru-Ru', OPTION).split('.').join('-')

    return backDate
}

const setDateTimeSlot = (dateTime: any) => {
    // DATE_TIME_SLOT.dateTimeslot = '2022-02-05, 17:25:01'
    DATE_TIME_SLOT.dateTimeslot = dateTime
}

const getDateTimeSlot = () => {
    return DATE_TIME_SLOT.dateTimeslot
}

const setDateSlot = (dateTime: any) => {
    DATE_TIME_SLOT.dateSlot = dateTime
}

const getDateSlot = () => {
    const nowDate = DATE_TIME_SLOT.dateSlot === '' ? creatNowDate() : DATE_TIME_SLOT.dateSlot
    return nowDate
}

const getNowWeek = () => {
    const nowDate = new Date();
    const dateFormat = nowDate.toLocaleDateString('ru-Ru', OPTION).split('.').reverse().join('-')
    const time = nowDate.toLocaleTimeString('ru-Ru', OPTION)
    const nowDateMoscow = new Date(`${dateFormat} ${time}`);
    const weekNum = nowDateMoscow.getDay()

    return weekNum === 0 ? 7 : weekNum;
}

const creatNowDate = () => {
    let nowDataTimeBack = new Date();
    let dateFormat = nowDataTimeBack.toLocaleDateString('ru-Ru', OPTION).split('.').join('-')
    DATE_TIME_SLOT.dateSlot = dateFormat
    return dateFormat;
}


const setDateForamteSlot = (dateTime: any) => {
    DATE_TIME_SLOT.dateSlotForamte = dateTime
}

const getDateForamteSlot = (date: any) => {
    if (!date) {
        const nowDate = DATE_TIME_SLOT.dateSlotForamte === '' ? creatNowDateFormate() : DATE_TIME_SLOT.dateSlotForamte
        return nowDate
    } else {
        const newDate = date.split('-').reverse().join('-')
        return newDate
    }
}

const getDateForamte = (date: any) => {
    if (!date) {
        return null
    } else {
        const newDate = date.split('-').reverse().join('-')
        return newDate
    }
}

const creatNowDateFormate = () => {
    let nowDataTimeBack = new Date();
    let dateFormat = nowDataTimeBack.toLocaleDateString('ru-Ru', OPTION).split('.').reverse().join('-')
    DATE_TIME_SLOT.dateSlotForamte = dateFormat
    return dateFormat;
}

const checkNowDateSlot = (timeSlot: any, nextTimeSlot: any) => {
    function checkTimeColor(dateTime: any) {
        let nowDataTimeBack = new Date(dateTime);
        nowDataTimeBack.setMinutes(nowDataTimeBack.getMinutes() - 5);
        let backFormat: any = nowDataTimeBack.toLocaleString('ru-Ru').split(',')
        backFormat = backFormat[0].split('.').reverse().join('-') + ',' + backFormat[1]
        return backFormat
    }

    const backFormat = checkTimeColor(timeSlot)
    const futureFormat = checkTimeColor(nextTimeSlot)

    return { backFormat, futureFormat }
}

const getTimeForButton = (dateTime: any, read: any) => {
    const nowDateTime = DATE_TIME_SLOT.dateTimeslot

    const formatSlot = dateTime

    let nowDataTimeBack = new Date(formatSlot);
    nowDataTimeBack.setMinutes(nowDataTimeBack.getMinutes() - read);
    let backDateTimeSlot: any = nowDataTimeBack.toLocaleString('ru-Ru').split(',')
    backDateTimeSlot = backDateTimeSlot[0].split('.').reverse().join('-') + ',' + backDateTimeSlot[1]


    let nowDataTimeFuture = new Date(formatSlot);
    nowDataTimeFuture.setMinutes(nowDataTimeFuture.getMinutes() + 5);
    let futureFormat: any = nowDataTimeFuture.toLocaleString('ru-Ru').split(',')
    futureFormat = futureFormat[0].split('.').reverse().join('-') + ',' + futureFormat[1]

    return { nowDateTime, formatSlot, backDateTimeSlot, futureFormat }
}

const createCurrentDate = (start: any, end: any) => {
    const dtStart = new Date(start); // current date of week
    const dtEnd = new Date(end); // current date of week
    return { dtStart, dtEnd }
}

const getDateWeekForButton = () => {
    return {

        getLessDate: (start: any, end: any, pickDateCurrent: any) => {
            const dt = new Date(pickDateCurrent); // current date of week
            const currentWeekDay = dt.getDate();
            const currentStartDate = new Date(new Date(dt).setDate(currentWeekDay - 7));
            const pickDate = createDate(currentStartDate)

            const date: any = createCurrentDate(start, end)
            const days = (date.dtEnd - date.dtStart) / (1000 * 60 * 60 * 24);
            const currentDate = createCurrentDate(start, end)

            currentDate.dtStart.setDate(currentDate.dtStart.getDate() - days - 1);
            const wkStart = createDate(currentDate.dtStart)

            currentDate.dtEnd.setDate(currentDate.dtEnd.getDate() - days - 1);
            const wkEnd = createDate(currentDate.dtEnd)

            return { wkStart, wkEnd, pickDate }
        },
        getNextDate: (start: any, end: any, pickDateCurrent: any) => {
            const dt = new Date(pickDateCurrent); // current date of week
            const currentWeekDay = dt.getDate();
            const currentStartDate = new Date(new Date(dt).setDate(currentWeekDay + 7));
            const pickDate = createDate(currentStartDate)

            const date: any = createCurrentDate(start, end)
            const days = (date.dtEnd - date.dtStart) / (1000 * 60 * 60 * 24);
            const currentDate = createCurrentDate(start, end)

            currentDate.dtStart.setDate(currentDate.dtStart.getDate() + days + 1);
            const wkStart = createDate(currentDate.dtStart)
            Logger.debug(currentDate.dtStart)

            currentDate.dtEnd.setDate(currentDate.dtEnd.getDate() + days + 1);
            const wkEnd = createDate(currentDate.dtEnd)
            Logger.debug(wkEnd)

            return { wkStart, wkEnd, pickDate }
        },
        weekButton: (date: any, dateInterval: number) => {
            let pickDate
            if (!date) {
                pickDate = creatNowDateFormate()
            } else {
                pickDate = date
            }
            const dt = new Date(pickDate);
            const currentStartDate = new Date(new Date(dt).setDate(dt.getDate() - dateInterval));
            const wkStart = createDate(currentStartDate)
            const currentEndDate = new Date(new Date(dt).setDate(dt.getDate()));
            const wkEnd = createDate(currentEndDate)
            return { wkStart, wkEnd, pickDate }
        },
        oldTimeTableDate: (date: any, dateInterval: number) => {
            let pickDate
            if (!date) {
                pickDate = creatNowDateFormate()
            } else {
                pickDate = date
            }
            const dt = new Date(pickDate); // current date of week
            const currentStartDate = new Date(new Date(dt).setDate(dt.getDate() - dateInterval));
            const wkStart = createDateFront(currentStartDate)
            const currentEndDate = new Date(new Date(dt).setDate(dt.getDate()));

            const wkEnd = createDateFront(currentEndDate)
            return { wkStart, wkEnd, pickDate }
        }
    }
}

const createDateAndTime = (date: any) => {
    const currentDate = new Date(date);
    Logger.debug(currentDate)
    const dt = currentDate.toLocaleDateString('ru-Ru', OPTION)
    Logger.debug(dt)
    const formatDt = dt.split('.').join('-')
    Logger.debug(formatDt)
    const time = currentDate.toLocaleTimeString('ru-Ru', OPTION)
    return `${formatDt} ${time}`;
}

const createDate = (date: any) => {
    const currentDate = new Date(date);
    const dt = currentDate.toLocaleDateString('ru-Ru')
    const formatDt = dt.split('.').reverse().join('-')
    return formatDt;
}

const createDateFront = (date: any) => {
    const currentDate = new Date(date);
    const dt = currentDate.toLocaleDateString('ru-Ru')
    const formatDt = dt.split('.').join('-')
    return formatDt;
}

const createTime = (date: any) => {
    const currentDate = new Date(date);
    const time = currentDate.toLocaleTimeString('ru-Ru', OPTION)
    return time;
}

const getNowTime = () => {
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString('ru-Ru', OPTION)
    return time;
}

const getTimeFromDate = (date: any) => {
    const dt = new Date(date);
    const time = createTime(dt)
    return time
}

const getDateFormate = (date: any) => {
    const dt = new Date(date);
    Logger.debug(dt)
    Logger.debug(date)
    const newDate = createDateAndTime(dt)

    return newDate
}

export {
    setDateTimeSlot,
    getDateTimeSlot,

    getBacktDate,

    getDateSlot,
    setDateSlot,

    getDateForamte,
    getDateForamteSlot,
    setDateForamteSlot,
    getTimeFromDate,
    getDateFormate,
    getNowWeek,
    getNowTime,

    createDate,
    creatNowDate,
    creatNowDateFormate,
    createTime,

    checkNowDateSlot,
    getTimeForButton,
    getDateWeekForButton
}