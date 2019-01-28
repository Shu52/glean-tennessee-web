import React, {Component} from 'react'
import {signup} from '../../helpers'
import history from '../../navigation/history'
import Strings, {Regex} from '../../constants'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
export default class SignUp extends Component {
  state = {
    name: '',
    street: '',
    zip: '',
    phone: '',
    email: '',
    password: '',
    emailError: null,
    signupError: null
  }

  onInputChange = e => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  validateEmail = () => {
    const {email} = this.state
    const emailError = !Regex.testEmail(email)
      ? 'Enter a valid email address'
      : ''
    this.setState({emailError})
  }

  onSubmit = async () => {
    const {password, name, street, zip, phone, email} = this.state
    const data = {
      name,
      street,
      zip,
      phone,
      email
    }
    const [response, signupError] = await signup(data, password)
    if (signupError) {
      this.setState({signupError})
    } else if (response) {
      history.push('/dashboard')
    }
  }

  render() {
    const {emailError, signupError} = this.state
    const errorDiv = emailError ? <div id="emailError">{emailError}</div> : null
    const signupErrorDiv = signupError ? (
      <div id="emailError">{Strings.firebaseErrorMessage(signupError)}</div>
    ) : null
    return (
      <div className="row">
        <div className="col-md">
          <div className="well">
            <h2>Register as a new user</h2>
            <h5>
              This is the information SoSA will use to get in touch with you.
            </h5>
            <Form id="registrationForm" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={this.onInputChange}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="up-email">Email address</Label>
                <Input
                  onChange={this.onInputChange}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onBlur={this.validateEmail}
                />
                {errorDiv}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="up-password">Password</Label>
                <Input
                  type="password"
                  onChange={this.onInputChange}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  type="tel"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="phone"
                  placeholder="(615) 555-5555"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="street"
                  placeholder="123 Main Street"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="city"
                  placeholder="Nashville"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="state">State</Label>
                <Input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="state"
                  placeholder="Tennessee"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  type="number"
                  className="form-control"
                  onChange={this.onInputChange}
                  id="zip"
                  placeholder="37211"
                />
              </FormGroup>
            </Form>
            {signupErrorDiv}
            <Button
              id="register-btn"
              type="submit"
              className="btn btn-default btn-submit"
              onClick={this.onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
