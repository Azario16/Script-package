import { useEffect, useRef, useState } from 'react';
import { createDargAndDrop } from '../../core/drag-and-drop'
import React from 'react';
import InfoBlock from './element/user-info-block';
import TimerComponent from './component/crm-timer-task.component/crm-timer-task.component'
import { Collapse } from 'bootstrap';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions";
import { isExtensionContext } from '../../service/chrome-runtime.service';
import { TaskService } from './service/task.service';
import { OperatorInfo } from '../../models/autofaq/operator-info.model';

const UserInfo: React.FC = () => {
    const [IS_EXPANDED, setIsExpanded] = useState(false)
    const [IS_ACTIVE_TASK, setIsActiveTask] = useState(false)
    const [START_TASK_ASSIGN_DATE, setStartTaskAssignDate] = useState<string>('');

    const [USER_ID, setUserId] = useState('')
    const [AF_OPERATOR_VALUE, setAfOperatorValue] = useState<OperatorInfo>()
    const [CRM_SESSION, setCrmSession] = useState()

    const [mainElement, setMainelement] = useState<any>()
    const [elementDrop, setElementDrop] = useState<any>()

    const buttonCollapseRef = useRef<HTMLDivElement | null>(null)
    const userInfo = useRef<any | undefined>(null)

    const updateSessionAndAfUserId = () => {
        sendMessage(ACTIONS.GET_SESSION, '', (result: any) => {
            const operatorCrmSession: any = result["session"]
            setCrmSession(operatorCrmSession)

            sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: OperatorInfo) => {
                setAfOperatorValue(result)
            })
        })
    }

    useEffect(() => {
        if (mainElement && elementDrop) {
            createDargAndDrop(mainElement, elementDrop, 'win')
        }
    }, [mainElement, elementDrop])

    useEffect(() => {
        TaskService.startAssignDate$
            .pipe()
            .subscribe(startAssignDate => {
                setStartTaskAssignDate(startAssignDate)
            })

        TaskService.isActiveTask$
            .pipe()
            .subscribe(isActiveTask => {
                setIsActiveTask(isActiveTask)
            })
    }, [])

    useEffect(() => {
        updateSessionAndAfUserId()
    }, [])

    const collapseChagne = () => {

        const checkShow = buttonCollapseRef.current?.classList?.contains('show')
        if (USER_ID !== '' && !checkShow) {
            coollapseToogle(!checkShow, buttonCollapseRef.current)
            setIsExpanded(!checkShow)
        } else if (checkShow) {
            coollapseToogle(true, buttonCollapseRef.current)
            setUserId('')
            setIsExpanded(false)
        }
    }

    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }

    const apiGetUserInfo = (userId: string) => {
        const checkShow = buttonCollapseRef.current?.classList?.contains('show')
        coollapseToogle(!checkShow, buttonCollapseRef.current)
        setUserId(userId)
        setIsExpanded(true)
    }

    useEffect(() => {
        if (isExtensionContext()) {
            chrome.runtime.onMessage.addListener(
                function (request) {
                    if (request.message === "open-user-info") {
                        apiGetUserInfo(request.userId)
                    }
                }
            );
        }
    }, [])

    return (
        <div >
            <div className="d-flex w-auto position-fixed main-window border-b-dark" id="main-window" ref={ref => setMainelement(ref)}>
                <div className="borderborder main-window bg-dark border border-b-dark rounded" id="move-window" ref={ref => setElementDrop(ref)}>
                    <input className="form-control rounded-cust-0_15 h-30px w-100 padding-btn-0 text-center text-light  bg-b-border border border-b-dark "

                        value={USER_ID}
                        onChange={(e) => {
                            const validValueArray = e.target.value.match(/[0-9]+/g)
                            const validValue = validValueArray !== null ? validValueArray.join('') : ''
                            const checkShow = buttonCollapseRef.current?.classList?.contains('show')

                            if (checkShow) {
                                coollapseToogle(true, buttonCollapseRef.current)
                            }
                            setUserId(validValue)
                            setIsExpanded(false)
                        }}
                    ></input>
                    <div className="d-flex flex-row justify-content-center mt-2">
                        <button type="button" className="btn btn-secondary padding-btn-0 fs-6 text-light"

                            onClick={collapseChagne}
                        >{!IS_EXPANDED ? 'найти' : 'свернуть'}
                        </button>

                    </div>
                    {
                        !!IS_ACTIVE_TASK &&
                        <TimerComponent startDate={START_TASK_ASSIGN_DATE} />
                    }

                </div>
                <div style={{ "minHeight": "120px" }} className="rounded bg-exten-UI">
                    <div className={`collapse collapse-horizontal border-none`} id="collapseWidthExample"
                        ref={buttonCollapseRef}
                    >
                        <div className="card  text-border bg-dark border rounded border-b-dark" style={{ "width": "300px" }}>
                            {
                                !!IS_EXPANDED &&
                                <InfoBlock
                                    session={CRM_SESSION}
                                    afOperatorValue={AF_OPERATOR_VALUE}
                                    howUser="student"
                                    startValue={IS_EXPANDED}
                                    userId={USER_ID}
                                    userInfo={userInfo}
                                    key={USER_ID}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserInfo;
