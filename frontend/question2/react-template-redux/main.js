import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Test from './Test.jsx'

function name(state = { name: '', nameToDisplay: '', showName: false }, action) {
    if (action.type === 'UPDATE_NAME') {
        return Object.assign({}, state, { name: action.payload })
    } else if (action.type === 'UPDATE_SHOWNAME') {
        return Object.assign({}, state, { showName: action.payload })
    } else if (action.type === 'GET_NAME') {
        return Object.assign({}, state, { nameToDisplay: state.name })
    }
    return state
}

function clicks(state = { clicks: 0 }, action) {
    if (action.type === 'UPDATE_CLICKS') {
        return Object.assign({}, state, { clicks: state.clicks + 1 })
    }
    return state
}

function students(state = [], action) {
    if (action.type == 'LOAD_STUDENT') {
        console.log(state)
        return state
    } else if (action.type == 'FETCH_STUDENT_SUCCESS') {
        return action.payload
    }
    else if (action.type == 'ADD_STUDENT') {
        console.log(action.payload)
        return [...state, action.payload]
    } else if (action.type === 'DELETE_STUDENT') {
        console.log(action.type)
        return state.filter((s) => s.name !== action.payload)
    }
    else {
        return state
    }
}
// npm install --save redux-thunk


// function fetchStudent(){
//     return function(dispatch){
//         fetch("http://bestlab.us:8080/students")
//         .then(function(res){
//             return res.json()
//         })
//         .then(function(data){
//             dispatch({
//                 type: 'FETCH_STUDENT_SUCCESS',
//                 students: data
//             })
//         })   
//     }
// }

function fetchStudent() {
    return function (dispatch) {
        fetch('http://bestlab.us:8080/students')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_STUDENT_SUCCESS',
                    payload: data
                })
            })
    }
}

export function addStudent(student) {
    return function (dispatch) {
        fetch('http://bestlab.us:8080/students', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(student)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'ADD_STUDENT',
                    payload: data
                })
            })
    }
}

var centralState = combineReducers({
    students,
    name,
    clicks
})

var logging = store => next => action => {
    console.log(action.type)
}

var store = createStore(centralState, applyMiddleware(thunk))

//store.dispatch({ type: 'LOAD_STUDENT' })
//store.dispatch({ type: 'ADD_STUDENT', payload: { name: 'Tim' } })
//store.dispatch({ type: 'DELELE_STUDENT', payload: { name: 'Thanh' } })
//store.dispatch(fetchStudent())



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app')

)