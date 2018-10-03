import React from "react";
import { reduxForm, Field, focus } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment'

import MediaFile from "./album/media-file";
import { fetchSingleAlbum } from "../actions/albums";
import { updateSingleAlbum } from "../actions/albums";
import { required, nonEmpty } from "../validators";

import "./edit-album.css";

import Input from "./input";

class EditAlbum extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }
  onSubmit(values) {
    //console.log("values", values);
    this.props.dispatch(
      updateSingleAlbum(values.id, values.albumName, values.comment)
    );
  }
  render() {
    //console.log("this.props.initialValues", this.props.initialValues);
    let files;
    if (this.props.initialValues) {
      this.props.initialValues.dateCreated = moment(
        this.props.initialValues.dateCreated
      ).format("YYYY-MM-DD");
      files = this.props.initialValues.files.map((file, index) => (
        <li key={index} className="col-3">
          <MediaFile index={index} {...file} />
        </li>
      ));
    }

    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <p>Edit Album</p>
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
            label="Date Created"
            component={Input}
            type="date"
            name="dateCreated"
            id="datecreated"
            disabled
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
        <ul className="row album-container">{files}</ul>
        <button type="submit">Submit</button>
        <Link to="/dashboard">
          <button type="button">Cancel</button>
        </Link>
      </form>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditAlbum = reduxForm({
  form: "EditAlbum", // a unique identifier for this form
  enableReinitialize: false,
  onSubmitSuccess: (results, dispatch) => {
    window.location = "/dashboard";
  },
  onSubmitFail: (errors, dispatch) => {
    dispatch(focus("EditAlbum", "albumName"));
    if (!errors) {
      alert("Error: couldn't add a new album!");
    }
  }
})(EditAlbum);

// You have to connect() to any reducers that you wish to connect to yourself
EditAlbum = connect(state => ({
  initialValues: state.bestmemories.album // pull initial values from account reducer
}))(EditAlbum);

export default EditAlbum;
