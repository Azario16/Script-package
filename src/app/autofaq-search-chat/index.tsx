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
import { ACTIONS } from '../../chrome/actions';
import App from './App';
import MessageBlock from './element/message-block'
import ChatList from './page/chat-list'
import { Collapse } from 'bootstrap';

const SearchChat = (props: any) => {
    const key = 0

    const buttonCollapseRef = useRef<HTMLDivElement | null>(null)
    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }

    return (
        <div className={`${props.styleElement} p-rel bg-af-search-chat overflow-auto z-index-cs main-search-chat`}>
            <div className="btn-group">
                <div className={`${props.styleElement} bg-dark`}>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item" key={key}>
                            <div className="accordion-header" id="panelsStayOpen-headingTwo">
                                <button className={`accordion-button collapsed accordion-left padding-btn-0 fs-custom-0_7 text-light bg-secondary`} type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseUserInfo`}
                                    aria-expanded="false"
                                    aria-controls={`collapseUserInfo}`}
                                    onClick={() => {
                                        coollapseToogle(true, buttonCollapseRef.current)
                                    }}
                                >
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ "minHeight": "120px" }} className="rounded vh-100">
                    <div className={`collapse collapse-horizontal border-none`} id="collapseUserInfo"
                        ref={buttonCollapseRef}
                    >
                        {/* <div className="container w-400px h-100"> */}

                        
                            <div className="container w-400px h-100 overflow-auto">
                                <App buttonToogle={buttonCollapseRef}/>
                            </div>
                         
                        

                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SearchChat