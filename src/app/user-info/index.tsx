import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { createDargAndDrop } from '../../core/drag-and-drop'
import React from 'react';
import InfoBlock from './element/user-info-block';
import EdauctionBlock from './element/education-services-block';
import { Collapse } from 'bootstrap';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions-bg";
import createButtonSeacrhId from './function/create-button-to-af'

const UserInfo: React.FC = () => {
    const [START, setStart] = useState(false)
    const [USER_ID, setUserId] = useState('16103749')
    const [AF_USER_ID, setAfUserId] = useState('')
    const [CRM_SESSION, setCrmSession] = useState()
    const [ERROR, setError] = useState()


    const [mainElement, setMainelement] = useState<any>()
    const [elemntDrop, setElementDrop] = useState<any>()

    const buttonCollapseRef = useRef<HTMLDivElement | null>(null)
    const userInfo = useRef<any | undefined>(null)



    const updateSessionAndAfUserId = () => {
        sendMessage(ACTIONS.GET_SESSION, '', (result: any) => {
            // console.log(result)
            const operatorCrmSession: any = result["session"]
            setCrmSession(operatorCrmSession)

            sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: any) => {
                setAfUserId(result.id)
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
            // console.log('Развернуть')
            coollapseToogle(!checkShow, buttonCollapseRef.current)
            setStart(!checkShow)
        } else if (checkShow) {
            // console.log('Свернуть')
            coollapseToogle(true, buttonCollapseRef.current)
            setUserId('16103749')
            setStart(false)
        }
        // console.log(START)
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


        // if (userId !== null && !checkShow) {
        //     // console.log('Развернуть')
        //     coollapseToogle(!checkShow, buttonCollapseRef.current)
        //     setUserId(userId)
        //     setStart(!checkShow)
        // } else if (checkShow) {
        //     // console.log('Свернуть')
        //     coollapseToogle(true, buttonCollapseRef.current)
        //     setStart(false)
        // }
    }
    useEffect(() => {
        const hostName: any = window.location.hostname
        // console.log(hostName)
        // console.log(hostName !== 'build.extension-test.ru' && hostName !== 'extension-test.ru')
        if (hostName !== 'build.extension-test.ru' && hostName !== 'extension-test.ru') {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    if (request.message === "open-user-info") {
                        apiGetUserInfo(request.userId)
                    }
                }
            );
        }
    }, [])


    // console.log('Сессия: ')
    // console.log(CRM_SESSION)
    // console.log('---------------------------------------------------------------')

    return (
        <div >
            <div className="d-flex w-auto position-fixed main-window border-b-dark" id="main-window" ref={ref => setMainelement(ref)}>
                <div className="borderborder main-window bg-dark border border-b-dark rounded" id="move-window" ref={ref => setElementDrop(ref)}>
                    <input className="form-control rounded-cust-0_15 h-30px w-100 padding-btn-0 text-center text-light  bg-b-border border border-b-dark "

                        value={USER_ID}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            // userIdRef.current = (e.target.value.match(/[0-9]+/g)).join('')
                            const validValueArray = e.target.value.match(/[0-9]+/g)
                            const validValue = validValueArray !== null ? validValueArray.join('') : ''
                            const checkShow = buttonCollapseRef.current?.classList?.contains('show')
                            // console.log(START)
                            if (checkShow) {
                                coollapseToogle(true, buttonCollapseRef.current)
                                // console.log('скрыть')
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
                                    afUserId={AF_USER_ID}
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
