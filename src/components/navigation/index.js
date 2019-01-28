import React, {Component} from 'react'
import Link from '../link'
import './styles.css'
import icon from '../../static/icon.png'
import {logout} from '../../helpers'
import {withUserContextConsumer} from '../../context/user'
import history from '../../navigation/history'

class Navigation extends Component {
  state = {
    menuOpen: false
  }

  unauthenticatedLinks = activeLink => [
    <Link
      className={`nav-item nav-link ${activeLink === '/' ? 'active' : ''}`}
      href="/login"
      children={'Log In'}
      key="login"
      callBack={this.closeMenu}
    />,
    <Link
      key="register"
      className={`nav-item nav-link ${
        activeLink === '/signup' ? 'active' : ''
      }`}
      href="/signup"
      children={'Register'}
      callBack={this.closeMenu}
    />
  ]

  authenticatedLinks = activeLink => [
    <Link
      className={`nav-item nav-link ${
        activeLink === '/dashboard' ? 'active' : ''
      }`}
      href="/dashboard"
      children={'Gleaning Request'}
      key="request"
      callBack={this.closeMenu}
    />,
    <Link
      //no href
      className="nav-item nav-link"
      onClick={logout}
      children={'Log Out'}
      key="logout"
      callBack={this.closeMenu}
    />
  ]

  toggleMenu = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}))
  }

  closeMenu = () => {
    if (this.state.menuOpen) {
      this.setState({menuOpen: false})
    }
  }

  render() {
    console.log(history.location)
    const links = this.props.user
      ? this.authenticatedLinks(history.location.pathname)
      : this.unauthenticatedLinks()
    const menuClass = this.state.menuOpen
      ? 'collapse navbar-collapse show'
      : 'collapse navbar-collapse'
    return (
      <nav id="sosa-nav" className="navbar navbar-expand-md navbar-dark">
        <Link
          className="navbar-brand"
          href="/"
          children={<img className="img-fluid nav-icon" alt="" src={icon} />}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={menuClass}>
          <div className="navbar-nav">{links}</div>
        </div>
      </nav>
    )
  }
}

export default withUserContextConsumer(Navigation)
