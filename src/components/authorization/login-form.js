import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import Input from "../forms/input";
import { login } from "../../actions/auth";
import { required, nonEmpty } from "../../validators";

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form centered-container narrow"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <h2 className="centered-text">Login</h2>
        {error}
        <Field
          label="*Username"
          component={Input}
          type="text"
          name="username"
          id="username"
          placeholder="*Username"
          validate={[required, nonEmpty]}
        />
        <Field
          label="*Password"
          component={Input}
          type="password"
          name="password"
          id="password"
          placeholder="*Password"
          validate={[required, nonEmpty]}
        />
        <button
          disabled={this.props.pristine || this.props.submitting}
          className="btn"
        >
          Log in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "login",
  onSubmitFail: (errors, dispatch) => dispatch(focus("login", "username"))
})(LoginForm);
