import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions-bg";

import Home from "./page/home";
import ChatList from './page/chat-list'
import ChatListOperator from './page/chat-list-operator'
import ChatId from './page/chat-id'

const AppTest = (props: any) => {
    const [OPERATOR_NAME, setOperatorName] = useState([])
    const [EVENT_NAME, setEventName] = useState({})
    const updateOperatorIdNameAndEventName = () => {
        sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE_LIST, '', (result: any) => {
            const operIdName = result['people-list'].map((value: any) => {
                return {
                    'name': value.fullName !== null ? value.fullName : value.kb,
                    'id': value.id !== null ? value.id : value.kb
                }
            })
            setOperatorName(operIdName)
            // operatorIdNameRef.current = operIdName
        })
        sendMessage(ACTIONS.GET_AUTOFAQ_EVENT_NAME, '', (result: any) => {
            setEventName(result["event-list"])
            // operatorIdNameRef.current = operIdName
        })
    }

    useEffect(() => {
        updateOperatorIdNameAndEventName()
    }, [])
    return (
        <div className="">

            <MemoryRouter initialEntries={["/chat-list"]}>
                <Routes>
                    <Route path="/chat-list" element={<Home />}>
                        <Route path="chat-id/:id" element={<ChatId operaotName={OPERATOR_NAME} eventName={EVENT_NAME} />} />
                        <Route path=":id" element={<ChatList operaotName={OPERATOR_NAME} eventName={EVENT_NAME} />} />
                    </Route>
                    <Route path="/chat-operator/:id" element={<ChatListOperator operaotName={OPERATOR_NAME} eventName={EVENT_NAME} />}>
                        {/* <Route path=":id" element={<ChatList operaotName={OPERATOR_NAME} eventName={EVENT_NAME} />} /> */}
                    </Route>
                </Routes>
            </MemoryRouter>
        </div>
    )
}

export default AppTest