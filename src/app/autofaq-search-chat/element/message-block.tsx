import { useEffect, useState } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import Event from './event'
import Question from './question'
import AnswerBot from './answer-bot'
import AnswerOperator from './answer-operator'
import OperatorComment from './operator-comment'
import SendCommentAndAnswer from './send-comment-and-answer'



import { Logger } from '../../../service/logger/logger.service';

const MessageBlock = (props: any) => {
    Logger.debug(props)
    const [MESSAGE_VALUE, setMessageValue] = useState<any>([])
    const [MESSAGE_INFO, setMessageInfo] = useState<any>([])
    const [USER_ID, setUserId] = useState<any>('')
    const [ERROR, setError] = useState<boolean>(false)
    const [USER_NAME, setUserName] = useState<string>()
    const updateChatList = () => {

        sendMessage(ACTIONS.GET_AUTOFAQ_MESSAGE_VALUE, props.chatId, (result: any) => {
            const messageValue: any = result["message-value"].messages
            if (messageValue?.length === 0) {
                setMessageValue("Пользователь не писал в этот преиод")
                setError(true)
            } else if (messageValue) {
                const name = result["message-value"].channelUser.fullName !== undefined
                    ? result["message-value"].channelUser.fullName
                    : result["message-value"].channelUser.email

                setUserId(result["message-value"].channelUser.id)
                setUserName(name)
                setMessageValue(messageValue)
                setMessageInfo(result["message-value"])
            } else {
                setMessageValue("Чат не найден, возможно неверный chatId")
                setError(true)
            }
        })
    }
    const findOperatorName = (operatorId: string) => {
        const result = props.operatorName.find((value: any) => {
            return value.id === operatorId
        })
        if (result) {
            return result.name
        }
        return operatorId
    }

    useEffect(() => {
        if (props.chatOpen) {
            updateChatList()
            setUserId('')
        }
    }, [props.chatOpen, props.chatId])

    const openModalElenet = () => {
        const messageValue = {
            message: 'assign-chat',
            chatId: props.chatId,
            afUserId: props.operatorAfId
        }

        sendMessage(ACTIONS.SEND_EVENT, messageValue, () => {

        })
    }
    return (
        <div className="chat-messages">
            <div className="d-flex flex-row justify-content-between ">

                <button type="button" className="btn btn-info mb-3 fs-6 text-light" id="change_week"
                    onClick={async () => {
                        navigator.clipboard.writeText(`https://hdi.skyeng.ru/autofaq/conversation/-11/${props.chatId}`);
                    }}
                >ссылка на чат hdi</button>

                {window.location.hostname === 'skyeng.autofaq.ai' &&
                    <button type="button" className="btn btn-warning mb-3 fs-6 text-light" id="change_week"
                        onClick={openModalElenet}
                    >Забрать</button>
                }
            </div>

            <div className="d-grid ">
                <span className="fs-custom-0_8 text-light">ID: {props.chatId}</span>
                <span className="fs-custom-0_8 text-light">userID: {USER_ID}</span>
            </div>

            {ERROR
                ? <pre>{MESSAGE_VALUE}</pre>
                :
                <>

                    {
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
                            const nowDataTimeBack = new Date(value.ts);
                            const dateTime = nowDataTimeBack.toLocaleDateString('ru-Ru', OPTION)
                            const time = dateTime.split(', ')[1]
                            let operatorName = ''
                            if (value.operatorId) {
                                operatorName = value.operatorId !== 'autoFAQ' ? findOperatorName(value.operatorId) : 'autoFAQ'
                            }
                            switch (value.tpe) {
                                case 'Question':
                                    return (
                                        <Question text={value.txt} key={key} userName={USER_NAME} dateTime={{ dateTime, time }} />
                                    )
                                case 'Event':
                                    return (
                                        <Event value={value} key={key} operatorName={operatorName} eventName={props.eventName} dateTime={{ dateTime, time }} />
                                    )
                                case 'AnswerOperatorWithBot':
                                    return (
                                        <AnswerBot text={value.txt} key={key} operatorName={operatorName} dateTime={{ dateTime, time }} />
                                    )
                                case 'AnswerOperator':
                                    return (
                                        <AnswerOperator text={value} key={key} operatorName={operatorName} dateTime={{ dateTime, time }} />
                                    )
                                case 'OperatorComment':
                                    return (
                                        <OperatorComment text={value} key={key} operatorName={operatorName} dateTime={{ dateTime, time }} />
                                    )

                            }
                        })
                    }
                    {/* Блок отправки ссобщений либо комментариев в AF  */}
                    <SendCommentAndAnswer
                        userId={USER_ID}
                        chatId={props.chatId}
                        afUserId={props.operatorAfId}
                        updateChat={updateChatList}
                        messageInfo={MESSAGE_INFO}
                    />
                </>
            }
        </div>
    )
}

export default MessageBlock