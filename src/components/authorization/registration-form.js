import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { registerUser } from "../../actions/users";
import { login } from "../../actions/auth";
import Input from "../forms/input";
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed
} from "../../validators";

import "./registration-form.css";

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editField: false
    };
  }

  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form centered-container narrow"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <h2 className="centered-text">Register</h2>
        <Field
          label="*First name"
          component={Input}
          type="text"
          name="firstName"
          placeholder="*First name"
          validate={[required, nonEmpty]}
          //onFocus={e => (e.target.placeholder = "")}
          //onBlur={e => (e.target.placeholder = "*First name")}
        />
        <Field
          label="*Last Name"
          component={Input}
          type="text"
          name="lastName"
          placeholder="*Last name"
          validate={[required, nonEmpty]}
        />
        <Field
          label="*Username"
          component={Input}
          type="text"
          name="username"
          placeholder="*Username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <Field
          label="*Password"
          component={Input}
          type="password"
          name="password"
          placeholder="Min. 10 characters"
          validate={[required, passwordLength, isTrimmed]}
        />
        <Field
          label="*Confirm password"
          component={Input}
          type="password"
          name="passwordConfirm"
          placeholder="*Confirm Password"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <button
          type="submit"
          className="btn"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm);
