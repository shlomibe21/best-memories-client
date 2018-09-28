import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import Input from "./input";
import { addNewAlbum } from "../actions/albums";
import { required, nonEmpty } from "../validators";

import "./new-album.css";

export class NewAlbum extends React.Component {
  onSubmit(values) {
    console.log(values);
    // TODO: remove the row below after debug!!!
    //this.props.router.push('/');
    return this.props.dispatch(addNewAlbum(values.albumname, "02/01/2018"));
  }
  render() {
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    return (
      <form
        className="new-album centered-container"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {errorMessage}
        <label htmlFor="name">Name</label>
        <Field
          component={Input}
          type="text"
          name="albumname"
          className="form-input"
          id="albumname"
          validate={[required, nonEmpty]}
        />
        <button type="submit" className="btn">
          New Album Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "newalbum",
  onSubmitSuccess: dispatch => {
    console.log("onSubmitSuccess called!!!");
    //this.props.router.push('/dashboard/');
  },
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("newalbum", Object.keys(errors)[0]))
})(NewAlbum);
