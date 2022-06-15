import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";

function ButtonBar(params: any) {
    const [TYPE_USER, setTypeUser] = useState()
    const [ID_TRM, setIdTrm] = useState()
    const [BUTTON_COLOR__L_L, setButtonColorLL] = useState('secondary')
    const effectStatus = useRef(true)
    const updateTecacherIdTrm = () => {
        sendMessage(ACTIONS.GET_TEACHER_ID, params['user-id'], (result: any) => {
            // console.log(result)
            setIdTrm(result["teacher-id"][0].id)
        })
    }

    // useEffect(() => {
    //     if (!params.startValue) {
    //         setButtonColorLL('secondary')
    //     }
    //     return () => {
    //         setButtonColorLL('secondary')
    //     }
    // }, [params.startValue])

    useEffect(() => {
        if (params['user-info'] !== undefined) {
            setTypeUser(params["user-info"].data.type)
            // console.log(params.startValue)
            if (params["user-info"].data.type === 'teacher' && params.startValue) {
                updateTecacherIdTrm()
            }
        } else {
            setTypeUser(undefined)
        }
        return () => {
            setButtonColorLL('secondary')
            effectStatus.current = false;
        }
    }, [params])

    const getLoginLink = (userId: string) => {
        effectStatus.current = true
        setButtonColorLL('warning')
        sendMessage(ACTIONS.GET_LOGIN_LINK, userId, (result: any) => {
            console.log(result)
            if (result.success && effectStatus.current) {
                console.log('Логин получено и скопирован')
                // setLoginLink(result.loginLink)
                navigator.clipboard.writeText(result.loginLink)
                setButtonColorLL('success')
                setTimeout(() => {
                    setButtonColorLL('secondary')
                }, 2000);
            }
        })
    }

    const copyInfoUser = () => {
        const infoIser = [
            `ID: ${params["user-info"].data.id}`,
            `Name: ${params["user-info"].data.name}`,
            `eMail: ${params["user-info"].data.email}`,
            `Phone: ${params["user-info"].data.phone}`,
            `Identity: ${params["user-info"].data.identity}`,
            `Time: ${params["user-info"].data.timezone}`
        ]
        navigator.clipboard.writeText(infoIser.join('\n'))
    }
    return (
        <div className="d-flex flex-row justify-content-between rounded-cust-0_15 border border-1 border-b-dark">
            <div className="d-flex  justify-content-center  fs-custom-0_7">
                <div className="padding-btn-0_1">
                    <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_7 text-light" type="button"
                        onClick={() => {
                            window.open(`https://crm2.skyeng.ru/persons/${params['user-id']}`, '_blank')
                        }}
                    >CRM</button>
                    <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_7 text-light" type="button"
                        onClick={copyInfoUser}
                    >Copy</button>
                    {
                        TYPE_USER === 'teacher'
                            ? ID_TRM !== undefined
                                ? <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_7" type="button"
                                    onClick={() => {
                                        window.open(`https://tramway.skyeng.ru/teacher/${ID_TRM}/show`, '_blank')
                                    }}
                                >
                                    TRM
                                </button>
                                : <></>
                            : <></>
                    }
                </div>
            </div>
            <div className="d-flex  justify-content-center text-center">
                <span className="text-light"
                onClick={()=>{
                    if(TYPE_USER === 'student'){
                        navigator.clipboard.writeText(`https://profile.skyeng.ru/profile/${params['user-id']}/showcase`)
                    }
                }}
                >
                    {TYPE_USER}
                </span>
            </div>
            <div className="d-flex  justify-content-center  fs-custom-0_7">
                <div className="padding-btn-0_1">
                    <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_7 text-light" type="button"
                        onClick={() => {
                            window.open(`https://id.skyeng.ru/admin/users/${params['user-id']}/update-contacts`, '_blank')
                        }}
                    >
                        Edit
                    </button>
                    <button className={`rounded-pill btn btn-${BUTTON_COLOR__L_L} padding-btn-0 fs-custom-0_7  text-light `} type="button"
                        onClick={() => {
                            getLoginLink(params['user-id'])
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ButtonBar