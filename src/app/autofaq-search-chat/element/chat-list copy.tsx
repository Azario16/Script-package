import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";

const navigateComponent: any = {
    'getNavigate': Function
}

const ChatListUser = (props: any) => {
    const [CHAT_LIST, setChatList] = useState<any>([])
    const [ERROR, setError] = useState<string>()

    console.log('ChatList')
    const navigate = useNavigate();
    navigateComponent.getNavigate = navigate
    const location = useLocation()
    const param = useParams()

    const updateChatList = () => {
        if (!!param.id) {
            sendMessage(ACTIONS.GET_AUTOFAQ_CHAT_LIST_USER, param.id, (result: any) => {
                console.log(result)
                const chatListUser: any = result["chat-list"]
                if (chatListUser.items.length === 0) {
                    const errorMessage: string = 'Чаты не найдены'
                    setError(errorMessage)
                } else if (chatListUser.items) {
                    setChatList(chatListUser.items)
                } else {
                    setError(chatListUser)
                }
            })
        }
    }

    useEffect(() => {
        console.log(param)
        updateChatList()
    }, [param])


    return (
        <div className="">
            <div className="table table-hover  text-center w-100">
                {/* <thead>
                    {
                        CHAT_LIST.map((value: any, key: number) => {
                            const OPTION = {
                                timeZone: 'Europe/Moscow',
                            };
                            let nowDataTimeBack = new Date(value.ts.slice(0, -5));
                            let dateFormat = nowDataTimeBack.toLocaleString('ru-Ru', OPTION).split('.').join('-')
                            return (

                                <tr key={key} className='fs-custom-0_8 '
                                    // onClick={() => {
                                    //     navigate("/chat-id/62d91d95-a3ee-4a81-a1dd-135191059a8c");
                                    // }}

                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseExample${key}`}
                                    aria-expanded="false"
                                    aria-controls={`collapseExample${key}`}

                                // data-bs-toggle="collapse" 
                                // data-bs-target="#collapseExample" 
                                // aria-expanded="false" 
                                // aria-controls="collapseExample"
                                >
                                    <td>{dateFormat}</td>
                                    <th>{value.channelUser.payload.userType}</th>
                                    <td>{value.channelUser.fullName}</td>

                                </tr>


                            )
                        })
                    }

                </thead> */}

                <tbody>
                    {
                        CHAT_LIST.map((value: any, key: number) => {
                            const OPTION = {
                                timeZone: 'Europe/Moscow',
                            };
                            let nowDataTimeBack = new Date(value.ts.slice(0, -5));
                            let dateFormat = nowDataTimeBack.toLocaleString('ru-Ru', OPTION).split('.').join('-')
                            return (

                                <tr key={key} className='fs-custom-0_8 '
                                    // onClick={() => {
                                    //     navigate("/chat-id/62d91d95-a3ee-4a81-a1dd-135191059a8c");
                                    // }}

                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseExample${key}`}
                                    aria-expanded="false"
                                    aria-controls={`collapseExample${key}`}

                                // data-bs-toggle="collapse" 
                                // data-bs-target="#collapseExample" 
                                // aria-expanded="false" 
                                // aria-controls="collapseExample"
                                >
                                    <td>{dateFormat}</td>
                                    <th>{value.channelUser.payload.userType}</th>
                                    <td>{value.channelUser.fullName}</td>
                                    <td>
                                        <div className="collapse"
                                            // id="collapseExample"
                                            id={`collapseExample${key}`}
                                        >
                                            <div className="card card-body">
                                                Некоторый заполнитель для компонента сворачивания. Эта панель по умолчанию скрыта, но открывается, когда пользователь активирует соответствующий триггер.
                                            </div>
                                        </div>
                                    </td>

                                </tr>


                            )
                        })
                    }
                </tbody>
            </div>
            <Outlet />
        </div>
    )
}
export { navigateComponent };

export default ChatListUser