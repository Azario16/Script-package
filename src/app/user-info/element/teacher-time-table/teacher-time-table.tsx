import React from 'react';
import Slider from "react-slick";
// import "react-multi-carousel/lib/styles.css";
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../../chrome/utils";
import { ACTIONS } from "../../../../chrome/actions-bg";
import {
    ClaendarIcon,
    TelehoneMissedIcon,
    LifeBuoyIcon
} from '../../../../icon'
import ButtonGroup from './custom-button'

import { getDateWeekForButton, getNowWeek, createTime, getNowTime } from '../../../../hooks/date-time'
import { parseRegularTime, parseSinglTime } from '../../../../hooks/time-type-parse'

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slick-prev-cust carousel-control-prev-icon h-15px`}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        >
            {/* <span className="carousel-control-prev-icon h-15px" aria-hidden="true"></span> */}
        </div>
    );
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slick-next-cust carousel-control-next-icon h-15px`}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        >
            {/* <div className="carousel-control-next-icon h-15px" aria-hidden="true"></div> */}
        </div>
    );
}

function TeacherTimeTable(props: any) {

    const [TIME_INIT, setTimeInit] = useState<number>()
    const [HOUR_LIST, setHourList] = useState([])
    const [LESSONS_INFO, setLessonsInfo] = useState<any>([])
    const [TIME_LIST, setTimeList] = useState([])
    const [ERROR, setError] = useState<any>()
    const [WEEK, setWeek] = useState<any>()

    const [slider, setSliderRef] = useState<any>();
    // const slider = useRef<any>();

    useEffect(() => {
        /* Fix initialSlide https://github.com/akiran/react-slick/issues/1946 */
        if (slider && TIME_INIT) {
            console.log('Test')
            slider?.slickGoTo(TIME_INIT, false);
        }
    }, [TIME_INIT, slider]);

    const updateTeacherSchedule = () => {
        const dateWeek = getDateWeekForButton().weekButton(null, 1)
        const messageValue = {
            // dateWeek: {
            //     wkStart: '2022-07-07',
            //     wkEnd: '2022-07-08'
            // },
            dateWeek,
            teacherId: props.userId
        }
        console.log(messageValue)
        // console.log(dateWeek)
        sendMessage(ACTIONS.GET_TEACHER_LESSONS, messageValue, (result: any) => {
            // console.log(result)
            const lessons: any = result["lessons"]
            // console.log(lessons)
            if (lessons[0].count === 0) {
                const errorMessage = 'Не найден преподаватель'
                setError(errorMessage)
            } else if (lessons[0].count > 0) {
                const filetStart = lessons[0].result[0].classesRegular.map((element: any) => {
                    const formateString = element.startAt.substring(1).split('+')[0]

                    return formateString
                })
                // console.log(filetStart)
                const weekTimeList = parseRegularTime(filetStart)
                const singlClassList = parseSinglTime(lessons[0].result[0].classes)
                // console.log(singlClassList)
                // console.log(weekTimeList)
                // console.log(HOUR_LIST)

                const mapActivLessonRegular = HOUR_LIST.map((element: any) => {
                    // console.log(element)
                    const lessonActiv = !!weekTimeList[WEEK] ? weekTimeList[WEEK].includes(element.time) : false
                    return {
                        lessonActiv: lessonActiv,
                        status: '',
                        time: element.time
                    }
                })
                // console.log(mapActivLessonRegular)

                const mapStatusClass: any = mapActivLessonRegular.map((element: any) => {
                    return statusLesson(element, singlClassList)
                })

                // console.log(mapStatusClass)
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
        // console.log(classElement)
        // console.log(classSingleList)
        let searchValue = false
        classSingleList.forEach((element: any) => {
            // console.log(element)
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
            let start = ("0" + String(hh)).slice(-2)
            times.push({
                lessonActiv: false,
                status: '',
                time: `${start}:00`
            })
            hh++;
        }
        const week = getNowWeek()
        const timeNumber = Number(getNowTime().slice(0, -6))
        console.log(getNowTime())
        console.log(timeNumber)
        const timeInit: number = timeNumber >= 3 ? timeNumber - 3 : 1
        console.log(timeInit)
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
    console.log(TIME_INIT)
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
                                        // console.log(key)
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