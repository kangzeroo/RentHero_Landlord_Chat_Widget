// Compt for copying as a ContactForm
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { validateEmail } from '../../api/general/general_api'
import { saveContactToDb } from '../../api/contacts/contacts_api'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { rentheroMuiTheme } from '../../styles/rentheroMuiTheme'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'


class ContactForm extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      phone: '',
      email: '',
      agreed: false,

      name_error: '',
      email_error: '',
      phone_error: '',

      loading: false,
      submitted: false,
      failure: false,
    }
  }

  componentDidMount() {
    this.listenToEnterKeys()
  }

  listenToEnterKeys() {
    document.getElementById('name').addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        document.getElementById('email').focus()
      }
    })
    document.getElementById('email').addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        document.getElementById('phone').focus()
        this.listenToPhoneKeys()
      }
    })
  }

  listenToPhoneKeys() {
    document.getElementById('phone').addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        document.getElementById('consent').focus()
      }
    })
  }

  sendInfo() {
    if (this.validateFields()) {
      // SAVE INFO
      this.setState({
        loading: true,
      })
      this.submitContactInfo()
    }
  }

  continueAnyways() {
    // SAVE INFO
    this.setState({
      loading: true,
      phone_error: '',
    })
    this.submitContactInfo()
  }

  submitContactInfo() {
    saveContactToDb().then(() => {
      this.setState({
        loading: false,
        submitted: true,
      })
      this.props.successMessage()
    }).catch((err) => {
      this.setState({
        loading: false,
        submitted: true,
        failure: true,
      })
      this.props.failureMessage()
    })
  }

  validateFields() {
    let errors = {
      name_error: '',
      email_error: '',
      phone_error: '',
    }
    let may_proceed = true
    if (!this.state.name || this.state.name.length === 0) {
      errors.name_error = 'Please provide a name'
      may_proceed = false
    }
    if (!this.state.email || this.state.email.length === 0 || !validateEmail(this.state.email)) {
      errors.email_error = 'Please provide a valid email'
      may_proceed = false
    }
    if (!this.state.phone || this.state.phone.length === 0) {
      errors.phone_error = 'Provide a phone # for fastest responses'
      may_proceed = false
    }
    if (!this.state.agreed) {
      errors.phone_error = 'You must agree to the terms of use'
      may_proceed = false
    }
    this.setState({
      ...errors,
    })
    return may_proceed
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <div style={comStyles().loadingCircle}>
          <CircularProgress size={20} thickness={2} />
        </div>
      )
    } else if (this.state.phone_error && !this.state.name_error && !this.state.email_error && this.state.agreed) {
      return (
        <FlatButton id='submit' backgroundColor='#FF9800' onClick={() => this.continueAnyways()} style={comStyles().button}>
          <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>Continue Anyways</span>
        </FlatButton>
      )
    } else if (this.state.submitted) {
      return null
    } else {
      return (
        <FlatButton id='submit' backgroundColor='#2faded' onClick={() => this.sendInfo()} style={comStyles().button}>
          <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>Confirm</span>
        </FlatButton>
      )
    }
  }

	render() {
    if (this.state.submitted && !this.state.failure) {
      return null
    } else {
  		return (
        <MuiThemeProvider muiTheme={rentheroMuiTheme}>
    			<div id='ContactForm' style={comStyles().container}>
            <h5 style={{ color: '' }}>Please provide us some contact info</h5>
            <TextField id='name' type='text' floatingLabelText='Name' disabled={this.state.submitted} errorText={this.state.name_error} errorStyle={{ color: '#F44336' }} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} style={comStyles().field} />
            <TextField id='email' type='text' floatingLabelText='Email' disabled={this.state.submitted} errorText={this.state.email_error} errorStyle={{ color: '#F44336' }} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} style={comStyles().field} />
            {
              this.state.email && this.state.email.length > 0
              ?
              <div>
                <TextField id='phone' type='number' floatingLabelText='Phone' disabled={this.state.submitted} errorText={this.state.phone_error} errorStyle={{ color: '#FF9800' }} value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} style={comStyles().field} />
                <div>
                  <Checkbox id='consent' label={`I consent to RentHero's Terms of Email and Phone Recordings`} disabled={this.state.submitted} checked={this.state.agreed} onCheck={() => this.setState({ agreed: !this.state.agreed })} style={comStyles().agreed} />
                  <div style={comStyles().termsLink}>
                    <a href='https://google.com' target='_blank' style={{ color: '#0080C1' }}>See Terms of Use</a>
                  </div>
                </div>
              </div>
              :
              null
            }
            {
              this.state.name && this.state.email
              ?
              this.renderButton()
              :
              null
            }
          </div>
        </MuiThemeProvider>
  		)
    }
	}
}

// defines the types of variables in this.props
ContactForm.propTypes = {
	history: PropTypes.object.isRequired,
  successMessage: PropTypes.func.isRequired,
  failureMessage: PropTypes.func.isRequired,
}

// for all optional props, define a default value
ContactForm.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ContactForm)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

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
      width: '100%',
      padding: '10px',
		},
    field: {
      width: '100%',
    },
    loadingCircle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    termsLink: {
      width: '100%',
      textAlign: 'right',
    }
	}
}
