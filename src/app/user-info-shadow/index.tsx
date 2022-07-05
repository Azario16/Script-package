import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { createDargAndDrop } from '../../core/drag-and-drop'
import React from 'react';
import ReactDOM from 'react-dom/client';
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import InfoBlock from './element/user-info-block';
import EdauctionBlock from './element/education-services-block';
import { Collapse } from 'bootstrap';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions-bg";
import createButtonSeacrhId from './function/create-button-to-af'


const UserInfo: React.FC = () => {
    const [START, setStart] = useState(false)
    const [USER_ID, setUserId] = useState('')
    const [AF_USER_ID, setAfUserId] = useState('')
    const [CRM_SESSION, setCrmSession] = useState()
    const [ERROR, setError] = useState()

    const buttonCollapseRef = useRef<HTMLButtonElement | null>(null)
    const userInfo = useRef<any | undefined>(null)

    const updateSessionAndAfUserId = () => {
        sendMessage(ACTIONS.GET_SESSION, '', (result: any) => {
            // console.log(result)
            // console.log(result)
            const operatorCrmSession: any = result["session"]
            setCrmSession(operatorCrmSession)

            sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE_LIST, '', (result: any) => {
                console.log(CRM_SESSION)
                console.log(result)
                // console.log(operatorSession)
                const operatorAfInfo: any = result["people-list"].find((operator: any) => {
                    return operator.email === operatorCrmSession.data.email
                })
                setAfUserId(operatorAfInfo.id)
            })
        })
    }

    // console.log('App')
    useEffect(() => {
        createButtonSeacrhId(() => {
            console.log('test')
        })
        updateSessionAndAfUserId()
        const mainElem = document.querySelector('#main-window')
        const moveElem = document.querySelector('#move-window')
        buttonCollapseRef.current = document.querySelector('#collapseWidthExample')
        createDargAndDrop(mainElem, moveElem, 'win')
        // buttonCollapseRef?.current = document!.querySelector('#collapseWidthExample')
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
            setUserId('')
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
        if (userId !== null && !checkShow) {
            // console.log('Развернуть')
            coollapseToogle(!checkShow, buttonCollapseRef.current)
            setUserId(userId)
            setStart(!checkShow)
        } else if (checkShow) {
            // console.log('Свернуть')
            coollapseToogle(true, buttonCollapseRef.current)
            setStart(false)
        }
    }
    useEffect(() => {
        if (window.location.hostname !== 'extension-test.ru') {
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
            <div className="d-flex w-auto position-fixed main-window border-b-dark" id="main-window">
                <div className="borderborder main-window bg-dark border border-b-dark rounded" id="move-window">
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
                                console.log('скрыть')
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
                    <div className={`collapse collapse-horizontal border-none`} id="collapseWidthExample">
                        <div className="card  text-border bg-dark border rounded border-b-dark" style={{ "width": "300px" }}>
                            <InfoBlock
                                session={CRM_SESSION}
                                afUserId={AF_USER_ID}
                                howUser="student"
                                startValue={START}
                                userId={USER_ID}
                                userInfo={userInfo}
                                key={USER_ID} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id={`AutoFaqModal`}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content bg-dark">

                        <div className="modal-body">
                            Ивент
                            <br></br>
                            <span className="text-primary"></span>
                            <br></br>будет удален, подтвердите действие
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={async () => {

                                }}
                            > Удалить</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

// const root = ReactDOM.createRoot(
//     document.getElementById('main') as HTMLElement
// );

// root.render(
//     <UserInfo />
// );

export default UserInfo;
