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
import Lessons from './page/lessons'

/* Debug */
import events from './debug/event'
import operatorList from './debug/operator-list'

const App = (props: any) => {
    const [OPERATOR_NAME, setOperatorName] = useState([])
    const [EVENT_NAME, setEventName] = useState({})
    const [AF_USER_ID, setAfUserId] = useState('')

    const innerTextElement = (node: HTMLElement): string => {
        return node.innerText; // Property 'innerText' does not exist on 'T'
    }

    const updateSessionAndAfUserId = () => {
        sendMessage(ACTIONS.GET_AUTOFAQ_OPERATOR_INFO, '', (result: any) => {
            // console.log(result)
            setAfUserId(result.id)
        })
    }

    const updateOperatorIdNameAndEventName = () => {
        sendMessage(ACTIONS.GET_AUTOFAQ_PEOPLE_LIST, '', (result: any) => {
            // console.log(result['people-list'])
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
        /* Debug */
        // console.log(operatorList)
        // console.log(events)
        // const operIdName:any = operatorList.map((value: any) => {
        //     return {
        //         'name': value.fullName !== null ? value.fullName : value.kb,
        //         'id': value.id !== null ? value.id : value.kb
        //     }
        // })
        // setOperatorName(operIdName)
        // setEventName(events)
        /* ---------------------------------------- */

        updateOperatorIdNameAndEventName()
        updateSessionAndAfUserId()
    }, [])
    return (
        <div className="">

            <MemoryRouter initialEntries={["/chat-list"]}>
            {/* <MemoryRouter initialEntries={["/chat-list/chat-id/1"]}> */}
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