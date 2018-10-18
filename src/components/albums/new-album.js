import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import Dropzone from "react-dropzone";

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
      rejectedFiles: []
    };
  }

  onSubmit(values) {
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

    return Promise.all(promises).then(responses => {
      console.log(responses);
      return this.props
        .dispatch(addNewAlbum(values.albumName, dateNow, values.comment, files))
        .then(() => this.props.history.push("/dashboard"));
    });
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
        className="new-album centered-container centered-text"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        encType="multipart/form-data"
      >
        {errorMessage}
        <div>
          <label htmlFor="name">Album Name</label>
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
          <label htmlFor="comment">Comment</label>
          <Field
            name="comment"
            id="comment"
            type="textarea"
            component={Input}
            label="Comment"
          />
        </div>
        <button type="submit" className="btn">
          New Album Submit
        </button>
        <Link to="/dashboard">
          <button type="button" className="btn">
            Cancel
          </button>
        </Link>
        <div>
          <section>
            <div className="">
              <Dropzone
                accept="image/*"
                onDrop={(acceptedFiles, rejectedFiles) => {
                  this.setState({ acceptedFiles, rejectedFiles });
                }}
                className="dropzone"
              >
                <div>Drop files here, or click to select files to upload.</div>
                <ul>
                  {this.state.acceptedFiles.map(file => (
                    <li key={file.name}>
                      {file.name} - {file.size} bytes
                    </li>
                  ))}
                </ul>
              </Dropzone>
            </div>
            <aside>
              <h2>Rejected files</h2>
              <ul>
                {this.state.rejectedFiles.map(file => (
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </div>
      </form>
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
