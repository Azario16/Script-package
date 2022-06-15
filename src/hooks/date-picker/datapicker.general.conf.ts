import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
export default function createDatePicker({ START, END, elementList, DATE_PICK, cb, cb2 }: any) {
    const createOption = (isRTLboolean: any, show: any) => {
        return {

            beforeShow: function (input: any, inst: any) {
                console.log(`offsetHeight: ${input.offsetHeight}`)
                const coordinate = input.getBoundingClientRect();
                setTimeout(() => {
                    $(".ui-datepicker-month").addClass('bg-light')
                }, 10);
                setTimeout(() => {
                    if (cb !== undefined) {
                        cb(input, inst)
                    }
                }, 0);
            },

            firstDay: 1,
            isRTL: isRTLboolean === undefined ? false : isRTLboolean,
            changeMonth: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "dd-mm-yy",
            // dateFormat: "yy-mm-dd",
            showOn: show === undefined ? "both" : show,
            buttonText: '',
            yearRange: "-1:+1",
            onSelect: (e: any, { id }: any) => {
                if (cb2) {
                    // START_DATE.current = e.split('-').reverse().join('-')
                    cb2(e)
                }
                if (DATE_PICK) {
                    DATE_PICK.current = e.split('-').reverse().join('-')
                }


                if (!START) {
                    return null
                }
                if (id === 'datepStart') {
                    START.current = e
                } else if (id === 'datepEnd') {
                    END.current = e
                }

                if (id === 'datepStartUser') {
                    START.current = e.split('-').reverse().join('-')
                } else if (id === 'datepEndUser') {
                    END.current = e.split('-').reverse().join('-')
                }

                console.log(START)
                console.log(END)
            }
        }
    }
    $(function () {
        $.datepicker.setDefaults($.datepicker.regional["ru"] = {
            closeText: "Закрыть",
            prevText: "&#x3C;Пред",
            nextText: "След&#x3E;",
            currentText: "Сегодня",
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
                "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            weekHeader: "Нед",
            dateFormat: "dd.mm.yy",
            // firstDay: 1,
            showMonthAfterYear: false,
            yearSuffix: ""
        });

        const OPTION: any = createOption(null, null)
        // $('#datep').datepicker(OPTION);
        // $('#datepStart').datepicker(OPTION);
        // $('#datepEnd').datepicker(OPTION);

        // $('#datepStartUser').datepicker(createOption());
        if (elementList) {
            elementList.forEach(({ element, isRTLboolean, show }: any) => {
                const OPTION: any = createOption(isRTLboolean, show)
                // console.log( $(`#${element}`))
                // const iframe = $('iframe').contents();
                // iframe.find(`#${element}`).datepicker(OPTION);
                $(`#${element}`).datepicker(OPTION);
            });

        }

        // $('.datep').datepicker(OPTION);
        $(".ui-datepicker-month").addClass('bg-light')
        // $(".ui-datepicker-trigger").append('<i class="fa fa-calendar-alt"></i>')
    });
}
