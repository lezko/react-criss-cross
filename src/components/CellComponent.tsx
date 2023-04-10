import React, {Component} from 'react';
import {Mark} from 'core/Mark';

interface CellComponentProps {
    value: Mark | null;
    onClick: () => void;
    winner: boolean;
    disabled: boolean;
    previewMark: Mark;
}

class CellComponent extends Component<CellComponentProps> {
    render() {
        const value = this.props.value;
        const classList = [];

        if (value !== null) {
            classList.push(Mark[value].toLowerCase());
        } else {
            classList.push(`preview-${Mark[this.props.previewMark].toLowerCase()}`);
        }
        if (this.props.disabled) {
            classList.push('disabled')
        }
        if (this.props.winner) {
            classList.push('winner');
        }

        return (
            <button
                className={'cell ' + classList.join(' ')}
                onClick={this.props.onClick}
            >
            </button>
        );
    }
}

export default CellComponent;