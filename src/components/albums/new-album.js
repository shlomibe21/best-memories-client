import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

import Input from "../Forms/input";
import { renderDropzoneInput } from "../common/dropzone";

import { addNewAlbum, awsS3GetSignedRequest } from "../../actions/albums";
import { required, nonEmpty } from "../../validators";

import "./new-album.css";

const FILE_FIELD_NAME = "files";

export class NewAlbum extends React.Component {
  onSubmit(values) {
    console.log(values);
    // Get the desired data from each media file and create a new array of objects to send to db
    let files = [];
    const dateNow = moment(new Date()).utc().format("YYYY-MM-DD");
    if (values.files) {
      values.files.map((file, i) => {
        this.props.dispatch(awsS3GetSignedRequest(file));
        files.push({
          fileName: file.name,
          dateAdded: dateNow,
          comment: values.comment,
          storageLocation: `https://s3-us-west-1.amazonaws.com/albums-test/${file.name}`,
          positionTop: "0px",
          positionLeft: "0px"
        });
        return file;
      });
    }

    return this.props
      .dispatch(addNewAlbum(values.albumName, dateNow, values.comment, files))
      .then(() => this.props.history.push("/dashboard"));
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
          <label htmlFor={FILE_FIELD_NAME} />
          <Field name={FILE_FIELD_NAME} component={renderDropzoneInput} />
        </div>
      </form>
    );
  }
}

export default withRouter(
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
);
