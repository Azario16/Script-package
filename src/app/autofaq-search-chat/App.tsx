import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { sendMessage } from "../../chrome/utils";
import { ACTIONS } from "../../chrome/actions";

import Home from "./page/home";
import ChatList from './page/chat-list'
import ChatListOperator from './page/chat-list-operator'
import ChatId from './page/chat-id'


const App = (props: any) => {
    const [OPERATOR_NAME, setOperatorName] = useState([])
    const [EVENT_NAME, setEventName] = useState({})
    const [AF_USER_ID, setAfUserId] = useState('')


    const updateSessionAndAfUserId = () => {
        sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: any) => {
            setAfUserId(result.id)
        })
    }

    const updateOperatorIdNameAndEventName = () => {
        sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE_LIST, '', (result: any) => {
            const operIdName = result['people-list'].map((value: any) => {
                return {
                    'name': value.fullName !== null ? value.fullName : value.kb,
                    'id': value.id !== null ? value.id : value.kb
                }
            })
            setOperatorName(operIdName)
        })
        sendMessage(ACTIONS.GET_AUTOFAQ_EVENT_NAME, '', (result: any) => {
            setEventName(result["event-list"])
        })
    }

    useEffect(() => {
        updateOperatorIdNameAndEventName()
        updateSessionAndAfUserId()
    }, [])
    return (
        <div className="">
            <MemoryRouter initialEntries={["/chat-list"]}>
                <Routes>
                    <Route path="/chat-list" element={<Home buttonToogle={props.buttonToogle} />}>
                        <Route path="chat-id/:id" element={<ChatId operaotName={OPERATOR_NAME} eventName={EVENT_NAME} operatorAfId={AF_USER_ID} />} />
                        <Route path=":id" element={<ChatList operaotName={OPERATOR_NAME} eventName={EVENT_NAME} operatorAfId={AF_USER_ID} />} />
                    </Route>
                    <Route path="/chat-operator/:id" element={<ChatListOperator operaotName={OPERATOR_NAME} eventName={EVENT_NAME} operatorAfId={AF_USER_ID} />} />
                    <Route path="/lesson/:id" element={<ChatListOperator operaotName={OPERATOR_NAME} eventName={EVENT_NAME} operatorAfId={AF_USER_ID} />} />
                </Routes>
            </MemoryRouter>
        </div>
    )
}

export default App