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
import App from './App';
import MessageBlock from './element/message-block'
import ChatList from './page/chat-list'
import Frame, { FrameContextConsumer } from 'react-frame-component';

const SearchChat = (props: any) => {
    const [CHAT_ID, setChatId] = useState('')
    const [CHAT_LIST, setChatLis] = useState()
    const [ROUT, setRout] = useState()
    const key = 0
    // const history = useNavigate();
    return (
        /* Закрепить справа но поверх страницы  */
        // <div className="position-absolute top-0 end-0 vh-100 bg-af-search-chat">

        /* Закрепить справа и добавить сдвиг */
        // <div className="float-end vh-100 bg-af-search-chat">

        /* Сделать и для CRM 2 сдвигом */

        <div className={`${props.styleElement} vh-100 bg-af-search-chat overflow-auto z-index-cs`}>

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
                <div style={{ "minHeight": "120px" }} className="rounded bg-dark h-100">
                    <div className={`collapse collapse-horizontal border-none`} id="collapseUserInfo">
                        {/* <div className="container w-400px h-100"> */}

                        {window.location.hostname === 'extension-test.ru'
                            ?
                            <div className="container w-400px h-100">
                                <App />
                            </div>
                            :
                            /* Подключаем расширение чере iframe чтобы не ломать стили других страниц */
                            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/main.css")} ></link>]}>
                                <FrameContextConsumer>



                                    {
                                        // Callback is invoked with iframe's window and document instances
                                        ({ document, window }) => {
                                            // Render Children
                                            return(
                                            <div className={'my-extension'}>
                                                <h1>Hello world - My first Extension</h1>
                                            </div>
                                                // <div className="container vh-100">
                                                //     <App />
                                                // </div>

                                            )
                                        }
                                    }


                                </FrameContextConsumer>
                            </Frame>
                        }

                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SearchChat