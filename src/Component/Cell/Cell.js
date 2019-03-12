import React from 'react';
import classes from './Cell.css';

const cell = (props) => {
    let disabled = false;
    const cellId = props.cellId;
    const gridId = props.gridId;
    const clickedCellId = props.clickedCellId;
    const boardStatus = props.boardStatus;
    const winnerPlayer = props.winnerPlayer;

    if (props.isBoardClickedOnce === false) {
        disabled = false;
    }
    else {
        disabled = winnerPlayer || props.value[cellId] || boardStatus[gridId] ||
            (boardStatus[clickedCellId] ? clickedCellId === gridId : clickedCellId !== gridId);
    }


    return (
        <div >
            <button
                className={classes.Cell}
                onClick={() => props.onClick(cellId)}
                disabled={disabled}>{props.value[cellId]}
            </button>
        </div>
    );
}

export default cell;