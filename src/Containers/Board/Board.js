import React, { Component } from 'react';
import Grid from '../Grid/Grid';
import classes from './Board.css';

class Board extends Component {

    state = {
        boardState: Array(9).fill(null),
        value: 'X',
        xIsNext: false,
        isBoardClickedOnce: false,
        clickedCellId: '',
        winnerPlayer: '',
        boardCompleteState: Array(9).fill(null)
    };

    nextGrid = (cellId) => {
        this.valueUpdate();
        this.setState({ isBoardClickedOnce: true, clickedCellId: cellId });
    }

    updateBoardState = (gridId, value) => {
        const updatedBoardState = this.state.boardState.slice();
        // console.log(updatedBoardState);
        if (updatedBoardState[gridId] === null){
        updatedBoardState[gridId] = value;
        }
        this.determineWinner(updatedBoardState);
        this.setState({ boardState: updatedBoardState });
    }

    updateBoardCompleteState = (gridId, value) => {
        const updatedBoardCompleteState = this.state.boardCompleteState.slice();
        updatedBoardCompleteState[gridId] = value;
        this.setState({ boardCompleteState :  updatedBoardCompleteState});
    }

    determineWinner = (arr) => {
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
            if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c] && arr[a] !== 'D') {
                this.setState({ winnerPlayer: arr[a] });
            }
        }
        if (arr.indexOf(null) === -1) {
            this.setState({ winnerPlayer: 'Draw' });
        }
        return null;
    }

    valueUpdate = () => {
        if (!this.state.isBoardClickedOnce) {
            this.setState({ value: 'O', xIsNext: true })
        }
        if (this.state.isBoardClickedOnce) {
            const updatedValue = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                value: updatedValue,
                xIsNext: !this.state.xIsNext
            });
        }
    }


    render() {
        const arr = [0, 0, 0];

        let winner = '';
        switch (this.state.winnerPlayer) {
            case ('X'):
                winner = <h4> Winner: X</h4>;
                break;
            case ('O'):
                winner = <h4> Winner: O</h4>;
                break;
            case ('Draw'):
                winner = <h4> It's a draw! Try again.</h4>;
                break;
            default:
                winner = <h4> Next Player : {this.state.value}</h4>;
        }
        
        return (
            <div className ={classes.Board}>
                {winner}
                <table>
                    <tbody>
                        {arr.map((i, columnIndex) => {
                            return (
                                <tr key={columnIndex}>
                                    {arr.map((j, rowIndex) => {
                                        return (
                                            <td key={(columnIndex * 3) + rowIndex}>
                                                <Grid
                                                    gridId={(columnIndex * 3) + rowIndex}
                                                    nextGrid={(cellId) => this.nextGrid(cellId)}
                                                    value={this.state.value}
                                                    isBoardClickedOnce={this.state.isBoardClickedOnce}
                                                    updateBoardState={(gridId, value) => this.updateBoardState(gridId, value)}
                                                    updateBoardCompleteState={(gridId,value)=> this.updateBoardCompleteState(gridId,value)}
                                                    clickedCellId={this.state.clickedCellId}
                                                    winnerPlayer={this.state.winnerPlayer} 
                                                    boardCompleteStatus = {this.state.boardCompleteState}/>
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

export default Board;
