import { createTime } from '../date-time'


const parseRegularTime = (timeList: any) => {
    const times: any = [];
    timeList.forEach((element: any) => {
        const [hourseSt, minuteSt] = element.split(":");
        const hourseMoscow = Number(hourseSt) + 3
        const week: any = hourseMoscow > 24
            ? Math.trunc(hourseMoscow / 24)
            : 0;
        let start: any = hourseMoscow - (week * 24);
        start = ("0" + String(start)).slice(-2)
        start = `${start}:${minuteSt}`
        const weekNumber = week + 1
        if (!times[weekNumber]) {
            times[weekNumber] = []
        }
        times[weekNumber].push(start)
    });
    return times; 
}

const parseSinglTime = (timeList: any) => {
    if (!timeList) {
        return []
    }
    const result = timeList.map((element: any) => {
        const time = createTime(element.startAt).slice(0, -5) + '00'
        if (element.classStatus) {
            const status = element.classStatus.status
            const activ = status === 'success' ? true : false;
            return {
                lessonActiv: activ,
                status: status,
                time: time
            }
        }
        if (element.removedAt) {
            return {
                lessonActiv: false,
                status: 'removed/moved',
                time: time
            }
        }
        return {
            lessonActiv: true,
            status: 'not start',
            time: time
        }
    })
    return result
}

export { parseRegularTime, parseSinglTime }