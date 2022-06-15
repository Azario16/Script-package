import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useParams,
    useLocation,
    Outlet,
    useOutletContext
} from 'react-router-dom';
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";
import Event from './event'
import Question from './question'
import AnswerBot from './answer-bot'
import AnswerOperator from './answer-operator'
import OperatorComment from './operator-comment'


const MessageBlock = (props: any) => {
    const [MESSAGE_VALUE, setMessageValue] = useState<any>([])
    const [USER_ID, setUserId] = useState<any>('')
    const [ERROR, setError] = useState<boolean>(false)
    const [USER_NAME, setUserName] = useState<string>()
    const updateChatList = () => {
        console.log('updateChatList')
        // if (!!props.id) {
        sendMessage(ACTIONS.GET_AUTOFAQ_MESSAGE_VALUE, props.chatId, (result: any) => {
            console.log(result)
            const messageValue: any = result["message-value"].messages
            if (messageValue?.length === 0) {
                setMessageValue("Пользователь не писал в этот преиод")
                setError(true)
            } else if (messageValue) {
                setUserId(result["message-value"].channelUser.id)
                setUserName(result["message-value"].channelUser.fullName)
                setMessageValue(messageValue)
            } else {
                setMessageValue("Чат не найден, возможно неверный chatId")
                setError(true)
            }
        })
        // }
    }
    const navigate = useNavigate();
    // console.log('Rerender')
    useEffect(() => {
        if (props.chatOpen) {
            updateChatList()
            setUserId('')
        }
        // console.log(props)
    }, [props.chatOpen, props.chatId])
    return (
        <div className="chat-messages">
            <div className="d-flex flex-row justify-content-between ">

                <button type="button" className="btn btn-info mb-3 padding-btn-0 fs-6 text-light" id="change_week"
                    onClick={async () => {
                        navigator.clipboard.writeText(`https://hdi.skyeng.ru/autofaq/conversation/-11/${props.chatId}`);
                    }}
                >ссылка на чат hdi</button>

                <button type="button" className="btn btn-warning mb-3 padding-btn-0 fs-6 text-light" id="change_week"
                    onClick={async () => {
                    }}
                >Забрать</button>
            </div>

            <div className="d-grid">
                <span className="fs-custom-0_8 text-light">ID: {props.chatId}</span>
                <span className="fs-custom-0_8 text-light">userID: {USER_ID}</span>
            </div>

            {ERROR
                ? <pre>{MESSAGE_VALUE}</pre>
                :

                MESSAGE_VALUE.map((value: any, key: number) => {
                    const OPTION: any = {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'long',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZone: 'Europe/Moscow',
                        hour12: false,
                    };
                    let nowDataTimeBack = new Date(value.ts);
                    const dateTime = nowDataTimeBack.toLocaleDateString('ru-Ru', OPTION)
                    const time = dateTime.split(', ')[1]
                    // const time = nowDataTimeBack.toLocaleTimeString('ru-Ru', OPTION)
                    // .split('.').join('-')

                    switch (value.tpe) {
                        case 'Question':
                            return (
                                <Question text={value.txt} key={key} userName={USER_NAME} dateTime={{ dateTime, time }} />
                            )
                        case 'Event':
                            return (
                                <Event value={value} key={key} operatorName={props.operatorName} eventName={props.eventName} dateTime={{ dateTime, time }} />
                            )
                        case 'AnswerOperatorWithBot':
                            return (
                                <AnswerBot text={value.txt} key={key} operatorName={props.operatorName} dateTime={{ dateTime, time }} />
                            )
                        case 'AnswerOperator':
                            return (
                                <AnswerOperator text={value} key={key} operatorName={props.operatorName} dateTime={{ dateTime, time }} />
                            )
                        case 'OperatorComment':
                            return (
                                <OperatorComment text={value} key={key} operatorName={props.operatorName} dateTime={{ dateTime, time }} />
                            )

                    }
                })
            }
        </div>
    )
}

export default MessageBlock