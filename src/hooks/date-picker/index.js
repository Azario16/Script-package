import $ from 'jquery'
import { useState, useEffect, useRef, useCallback } from 'react';
// import datepickerFactory from 'jquery-datepicker';
// import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ja';
import createDatePicker from './datapicker.general.conf'
import { setDateTimeSlot, setDateSlot, getDateTimeSlot, getDateSlot, creatNowDate } from '../date-time'

import { createDatepickerButton } from './button'
// createDatePicker()
// createDatepickerButton().goOverDate(',', $)
export default function CreateBlock(callBackDateTime) {
    useEffect(() => {
        createDatePicker()
    }, [])
    // useEffect(() => {
    //     console.log('creatNowDate')
    // })
    // creatNowDate()
    function handleChange(event) {
        console.log(event.target.value);
    }
    const BUTTON = createDatepickerButton($, callBackDateTime)
    const dateSlot = getDateSlot()
    return (
        <div className="container mx-auto position-fixed start-50 translate-middle-x block-date-pocker"
            style={{
                "width": '100%',
                "zIndex": "30"
            }}>
            <div className="row  sticky-top border bg-secondary  border-4 rounded-pill"

                style={{
                    "border": '6px solid #c0c0c0',
                    "zIndex": "30"
                }}
            >
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <div className="container px-1">
                        <div className="row gx-2">
                            <div className="col-2"
                                style={{
                                    "width": '18%',
                                }}>
                                <div className="position-relative top-50 start-50 translate-middle btn-group" role="group" aria-label="Basic mixed styles example">
                                    <input className="position-relative bg-secondary text-light form-control h-40px"
                                        style={{
                                            "borderColor": 'transparent',
                                        }}
                                        onChange={handleChange}
                                        name="date" type="text" autoComplete="off" id="datep"
                                        value={dateSlot}

                                    ></input>
                                </div>
                            </div>

                            <div className="col-4">
                                <button className="btn btn-success text-light me-1"
                                    onClick={() => {
                                        BUTTON.goOverDate(',', $)
                                    }}
                                >Перейти</button>
                                <button className=" btn btn-success me-1" defaultValue="true" name="oneless"
                                    onClick={() => {
                                        BUTTON.previousDate(',', $)
                                    }}
                                ><i className="fa fa-arrow-left"></i></button>
                                <button className=" btn btn-success text-light me-1" defaultValue="true" name="today"
                                    onClick={() => {
                                        BUTTON.todayDate(',', $)
                                    }}
                                >Сегодня</button>
                                <button className=" btn btn-success me-1" defaultValue="true" name="onemore"
                                    onClick={() => {
                                        BUTTON.nextDate(',', $)
                                    }}
                                ><i className="fa fa-arrow-right"></i></button>
                            </div>
                            <div className="col-2">
                            </div>

                            <div className="col-2">
                                <input className="position-relative top-50 start-50 translate-middle bg-secondary bg-gradient text-light  form-control timeslot-link"
                                    type="text"
                                    autoComplete="off" placeholder="Добавить" name="text" form="adder"></input>
                            </div>

                            <div className="col">
                                <button className="position-relative top-50 start-50 translate-middle w-100 p-2 btn btn-info "
                                    form="adder" type="button submit" name="adder" defaultValue="true"><i className="fa fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}