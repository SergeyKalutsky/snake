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
        this.state = { result: [] }
    }

    handleArrowKey(e) {
        if (e.key === 'ArrowUp') {
            console.log('Up')
        }
        if (e.key === 'ArrowRight') {
            console.log('Right')
        }
        if (e.key === 'ArrowDown') {
            console.log('Down')
        }
        if (e.key === 'ArrowLeft') {
            console.log('Left')
        }
    }

    getSqueres(len) {
        let items = []
        for (let i = 0; i < len; i++) {
            items.push(<Squere key={i} />)
        }
        return items
    }

    getCol(key) {
        return (
            <div className='column' key={key}>
                {this.getSqueres(8)}
            </div>
        )
    };
    render() {

        const cols = []

        for (let i = 0; i < 8; i++) {
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