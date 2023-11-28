import { useEffect, useRef, useMemo, useState } from 'react';
import { createDargAndDrop } from '../../core/drag-and-drop'
import React from 'react';
import { getDateWeekForButton } from '../../hooks/date-time'

import { Collapse } from 'bootstrap';
import { CreateDatePicker } from './element/datepicker-block'

import LessonsList from './element/lessons-list'
import { Logger } from '../../service/logger/logger.service';


const TimTableInfo: React.FC = () => {
    const START = useRef<string>('')
    const END = useRef<string>('')

    const [START_SEARCH, setStartSearch] = useState(false)

    const [TEACHER_ID, setTeacherId] = useState('')


    const buttonCollapseRef = useRef<HTMLDivElement | null>(null)
    const [mainElement, setMainelement] = useState<any>()

    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }

    const collapseChagne = () => {
        const checkShow = buttonCollapseRef.current?.classList?.contains('show')
        if (TEACHER_ID !== '' && !checkShow) {
            coollapseToogle(!checkShow, buttonCollapseRef.current)
            setStartSearch(!checkShow)
        } else if (checkShow) {
            coollapseToogle(true, buttonCollapseRef.current)
            setStartSearch(false)
        }
    }

    useMemo(() => {
        const dateWeek = getDateWeekForButton().weekButton(null, 1)
        Logger.debug(dateWeek)
        START.current = dateWeek.wkEnd
        END.current = dateWeek.wkStart
    }, [])

    useEffect(() => {
        if (mainElement) {
            createDargAndDrop(mainElement, mainElement, 'win')
        }
    }, [mainElement])

    return (
        <div >
            <div className="d-flex w-auto position-fixed border-b-dark z-index-cs" id="main-window-tt" ref={ref => setMainelement(ref)}>
                <div className="">

                    <div className="borderborder  bg-dark border border-b-dark rounded" id="move-window-tt">
                        <div className="btn-group">
                            <input className="form-control rounded-cust-0_15 h-30px w-50 padding-btn-0 text-center text-light  bg-b-border border border-b-dark "

                                value={TEACHER_ID}
                                onChange={(e) => {
                                    const validValueArray = e.target.value.match(/[0-9]+/g)
                                    const validValue = validValueArray !== null ? validValueArray.join('') : ''
                                    const checkShow = buttonCollapseRef.current?.classList?.contains('show')

                                    if (checkShow) {
                                        coollapseToogle(true, buttonCollapseRef.current)
                                    }
                                    setTeacherId(validValue)
                                    setStartSearch(false)
                                }}

                            ></input>

                            <div className="ms-2 me-2">
                                <button type="button" className="btn btn-secondary padding-btn-0 fs-6 text-light w-65px"
                                    onClick={collapseChagne}
                                >{!START_SEARCH ? 'найти' : 'свернуть'}
                                </button>
                            </div>
                            <CreateDatePicker date={{ START }} />
                        </div>
                    </div>
                    <div className={`collapse border-none`} id="collapseWidthExample"
                        ref={buttonCollapseRef}
                    >
                        <div style={{ "minHeight": "30px" }} className="rounded bg-exten-UI">
                            <div className="card  text-border bg-dark border rounded border-b-dark">
                                <LessonsList
                                    teacherId={TEACHER_ID}
                                    startValue={START_SEARCH}
                                    startDate={START}
                                    endDate={END}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default TimTableInfo;
