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
import { getDateWeekForButton } from '../../../hooks/date-time'

const navigateComponent: any = {
    'getNavigate': Function
}

const ChatListOperator = (props: any) => {
    const [CHAT_LIST, setChatList] = useState<any>([])
    const [ERROR, setError] = useState<boolean>(false)
    const [CHAT_LIST_OPEN, setChatListOpen] = useState<any>([])
    const START = useRef<string>('')
    const END = useRef<string>('')

    // console.log('ChatList')
    const navigate = useNavigate();
    const location = useLocation()
    const OPERATOR_ID = useParams()
    const getLocationFromStatusBlock = (operatorId: string) => {
        console.log('test')
        navigate(`/chat-operator/${operatorId}`)
        // navigate(`/chat-operator`)
    }
    navigateComponent.getNavigate = getLocationFromStatusBlock
    const updateChatList = () => {
        if (!!OPERATOR_ID.id) {
            sendMessage(ACTIONS.GET_AUTOFAQ_CHAT_LIST_OPERATOR, { START, END, OPERATOR_ID }, (result: any) => {
                // console.log(result)
                const chatListUser: any = result["chat-list"]
                if (chatListUser.items.length === 0) {
                    setChatList('0 чатов')
                    setError(true)
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
        console.log(OPERATOR_ID)
        setChatList([])
        setError(false)
        updateChatList()
    }, [OPERATOR_ID])
    console.log(OPERATOR_ID)


    useMemo(() => {
        const dateWeek = getDateWeekForButton().weekButton(null, 1)
        START.current = dateWeek.wkStart
        END.current = dateWeek.wkEnd
    }, [])
    return (
        <div className="">
            <div className="d-flex flex-row justify-content-between ">

                <button type="button" className="btn btn-secondary mb-3 padding-btn-0 fs-6 text-light" id="change_week"
                    onClick={async () => {
                        navigate("/chat-list");
                    }}
                >вернуться к поиску</button>
            </div>
            <div className="table table-hover  text-center w-100 overflow-auto bg-dark">
                <div>
                    {
                        ERROR
                            ? <pre>{CHAT_LIST}</pre>
                            : CHAT_LIST.map((value: any, key: number) => {
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

export default ChatListOperator