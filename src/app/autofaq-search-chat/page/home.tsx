import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import createDatePicker from '../../../hooks/date-picker/datapicker.general.conf'
import { getDateWeekForButton } from '../../../hooks/date-time'
import { CreateDatePicker } from '../element/datepicker-block'
import { Collapse } from 'bootstrap';
import { sendMessage } from '../../../chrome/utils';
import { ACTIONS } from '../../../chrome/actions-bg';
import { isExtensionContext } from '../../../service/chrome-runtime.service';


const Home = (props: any) => {
    const buttonCollapseRef = useRef<HTMLButtonElement | null>(null)
    const navigate = useNavigate();
    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }


    const toogleButton = () => {
        const checkShow = props.buttonToogle.current?.classList?.contains('show')
        if (!checkShow) {
            coollapseToogle(true, props.buttonToogle.current)
        }
    }

    const location = useLocation()
    const param = useParams()
    const [USER_ID, setUserId] = useState('')
    const [CHAT_ID, setChatId] = useState('')


    const START = useRef<string>('')
    const END = useRef<string>('')


    useEffect(() => {
        if (isExtensionContext()) {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    switch (request.message) {
                        case 'search-user-chat':
                            toogleButton()
                            setUserId(request.userId)
                            setChatId('')
                            navigate("/chat-list/1234");
                            break;
                        case 'open-id-chat':
                            toogleButton()
                            setUserId('')
                            setChatId(request.chatId)
                            navigate(`/chat-list/chat-id/${request.chatId}`);
                            break;
                        case 'open-operator-chat':
                            toogleButton()
                            navigate(`/chat-operator/${request.operatorAfId}`);
                            break;
                    }
                }
            );
        }
    }, [])

    useMemo(() => {
        const dateWeek = getDateWeekForButton().weekButton(null, 30)
        START.current = dateWeek.wkStart
        END.current = dateWeek.wkEnd
    }, [])
    return (
        <div>
            <div className="d-flex flex-row justify-content-center">
                <div className="text-center">
                    <div className="d-flex flex-row justify-content-center ">
                        {!(location.pathname === '/chat-list') &&
                            <button type="button" className="btn btn-secondary mb-3 me-2 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
                                onClick={async () => {
                                    navigate("/chat-list");
                                }}
                            >сбросить</button>
                        }
                        <button type="button" className="btn btn-secondary mb-3 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
                            onClick={async () => {
                                if (USER_ID !== '' && CHAT_ID === '') {
                                    navigate("/chat-list/1234");
                                } else if (USER_ID === '' && CHAT_ID !== '') {
                                    navigate(`/chat-list/chat-id/${CHAT_ID}`);
                                }
                            }}
                        >Поиск</button>
                    </div>
                    <div className="d-flex flex-row justify-content-center ">
                        <div className="input-group mb-2 w-400px ">
                            <input type="text" form="logs" name="begin" className="form-control me-2"
                                value={USER_ID}
                                placeholder="ID пользователя"
                                onChange={(e) => {
                                    setUserId(e.target.value)
                                }}
                            />
                            <input type="text" form="logs" name="begin" className="form-control ms-2"
                                value={CHAT_ID}
                                placeholder="ID чата"
                                onChange={(e) => {
                                    setChatId(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <CreateDatePicker date={{ START, END }} />
                </div>
            </div>
            <Outlet context={{ START, END, USER_ID, CHAT_ID }} />
        </div>
    )
}

export default Home