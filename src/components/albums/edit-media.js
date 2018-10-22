import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";

import requiresLogin from "../authorization/requires-login";
import { fetchSingleFile, updateSingleFile } from "../../actions/albums";
import { required, nonEmpty } from "../../validators";
import Input from "../forms/input";

import "./edit-media.css";

class EditMedia extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      fetchSingleFile(
        `${this.props.match.params.albumId}`,
        `${this.props.match.params.fileId}`
      )
    );
  }

  onSubmit(values) {
    console.log("edit-media Values:", values);
    let frontEndFileName = values.files[0].frontEndFileName;
    return this.props
      .dispatch(
        updateSingleFile(
          `${this.props.match.params.albumId}`,
          `${this.props.match.params.fileId}`,
          frontEndFileName,
          values.files[0].comment
        )
      )
      .then(() =>
        this.props.history.push(`/album/${this.props.match.params.albumId}`)
      );
  }

  render() {
    //console.log("edit-media: initial values", this.props.initialValues);
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    if (this.props.initialValues) {
      if (this.props.initialValues.files[0].dateAdded) {
        this.props.initialValues.files[0].dateAdded = moment(
          this.props.initialValues.files[0].dateAdded
        ).format("YYYY-MM-DD");
      }
    }
    return (
      <div className="centered-container">
        <header role="banner">
          <h1>Edit File Information</h1>
        </header>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          {errorMessage}
          <div>
            <Field
              label="File Name"
              component={Input}
              type="text"
              name="files[0].frontEndFileName"
              id="file-name"
              validate={[required, nonEmpty]}
            />
          </div>
          <div>
            <Field
              label="Comment"
              component={Input}
              type="textarea"
              name="files[0].comment"
              id="comment"
            />
          </div>
          <div className="centered-text">
            <button type="submit" className="btn">Submit</button>
            <Link to={`/album/${this.props.match.params.albumId}`}>
              <button type="button" className="btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditMedia = reduxForm({
  form: "EditMedia", // a unique identifier for this form
  enableReinitialize: true,
  onSubmitSuccess: (results, dispatch) => {
    //window.location = "/dashboard";
  },
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("EditMedia", "files[0].frontEndFileName"));
    if (!errors) {
      alert("Error: couldn't edit the file!");
    }
  }
})(EditMedia);

// Connect() to reducers
EditMedia = connect(state => ({
  initialValues: state.bestmemories.file // pull initial values from account reducer
}))(EditMedia);

export default requiresLogin()(withRouter(EditMedia));
