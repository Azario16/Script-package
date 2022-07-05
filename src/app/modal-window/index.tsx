import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { mapModalWindow } from './function/map-window';
import { ACTIONS_WINDOW } from "./function/actions-window";
import React from 'react';

const ModalWindow = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(show)
    const [MODAL, setModal] = useState<any>()
    useEffect(() => {
        const hostName: any = window.location.hostname
        if (hostName !== 'build.extension-test.ru' && hostName !== 'extension-test.ru') {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    // console.log(request)
                    handleShow()
                    switch (request.message) {
                        case 'create-chat':
                            setModal(mapModalWindow(ACTIONS_WINDOW.CREATE_CHAT, request, handleClose))
                            break;
                        case 'assign-chat':
                            setModal(mapModalWindow(ACTIONS_WINDOW.ASSIGN_CHAT, request, handleClose))
                            break;
                        default:
                            handleClose()
                    }
                }
            );
        } else {
            // console.log('Create modal -------------------------------------------------------------')
            const ModalReturn = mapModalWindow(ACTIONS_WINDOW.CREATE_CHAT, '5152265', handleClose)
            setModal(ModalReturn)
        }
    }, [])
    // console.log(show)
    return (
        show === false
            ? <></>
            :
            <div>
                {MODAL}
            </div>

    )
}

export default ModalWindow