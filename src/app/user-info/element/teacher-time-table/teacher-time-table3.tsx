import React from 'react';
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { useState, useEffect, useRef, useMemo, useCallback, createContext } from 'react';
import { sendMessage } from "../../../../chrome/utils";
import { ACTIONS } from "../../../../chrome/actions-bg";
import {
    ClaendarIcon,
    TelehoneMissedIcon,
    LifeBuoyIcon
} from '../../../../icon'
import ButtonGroup from './custom-button'

function TeacherTimeTable(params: any) {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 0 },
            items: 6,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 3000, min: 0 },
            items: 6,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 3000, min: 0 },
            items: 6,
            slidesToSlide: 1 // optional, default to 1.
        }
    };


    return (
        // <div className="d-flex flex-row justify-content-between rounded-cust-0_15 border border-1 border-b-dark ">
        <div>
            {/* <div className="padding-btn-0_1">
                <button className="border-none bg-none" type="button"
                    onClick={() => {

                    }}
                >
                    <span className="carousel-control-prev-icon h-15px" aria-hidden="true"></span>
                    <span className="visually-hidden"></span>
                </button>
            </div> */}
            <div className="w-100 text-light">
                <Carousel arrows={false} responsive={responsive} customButtonGroup={<ButtonGroup />}>
                    <div className="border text-center" >0</div>
                    <div className="border text-center" >1</div>
                    <div className="border text-center" >2</div>
                    <div className="border text-center" >3</div>
                    <div className="border text-center" >4</div>
                    <div className="border text-center" >5</div>
                    <div className="border text-center" >6</div>
                    <div className="border text-center" >7</div>
                    <div className="border text-center" >8</div>
                    <div className="border text-center" >9</div>
                    <div className="border text-center" >10</div>
                    <div className="border text-center" >11</div>
                    <div className="border text-center" >12</div>
                    <div className="border text-center" >13</div>
                    <div className="border text-center" >14</div>
                    <div className="border text-center" >15</div>
                    <div className="border text-center" >16</div>
                    <div className="border text-center" >17</div>
                    <div className="border text-center" >18</div>
                    <div className="border text-center" >19</div>
                    <div className="border text-center" >20</div>
                    <div className="border text-center" >21</div>
                    <div className="border text-center" >22</div>
                    <div className="border text-center" >23</div>
                </Carousel>
            </div>

            <div className="padding-btn-0_1">
                {/* <button className="border-none bg-none" type="button"
                    onClick={() => {

                    }}
                >
                    <span className="carousel-control-next-icon h-15px" aria-hidden="true"></span>
                    <span className="visually-hidden h-15px"></span>
                </button> */}
            </div>
        </div>
    )
}

export default TeacherTimeTable