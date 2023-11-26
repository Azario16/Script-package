import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { mapModalWindow } from './function/map-window';
import { ACTIONS_WINDOW } from "./function/actions-window";
import React from 'react';
import { isExtensionContext } from '../../service/chrome-runtime.service';

const ModalWindow = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [MODAL, setModal] = useState<any>()
    useEffect(() => {
        if (isExtensionContext()) {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
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
            const ModalReturn = mapModalWindow(ACTIONS_WINDOW.CREATE_CHAT, '5152265', handleClose)
            setModal(ModalReturn)
        }
    }, [])
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