import React, { Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import {Router, Route, browserHistory} from 'react-router';


const styles = {
  navLink: {
    color: 'white',
    textDecoration: 'none',
  },
  dialog: {
    width: '30%',
    maxWidth: 'none',
  },
  buttonStyle: {
    margin: 12,
  },
  header: {
    textAlign: 'center',
  },
}

class LoginModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      logged: false,
      email: '',
      password: '',
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClose () {
    this.props.hideLoginModal();
  }

  handleChange(key) {
    const email = this.refs.email.input.value;
    const password = this.refs.password.input.value;
    console.log(email, password);
    this.props.sendLogin(email, password);
    this.props.hideLoginModal();
  }


  render() {
    return (
        <Dialog
          title="Login"
          modal={false}
          open={this.props.sessions.loginVisible}
          onRequestClose={this.handleClose}
          contentStyle={styles.dialog}
          style={styles.header}
        >
          <div>
            <TextField ref="email"
              floatingLabelText="Email"/>
            <br />
            <TextField
              floatingLabelText="Password"
              ref="password"
              type="password"/>
              <br />
              <RaisedButton onClick={this.handleChange} label="Submit"
                secondary={true}
                style={styles.buttonStyle}
              />
          </div>
        </Dialog>
    );
  }

}

class RegisterModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      // email: '',
      // password: '',
    }
    this.handleClose = this.handleClose.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  handleClose () {
    this.props.hideRegisterModal();
  }
  //
  // handleChange(key) {
  //   const email = this.refs.email.input.value;
  //   const password = this.refs.password.input.value;
  //   console.log(email, password);
  //   this.props.sendLogin(email, password);
  //   this.props.hideLoginModal();
  // }
  //
  //
  render() {
    return (
        <Dialog
          title="Register"
          modal={false}
          open={this.props.sessions.registerVisible}
          onRequestClose={this.handleClose}
          contentStyle={styles.dialog}
          style={styles.header}
        >
          <div>
            <h1>hi</h1>
          </div>
        </Dialog>
    );
  }

}


class Navbar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      logged: false,
      email: '',
      password: '',
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.loginModal = this.loginModal.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.registerModal = this.registerModal.bind(this)
    // this.handleProfile = this.handleProfile.bind(this)
  }

  handleToggle () {
    this.setState({ open: !this.state.open });
  }

  loginModal() {
    console.log('hhohueou')
    this.props.showLoginModal();
  }

  handleLogOut(){
    this.props.logOut();
  }

  registerModal() {
    console.log('dasdasdd')
    this.props.showRegisterModal();
  }

  // handleProfile(event){
  //   event.preventDefault();
  //   this.contex.router.transitionTo('/users/:userId');
  // }

  render() {
    const Login = (props) => (
      <div>
        <FlatButton onClick={this.loginModal} label="Login" />
      </div>
    );

    const Register = (props) => (
      <FlatButton onClick={this.registerModal} label="Register" />
    )

    const Logged = (props) => (
      <IconMenu
      iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to={`/users/${this.props.currentUser.user.user_id}`}><MenuItem primaryText="Profile" /></Link>
        <MenuItem primaryText="Sign out" onClick={this.handleLogOut} />
      </IconMenu>
    );

    return (
      <div>
        <LoginModal {...this.props}/>
        <RegisterModal {...this.props}/>
        <AppBar
          title={<Link to="/" style={ styles.navLink }>Home</Link>}
          showMenuIconButton={false}
          style={{backgroundColor: '#7C7877'}}
          iconElementRight={this.props.sessions.auth.loggedIn ? <Logged /> : <div><Login /> <Register/></div>}
        />
      </div>
    );
  }

}

export default Navbar;
