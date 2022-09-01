
import Square from "./Square";
function Board({ click, currBoard }) {
    return (
        <div className="square-container">
            <div className="row row1">
                <Square row={0} col={0} click={click} value={currBoard[0][0]} />
                <Square row={0} col={1} click={click} value={currBoard[0][1]} />
                <Square row={0} col={2} click={click} value={currBoard[0][2]} />
            </div>
            <div className="row row2">
                <Square row={1} col={0} click={click} value={currBoard[1][0]} />
                <Square row={1} col={1} click={click} value={currBoard[1][1]} />
                <Square row={1} col={2} click={click} value={currBoard[1][2]} />
            </div>
            <div className="row row3">
                <Square row={2} col={0} click={click} value={currBoard[2][0]} />
                <Square row={2} col={1} click={click} value={currBoard[2][1]} />
                <Square row={2} col={2} click={click} value={currBoard[2][2]} />
            </div>
        </div>
    )
}

export default Board;