import React from 'react'

export default class DisplayClick extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clicks: props.clicks
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            clicks: nextProps.clicks
        })
    }

    render() {
        return (
            <div>
                Clicks: {this.state.clicks}
            </div>
        )
    }
}