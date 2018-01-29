import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../styles/main.sass'
import List from './components/List/List.js'
import DateTimer from './components/DateTimer/DateTimer.js'
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

ReactDOM.render(<div><DateTimer /><div className='wrapper'>{listsArray}{defaultTabsSection}</div></div>, document.getElementById('app'))

function setTabs() {
	var linkButtons = document.querySelectorAll('.list-element-wrapper')
	if (!editing) {
		document.querySelector('.edit-tabs i').innerText = "save"
		document.querySelector('.edit-tabs').style.backgroundColor = '#6ffc89'
		for (var i = 0; i < linkButtons.length; i++) {
			linkButtons[i].addEventListener('click', addTab)
			if (defaultTabs.includes(linkButtons[i].getAttribute("href"))) {
				console.log(linkButtons[i])
				linkButtons[i].style.border = '1px solid grey'
				linkButtons[i].setAttribute("selected", "true")
			}
		}
		editing = !editing
	} else {
		document.querySelector('.edit-tabs i').innerText = "border_color"
		document.querySelector('.edit-tabs').style.backgroundColor = '#5d5857'
		editing = !editing
		for (var i = 0; i < linkButtons.length; i++) {
			linkButtons[i].removeEventListener('click', addTab)
			linkButtons[i].style.border = 'none'
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
		this.style.border = '1px solid grey'
		this.setAttribute("selected", "true")
	}
	console.log(defaultTabs)
}

function openTabs() {
	if (!localStorage.getItem("default-tabs") || !JSON.parse(localStorage.getItem("default-tabs")).length) {
		alert("set default tabs first!")
	} else {
		var tabs = JSON.parse(localStorage.getItem("default-tabs"))
		for (var i = 0; i < tabs.length; i++) {
			window.open(tabs[i])
		}
	}
}