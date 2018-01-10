import React from 'react'
import Greeting from './Greeting.jsx'
import DisplayClick from './DisplayClick.jsx'
import { connect } from 'react-redux'
import { addStudent } from './main.js'
class App extends React.Component {

    constructor() {
        super()
        this.state = {
            name: "Initasdfsdf "
        }
    }

    render() {
        return (
            <div>
                <Greeting {...this.props.name} dispatch={this.props.dispatch} />
                <DisplayClick {...this.props.clicks} />
            </div>
        )
    }
}
function mapStateToProps(centralState) {
    return {
        students: centralState.students,
        name: centralState.name,
        clicks: centralState.clicks
    }
}
export default connect(mapStateToProps)(App)