import React from 'react';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import {
    useNavigate,
    useOutletContext,
    useParams,
    useLocation,
    Outlet
} from 'react-router-dom';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";
import MessageBlock from '../element/message-block'
const navigateComponent: any = {
    'getNavigate': Function
}

const ChatListUser = (props: any) => {
    const { START, END, USER_ID, CHAT_ID }: any = useOutletContext()
    const [CHAT_LIST, setChatList] = useState<any>([])
    const [ERROR, setError] = useState<string>()
    const [CHAT_LIST_OPEN, setChatListOpen] = useState<any>([])

    // console.log('ChatList')
    const navigate = useNavigate();
    navigateComponent.getNavigate = navigate
    const location = useLocation()
    const param = useParams()

    const updateChatList = () => {
        if (!!param.id) {
            sendMessage(ACTIONS.GET_AUTOFAQ_CHAT_LIST_USER, { START, END, USER_ID, CHAT_ID }, (result: any) => {
                // console.log(result)
                const chatListUser: any = result["chat-list"]
                if (chatListUser.items.length === 0) {
                    const errorMessage: string = 'Чаты не найдены'
                    setError(errorMessage)
                } else if (chatListUser.items) {
                    const chatListOpen = chatListUser.items.map(() => false)
                    setChatListOpen(chatListOpen)
                    /* Переворачиваем массив чтобы чаты были в хронологии от старого к новому  */
                    const chatListReversed = chatListUser.items.reverse();
                    setChatList(chatListReversed)
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
    console.log(param)

    return (
        <div className="">
            <div className="table table-hover  text-center w-100 overflow-auto bg-dark">
                <div>
                    {
                        CHAT_LIST.map((value: any, key: number) => {
                            const OPTION = {
                                timeZone: 'Europe/Moscow',
                            };
                            let nowDataTimeBack = new Date(value.ts.slice(0, -5));
                            let dateFormat = nowDataTimeBack.toLocaleString('ru-Ru', OPTION).split('.').join('-')
                            const userType = value.channelUser.payload !== undefined
                                ? value.channelUser.payload.userType
                                : 'not type'
                            return (
                                <div key={key} className="mb-2">
                                    <div className='fs-custom-0_8 bg-secondary border border-b-dark rounded'
                                        onClick={() => {
                                            const changeChatListOpen = CHAT_LIST_OPEN.map((valueChatOpen: boolean, keyChatOpen: number) => {
                                                return keyChatOpen === key ? true : valueChatOpen
                                            })
                                            setChatListOpen(changeChatListOpen)
                                        }}
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapseExample${key}`}
                                        aria-expanded="false"
                                        aria-controls={`collapseExample${key}`}
                                    >
                                        <span className="me-2">{dateFormat}</span>
                                        <span className="me-2">{userType}</span>
                                        <span className="me-2">{value.channelUser.fullName}</span>
                                    </div>
                                    <div className="collapse"
                                        // id="collapseExample"
                                        id={`collapseExample${key}`}
                                    >
                                        <div className="card card-body overflow-auto">
                                            <MessageBlock
                                                chatId={value.conversationId}
                                                chatOpen={CHAT_LIST_OPEN[key]}
                                                operatorName={props.operaotName}
                                                eventName={props.eventName}
                                            />
                                        </div>
                                    </div>

                                </div>


                            )
                        })
                    }
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export { navigateComponent };

export default ChatListUser