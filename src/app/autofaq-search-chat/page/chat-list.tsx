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
import { ACTIONS } from "../../../chrome/actions";
import MessageBlock from '../element/message-block'
import { Collapse } from 'bootstrap';
import { Logger } from '../../../service/logger/logger.service';

const navigateComponent: any = {
    'getNavigate': Function
}

const ChatListUser = (props: any) => {
    const { START, END, USER_ID, CHAT_ID, AF_USER_ID }: any = useOutletContext()
    Logger.debug(START, END, USER_ID, CHAT_ID, AF_USER_ID)
    const [CHAT_LIST, setChatList] = useState<any>([])
    const [ERROR, setError] = useState<string>('')
    const [CHAT_LIST_OPEN, setChatListOpen] = useState<any>([])

    const buttonCollapseRef = useRef<any>([])

    const navigate = useNavigate();
    navigateComponent.getNavigate = navigate
    const location = useLocation()
    const param = useParams()

    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }

    const updateChatList = () => {
        buttonCollapseRef.current = []
        setError('Поиск...')
        if (!!param.id) {
            sendMessage(ACTIONS.GET_AUTOFAQ_CHAT_LIST_USER, { START, END, USER_ID, CHAT_ID }, (result: any) => {
                const chatListUser: any = result["chat-list"]
                if (chatListUser.items.length === 0) {
                    const errorMessage: string = 'Чаты не найдены'
                    setError(errorMessage)
                } else if (chatListUser.items) {
                    const chatListOpen = chatListUser.items.map(() => false)
                    /* Переворачиваем массив чтобы чаты были в хронологии от старого к новому  */
                    const chatListReversed = chatListUser.items.reverse();
                    setChatListOpen(chatListOpen)
                    setChatList(chatListReversed)
                    setError('')
                } else {
                    setError(chatListUser)
                }
            })
        }
    }
    useEffect(() => {
        Logger.debug(param)
        updateChatList()
    }, [param])

    return (
        ERROR !== ''
            ? <div className="text-light">{ERROR}</div>
            : <div className="">
                <div className="table table-hover w-100 overflow-auto bg-dark">
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
                                    <div key={key} className="mb-2 text-light">
                                        <div className='fs-custom-0_8 bg-secondary border border-b-dark rounded'
                                            onClick={() => {
                                                const changeChatListOpen = CHAT_LIST_OPEN.map((valueChatOpen: boolean, keyChatOpen: number) => {
                                                    return keyChatOpen === key ? true : valueChatOpen
                                                })
                                                coollapseToogle(true, buttonCollapseRef.current[value.conversationId])
                                                setChatListOpen(changeChatListOpen)
                                            }}
                                        >
                                            <span className="me-2">{dateFormat}</span>
                                            <span className="me-2">{userType}</span>
                                            <span className="me-2">{value.channelUser.fullName}</span>
                                        </div>
                                        <div className="collapse"
                                            ref={(ref) => {
                                                if (ref) {
                                                    buttonCollapseRef.current[value.conversationId] = ref
                                                }
                                            }}
                                        >
                                            <div className="card card-body overflow-auto">
                                                <MessageBlock
                                                    chatId={value.conversationId}
                                                    chatOpen={CHAT_LIST_OPEN[key]}
                                                    operatorName={props.operaotName}
                                                    eventName={props.eventName}
                                                    operatorAfId={props.operatorAfId}
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