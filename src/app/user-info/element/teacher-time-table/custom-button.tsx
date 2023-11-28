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
                <span className="visually-hidden h-15px"></span>
            </button>
        </div>
    );
}

export default ButtonGroup