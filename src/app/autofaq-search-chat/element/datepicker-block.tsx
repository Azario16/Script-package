import { useState, useEffect, useMemo } from 'react';
import { getDateForamte } from '../../../hooks/date-time'
import createDatePicker from '../../../hooks/date-picker/datapicker.general.conf'


function CreateDatePicker({ date: { START }, date: { END } }: { date: { START: any, END: any } }) {

    const [START_DATE, setStart] = useState('');
    const [END_DATE, setEnd] = useState('');

    const [START_ELEM, setStartElem] = useState<any>();
    const [END_ELEM, setEndElem] = useState<any>();


    useEffect(() => {
        if (START_ELEM && END_ELEM) {
            const elementList = [
                {
                    element: START_ELEM,
                    isRTLboolean: false,
                    show: 'focus'
                },
                {
                    element: END_ELEM,
                    isRTLboolean: false,
                    show: 'focus'
                }
            ]
            createDatePicker({ START, END, elementList })
        }
    }, [START_ELEM, END_ELEM, START, END])

    useMemo(() => {
        const frontStart = getDateForamte(START.current)
        const frontEnd = getDateForamte(END.current)
        setStart(frontStart)
        setEnd(frontEnd)
    }, [START.current, END.current])
    return (
        (START.current === '') ? <div>Загрузка...</div> :
            <div className="d-flex flex-row justify-content-center ">
                <div className="input-group mb-2 w-300px ">
                    <input type="text" form="logs" name="begin" className="form-control me-2 z-index-picker"
                        ref={ref => setStartElem(ref)}
                        id="datepStartUser"
                        value={START_DATE}
                        onChange={(e) => {
                            // setStart(e.target.value)
                        }}
                    />
                    <input type="text" form="logs" name="begin" className="form-control ms-2 z-index-picker"
                        ref={ref => setEndElem(ref)}
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