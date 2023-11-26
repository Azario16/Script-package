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
const navigateComponent: any = {
    'getNavigate': Function
}

const ChatListUser = (props: any) => {
    const { START, END, USER_ID, CHAT_ID }: any = useOutletContext()
    const [ERROR, setError] = useState<string>()

    const navigate = useNavigate();
    navigateComponent.getNavigate = navigate
    const location = useLocation()
    const param = useParams()

    return (
        <>
            <div className="card card-body  bg-dark"
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