import { useState, useEffect, useRef } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import { getDateWeekForButton, getDateFormate } from '../../../hooks/date-time'
import { Logger } from '../../../service/logger/logger.service';

function InfoBlock(props: any) {
    const [LESSONS_INFO, setLessonsInfo] = useState<any>()
    const [ERROR, setError] = useState<any>()

    const effectStatus = useRef(true)

    const updateLessonsInfo = () => {
        effectStatus.current = true
        const dateWeek = getDateWeekForButton().weekButton(props.startDate.current, 1)
        const messageValue = {
            dateWeek,
            teacherId: props.teacherId
        }
        Logger.debug(dateWeek)
        sendMessage(ACTIONS.GET_TEACHER_LESSONS, messageValue, (result: any) => {
            Logger.debug(result)
            const lessons: any = result["lessons"]
            if (lessons[0].count === 0) {
                const errorMessage = 'Не найден преподаватель'
                setError(errorMessage)
            } else if (lessons[0].count > 0) {
                setLessonsInfo(lessons[0].result[0].classes)
            }
        })
    }

    const statusLesson = (element: any) => {
        if (element.classStatus) {
            const status = element.classStatus
            const time = getDateFormate(status.createdAt)
            Logger.debug(time)
            const text = `${status.status} | ${time} | created ${status.createdByUserId} | comment ' ${status.comment} '`
            return text
        }
        if (element.removedAt) {
            const classProperties = element.classProperties
            const propertyId = element.classProperties.length !== 0 ? classProperties[0].propertyId : null
            const time = getDateFormate(element.removedAt)
            Logger.debug(time)
            const text = `удален/перенос | ${time} | created ${element.createdByUserId} | ${propertyId}`
            return text
        }
        return ' - '
    }

    useEffect(() => {
        if (props.startValue && props.teacherId !== '') {
            Logger.debug(props)
            updateLessonsInfo()
        } else {
            setError(undefined)
            setLessonsInfo(undefined)
        }
        return () => {
            effectStatus.current = false;
        }
    }, [props.teacherId, props.startValue])

    return (
        <>
            {
                LESSONS_INFO === undefined ?
                    ERROR === undefined
                        ? <></>
                        : <pre className="text-center text-wrap">
                            {JSON.stringify(ERROR)}
                        </pre>
                    :
                    <div className="text-center position-relative">
                        <table className="table text-light">
                            <thead>
                                <tr>
                                    <th scope="col">ученик</th>
                                    <th scope="col">старт</th>
                                    <th scope="col">статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    LESSONS_INFO.map((element: any, key: number) => {
                                        // const id: any = element.id === "59452676"
                                        return (
                                            <tr key={key}>
                                                <td>{element.studentId}</td>
                                                <td>{getDateFormate(element.startAt)}</td>
                                                <td>{statusLesson(element)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}

export default InfoBlock;