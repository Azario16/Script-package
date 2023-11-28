import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import {
    EyeIcon
} from '../../../icon'
import { Logger } from '../../../service/logger/logger.service';
import { ContactData } from './eyes.interface';

function EyesNumber({ contactData, userID }: { contactData: ContactData, userID: number }) {
    const [NUMBER, setNumber] = useState<string>()
    const [DISPLAY_EYE, setDisplayEye] = useState(true)
    const getNumber = () => {
        const messageValue = {
            userID,
            contactId: contactData.id
        }
        sendMessage(ACTIONS.GET_USER_NUMBER, messageValue, (result: any) => {
            Logger.debug(result)
            setDisplayEye(false)
            setNumber(result)
        })
    }

    useEffect(() => {
        setNumber(contactData.contact)
    }, [contactData])

    return (
        <div className="text-center btn-group">
            {!!DISPLAY_EYE &&
                <div className="bg-none border-none eyes" onClick={getNumber}>
                    <EyeIcon />
                </div>
            }
            <div className="text-light d-flex justify-content-center align-items-center">
                <span className="fs-custom-0_8 ms-1">Номер{contactData.general ? ' (основной)' : ''}: </span>
                <span className="fs-custom-0_7 ms-1">{NUMBER}</span>
            </div>
        </div>
    )
}

export default EyesNumber