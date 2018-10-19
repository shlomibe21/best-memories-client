import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

import DropzoneArea from "../common/dropzoneArea";

import requiresLogin from "../authorization/requires-login";
import Input from "../forms/input";
import { addNewAlbum, awsS3GetSignedRequest } from "../../actions/albums";
import { required, nonEmpty } from "../../validators";

import "./new-album.css";
import "../common/dropzone.css";

export class NewAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
      uploading: false
    };
  }

  componentWillUnmount() {
    // Note: From the react-dropzone maintainer:
    // react-dropzone doesn't manage dropped files. You need to destroy
    // the object URL yourself whenever you don't need the preview by calling
    // window.URL.revokeObjectURL(file.preview); to avoid memory leaks.
    this.state.acceptedFiles.map(file =>
      window.URL.revokeObjectURL(file.preview)
    );
  }

  handleDropFiles = (acceptedFiles, rejectedFiles) => {
    return this.setState({
      acceptedFiles: acceptedFiles,
      rejectedFiles: rejectedFiles
    });
  };

  onSubmit(values) {
    this.setState({
      uploading: true
    });
    //console.log(values);
    // Get the desired data from each media file and create a new array of objects to send to db
    let files = [];
    let promises = [];
    const dateNow = moment(new Date())
      .utc()
      .format("YYYY-MM-DD");
    if (this.state.acceptedFiles) {
      promises = this.state.acceptedFiles.map((file, i) => {
        const timeNow = Date.now();
        const fileName = timeNow + "-" + file.name;
        files.push({
          fileName: fileName,
          frontEndFileName: file.name,
          dateAdded: dateNow,
          comment: values.comment,
          storageLocation: `https://s3-us-west-1.amazonaws.com/albums-test/${fileName}`,
          positionTop: "0px",
          positionLeft: "0px"
        });
        return this.props.dispatch(awsS3GetSignedRequest(file, fileName));
      });
    }

    return Promise.all(promises).then(() => {
      return this.props
        .dispatch(addNewAlbum(values.albumName, dateNow, values.comment, files))
        .then(() => this.props.history.push("/dashboard"));
    });
  }
  render() {
    let error;
    if (this.props.error) {
      error = <div className="message message-error">{this.props.error}</div>;
    }
    if (this.state.uploading) {
      return <div className="spinnerModal" />;
    }
    return (
      <div className="new-album centered-container centered-text">
        <header role="banner">
          <h1>My Albums</h1>
        </header>
        <form
          className="new-album-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          encType="multipart/form-data"
        >
          {error}
          <div>
            <Field
              component={Input}
              type="text"
              name="albumName"
              label="Album Name"
              id="albumname"
              validate={[required, nonEmpty]}
            />
          </div>
          <div>
            <Field
              name="comment"
              id="comment"
              type="textarea"
              component={Input}
              label="Comment"
            />
          </div>
          <div className="centered-btn-wrapper">
            <button type="submit" className="btn">
              Submit
            </button>
            <Link to="/dashboard">
              <button type="button" className="btn">
                Cancel
              </button>
            </Link>
          </div>
          <section className="deopzone-area">
            <legend>Dropzone</legend>
            <DropzoneArea dropzoneAcceptedFiles={this.handleDropFiles} />
          </section>
        </form>
      </div>
    );
  }
}

export default requiresLogin()(
  withRouter(
    reduxForm({
      form: "NewAlbum",
      onSubmitSuccess: (results, dispatch) => {
        //window.location = "/dashboard";
      },
      onSubmitFail: (errors, dispatch) => {
        dispatch(focus("NewAlbum", "albumName"));
        if (!errors) {
          alert("Error: couldn't add a new album!");
        }
      }
    })(NewAlbum)
  )
);
