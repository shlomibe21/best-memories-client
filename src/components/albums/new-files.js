import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";

import DropzoneArea from "../common/dropzoneArea";
import requiresLogin from "../authorization/requires-login";
import {
  fetchSingleAlbum,
  addNewFiles,
  awsS3GetSignedRequest,
  setLoading
} from "../../actions/albums";

import "./new-files.css";
import "../common/dropzone.css";

export class NewFiles extends React.Component {
  constructor() {
    super();
    this.state = {
      acceptedFiles: [],
      rejectedFiles: []
    };
  }

  componentWillMount() {
    this.props.dispatch(setLoading(false));
  }

  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }

  onSubmit(values) {
    // Start the spinner
    this.props.dispatch(setLoading(true));
    //console.log(values);
    // Get the desired data from each media file and create a new array of objects to send to db
    let files = [];
    let promises = [];
    if (values.files) {
      const dateNow = moment(new Date())
        .utc()
        .format("YYYY-MM-DD");
      promises = this.state.acceptedFiles.map((file, i) => {
        const timeNow = Date.now();
        const fileName = timeNow + "-" + file.name;
        files.push({
          fileName: fileName,
          frontEndFileName: file.name,
          dateAdded: dateNow,
          comment: "",
          storageLocation: `https://s3-us-west-1.amazonaws.com/albums-test/${fileName}`,
          positionTop: "0px",
          positionLeft: "0px"
        });
        return this.props.dispatch(awsS3GetSignedRequest(file, fileName));
      });
    }
    return Promise.all(promises).then(() => {
      return this.props
        .dispatch(addNewFiles(this.props.match.params.index, files))
        .then(() =>
          this.props.history.push(`/album/${this.props.match.params.index}`)
        );
    });
  }

  handleDropFiles = (acceptedFiles, rejectedFiles) => {
    return this.setState({
      acceptedFiles: acceptedFiles,
      rejectedFiles: rejectedFiles
    });
  };

  render() {
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    if (this.props.loading) {
      return <div className="spinnerModal" />;
    }
    return (
      <div className="new-files centered-container centered-text">
        <header role="banner">
          <h1>Add Files</h1>
        </header>
        <form
          className="new-files"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <button type="submit" className="btn">
            Add Files
          </button>
          <Link to={`/album/${this.props.match.params.index}`}>
            <button type="button" className="btn">
              Cancel
            </button>
          </Link>
          <div>
            {errorMessage}
            <DropzoneArea dropzoneAcceptedFiles={this.handleDropFiles} />
          </div>
        </form>
      </div>
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
  initialValues: state.bestmemories.album, // pull initial values from account reducer
  loading: state.bestmemories.loading
}))(NewFiles);

export default requiresLogin()(withRouter(NewFiles));
