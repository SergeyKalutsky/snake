import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Squere(props) {
    let className = 'squere'
    if (props.black) {
        className += ' black';
    }
    return <div className={className}></div>
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.width = 10
        this.height = 10
        this.state = { x: 2, y: 3 }
        this.handleArrowKey = this.handleArrowKey.bind(this)
    }

    handleArrowKey(e) {
        if (e.key === 'ArrowUp') {
            this.setState({ y: this.state.y - 1 })
        }
        if (e.key === 'ArrowRight') {
            this.setState({ x: this.state.x + 1 })
        }
        if (e.key === 'ArrowDown') {
            this.setState({ y: this.state.y + 1 })
        }
        if (e.key === 'ArrowLeft') {
            this.setState({ x: this.state.x - 1 })
        }
    }

    getSqueres(indx) {
        let items = []
        for (let i = 0; i < this.height; i++) {
            if (this.state.x === indx && this.state.y === i) {
                items.push(<Squere key={i} black={true} />)
                continue
            }
            items.push(<Squere key={i} />)
        }
        return items
    }

    getCol(indx) {
        return (
            <div className='column' key={indx}>
                {this.getSqueres(indx)}
            </div>
        )
    };
    render() {

        const cols = []

        for (let i = 0; i < this.width; i++) {
            cols.push(this.getCol(i))
        }

        return (
            <div className='container' onKeyDown={this.handleArrowKey} tabIndex={-1}>
                {cols}
            </div>
        )
    }

}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);