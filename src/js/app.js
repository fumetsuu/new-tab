import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/main.sass'
import List from './components/List/List.js'
const listsInfo = require('../data/lists.json')

var listsArray = []
var editing = false
var defaultTabs
if (localStorage.getItem("default-tabs")) {
	defaultTabs = JSON.parse(localStorage.getItem("default-tabs"))
} else {
	defaultTabs = []
}

for (var i = 0; i < listsInfo.lists.length; i++) {
	listsArray.push(<List listData={listsInfo.lists[i]} />)
}

var defaultTabsSection =
	<div className="default-tabs-section">
		<div className="edit-tabs tabs-button" onClick={setTabs}><i className="material-icons">border_color</i></div>
		<div className="open-tabs tabs-button" onClick={openTabs}><i className="material-icons">view_carousel</i></div>
	</div>

ReactDOM.render(<div className='wrapper'>{listsArray}{defaultTabsSection}</div>, document.getElementById('app'))

function setTabs() {
	var linkButtons = document.querySelectorAll('.list-element-wrapper')
	if (!editing) {
		console.log("u may now edit")
		editing = !editing
		for (var i = 0; i < linkButtons.length; i++) {
			linkButtons[i].addEventListener('click', addTab)
			if (linkButtons[i].getAttribute("selected") === "true") {
				linkButtons[i].style.border = '1px solid red'
				linkButtons[i].setAttribute("selected", "false")
			}
		}
	} else {
		console.log("set default tabs into localstorage")
		editing = !editing
		for (var i = 0; i < linkButtons.length; i++) {
			console.log(linkButtons[i])
			linkButtons[i].removeEventListener('click', addTab)
		}
		localStorage.setItem("default-tabs", JSON.stringify(defaultTabs))
	}
}

function addTab(e) {
	e.preventDefault()
	if (this.getAttribute("selected") === "true") {
		console.log('he is currently of the selection lets remove him !')
		defaultTabs = defaultTabs.filter(el => el != this.getAttribute("href"))
		this.style.border = 'none'
		this.setAttribute("selected", "false")
	} else {
		defaultTabs.push(this.getAttribute("href"))
		this.style.border = '1px solid red'
		this.setAttribute("selected", "true")
	}
	console.log(defaultTabs)
}

function openTabs() {
	if (!localStorage.getItem("default-tabs")) {
		alert("set default tabs first!")
	} else {
		var tabs = JSON.parse(localStorage.getItem("default-tabs"))
		for (var i = 0; i < tabs.length; i++) {
			window.open(tabs[i])
		}
	}
}