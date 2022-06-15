import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";
import MessageBlock from './element/message-block'
import ChatList from './page/chat-list'

const AppTest = () => {
    return (
        <div>
            {/* <MemoryRouter initialEntries={["/chat-list"]}> */}
                <Routes>
                    <Route path="/chat-list" element={<ChatList />}>
                        <Route path=":id" element={<MessageBlock />} />
                    </Route>
                </Routes>
            {/* </MemoryRouter> */}
        </div>
    )
}

export default AppTest