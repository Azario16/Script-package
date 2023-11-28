import Carousel from "react-multi-carousel";
import '../../styles-extension.scss'
import "react-multi-carousel/lib/styles.css";


const ButtonGroup = ({ next, previous}: any) => {
    return (
        <div className="carousel-button-group">
            <button className="border-none bg-none" type="button"
                onClick={() => previous()}
            >
                <span className="carousel-control-prev-icon h-15px" aria-hidden="true"></span>
                <span className="visually-hidden"></span>
            </button>

            <button className="border-none bg-none" type="button"
                onClick={() => next()}
            >
                <span className="carousel-control-next-icon h-15px" aria-hidden="true"></span>
                <span className="visually-hidden h-15px"></span></button>
        </div>
    );
}

function Slider() {
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
        <>
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
        </>
    )
}

export default Slider