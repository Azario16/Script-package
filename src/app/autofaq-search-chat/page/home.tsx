import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import createDatePicker from '../../../hooks/date-picker/datapicker.general.conf'
import { getDateWeekForButton } from '../../../hooks/date-time'
import { CreateDatePicker } from '../element/datepicker-block'
import { Collapse } from 'bootstrap';

const navigateComponent: any = {
    'getNavigate': Function
}

const Home = (props: any) => {
    const buttonCollapseRef = useRef<HTMLButtonElement | null>(null)
    // console.log('ChatList')
    const navigate = useNavigate();
    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }
    /* Здесь указваем функию которая будет экспортирована для дргих компонентов которые запрашивают чаты */
    const getLocationFromStatusBlock = (operatorId: string) => {
        console.log('test')
        buttonCollapseRef.current = document.querySelector('#collapseUserInfo')
        const checkShow = buttonCollapseRef.current?.classList?.contains('show')
        // console.log(START)
        if (!checkShow) {
            coollapseToogle(true, buttonCollapseRef.current)
            console.log('скрыть')
        }


        navigate(`/chat-operator/${operatorId}`)
        // navigate(`/chat-operator`)
    }
    navigateComponent.getNavigate = getLocationFromStatusBlock
    /* --------------------------- */

    const location = useLocation()
    const param = useParams()
    const [USER_ID, setUserId] = useState('15969824')
    const [CHAT_ID, setChatId] = useState('')

    const START = useRef<string>('')
    const END = useRef<string>('')


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
                            <button type="button" className="btn btn-secondary mb-3 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
                                onClick={async () => {
                                    navigate("/chat-list");
                                }}
                            >сбросить</button>
                        }
                        {/* <button type="button" className="btn btn-secondary mb-3 ms-2 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
                            onClick={async () => {
                                console.log(START.current)
                                console.log(END.current)
                            }}
                        >ТЕСТ</button> */}
                        <button type="button" className="btn btn-secondary mb-3 ms-2 padding-btn-0 fs-6 text-uppercase text-light" id="change_week"
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
export { navigateComponent };

export default Home