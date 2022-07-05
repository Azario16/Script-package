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
    const [ERROR, setError] = useState<string>()

    // console.log('ChatList')
    const navigate = useNavigate();
    navigateComponent.getNavigate = navigate
    const location = useLocation()
    const param = useParams()

    useEffect(() => {
        // console.log(param)
        // updateChatMessage()
    }, [param])


    return (
        <>
            <div className="card card-body  bg-dark"
            // key={`chat-${CHAT_ID}`}
            >
                <MessageBlock
                    chatId={param.id}
                    chatOpen={true}
                    operatorName={props.operaotName}
                    eventName={props.eventName}
                    operatorAfId={props.operatorAfId}
                />
            </div>
            <Outlet />
        </>

    )
}
export { navigateComponent };

export default ChatListUser