


function Square(props) {
    return (
        <button onClick={(e) => {
            props.click(props.row, props.col);
        }} className={"square " + props.value}>{props.value}</button>
    )
}

export default Square;