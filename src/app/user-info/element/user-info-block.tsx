import { useState, useEffect, useRef } from 'react';
import {
    TelehoneMissedIcon,
    LifeBuoyIcon,
    EyeIcon
} from '../../../icon'
import ButtonBar from './button-bar';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions";
import EdauctionBlock from './education-services-block';
import EyesContact from './eyes-number'
import SlackId from './slack-id'
import TimeTable from './teacher-time-table/teacher-time-table'

function InfoBlock(props: any) {
    const [USER_INFO, setUserInfo] = useState<any>()
    const [CONTACTS, setContacts] = useState([])
    const [DISPLAY_EYE, setDisplayEye] = useState(true)

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

        sendMessage(ACTIONS.SEND_EVENT, messageValue, () => {})
    }

    const updateUserInfo = () => {
        effectStatus.current = true

        sendMessage(ACTIONS.GET_USER_CONTACTS, props.userId, (result: any) => {
            setContacts(result.data)
        })

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

    const getAllPersonalContact = () => {
        if(DISPLAY_EYE){
            sendMessage(ACTIONS.GET_ALL_PERSONAL_DATA, props.userId, (result: any) => {
                setDisplayEye(false)
                setContacts(result.data)
            })
        }
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

                            <div className='text-center btn-group justify-content-center'>
                                {
                                    DISPLAY_EYE &&
                                    <div className="d-flex h-100 bg-none border-none eyes" onClick={getAllPersonalContact}>
                                        <EyeIcon />
                                    </div>
                                }
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

                                    {
                                        CONTACTS.map((contact: any, index: number) => {
                                            return (
                                                <span key={index} >
                                                    <EyesContact contactData={contact} />
                                                </span>
                                            )
                                        })
                                    }
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