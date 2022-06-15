import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";
import {
    EyeIcon
} from '../../../icon'

function EyesNumber(params: any) {
    const [NUMBER, setNumber] = useState()
    const [DISPLAY_EYE, setDisplayEye] = useState(true)
    const getNumber = () => {
        sendMessage(ACTIONS.GET_USER_NUMBER, params.userInfo.id, (result: any) => {
            console.log(result)
            setDisplayEye(false)
            setNumber(result["user-number"].data.value)
        })
    }

    useEffect(() => {
        if (params.userInfo.phone !== undefined) {
            setNumber(params.userInfo.phone)
            // updateTecacherIdTrm()

        } else {
            setNumber(undefined)
        }
    }, [params])
    return (
        <div className="text-center btn-group">
            {!!DISPLAY_EYE &&
                <div className="bg-none border-none eyes"
                    onClick={getNumber}
                >
                    <EyeIcon />
                    {/* <i className="fa-solid fa-eye text-border eyes"></i> */}
                </div>
            }
            <span className="ms-1">Номер: {NUMBER}</span>
        </div>
    )
}

export default EyesNumber