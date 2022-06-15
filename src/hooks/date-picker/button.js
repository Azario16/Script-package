import { setDateTimeSlot, setDateSlot, getDateTimeSlot, getDateSlot, creatNowDate } from '../date-time'
function createDatepickerButton($, callBackDateTime) {

    return {
        goOverDate: (elm, $) => {
            $(function () {
                document.onmousemove = null
                let valueDataPicker = $("#datep").val()
                console.log(valueDataPicker)
                setDateSlot(valueDataPicker)
                callBackDateTime(valueDataPicker)
            });
        },
        
        previousDate: (elm) =>  {
            document.onmousemove = null
            let valueDataPicker = $("#datep").val()
            valueDataPicker = valueDataPicker.split('-').reverse().join(', ')
            let d = new Date(valueDataPicker);
            d.setDate(d.getDate() - 1);
            d = d.toLocaleDateString('ru-Ru').split('.').join('-')
            $("#datep").val(d)
            setDateSlot(d)
            callBackDateTime(d)
    
        },
        todayDate: (elm)=> {
            document.onmousemove = null
            let d = creatNowDate();          
            $("#datep").val(d)
            setDateSlot(d)
            callBackDateTime(d)
        },
        nextDate: (elm, $) => {
            $(function () {
                document.onmousemove = null
                let valueDataPicker = $("#datep").val()
                valueDataPicker = valueDataPicker.split('-').reverse().join(', ')
                let d = new Date(valueDataPicker);
                d.setDate(d.getDate() + 1);
                d = d.toLocaleDateString('ru-Ru').split('.').join('-')
                $("#datep").val(d)
                setDateSlot(d)
                callBackDateTime(d)
            });
        }
    }
}
export { createDatepickerButton }