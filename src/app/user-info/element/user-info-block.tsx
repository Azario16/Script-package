import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import {
    ClaendarIcon,
    TelehoneMissedIcon,
    LifeBuoyIcon
} from '../../../icon'
import ButtonBar from './button-bar';
import React from 'react';
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";
import EdauctionBlock from './education-services-block';
import EyesNumber from './eyes-number'

function InfoBlock(params: any) {
    // console.log('InfoBlock')
    // const [START, setStart] = useState<any>(false)
    const [USER_INFO, setUserInfo] = useState<any>()
    const [ERROR, setError] = useState()

    const updateUserIngo = () => {
        sendMessage(ACTIONS.GET_USER_ID, params.userId, (result: any) => {
            console.log(result)
            const userInfo: any = result["user-info"]
            if (userInfo.data?.error || userInfo.data?.errors) {
                const errorMessage = userInfo.data.error?.message ? userInfo.error.message : userInfo.errors[0].message
                setError(errorMessage)
            } else if (userInfo.data) {
                setUserInfo(userInfo)
            } else {
                setError(userInfo)
            }
        })
    }

    useEffect(() => {
        // console.log('updateUserIngo')
        if (params.startValue && params.userId !== '') {
            updateUserIngo()
        } else {
            setError(undefined)
            setUserInfo(undefined)
        }
    }, [params.userId, params.startValue])

    return (
        params.startValue &&
        <>
            <ButtonBar user-info={USER_INFO} user-id={params.userId} startValue={params.startValue}/>

            {USER_INFO === undefined ?
                ERROR === undefined
                    ? <></>
                    : <pre className="text-center text-wrap">
                        {JSON.stringify(ERROR)}
                    </pre>
                :

                <>
                    <div className="text-center">
                        <div className="position-relative">
                            {params.howUser === 'student' &&
                                <>
                                    <div className="position-absolute top-0 start-0">
                                        {/* <button className='bg-none custom-icon'>
                                            <ClaendarIcon />
                                        </button> */}
                                        <button className='bg-none custom-icon'>
                                            <TelehoneMissedIcon />
                                        </button>
                                    </div>
                                    <div className="position-absolute top-0 end-0">
                                        <button className='bg-none custom-icon'
                                            onClick={() => {
                                                window.open(`https://crm2.skyeng.ru/persons/${USER_INFO.data.id}/customer-support/manual`)
                                            }}
                                        >
                                            <LifeBuoyIcon />
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="fs-custom-0_7">
                            {`ID: ${USER_INFO.data.id}`}
                            <br />
                            {`Name: ${USER_INFO.data.name}`}
                            <br />
                            {`eMail: ${USER_INFO.data.email}`}
                            <br />
                            <EyesNumber userInfo={USER_INFO.data}/>
                            {`Skype: ${USER_INFO.data.skype}`}
                            <br />
                            {`Identity: ${USER_INFO.data.identity}`}
                            <br />
                            {`Время: ${USER_INFO.data.timezone}`}
                        </div>
                    </div>
                    <EdauctionBlock howUser="student" startValue={params.startValue} userInfo={USER_INFO.data} />
                </>
            }
        </>
    )
}

export default InfoBlock;