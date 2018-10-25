import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";

import requiresLogin from "../authorization/requires-login";
import { fetchSingleAlbum } from "../../actions/albums";
import { updateSingleAlbum } from "../../actions/albums";
import { required, nonEmpty } from "../../validators";
import Input from "../common/input";

import "./edit-album.css";

class EditAlbum extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
    /*this.props.router.setRouteLeaveHook(this.props.route, () => {
        if (!this.state.submitted) {
          return 'You have unsaved changes. Exit the page?';
        }
      });*/
  }

  onSubmit(values) {
    //console.log("values", values);
    // Get the desired data from each media file and create a new array of objects to send to db
    let files = [];
    const timeNow = Date.now();
    const dateNow = moment(timeNow).format("YYYY-MM-DD");
    if (values.files) {
      values.files.map((file, i) =>
        files.push({
          fileName: timeNow + "-" + file.name,
          frontEndFileName: file.name,
          dateAdded: dateNow,
          comment: "",
          storageLocation: "",
          positionTop: "0px",
          positionLeft: "0px"
        })
      );
    }

    return this.props
      .dispatch(
        updateSingleAlbum(
          values.id,
          values.albumName,
          values.frontEndFileName,
          values.comment,
          values.files
        )
      )
      .then(() => this.props.history.push("/dashboard"));
  }

  render() {
    //console.log("this.props.initialValues", this.props.initialValues);
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    
    return (
      <div className="centered-container">
        <header>
          <h1>Edit Album</h1>
        </header>
        <form
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >
          <div className="edit-album-form">
            {errorMessage}
            <div>
              <Field
                label="Album Name"
                component={Input}
                type="text"
                name="albumName"
                id="albumname"
                validate={[required, nonEmpty]}
              />
            </div>
            <div>
              <Field
                label="Comment"
                component={Input}
                type="textarea"
                className= "textarea"
                name="comment"
                id="comment"
              />
            </div>
            <div className="centered-text">
              <button type="submit" className="btn">
                Submit
              </button>
              <Link to="/dashboard">
                <button type="button" className="btn">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditAlbum = reduxForm({
  form: "EditAlbum", // a unique identifier for this form
  enableReinitialize: true,
  onSubmitSuccess: (results, dispatch) => {
    //window.location = "/dashboard";
  },
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("EditAlbum", "albumName"));
    if (!errors) {
      alert("Error: couldn't edit the album!");
    }
  }
})(EditAlbum);

// Connect() to reducers
EditAlbum = connect(state => ({
  initialValues: state.bestmemories.album // pull initial values from account reducer
}))(EditAlbum);

export default requiresLogin()(withRouter(EditAlbum));
