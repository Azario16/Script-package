import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import {
    ClaendarIcon,
    TelehoneMissedIcon,
    LifeBuoyIcon
} from '../../../icon'
import ButtonBar from './button-bar';
import React from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import { ACTIONS_WINDOW } from '../../modal-window/function/actions-window'
import EdauctionBlock from './education-services-block';
import EyesNumber from './eyes-number'
import SlackId from './slack-id'
import TimeTable from './teacher-time-table/teacher-time-table'

import { getDateWeekForButton } from '../../../hooks/date-time'

function InfoBlock(props: any) {
    const [USER_INFO, setUserInfo] = useState<any>()
    const [ERROR, setError] = useState()
    const [RELATION, setRelation] = useState('')
    const effectStatus = useRef(true)
    const mapRelation: any = {
        'kid': 'Skysmart - KIDS',
    }

    const openModalElenet = () => {
        const messageValue = {
            message: 'create-chat',
            userId: props.userId,
            session: props.session,
            afOperatorValue: props.afOperatorValue
        }

        sendMessage(ACTIONS.SEND_EVENT, messageValue, (result: any) => {

        })
    }

    const updateUserInfo = () => {
        effectStatus.current = true
        sendMessage(ACTIONS.GET_USER_ID, props.userId, (result: any) => {
            const userInfo: any = result["user-info"]
            if (userInfo.data?.error || userInfo.data?.errors) {
                const errorMessage = userInfo.data.error?.message ? userInfo.error.message : userInfo.errors[0].message
                setError(errorMessage)
            } else if (userInfo.data && effectStatus.current) {
                const findRelation = result.family.data.find((element: any) => {
                    return element.general.id === userInfo.data.id
                })
                setRelation(findRelation.relation)
                setUserInfo(userInfo)
            }
        })
    }

    useEffect(() => {
        if (props.startValue && props.userId !== '') {
            updateUserInfo()
        } else {
            setError(undefined)
            setUserInfo(undefined)
        }
        return () => {
            effectStatus.current = false;
        }
    }, [props.userId, props.startValue])

    return (
        <>
            <ButtonBar user-info={USER_INFO} user-id={props.userId} startValue={props.startValue} />
            {USER_INFO === undefined ?
                ERROR === undefined
                    ? <></>
                    : <pre className="text-center text-wrap">
                        {JSON.stringify(ERROR)}
                    </pre>
                : <>
                    <div className="text-center position-relative">
                        <>
                            <div className="position-absolute top-0 start-0 btn-group">
                                {props.howUser === 'student' &&
                                    <div className='bg-none custom-icon me-1 rounded bg-secondary border border-b-dark '>
                                        <TelehoneMissedIcon />
                                    </div>
                                }
                                {
                                    props.session?.data.roles.includes('ROLE_SUPPORT') &&
                                    <div className='bg-none custom-icon autoFaq rounded bg-secondary border border-b-dark '
                                        onClick={openModalElenet}
                                    >
                                    </div>
                                }
                            </div>
                        </>


                        <div className="position-absolute top-0 end-0 rounded border border-b-dark  bg-secondary">
                            <div className='bg-none custom-icon'
                                onClick={() => {
                                    window.open(`https://crm2.skyeng.ru/persons/${USER_INFO.data.id}/customer-support/manual`)
                                }}
                            >
                                <LifeBuoyIcon />
                            </div>
                        </div>

                        <div className="position-absolute bottom-50 end-50"></div>
                        <div className="position-absolute bottom-0 start-0"></div>
                        <div className="position-absolute bottom-0 end-0"></div>
                        <div className="text-light text-center bg-exten-UI d-grid">
                            {RELATION === 'kid' &&
                                <>
                                    <span className="text-info fs-6 fw-bold">
                                        {mapRelation[RELATION]}
                                    </span>
                                </>
                            }
                            <span>
                                {`ID: ${USER_INFO.data.id}`}
                            </span>
                            <span>
                                {`Name: ${USER_INFO.data.name}`}
                            </span>
                            <span>
                                {`eMail: ${USER_INFO.data.email}`}
                            </span>
                            <span>
                                <EyesNumber userInfo={USER_INFO.data} />
                            </span>
                            <span>
                                {`Skype: ${USER_INFO.data.skype}`}
                            </span>
                            <span>
                                {`Identity: ${USER_INFO.data.identity}`}
                            </span>
                            <span>
                                {`Время: ${USER_INFO.data.utcOffset} UTC`}
                            </span>
                            
                            <span>
                                <SlackId userId={props.userId} />
                            </span>
                        </div>
                    </div>
                    {
                        USER_INFO.data.type === 'teacher'
                            ? <TimeTable userInfo={USER_INFO} userId={props.userId} startValue={props.startValue} />
                            : <></>
                    }
                    {
                        props.startValue &&
                        <EdauctionBlock
                            session={props.session}
                            afOperatorValue={props.afOperatorValue}
                            howUser="student"
                            startValue={props.startValue}
                            userInfo={USER_INFO.data} />
                    }
                </>
            }
        </>
    )
}

export default InfoBlock;