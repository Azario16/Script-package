import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../../chrome/utils";
import { ACTIONS } from "../../../../chrome/actions-bg";
import {
    ClaendarIcon,
    TelehoneMissedIcon,
    LifeBuoyIcon
} from '../../../../icon'
import { Carousel } from 'bootstrap';

function TeacherTimeTable(params: any) {

    const buttonCollapseRef = useRef<HTMLDivElement | null>(null)
    const sliderValue = useRef<any>()

    const sliderInit = () => {
        const myCarouselElement: any = buttonCollapseRef.current
        sliderValue.current = new Carousel(myCarouselElement, {
            interval: false,
            wrap: false
        })
    }

    const sliderNext = () => {
        sliderValue.current.next()
    }

    const sliderPrev = () => {
        sliderValue.current.prev()
    }

    // useEffect(() => {
    //     sliderInit()
    // }, [])
    return (
        // <div className="d-grid ">
        //     <table className=" table-bordered text-light border text-center">
        //         <tbody className="">
        //             <tr className="">
        //                 <td className="cursor-point">⬅</td>
        //                 <td className="">1</td>
        //                 <td className="">2</td>
        //                 <td className="">3</td>
        //                 <td className="">4</td>
        //                 <td className="">5</td>
        //                 <td className="">6</td>
        //                 <td className="">7</td>
        //                 <td className="cursor-point">➡</td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
        <>
            <div className="btn-group">
                <button className="" type="button"
                    onClick={() => {
                        sliderInit()
                        sliderPrev()
                    }}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden"></span>
                </button>

                <div className="carousel slide"
                    ref={buttonCollapseRef}
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="d-grid ">
                                <table className=" table-bordered text-light border text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">1</td>
                                            <td className="">2</td>
                                            <td className="">3</td>
                                            <td className="">4</td>
                                            <td className="">5</td>
                                            <td className="">6</td>
                                            <td className="">7</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-grid ">
                                <table className=" table-bordered text-light border text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">8</td>
                                            <td className="">9</td>
                                            <td className="">10</td>
                                            <td className="">11</td>
                                            <td className="">12</td>
                                            <td className="">13</td>
                                            <td className="">14</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-grid">
                                <table className=" table-bordered text-light border text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">14</td>
                                            <td className="">15</td>
                                            <td className="">16</td>
                                            <td className="">17</td>
                                            <td className="">18</td>
                                            <td className="">19</td>
                                            <td className="">20</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="" type="button"
                    onClick={() => {
                        sliderInit()
                        sliderNext()
                    }}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden"></span>
                </button>
            </div>
        </>
    )
}

export default TeacherTimeTable