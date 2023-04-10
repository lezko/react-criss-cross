import React, {Component} from 'react';
import BoardComponent from './components/BoardComponent';
import {Mark} from 'core/Mark';
import {checkWinner} from 'core/WinnerChecker';
import RadioBtnGroup from './components/RadioBtnGroup';

type FirstPlayer = Mark | 'random';

interface AppState {
    board: Mark[],
    xIsNext: boolean;
    firstPlayer: FirstPlayer
}

class App extends Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            board: Array(9).fill(null),
            xIsNext: true,
            firstPlayer: Mark.X
        };
    }

    firstPlayerOptions = [
        {value: Mark.X, stringValue: 'x', description: 'X'},
        {value: Mark.O, stringValue: 'o', description: 'O'},
        {value: 'random', stringValue: 'random', description: 'Assign randomly'}
    ];

    handleRestart = () => {
        let xIsNext;
        if (this.state.firstPlayer === Mark.X) {
            xIsNext = true;
        } else if (this.state.firstPlayer === Mark.O) {
            xIsNext = false;
        } else {
            xIsNext = Math.random() > 0.5;
        }
        this.setState({
            board: Array(9).fill(null),
            xIsNext
        });
    };

    handleRadioChange = (value: string) => {
        const obj = this.firstPlayerOptions.find((o) => o.stringValue === value);
        const firstPlayer = obj!.value as FirstPlayer;
        this.setState({firstPlayer});
    };

    handleClick = (i: number): void => {
        const board = this.state.board.slice();
        if (board[i] !== null || checkWinner(board) !== null) {
            return;
        }
        board[i] = this.state.xIsNext ? Mark.X : Mark.O;
        this.setState({
            board,
            xIsNext: !this.state.xIsNext
        });
    }

    handleHelp = () => {
        const emptyCellsCount = this.getEmptyCellsCount();
        // index only goes over empty cells
        const targetIdx = Math.floor(Math.random() * emptyCellsCount);
        let currIdx = 0;
        this.state.board.forEach((item, i) => {
            if (item !== null) {
                return;
            }
            if (currIdx++ === targetIdx) {
                this.handleClick(i);
            }
        });
    };

    private getEmptyCellsCount() {
        return this.state.board.reduce((acc, item) => {
            return acc + (item == null ? 1 : 0);
        }, 0);
    }

    private getClickedCells() {
        const cells: number[] = [];
        this.state.board.forEach((item, i) => {
            if (item !== null) {
                cells.push(i);
            }
        });
        return cells;
    }

    render() {
        const disabled = this.getClickedCells();
        const winner = checkWinner(this.state.board);
        let status;
        if (winner !== null) {
            status = Mark[this.state.board[winner[0]]] + ' has won!';
            for (let i = 0; i < this.state.board.length; i++) {
                if (!disabled.includes(i)) {
                    disabled.push(i);
                }
            }
        } else if (this.getEmptyCellsCount() > 0) {
            status = 'Current player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else {
            status = 'Friendship has won!';
        }
        return (
            <div className="app">
                <RadioBtnGroup
                    name="firstPlayerDeterminationRadioGroup"
                    label="First player: "
                    options={this.firstPlayerOptions.map((o) => (
                        {
                            value: o.stringValue,
                            description: o.description,
                            checked: o.value === this.state.firstPlayer
                        }
                    ))}
                    onChange={this.handleRadioChange}
                />
                <div className="control-pane">
                    <span className='status'>{status}</span>
                    <div className='control-pane__btns'>
                        <button className="button restart-btn" onClick={this.handleRestart}>Restart</button>
                        <button className="button help-btn" onClick={this.handleHelp}>Help</button>
                    </div>
                </div>
                <BoardComponent
                    board={this.state.board}
                    winners={winner || []}
                    disabled={disabled}
                    onClick={this.handleClick}
                    nextMark={this.state.xIsNext ? Mark.X : Mark.O}
                />
            </div>
        );
    }
}

export default App;
