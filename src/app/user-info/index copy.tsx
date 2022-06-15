import { useEffect, useRef, useCallback, useMemo, useState, StrictMode } from 'react';
import { createDargAndDrop } from '../../core/drag-and-drop'
import React from 'react';
import ReactDOM from 'react-dom/client';
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import InfoBlock from './element/user-info-block';
import EdauctionBlock from './element/education-services-block';
import { Collapse } from 'bootstrap';






const UserInfo: React.FC = () => {
    const [START, setStart] = useState(false)
    const [USER_ID, setUserId] = useState('15144430')
    const buttonCollapseRef = useRef<HTMLButtonElement | null>(null)
    const userInfo = useRef<any | undefined>(null)

    // console.log('App')
    useEffect(() => {
        const mainElem = document.querySelector('#main-window')
        const moveElem = document.querySelector('#move-window')
        buttonCollapseRef.current = document.querySelector('#collapseWidthExample')
        createDargAndDrop(mainElem, moveElem)
        // buttonCollapseRef?.current = document!.querySelector('#collapseWidthExample')
    }, [])

    const collapseChagne = () => {

        const checkShow = buttonCollapseRef.current?.classList?.contains('show')
        if (USER_ID !== '' && !checkShow) {
            // console.log('Развернуть')
            coollapseToogle(!checkShow, buttonCollapseRef.current)
            setStart(!checkShow)
        } else if (checkShow) {
            // console.log('Свернуть')
            coollapseToogle(true, buttonCollapseRef.current)
            setStart(false)
        }
        // console.log(START)
    }

    const coollapseToogle = (value: boolean, element: any) => {
        new Collapse(element, {
            toggle: value
        })
    }
    return (
        <div >
            <div className="d-flex w-auto position-fixed main-window border-b-dark " id="main-window">
                <div className="borderborder main-window bg-dark border border-b-dark rounded" id="move-window">
                    <input className="form-control rounded-cust-0_15 h-30px w-100 padding-btn-0 text-center text-light  bg-border border border-b-dark "

                        value={USER_ID}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            // userIdRef.current = (e.target.value.match(/[0-9]+/g)).join('')
                            const validValueArray = e.target.value.match(/[0-9]+/g)
                            const validValue = validValueArray !== null ? validValueArray.join('') : ''
                            const checkShow = buttonCollapseRef.current?.classList?.contains('show')
                            // console.log(START)
                            if (checkShow) {
                                coollapseToogle(true, buttonCollapseRef.current)
                                console.log('скрыть')
                            }
                            setUserId(validValue)
                            setStart(false)
                        }}
                    ></input>
                    <div className="d-flex flex-row justify-content-center mt-2">
                        <button type="button" className="btn btn-secondary padding-btn-0 fs-6"
                            onClick={collapseChagne}
                        >{!START ? 'найти' : 'свернуть'}</button>
                    </div>
                </div>
                <div style={{ "minHeight": "120px" }} className="bg-dark rounded">
                    <div className={`collapse collapse-horizontal border-none `} id="collapseWidthExample">
                        <div className="card  text-border bg-dark border rounded border-b-dark" style={{ "width": "289px" }}>
                            <InfoBlock howUser="student" startValue={START} userId={USER_ID} userInfo={userInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// const root = ReactDOM.createRoot(
//     document.getElementById('main') as HTMLElement
// );

// root.render(
//     <UserInfo />
// );

export default UserInfo;
