import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { sendMessage } from "../../../../chrome/utils";
import { ACTIONS } from "../../../../chrome/actions";

import { getDateWeekForButton } from '../../../../hooks/date-time'


function SlackId(props: any) {
    const [SLACK_ID, setSlackId] = useState('')
    const [SHOW, setShow] = useState(false)
    const updateSlackId = () => {
        const dateWeek = getDateWeekForButton().oldTimeTableDate(null, 4)

        const messageValue = {
            dateWeek,
            teacherId: props.userId
        }
        sendMessage(ACTIONS.GET_TEACHER_SLACK_ID, messageValue, (result: any) => {
            if (result.lessons[0].result.length > 0) {
                if(result.lessons[0].result[0].slackUserId){
                    setSlackId(result.lessons[0].result[0].slackUserId)
                    setShow(true)
                }
            }
        })
    }
    useEffect(() => {
        updateSlackId();
    }, [])

    return (
        <>
            {
                SHOW &&
                <div className="text-center btn-group">
                    <div className="text-light btn-group">
                        <div className='bg-none custom-icon slack-icon'></div>
                        <a className="fs-custom-0_9 ms-1 text-slack d-flex justify-content-center align-items-center" href={`https://skyeng.slack.com/team/${SLACK_ID}`} target="_blank">{SLACK_ID}</a>
                    </div>
                </div>
            }
        </>
    )
}

export default SlackId