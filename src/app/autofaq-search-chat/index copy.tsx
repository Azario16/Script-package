import React from 'react'
import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import type { RouteObject } from "react-router-dom";
import {
    Outlet,
    Link,
    MemoryRouter,
    Routes,
    Route,
    useRoutes
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Colapse from 'bootstrap/js/dist/collapse.js';
import { sendMessage } from '../../chrome/utils';
import { ACTIONS } from '../../chrome/actions-bg';

import MessageBlock from './element/message-block'
import ChatList from './page/chat-list'

const SearchChat = () => {
    const [CHAT_ID, setChatId] = useState('')
    const [CHAT_LIST, setChatLis] = useState()
    const [ROUT, setRout] = useState()
    const key = 0
    let routes: RouteObject[] = [
        {
            path: "/",
            element: <></>,
            children: [
                { index: true, element: <MessageBlock /> },
                {
                    path: "/chat-list",
                    element: <ChatList />,
                    children: [
                        { index: true, element: <MessageBlock /> },
                    ],
                },
            ],
        },
    ];
    let element = useRoutes(routes);
    // const history = useNavigate();
    return (
        /* Закрепить справа но поверх страницы  */
        // <div className="position-absolute top-0 end-0 vh-100 bg-af-search-chat">

        /* Закрепить справа и добавить сдвиг */
        // <div className="float-end vh-100 bg-af-search-chat">

        /* Сделать и для CRM 2 сдвигом */
        <div className="float-end vh-100 bg-af-search-chat">

            <div className="btn-group">
                <div className="bg-dark d-flex">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item" key={key}>
                            <div className="accordion-header" id="panelsStayOpen-headingTwo">
                                <button className={`accordion-button collapsed padding-btn-0 fs-custom-0_7 text-light bg-secondary`} type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseUserInfo`}
                                    aria-expanded="false"
                                    aria-controls={`collapseUserInfo}`}
                                >
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ "minHeight": "120px" }} className="rounded bg-dark">
                    <div className={`collapse collapse-horizontal border-none`} id="collapseUserInfo">
                        <div className="container w-400px">
                            <div className="d-flex flex-row justify-content-center">
                                <div className="text-center">
                                    <div className="d-flex flex-row justify-content-center ">
                                        <button type="button" className="btn btn-secondary mb-3 padding-btn-0 fs-6 text-uppercase" id="change_week"
                                            onClick={async () => {
                                            }}
                                        >вернуться</button>
                                        <button type="button" className="btn btn-secondary mb-3 ms-2 padding-btn-0 fs-6 text-uppercase" id="change_week"
                                            onClick={async () => {
                                            }}
                                        >Поиск</button>
                                    </div>
                                    <div className="d-flex flex-row justify-content-center ">
                                        <div className="input-group mb-2 w-400px ">
                                            <input type="text" form="logs" name="begin" className="form-control me-2"
                                                id="datepStartUser"
                                                value=""
                                                placeholder="ID пользователя"
                                                onChange={(e) => {
                                                }}
                                            />
                                            <input type="text" form="logs" name="begin" className="form-control ms-2"
                                                id="datepEndUser"
                                                value=""
                                                placeholder="ID чата"
                                                onChange={(e) => {

                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-center ">
                                        <div className="input-group mb-2 w-300px ">
                                            <input type="text" form="logs" name="begin" className="form-control me-2"
                                                id="datepStartUser"
                                                value=""
                                                onChange={(e) => {
                                                }}
                                            />
                                            <input type="text" form="logs" name="begin" className="form-control ms-2"
                                                id="datepEndUser"
                                                value=""
                                                onChange={(e) => {

                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row justify-content-center ">
                                        <button type="button" className="btn btn-secondary mb-3 padding-btn-0 fs-6 text-uppercase" id="change_week"
                                            onClick={async () => {
                                                // history(`/chat-list`);
                                            }}
                                        >Лист</button>
                                        <button type="button" className="btn btn-secondary mb-3 ms-2 padding-btn-0 fs-6 text-uppercase" id="change_week"
                                            onClick={async () => {

                                            }}
                                        >Чат</button>
                                    </div>

                                </div>
                            </div>
                            <BrowserRouter>
                                <div>
                                    <nav>
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/courses">Courses</Link>
                                            </li>
                                            <li>
                                                <Link to="/nothing-here">Nothing Here</Link>
                                            </li>
                                        </ul>
                                    </nav>

                                    <hr />

                                    <Outlet />
                                </div>
                            </BrowserRouter>


                            {/* <MemoryRouter initialEntries={["/users"]}>
                                <Routes>
                                    <Route path="users" element={<ChatList />}>
                                        <Route path=":id" element={<MessageBlock />} />
                                    </Route>
                                </Routes>
                            </MemoryRouter> */}

                            {/* <MessageBlock /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchChat