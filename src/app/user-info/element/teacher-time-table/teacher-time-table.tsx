import Slider from "react-slick";
// import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from 'react';
import { sendMessage } from "../../../../chrome/utils";
import { ACTIONS } from "../../../../chrome/actions";

import { getDateWeekForButton, getNowWeek, getNowTime } from '../../../../hooks/date-time'
import { parseRegularTime, parseSinglTime } from '../../../../hooks/time-type-parse'
import { Logger } from '../../../../service/logger/logger.service';

function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
        <div
            className={`slick-prev-cust carousel-control-prev-icon h-15px`}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        ></div>
    );
}

function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
        <div
            className={`slick-next-cust carousel-control-next-icon h-15px`}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        ></div>
    );
}

function TeacherTimeTable(props: any) {

    const [TIME_INIT, setTimeInit] = useState<number>()
    const [HOUR_LIST, setHourList] = useState([])

    const [TIME_LIST, setTimeList] = useState([])
    // const [ERROR, setError] = useState<any>()
    const [WEEK, setWeek] = useState<any>()

    const [slider, setSliderRef] = useState<any>();

    useEffect(() => {
        /* Fix initialSlide https://github.com/akiran/react-slick/issues/1946 */
        if (slider && TIME_INIT) {
            slider?.slickGoTo(TIME_INIT, false);
        }
    }, [TIME_INIT, slider]);

    const updateTeacherSchedule = () => {
        const dateWeek = getDateWeekForButton().weekButton(null, 1)
        const messageValue = {
            dateWeek,
            teacherId: props.userId
        }
        Logger.debug(messageValue)
        sendMessage(ACTIONS.GET_TEACHER_LESSONS, messageValue, (result: any) => {
            const lessons: any = result["lessons"]
            if (lessons[0].count === 0) {
                // const errorMessage = 'Не найден преподаватель'
                // setError(errorMessage)
            } else if (lessons[0].count > 0) {
                const filetStart = lessons[0].result[0].classesRegular.map((element: any) => {
                    const formateString = element.startAt.substring(1).split('+')[0]

                    return formateString
                })
                const weekTimeList = parseRegularTime(filetStart)
                const singlClassList = parseSinglTime(lessons[0].result[0].classes)

                const mapActivLessonRegular = HOUR_LIST.map((element: any) => {
                    const lessonActiv = !!weekTimeList[WEEK] ? weekTimeList[WEEK].includes(element.time) : false
                    return {
                        lessonActiv: lessonActiv,
                        status: '',
                        time: element.time
                    }
                })

                const mapStatusClass: any = mapActivLessonRegular.map((element: any) => {
                    return statusLesson(element, singlClassList)
                })

                setTimeList(mapStatusClass)
            }
        })
    }

    const statusLesson = (classElement: any, classSingleList: any) => {
        const body = {
            lessonActiv: false,
            status: '',
            time: ''
        }

        let searchValue = false
        classSingleList.forEach((element: any) => {
            if (classElement.time === element.time) {
                searchValue = true
                body.lessonActiv = element.lessonActiv;
                body.status = element.status;
                body.time = element.time;

            }

        })

        if (searchValue) {
            return body
        } else {
            return classElement
        }
    }

    useEffect(() => {
        if (HOUR_LIST.length) {
            updateTeacherSchedule()
        }
    }, [HOUR_LIST])

    useEffect(() => {
        let hh = 0;
        const times: any = [];
        while (hh < 24) {
            const start = ("0" + String(hh)).slice(-2)
            times.push({
                lessonActiv: false,
                status: '',
                time: `${start}:00`
            })
            hh++;
        }
        const week = getNowWeek()
        const timeNumber = Number(getNowTime().slice(0, -6))
        Logger.debug(getNowTime())
        Logger.debug(timeNumber)
        const timeInit: number = timeNumber >= 3 ? timeNumber - 3 : 1
        Logger.debug(timeInit)
        setTimeInit(timeInit)
        setHourList(times)
        setWeek(week)
    }, [])

    const settings = {
        dots: false,
        infinite: false,
        speed: 100,
        slidesToShow: 6,
        slidesToScroll: 5,
        initialSlide: TIME_INIT,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
    };
    Logger.debug(TIME_INIT)
    return (
        <>
            {
                !TIME_LIST.length ? <></> :
                    <div className="container w-264px h-20px">
                        <div className=" text-light ">
                            <Slider {...settings} ref={(ref) => {
                                setSliderRef(ref)
                            }}>
                                {
                                    TIME_LIST.map((element: any, key: number) => {
                                        return (
                                            <div
                                                key={key}
                                                className={`${element.lessonActiv ? 'bg-class-activ' : ''} border border-table border-1_3 text-center`}
                                            >{key}</div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
            }
        </>
    )
}

export default TeacherTimeTable