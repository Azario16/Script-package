import { useState, useEffect, useRef } from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import { Logger } from '../../../service/logger/logger.service';

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function ButtonBar(params: any) {
    const [TYPE_USER, setTypeUser] = useState()
    const [ID_TRM, setIdTrm] = useState()
    const [BUTTON_COLOR__L_L, setButtonColorLL] = useState('secondary')
    const [BUTTON_COLOR_CLIPBOARD, setButtonColorClipboard] = useState('')
    const effectStatus = useRef(true)

    useEffect(() => {
        if (params['user-info'] !== undefined) {
            setTypeUser(params["user-info"].data.type)
            if (params["user-info"].data.type === 'teacher' && params.startValue) {
                setIdTrm(params['user-id']);
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
            Logger.debug(result)
            if (result.success && effectStatus.current) {
                Logger.debug('Логин получено и скопирован')
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
            ...params["user-contacts"].map((contact: any) => {
                return `${capitalizeFirstLetter(contact.type)}: ${contact.value}`
            }),
            `Time: ${params["user-info"].data.timezone}`
        ]
        navigator.clipboard.writeText(infoIser.join('\n'))
    }
    return (
        <div className="d-flex flex-row justify-content-between rounded-cust-0_15 border border-1 border-b-dark">
            <div className="d-flex  justify-content-center  fs-custom-0_8">
                <div className="padding-btn-0_1">
                    <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_8 text-light w-40px" type="button"
                        onClick={() => {
                            window.open(`https://crm2.skyeng.ru/persons/${params['user-id']}`, '_blank')
                        }}
                    >CRM</button>
                    <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_8 text-light w-40px" type="button"
                        onClick={copyInfoUser}
                    >Copy</button>
                    {
                        TYPE_USER === 'teacher'
                            ? ID_TRM !== undefined
                                ? <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_8 w-40px" type="button"
                                    onClick={() => {
                                        window.open(`https://trm.skyeng.ru/teacher/${ID_TRM}`, '_blank')
                                    }}
                                >
                                    TRM
                                </button>
                                : <></>
                            : <></>
                    }
                </div>
            </div>
            <div className={`d-flex justify-content-center text-center w-25 rounded-pill ${BUTTON_COLOR_CLIPBOARD}`}>
                <span className="d-flex align-items-center fw-bold text-light clickable"
                    onClick={() => {
                        if (TYPE_USER === 'student') {
                            setButtonColorClipboard('bg-success')
                            navigator.clipboard.writeText(`https://profile.skyeng.ru/profile/${params['user-id']}/showcase`)
                            setTimeout(() => {
                                setButtonColorClipboard('')
                            }, 1500);
                        }
                    }}
                >
                    {TYPE_USER}
                </span>
            </div>
            <div className="d-flex  justify-content-center  fs-custom-0_8">
                <div className="padding-btn-0_1">
                    <button className="rounded-pill btn btn-secondary padding-btn-0 fs-custom-0_8 text-light w-40px" type="button"
                        onClick={() => {
                            window.open(`https://id.skyeng.ru/admin/users/${params['user-id']}/update-contacts`, '_blank')
                        }}
                    >
                        Edit
                    </button>
                    <button className={`rounded-pill btn btn-${BUTTON_COLOR__L_L} padding-btn-0 fs-custom-0_8  text-light w-40px`} type="button"
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