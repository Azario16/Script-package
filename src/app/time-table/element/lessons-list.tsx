import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';

import React from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";
import { ACTIONS_WINDOW } from '../../modal-window/function/actions-window'
import { getTimeFromDate, getDateWeekForButton, getDateFormate } from '../../../hooks/date-time'

function InfoBlock(props: any) {
    // console.log(props)

    const [LESSONS_INFO, setLessonsInfo] = useState<any>()
    const [ERROR, setError] = useState<any>()

    const effectStatus = useRef(true)
    const mapRelation: any = {
        'kid': 'Skysmart - KIDS',
    }
    // console.log(params.session)

    const openModalElenet = () => {
        const messageValue = {
            message: 'create-chat',
            userId: props.userId,
        }

        sendMessage(ACTIONS.SEND_EVENT, messageValue, (result: any) => {

        })
    }



    const updateLessonsInfo = () => {
        effectStatus.current = true
        const dateWeek = getDateWeekForButton().weekButton(props.startDate.current, 1)
        console.log(dateWeek)
        sendMessage(ACTIONS.GET_TEACHER_LESSONS, { props, dateWeek }, (result: any) => {
            console.log(result)
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
            console.log(time)
            const text = `${status.status} | ${time} | created ${status.createdByUserId} | comment ' ${status.comment} '`
            return text
        }
        if (element.removedAt) {
            const classProperties = element.classProperties
            const propertyId = element.classProperties.length !== 0 ? classProperties[0].propertyId : null
            const time = getDateFormate(element.removedAt)
            console.log(time)
            const text = `удален/перенос | ${time} | created ${element.createdByUserId} | ${propertyId}`
            return text
        }
        return ' - '
    }

    useEffect(() => {
        if (props.startValue && props.teacherId !== '') {
            console.log(props)
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