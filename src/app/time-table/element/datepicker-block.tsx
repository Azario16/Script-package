import { useState, useEffect, useMemo } from 'react';
import { getDateForamte } from '../../../hooks/date-time'
import createDatePicker from '../../../hooks/date-picker/datapicker.general.conf'


function CreateDatePicker({ date: { START } }: { date: { START: any } }) {

    const [START_DATE, setStart] = useState('');
    const [START_ELEM, setStartElem] = useState<any>();

    useEffect(() => {
        if (START_ELEM) {
            const elementList = [
                {
                    element: START_ELEM,
                    isRTLboolean: false,
                    show: 'focus'
                }
            ]
            createDatePicker({ START, elementList })
        }
    }, [START_ELEM, START])

    useMemo(() => {
        const frontStart = getDateForamte(START.current)
        setStart(frontStart)
    }, [START.current])
    return (
        (START.current === '') ? <div>Загрузка...</div> :
            <div className="d-flex flex-row justify-content-center h-30px">
                <div className="input-group mb-2 ">
                    <input type="text" form="logs" name="begin" className="form-control me-2 z-index-picker h-30px"
                        ref={ref => setStartElem(ref)}
                        id="datepStartUser"
                        value={START_DATE}
                        onChange={(e) => {
                            // setStart(e.target.value)
                        }}
                    />
                </div>
            </div>
    )
}

export { CreateDatePicker }