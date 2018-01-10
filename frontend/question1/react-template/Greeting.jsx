import React from 'react'

export default class Greeting extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            nameToDisplay: '',
            showName: false,
            clicks: 0
        }
    }

    handleChange(e) {
        let state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    handleClick() {
        let state = this.state
        state['clicks'] = this.state.clicks + 1
        state['nameToDisplay'] = this.state.name
        state['showName'] = true
        this.setState(state)
    }

    render() {
        return (
            <div>

                <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} placeholder="Name" />
                <button onClick={() => this.handleClick()}>Greet</button>

                <div>
                    Name: {this.state.showName ? this.state.nameToDisplay : 'Click "Greet" to display the name!'}
                </div>

                <div>
                    Clicks: {this.state.clicks}
                </div>

            </div>
        )
    }
}