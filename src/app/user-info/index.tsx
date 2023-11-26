import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { createDargAndDrop } from '../../core/drag-and-drop'
import React from 'react';
import InfoBlock from './element/user-info-block';
import EdauctionBlock from './element/education-services-block';
import { Collapse } from 'bootstrap';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions-bg";
import createButtonSeacrhId from './function/create-button-to-af'
import { isExtensionContext } from '../../service/chrome-runtime.service';

const UserInfo: React.FC = () => {
    const [START, setStart] = useState(false)
    const [USER_ID, setUserId] = useState('')
    const [AF_OPERATOR_VALUE, setAfOperatorValue] = useState('')
    const [CRM_SESSION, setCrmSession] = useState()
    const [ERROR, setError] = useState()

    const [mainElement, setMainelement] = useState<any>()
    const [elemntDrop, setElementDrop] = useState<any>()

    const buttonCollapseRef = useRef<HTMLDivElement | null>(null)
    const userInfo = useRef<any | undefined>(null)

    const updateSessionAndAfUserId = () => {
        sendMessage(ACTIONS.GET_SESSION, '', (result: any) => {
            const operatorCrmSession: any = result["session"]
            setCrmSession(operatorCrmSession)

            sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: any) => {
                setAfOperatorValue(result)
            })
        })
    }

    useEffect(() => {
        if (mainElement && elemntDrop) {
            createDargAndDrop(mainElement, elemntDrop, 'win')
        }
    }, [mainElement, elemntDrop])

    useEffect(() => {
        updateSessionAndAfUserId()
    }, [])

    const collapseChagne = () => {

        const checkShow = buttonCollapseRef.current?.classList?.contains('show')
        if (USER_ID !== '' && !checkShow) {
            coollapseToogle(!checkShow, buttonCollapseRef.current)
            setStart(!checkShow)
        } else if (checkShow) {
            coollapseToogle(true, buttonCollapseRef.current)
            setUserId('')
            setStart(false)
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
        setStart(true)
    }
    
    useEffect(() => {
        if (isExtensionContext()) {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
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
                            setStart(false)
                        }}
                    ></input>
                    <div className="d-flex flex-row justify-content-center mt-2">
                        <button type="button" className="btn btn-secondary padding-btn-0 fs-6 text-light"

                            onClick={collapseChagne}
                        >{!START ? 'найти' : 'свернуть'}
                        </button>
                    </div>
                </div>
                <div style={{ "minHeight": "120px" }} className="rounded bg-exten-UI">
                    <div className={`collapse collapse-horizontal border-none`} id="collapseWidthExample"
                        ref={buttonCollapseRef}
                    >
                        <div className="card  text-border bg-dark border rounded border-b-dark" style={{ "width": "300px" }}>
                            {
                                !!START &&
                                <InfoBlock
                                    session={CRM_SESSION}
                                    afOperatorValue={AF_OPERATOR_VALUE}
                                    howUser="student"
                                    startValue={START}
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
