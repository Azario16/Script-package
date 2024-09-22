import { useEffect, useRef, useMemo, useState } from 'react';
import {
    useNavigate,
    useParams,
    Outlet
} from 'react-router-dom';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import MessageBlock from '../element/message-block'
import { getDateWeekForButton } from '../../../hooks/date-time'
import { Collapse } from 'bootstrap';
import { Logger } from '../../../service/logger/logger.service';

const ChatListOperator = (props: any) => {
    const [CHAT_LIST, setChatList] = useState<any>([])
    const [ERROR, setError] = useState<boolean>(false)
    const [CHAT_LIST_OPEN, setChatListOpen] = useState<any>([])
    const START = useRef<string>('')
    const END = useRef<string>('')
    const buttonCollapseRef = useRef<any>([])
    const navigate = useNavigate();

    const OPERATOR_ID = useParams()

    const updateChatList = () => {
        Logger.debug("updateChatList")
        buttonCollapseRef.current = []
        if (!!OPERATOR_ID.id) {
            sendMessage(ACTIONS.GET_AUTOFAQ_CHAT_LIST_OPERATOR, { START, END, OPERATOR_ID }, (result: any) => {
                const chatListUser: any = result["chat-list"]
                if (chatListUser.items.length === 0) {
                    setChatList('0 чатов')
                    setError(true)
                } else if (chatListUser.items) {
                    const chatListOpen = chatListUser.items.map(() => false)
                    /* Переворачиваем массив чтобы чаты были в хронологии от старого к новому  */
                    const chatListReversed = chatListUser.items.reverse();

                    setChatListOpen(chatListOpen)
                    setChatList(chatListReversed)
                } else {
                    setError(chatListUser)
                }
            })
        }
    }

    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }

    useEffect(() => {
        setChatList([])
        setError(false)
        updateChatList()
    }, [OPERATOR_ID])

    useMemo(() => {
        const dateWeek = getDateWeekForButton().weekButton(null, 1)
        START.current = dateWeek.wkStart
        END.current = dateWeek.wkEnd
    }, [])

    return (
        <div className="">
            <div className="d-flex flex-row justify-content-between ">
                <button type="button" className="btn btn-secondary mb-3 fs-6 text-light" id="change_week"
                    onClick={async () => {
                        navigate("/chat-list");
                    }}
                >вернуться к поиску</button>
            </div>
            <div className="table table-hover  text-center w-100 overflow-auto bg-dark">
                <div>
                    {
                        ERROR
                            ? <div className="text-light">{CHAT_LIST}</div>
                            : CHAT_LIST.map((value: any, key: number) => {
                                const OPTION = {
                                    timeZone: 'Europe/Moscow',
                                };
                                const nowDataTimeBack = new Date(value.ts.slice(0, -5));
                                const dateFormat = nowDataTimeBack.toLocaleString('ru-Ru', OPTION).split('.').join('-')
                                const userType = value.channelUser.payload !== undefined
                                    ? value.channelUser.payload.userType
                                    : 'not type';
                                Logger.debug(value)
                                return (
                                    <div key={value.conversationId} className="mb-2 text-light">
                                        <div className='fs-custom-0_8 bg-secondary border border-b-dark rounded'
                                            onClick={() => {
                                                const changeChatListOpen = CHAT_LIST_OPEN.map((valueChatOpen: boolean, keyChatOpen: number) => {
                                                    return keyChatOpen === key ? true : valueChatOpen
                                                })
                                                Logger.debug(buttonCollapseRef)
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

export default ChatListOperator