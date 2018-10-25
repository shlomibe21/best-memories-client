import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import {
  fetchSingleFileLocal,
  updateSingleFile,
  updateSingleFileRequest
} from "../../actions/albums";
import { required, nonEmpty } from "../../validators";
import Input from "../common/input";

import "./edit-media.css";

let file;
class EditMedia extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      fetchSingleFileLocal(file, `${file.albumIndex}`, `${file._id}`)
    );
  }

  onSubmit(values) {
    //console.log("edit-media Values:", values);
    let frontEndFileName = values.frontEndFileName;
    return this.props
      .dispatch(
        updateSingleFile(
          values.albumIndex,
          values._id,
          frontEndFileName,
          values.comment
        )
      )
  }

  cancelUpdateFileReq() {
    this.props.dispatch(updateSingleFileRequest(false));
  }

  render() {
    if (this.props[this.props.index]) {
      file = this.props[this.props.index].props.children.props;
    }
    //console.log("edit-media: initial values", this.props.initialValues);
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
   
    return (
      <div className="centered-container">
        <header>
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
              name="frontEndFileName"
              id="file-name"
              validate={[required, nonEmpty]}
            />
          </div>
          <div>
            <Field
              label="Comment"
              component={Input}
              type="textarea"
              name="comment"
              id="comment"
            />
          </div>
          <div className="centered-text">
            <button type="submit" className="btn">
              Submit
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => this.cancelUpdateFileReq()}
            >
              Cancel
            </button>
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
