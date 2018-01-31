import React, { Component } from 'react'
const kanjidate = require('kanjidate')

export default class DateTimer extends Component {
    constructor() {
        super()
        var datenow = new Date().toLocaleTimeString()
        this.state = {
            date: datenow
        }
    }

    componentWillMount() {
        setInterval(() => {
            this.setState({
                date: new Date().toLocaleTimeString()
            })
        })
    }

    render() {
        return (
            <div>
                <div className="time-display">
                    {this.state.date}
                </div>
                <div className="date-display">
                    {new Date().getFullYear() + "年" + kanjidate.format(new Date()).split("年")[1]}
                </div>
            </div>
        )
    }
}
