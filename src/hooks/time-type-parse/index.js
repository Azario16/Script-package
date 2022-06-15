import { createTimeList } from './create-time-list'

const parseTypeTime = (timeList, timeInterval) => {
    const times = createTimeList();

    // console.log(times);
    Object.entries(times).map(([time, value]) => {
        // console.log(time)
        timeList.forEach(element => {
            const [hourseSt, minuteSt] = element['start'].split(":");
            const [hourseEd, minuteEd] = element['end'].split(":");

            const timeWeek = (24 * Number(element["week"]));
            // console.log(timeWeek)
            let start = 24 + Number(hourseSt) - Number(timeWeek);
            let end = 24 + Number(hourseEd) - Number(timeWeek);

            start = ("0" + String(start)).slice(-2)
            end = ("0" + String(end)).slice(-2)

            start = `${start}:${minuteSt}`
            end = `${end}:${minuteEd}`

            if (time !== "00:00" && timeWeek !== '1') {
                start = start === "00:00" ? "24:00" : start
                end = end === "00:00" ? "24:00" : end
            }

            if (start <= time && end > time) {
                times[time] = element["status"];
            }

        });
    })
    return times;
}

export { parseTypeTime }