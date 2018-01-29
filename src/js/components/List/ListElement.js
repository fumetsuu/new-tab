import React, { Component } from 'react'

export default class ListElement extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hover: false
		}
	}

	render() {
		var hoverStyle
		var name = this.props.linkData.name
		var bgColour = this.props.linkData.bgColour
		var link = this.props.linkData.link
		if (this.state.hover) {
			hoverStyle = { backgroundColor: bgColour }
		} else {
			hoverStyle = { backgroundColor: 'transparent' }
		}
		return (
			<a href={link} target="_blank" className="list-element-wrapper" onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} style={hoverStyle}>
				{name}
			</a>
		)
	}

	toggleHover() {
		document.querySelector('body').style.backgroundColor = `${this.props.linkData.bgColour}`
		this.setState({ hover: !this.state.hover })
	}
}
