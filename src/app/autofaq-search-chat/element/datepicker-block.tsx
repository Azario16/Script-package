import { useState, useEffect, useMemo } from 'react';
import { getDateForamte } from '../../../hooks/date-time'
import createDatePicker from '../../../hooks/date-picker/datapicker.general.conf'


function CreateDatePicker({ date: { START }, date: { END } }: { date: { START: any, END: any } }) {
    // console.log('Render Create Date Picker')
    const [START_DATE, setStart] = useState('');
    const [END_DATE, setEnd] = useState('');
    // console.log(START)
    // console.log(END)

    // useEffect(() => {
    //     // console.log('useEffect Create Date Picker')
    //     const frontStart = getDateForamte(START.current)
    //     const frontEnd = getDateForamte(END.current)
    //     setStart(frontStart)
    //     setEnd(frontEnd)
    // }, [START.current, END.current])

    useMemo(() => {

        const elementList = [
            {
                element: 'datepStartUser',
                isRTLboolean: false,
                show: 'focus'
            },
            {
                element: 'datepEndUser',
                isRTLboolean: false,
                show: 'focus'
            }
        ]
        const frontStart = getDateForamte(START.current)
        const frontEnd = getDateForamte(END.current)
        setStart(frontStart)
        setEnd(frontEnd)
        createDatePicker({ START, END, elementList })

    }, [START.current, END.current])
    return (
        (START.current === '') ? <div>Загрузка...</div> :
            <div className="d-flex flex-row justify-content-center ">
                <div className="input-group mb-2 w-300px ">
                    <input type="text" form="logs" name="begin" className="form-control me-2 z-index-picker"
                        id="datepStartUser"
                        value={START_DATE}
                        onChange={(e) => {
                            // setStart(e.target.value)
                        }}
                    />
                    <input type="text" form="logs" name="begin" className="form-control ms-2 z-index-picker"
                        id="datepEndUser"
                        value={END_DATE}
                        onChange={(e) => {
                            // setEnd(e.target.value)
                        }}
                    />
                </div>
            </div>
    )
}

export { CreateDatePicker }