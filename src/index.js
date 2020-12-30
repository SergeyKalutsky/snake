import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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
        this.width = 15
        this.height = 15
        this.interval = 500
        this.speedCoeff = 0.9
        this.state = {
            snake: [{ x: 2, y: 3 }],
            food: this.genFood([{ x: 2, y: 3 }]),
            deriction: 'Right',
        }
        this.handleArrowKey = this.handleArrowKey.bind(this)
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.move(),
            this.interval
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    genFood(snake) {
        while (true) {
            let present = false
            let x = getRandomInt(this.width - 1)
            let y = getRandomInt(this.height - 1)
            for (let part of snake) {
                if (part.x === x && part.y === y) {
                    present = true
                }
            }
            if (!present) {
                return { x: x, y: y }
            }
        }
    }

    lost(snake){
        const head = snake[0]
        if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y > this.height){
            return true
        }
        for (let i = 1; i < snake.length; i++){
            if (head.x === snake[i].x && head.y === snake[i].y){
                return true
            }
        }
        return false
    }

    move() {
        const snake = this.state.snake.slice();
        const tail = Object.assign({}, this.state.snake[this.state.snake.length - 1])
        for (let i = this.state.snake.length - 1; i >= 1; i--) {
            snake[i] = Object.assign({}, snake[i - 1]);
        }

        if (this.state.direction === 'Up') {
            snake[0].y -= 1
        }
        if (this.state.direction === 'Right') {
            snake[0].x += 1
        }
        if (this.state.direction === 'Down') {
            snake[0].y += 1
        }
        if (this.state.direction === 'Left') {
            snake[0].x -= 1
        }
        if (snake[0].x === this.state.food.x && snake[0].y === this.state.food.y) {
            snake.push(tail)
            this.setState({ food: this.genFood(snake) })
            this.interval *= this.speedCoeff
            this.componentWillUnmount()
            this.componentDidMount()
        }
        if (this.lost(snake)){
            console.log('here')
            this.componentWillUnmount()
            return
        }
        this.setState({ snake: snake })
    }

    handleArrowKey(e) {
        this.setState({ direction: e.key.substr(5) })
    }

    getSqueres(indx) {
        let items = []
        for (let i = 0; i < this.height; i++) {
            let black = false
            for (let part of this.state.snake) {
                if (part.x === indx && part.y === i) {
                    black = true
                }
            }
            if (this.state.food.x === indx && this.state.food.y === i) {
                black = true
            }
            items.push(<Squere key={i} black={black} />)
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