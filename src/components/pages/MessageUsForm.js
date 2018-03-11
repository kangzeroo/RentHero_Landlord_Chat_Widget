// Compt for copying as a MessageUsForm
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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { rentheroMuiTheme } from '../../styles/rentheroMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import CircularProgress from 'material-ui/CircularProgress'
import Card from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'


class MessageUsForm extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      phone: '',
      email: '',
      note: '',
      agreed: false,

      noted: false,
      loading: false,
      submitted: false,
      error_messages: [],
    }
  }

  generateTitle() {
    return this.state.noted ? 'Your Contact Info' : 'Ask Us A Question'
  }

  sendInfo() {
    if (!this.state.note) {
      // failure to fill in the notes
      this.setState({
        loading: false,
        error_messages: ['Please include something in your notes'],
      })
    } else if (this.state.note && !this.state.name && !this.state.email && !validateEmail(this.state.email)) {
      // going to the contact form after filling in the notes
      this.setState({
        loading: true,
        error_messages: [],
      })
      setTimeout(() => {
        this.setState({
          loading: false,
          noted: true,
        })
      }, 250)
    } else if (this.state.name && this.state.email && validateEmail(this.state.email) && this.state.note && this.state.agreed) {
      // successful validation of everything
      this.setState({
        loading: true,
        error_messages: [],
      })
      this.actuallySendInquiry()
    } else if (!this.state.email || !validateEmail(this.state.email) || !this.state.name || !this.state.agreed) {
      if (!this.state.agreed) {
        this.setState({
          loading: false,
          submitted: false,
          error_messages: this.state.error_messages.concat(['You must agree to the terms and conditions'])
        }, () => console.log(this.state))
      }
      if (!this.state.name) {
        this.setState({
          loading: false,
          submitted: false,
          error_messages: this.state.error_messages.concat(['Please include a name'])
        }, () => console.log(this.state))
      }
      if (!this.state.email || !validateEmail(this.state.email)) {
        this.setState({
          loading: false,
          submitted: false,
          error_messages: this.state.error_messages.concat(['Please include a valid email'])
        }, () => console.log(this.state))
      }
    }
  }

  actuallySendInquiry() {
    setTimeout(() => {
      this.setState({
        loading: false,
        submitted: true,
      })
    }, 1000)
  }

  goBackToForm() {
    setTimeout(() => {
      this.setState({
        submitted: false,
        noted: false,
        name: '',
        phone: '',
        email: '',
        note: '',
        agreed: false,
        error_messages: [],
      })
    }, 2000)
  }

  renderSendButton() {
    if (this.state.name && this.state.email && this.state.agreed) {
      return (
        <RaisedButton id='submit' buttonStyle={{ backgroundColor: '#2faded' }} onClick={() => this.sendInfo()} style={comStyles().button}>
          <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>Confirm</span>
        </RaisedButton>
      )
    } else if (!this.state.noted && this.state.note && this.state.note.length > 0) {
      return (
        <RaisedButton id='submit' buttonStyle={{ backgroundColor: '#2faded' }} onClick={() => this.sendInfo()} style={comStyles().button}>
          <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>Send</span>
        </RaisedButton>
      )
    } else {
      return null
    }
  }

  removeError() {
    const array = this.state.error_messages
    array.shift()
    this.setState({ error_messages: array }, () => console.log(this.state))
  }

  stopProp(e) {
    if (e) {
      e.stopPropagation()
    }
  }

	render() {
		return (
			<div id='MessageUsForm' onClick={(e) => this.stopProp(e)} style={comStyles().container}>
        <MuiThemeProvider muiTheme={rentheroMuiTheme}>
          {
            this.state.submitted
            ?
            <div onClick={this.goBackToForm()} style={comStyles().success_container}>
              <i className='ion-checkmark-circled' style={{ color: 'white', fontSize: '5rem' }}></i>
              <br/>
              <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Message Sent</h1>
            </div>
            :
            <Card style={comStyles().inner_container}>
              <AppBar title={this.generateTitle()} titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} showMenuIconButton={false} />
              <div style={comStyles().inputbox}>
                {
                  this.state.noted
                  ?
                  <div>
                    <TextField id='note' type='text' floatingLabelText='Name' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} style={comStyles().field} />
                    <TextField id='email' type='text' floatingLabelText='Email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} style={comStyles().field} />
                    {
                      this.state.email
                      ?
                      <TextField id='phone' type='number' floatingLabelText='Phone' value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} style={comStyles().field} />
                      :
                      null
                    }
                    {
                      this.state.email
                      ?
                      <div>
                        <br/>
                        <Checkbox label='I agree to the terms and conditions for recordings' checked={this.state.agreed} onCheck={() => this.setState({ agreed: !this.state.agreed })} style={comStyles().agreed} />
                        <div style={comStyles().termsLink}>
                          <a href='https://google.com' target='_blank' style={{ color: '#0080C1' }}>See Terms of Use</a>
                        </div>
                      </div>
                      :
                      null
                    }
                  </div>
                  :
                  <TextField id='name' type='text' multiLine rows={4} value={this.state.note} placeholder='Start typing here...' onChange={(e) => this.setState({ note: e.target.value })} textareaStyle={{ textAlign: 'center' }} style={comStyles().field} />
                }
                <br/>
                {
                  this.state.error_messages && this.state.error_messages.length > 0
                  ?
                  <div>
                    <Snackbar
                      open={this.state.error_messages && this.state.error_messages.length > 0}
                      message={this.state.error_messages[0]}
                      action='X'
                      autoHideDuration={3000}
                      onActionClick={() => this.removeError()}
                      onRequestClose={() => this.removeError()}
                    />
                    <br/>
                  </div>
                  :
                  null
                }
                {
                  this.state.loading
                  ?
                  <div style={comStyles().loadingCircle}>
                    <CircularProgress size={40} thickness={4} />
                  </div>
                  :
                  this.renderSendButton()
                }
              </div>
            </Card>
          }
        </MuiThemeProvider>
			</div>
		)
	}
}

// defines the types of variables in this.props
MessageUsForm.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
MessageUsForm.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(MessageUsForm)

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
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px 20px 0px 20px',
      height: 'auto',
      width: 'auto',
      zIndex: 999,
      // background: 'linear-gradient(269deg, #0bacbd, #1a76c1)',
      // backgroundSize: 'cover',
      backgroundColor: 'rgba(0,0,0,0)',
		},
    inner_container: {
      width: '100%',
      maxWidth: '90vw',
      minWidth: '90vw',
      width: 'auto',
      borderRadius: '15px',
    },
    inputbox: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
    },
    field: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
    },
    success_container: {
      maxWidth: '90vw',
      minWidth: '30vw',
      width: '80%',
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      pointer: 'cursor',
      backgroundColor: '#2faded',
      borderRadius: '30px',
    },
    loadingCircle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    agreed: {

    },
    termsLink: {
      width: '100%',
      textAlign: 'right',
    }
	}
}
