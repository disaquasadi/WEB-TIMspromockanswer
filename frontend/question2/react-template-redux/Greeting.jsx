import React from 'react'

export default class Greeting extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            nameToDisplay: props.nameToDisplay,
            showName: props.showName,
            clicks: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            nameToDisplay: nextProps.nameToDisplay,
            showName: nextProps.showName
        })
    }

    handleChange(e) {
        this.props.dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
    }

    handleClick() {
        this.props.dispatch({ type: 'UPDATE_CLICKS' })
        if (this.state.name !== '') {
            this.props.dispatch({ type: 'UPDATE_SHOWNAME', payload: true })
            this.props.dispatch({ type: 'GET_NAME' })
        }
    }

    render() {
        return (
            <div>

                <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} placeholder="Name" />
                <button onClick={() => this.handleClick()}>Greet</button>

                <div>
                    Name: {this.state.showName ? this.state.nameToDisplay : 'Enter a name and click "Greet" to display the name!'}
                </div>
            </div>
        )
    }
}