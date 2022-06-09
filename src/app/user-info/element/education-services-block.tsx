import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { getEducationInfo } from '../function/get-education-info'
import { sendMessage } from "../../../chrome/utils";
import { ACTIONS } from "../../../chrome/actions-bg";
import InfoBlock from './user-info-block';

interface HitLog {
    serviceTypeKey: string;
    shortTitle: string;
}

interface eduInfo {
    data?: {

        error?: {
            message?: string
        };
        errors?: object;
    };
    error?: {
        message?: string
    };
    errors?: any;
}

function EducationBlock(params: { userInfo: any; startValue: unknown; howUser: string; }) {
    // console.log('InfoBlock')
    const [START, setStart] = useState(true)
    const [EDUCATION, setEducation] = useState([])
    const [ERROR, setError] = useState<any>()
    const configurationsRef = useRef<any>({})

    const mapEducation = (educationValue: string) => {
        if (null !== configurationsRef.current) {
            const result = configurationsRef.current.filter((value: { serviceTypeKey: string; }, key: any) => {
                return value.serviceTypeKey === educationValue
            })
            return result[0].shortTitle
        }

    }

    const mapEducationColor = (educationValue: any) => {
        if (educationValue.stage === "regular_lessons") {
            return 'success'
        }
        if (educationValue.stage === "before_call") {
            return 'warning'
        }
        if (educationValue.stage === "lost") {
            return 'lost'
        }
        if (educationValue.stage === "after_trial") {
            return 'fatal'
        }
    }
    const updateEducation = async () => {
        sendMessage(ACTIONS.GET_EDUCATION_INFO, params.userInfo.id, (result: any) => {
            // const resData = result["education-service"]
            const educationInfo: any = result["education-service"]
            // educationInfo["data"] = result["education-service"]
            if (educationInfo.data?.length === 0 || educationInfo?.data?.error || educationInfo.data?.errors) {
                if(educationInfo.data?.error){
                    const errorMessage = educationInfo.data?.error?.message ? educationInfo?.error.message : educationInfo?.errors[0].message
                    setError(errorMessage)
                }
            } else if (educationInfo.data) {
                const rsultConfog: any = result["configurations"]
                configurationsRef.current = rsultConfog
                setEducation(educationInfo.data)

            } else {
                setError(educationInfo)
            }
        })
    }

    useEffect(() => {
        // console.log('updateUserIngo')
        if (params.userInfo.type === 'student') {
            updateEducation()
        } else {
            setError(undefined)
            setEducation([])
        }
    }, [JSON.stringify(params.userInfo), params.startValue])

    return (
        EDUCATION.length === 0 ?
            ERROR === undefined
                ? <></>
                : <pre className="text-center">
                    {JSON.stringify(ERROR)}
                </pre>
            : <>
                <div className="accordion" id={`accordionExample`}>
                    {
                        EDUCATION.map((educationValue: any, key: number) => {
                            const teacherId = educationValue.teacher?.general?.id !== undefined
                                ? educationValue?.teacher.general.id
                                : ''
                            return (
                                <div className="accordion-item" key={key}>
                                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                        <button className={`accordion-button collapsed padding-btn-0 fs-custom-0_7 bg-${mapEducationColor(educationValue)} text-light`} type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapseWidthExample-${key}`}
                                            aria-expanded="false"
                                            aria-controls={`collapseWidthExample-${key}`}
                                        >
                                            <div className="ms-1  w-75">
                                                <div className="d-flex flex-row justify-content-between  ">

                                                    <span>
                                                        Плательщик: {educationValue.paymentAgreement.person.general.id}
                                                    </span>


                                                    <div className="d-flex  justify-content-center  fs-custom-0_7">

                                                        <span>
                                                            П: {educationValue.teacher !== null 
                                                                ? educationValue.teacher.general.id 
                                                                : '-'
                                                            }
                                                        </span>

                                                    </div>

                                                </div>
                                                У: {educationValue.student.general.name}
                                                <div className='input-group'>
                                                    <div className='coin custom-icon w-15px h-15px'>
                                                    </div>
                                                    <span className='ms-1 text-nowrap'>
                                                        : {educationValue.balance}
                                                    </span>
                                                </div>
                                                <span>{mapEducation(educationValue.serviceTypeKey)}</span>

                                            </div>
                                        </button>
                                    </h2>
                                    <div id={`collapseWidthExample-${key}`} className={`accordion-collapse collapse`}
                                        aria-labelledby="panelsStayOpen-headingTwo"

                                    >

                                        {educationValue.teacher !== null ?
                                            <div className="bg-exten-window">
                                                {/* <ButtonBar howUser="teacher" /> */}
                                                <InfoBlock howUser="teacher" startValue={START} userId={teacherId} />
                                            </div>
                                            : <div className="bg-exten-window text-center">Не указан преподаватель</div>
                                        }


                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
    )
}

export default EducationBlock;