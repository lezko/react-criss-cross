import React, {Component} from 'react';
import {Mark} from '../core/Mark';
import CellComponent from './CellComponent';

interface BoardComponentProps {
    board: Mark[];
    onClick: (i: number) => void
    winners: number[];
    disabled: number[]
    nextMark: Mark;
}

class BoardComponent extends Component<BoardComponentProps> {
    render() {
        return (
            <div className="board" data-next-mark={Mark[this.props.nextMark]}>
                {this.props.board.map((mark, i) =>
                    <CellComponent
                        key={i}
                        value={mark}
                        winner={this.props.winners?.includes(i)}
                        disabled={this.props.disabled.includes(i)}
                        onClick={() => this.props.onClick(i)}
                        previewMark={this.props.nextMark}
                    />
                )}
            </div>
        );
    }
}

export default BoardComponent;