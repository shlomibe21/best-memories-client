import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import { renderDropzoneInput } from "../common/dropzone";
import {
  fetchSingleAlbum,
  addNewFiles,
  awsS3GetSignedRequest
} from "../../actions/albums";

import "./new-files.css";

const FILE_FIELD_NAME = "files";

export class NewFiles extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }

  onSubmit(values) {
    //console.log(values);
    // Get the desired data from each media file and create a new array of objects to send to db
    let files = [];
    let promises = [];
    const dateNow = moment(new Date()).format("YYYY-MM-DD");
    if (values.files) {
      promises = values.files.map((file, i) => {
        files.push({
          fileName: file.name,
          dateAdded: dateNow,
          comment: "",
          storageLocation: `https://s3-us-west-1.amazonaws.com/albums-test/${
            file.name
          }`,
          positionTop: "0px",
          positionLeft: "0px"
        });
        return this.props.dispatch(awsS3GetSignedRequest(file));
      });
    }
    Promise.all(promises).then(() => {
      return this.props
        .dispatch(addNewFiles(this.props.match.params.index, files))
        .then(() =>
          this.props.history.push(`/album/${this.props.match.params.index}`)
        );
    });
  }
  render() {
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    //let files;
    console.log(this.props.album);
    /*if (this.props.initialValues) {
      if (this.props.initialValues.dateCreated) {
        this.props.initialValues.dateCreated = moment(
          this.props.initialValues.dateCreated
        ).format("YYYY-MM-DD");
      }
      files = this.props.initialValues.files.map((file, index) => (
        <li key={index} className="col-3">
          <MediaFile index={index} {...file} />
        </li>
      ));
    }*/
    return (
      <form
        className="new-files centered-container"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <p>Add Files</p>
        {errorMessage}
        <button type="submit" className="btn">
          Add Files
        </button>
        <div>
          <label htmlFor={FILE_FIELD_NAME} />
          <Field name={FILE_FIELD_NAME} component={renderDropzoneInput} />
        </div>
      </form>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewFiles = reduxForm({
  form: "NewFiles", // a unique identifier for this form
  enableReinitialize: true,
  onSubmitSuccess: (results, dispatch) => {
    //window.location = "/dashboard";
  },
  onSubmitFail: (errors, dispatch) => {
    if (!errors) {
      alert("Error: couldn't add new files!");
    }
  }
})(NewFiles);

// You have to connect() to any reducers that you wish to connect to yourself
NewFiles = connect(state => ({
  initialValues: state.bestmemories.album // pull initial values from account reducer
}))(NewFiles);

export default withRouter(NewFiles);
