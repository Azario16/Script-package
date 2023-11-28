import { DateTimeFormate } from "./date-time.interface";

class DateTime {
    private OPTION = {
        timeZone: 'Europe/Moscow',
    }; 

    public getFormateDateTime(format: string): string {
        const dateTime = new Date()
        const dateTimeToString = this.getLocaleString('', dateTime)
        return this.getReplaceFormateDate(dateTimeToString, format)
    }

    private getLocaleString(locale: string, dateTime: Date){
        if(locale === 'Europe/Moscow'){
            return dateTime.toLocaleString('ru-Ru', this.OPTION)
        } 
        return dateTime.toLocaleString('ru-Ru')
    }

    private getReplaceFormateDate(dateTime: string, format: string): string {
        const dateTimeComponent = this.extractDateTimeComponents(dateTime)

        const formattedDateString = format
            .replace(DateTimeFormate.yyyy, dateTimeComponent.year)
            .replace(DateTimeFormate.MM, dateTimeComponent.month)
            .replace(DateTimeFormate.dd, dateTimeComponent.day)
            .replace(DateTimeFormate.HH, dateTimeComponent.hour)
            .replace(DateTimeFormate.mm, dateTimeComponent.minute)
            .replace(DateTimeFormate.ss, dateTimeComponent.second);

        return formattedDateString
    }

    private extractDateTimeComponents(dateTime: string) {
        const [date, time] = dateTime.split(', ');
        const [day, month, year] = date.split('.');
        const [hour, minute, second] = time.split(':');

        return {
            day,
            month,
            year,
            hour,
            minute,
            second
        };
    }
}

const DateTimeService = new DateTime()

export { DateTimeService }