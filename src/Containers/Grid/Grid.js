import React, { Component } from 'react';
import Cell from '../../Component/Cell/Cell';
import classes from './Grid.css';

class grid extends Component {

    state = {
        gridState: Array(9).fill(null),
        isGridComplete: false,
    };


    handleGridClick = (cellId) => {
        const updatedGridState = this.state.gridState.slice();
        updatedGridState[cellId] = this.props.value;
        this.gridCompleteCheck(updatedGridState);
        this.props.nextGrid(cellId);
        this.setState({ gridState: updatedGridState });
    }

    gridCompleteCheck = (arr) => {
        const value = 'D';
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
                this.props.updateBoardState(this.props.gridId, arr[a]);
                this.setState({ isGridComplete: true });
            }
        }
        if (arr.indexOf(null) === -1) {
            this.props.updateBoardCompleteState(this.props.gridId, value);
        }
        return null;
    }

    render() {
        const arr = [0, 0, 0];
        return (
            <div className={classes.Grid}>
                <table className={classes.Table}>
                    <tbody>
                        {arr.map((i, columnIndex) => {
                            return (
                                <tr key={columnIndex}>
                                    {arr.map((j, rowIndex) => {
                                        return (
                                            <td
                                                key={(columnIndex * 3) + rowIndex}>
                                                <Cell cellId={((columnIndex * 3) + rowIndex)}
                                                    gridId={this.props.gridId}
                                                    onClick={(cellId) => this.handleGridClick(cellId)}
                                                    value={this.state.gridState}
                                                    gridDisableState={this.props.gridDisableState}
                                                    isBoardClickedOnce={this.props.isBoardClickedOnce}
                                                    clickedCellId={this.props.clickedCellId}
                                                    winnerPlayer={this.props.winnerPlayer} 
                                                    boardCompleteStatus = {this.props.boardCompleteStatus}/>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        );
    }
}



export default grid;