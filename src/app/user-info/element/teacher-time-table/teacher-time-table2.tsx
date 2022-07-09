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
    const sliderItem = useRef<any>([])
    const sliderValue = useRef<any>()

    const sliderInit = () => {
        const myCarouselElement: any = buttonCollapseRef.current
        sliderValue.current = new Carousel(myCarouselElement, {
            interval: false,
            wrap: false
        })

        // let items = sliderItem.current
        // console.log(items)

        // items.forEach((el: any) => {
        //     // number of slides per carousel-item
        //     const minPerSlide = 4
        //     let next = el.nextElementSibling
        //     for (var i = 1; i < minPerSlide; i++) {
        //         if (!next) {
        //             // wrap carousel by using first child
        //             next = items[0]
        //         }
        //         let cloneChild: any = next.cloneNode(true)
        //         el.appendChild(cloneChild.children[0])
        //         next = next.nextElementSibling
        //     }
        // })
    }

    const sliderNext = () => {
        sliderValue.current.next()
    }

    const sliderPrev = () => {
        sliderValue.current.prev()
    }


    return (
        <div className="d-flex flex-row justify-content-between rounded-cust-0_15 border border-1 border-b-dark ">
            <div className="padding-btn-0_1">
                <button className="border-none bg-none" type="button"
                    onClick={() => {
                        sliderInit()
                        sliderPrev()
                    }}
                >
                    <span className="carousel-control-prev-icon h-15px" aria-hidden="true"></span>
                    <span className="visually-hidden"></span>
                </button>
            </div>


            <div className="d-grid w-100">
                <div className="carousel slide"
                    ref={buttonCollapseRef}
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active"
                            ref={(ref) => {
                                if (ref) {
                                    sliderItem.current[0] = ref
                                }
                            }}
                        >
                            <div className="d-grid ">
                                <table className=" table-bordered text-light text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">0</td>
                                            <td className="">1</td>
                                            <td className="">2</td>
                                            <td className="">3</td>
                                            <td className="">4</td>
                                            <td className="">5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="carousel-item "
                            ref={(ref) => {
                                if (ref) {
                                    sliderItem.current[1] = ref
                                }
                            }}
                        >
                            <div className="d-grid ">
                                <table className=" table-bordered text-light text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">6</td>
                                            <td className="">7</td>
                                            <td className="">8</td>
                                            <td className="">9</td>
                                            <td className="">10</td>
                                            <td className="">11</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="carousel-item"
                            ref={(ref) => {
                                if (ref) {
                                    sliderItem.current[2] = ref
                                }
                            }}
                        >
                            <div className="d-grid">
                                <table className=" table-bordered text-light text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">12</td>
                                            <td className="">13</td>
                                            <td className="">14</td>
                                            <td className="">15</td>
                                            <td className="">16</td>
                                            <td className="">17</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="carousel-item"
                            ref={(ref) => {
                                if (ref) {
                                    sliderItem.current[2] = ref
                                }
                            }}
                        >
                            <div className="d-grid">
                                <table className=" table-bordered text-light text-center">
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">18</td>
                                            <td className="">19</td>
                                            <td className="">20</td>
                                            <td className="">21</td>
                                            <td className="">22</td>
                                            <td className="">23</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="padding-btn-0_1">
                <button className="border-none bg-none" type="button"
                    onClick={() => {
                        sliderInit()
                        sliderNext()
                    }}
                >
                    <span className="carousel-control-next-icon h-15px" aria-hidden="true"></span>
                    <span className="visually-hidden h-15px"></span></button>
            </div>
        </div>
    )
}

export default TeacherTimeTable