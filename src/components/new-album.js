import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import * as moment from "moment";

import Input from "./input";
import { renderDropzoneInput } from "./dropzone";

import { addNewAlbum } from "../actions/albums";
import { required, nonEmpty } from "../validators";

import "./new-album.css";

const FILE_FIELD_NAME = "files";

export class NewAlbum extends React.Component {
  onSubmit(values) {
    //console.log(values);
    // Get the desired data from each media file and create a new array of objects to send to db
    let files = [];
    const dateNow = moment(new Date()).format("YYYY-MM-DD");
    console.log('dateNow', dateNow);
    if (values.files) {
      values.files.map((file, i) =>
        files.push({
          fileName: file.name,
          dateAdded: dateNow,
          comment: values.comment,
          storageLocation: "",
          positionTop: "0px",
          positionLeft: "0px"
        })
      );
    }

    // TODO: remove the row below after debug!!!
    //this.props.router.push('/');
    return this.props.dispatch(
      addNewAlbum(values.albumName, dateNow, values.comment, files)
    );
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
        <div>
          <label htmlFor={FILE_FIELD_NAME} />
          <Field name={FILE_FIELD_NAME} component={renderDropzoneInput} />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "newAlbum",
  onSubmitSuccess: (results, dispatch) => {
    window.location = "/dashboard";
  },
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("newAlbum", "albumName"));
    if (!errors) {
      alert("Error: couldn't add a new album!");
    }
  }
})(NewAlbum);
