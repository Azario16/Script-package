import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";

function EyesNumber(params: any) {
    const [NUMBER, setNumber] = useState()

    const getNumber = () => {
        sendMessage(ACTIONS.GET_USER_NUMBER, params.userInfo.id, (result: any) => {
            console.log(result)
            setNumber(result["user-number"])
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
        // <div className="input-group border border-2 border-dark">
        <div className="text-center">
            <button className="bg-none border-none"
                onClick={getNumber}
            >
                <i className="fa-solid fa-eye"></i>
            </button>
            <span>Номер: {NUMBER}</span>
        </div>
    )
}

export default EyesNumber