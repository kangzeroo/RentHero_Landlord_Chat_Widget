// Compt for copying as a ChatWidget
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import ContactForm from './ContactForm'
import { Widget, addResponseMessage, addLinkSnippet, renderCustomComponent, toggleInputDisabled, toggleWidget } from 'react-chat-widget'
import '../../styles/chat-widget-styles.css'


class ChatWidget extends Component {

	constructor() {
		super()
		this.state = {
			first_message_sent: false,
		}
	}

	componentDidMount() {
		if (this.props.demo) {
			toggleWidget()
			addResponseMessage('Try out your superpowers with RentHero Chat')
			addLinkSnippet({
				title: 'See this convo tracked in real time',
			  link: 'https://demo.renthero.ca',
			  target: '_blank'
			})
		} else {
			addResponseMessage('How can I help you today?')
		}
	}

	handleNewMessage(msg) {
		if (!this.state.first_message_sent) {
			this.sendFirstMessage()
		} else {
			console.log(msg)
		}
	}

	sendFirstMessage() {
		this.setState({
			first_message_sent: true,
		})
		toggleInputDisabled(true)
		setTimeout(() => {
			renderCustomComponent(ContactForm, {
				successMessage: () => {
					addResponseMessage('Thanks for reaching out! We will be in contact with you shortly. Is there anything else you want to tell us?')
					toggleInputDisabled(false)
				},
				failureMessage: () => {
					addResponseMessage(`Something went wrong. You can call the landlord at their phone number ${'519-555-5555'}`)
					// toggleInputDisabled(true)
				}
			}, false)
		}, 1000)
	}

	render() {
		return (
			<div id='ChatWidget' style={comStyles().container}>
				<Widget
					handleNewUserMessage={(msg) => this.handleNewMessage(msg)}
					profileAvatar='https://s3.amazonaws.com/rentburrow-static-assets/Icons/favicon.png'
					title='Hazelnut Manors'
					subtitle='Powered by RentHero'
				/>
			</div>
		)
	}
}

// defines the types of variables in this.props
ChatWidget.propTypes = {
	history: PropTypes.object.isRequired,
	demo: PropTypes.bool,
}

// for all optional props, define a default value
ChatWidget.defaultProps = {
	demo: false,
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ChatWidget)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		demo: redux.app.demo,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
		}
	}
}
