import React, { Component } from 'react'

import ListElement from './ListElement.js'

var listHeader
var listLinks

export default class List extends Component {
	constructor(props) {
		super(props)
		listHeader = <div className="list-header" style={{
			color: this.props.listData.headerColour,
			borderColor: this.props.listData.headerColour
		}}>{this.props.listData.header}</div>

		listLinks = []
		for (var i = 0; i < this.props.listData.links.length; i++) {
			listLinks.push(<ListElement linkData={this.props.listData.links[i]} key={i} />)
		}
	}

	render() {
		return (
			<div className="list-container">
				{listHeader}
				{listLinks}
			</div>
		)
	}
}
