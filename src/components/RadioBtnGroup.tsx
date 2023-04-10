import React, {Component} from 'react';

interface RadioBtnGroupProps {
    name: string;
    label: string;
    options: { value: string, description: string, checked?: boolean }[]
    onChange: (options: string) => void;
}

class RadioBtnGroup extends Component<RadioBtnGroupProps> {
    render() {
        return (
            <div className="radio-btn-group">
                <span>{this.props.label}</span>
                <ul>
                    {this.props.options.map((el) => (
                        <li key={el.value}>
                            <label htmlFor={this.props.name + el.value}>{el.description}</label>
                            <input
                                id={this.props.name + el.value}
                                type="radio"
                                name={this.props.name}
                                value={el.value}
                                checked={el.checked}
                                onChange={() => this.props.onChange(el.value)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default RadioBtnGroup;