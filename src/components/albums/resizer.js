import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import DropArea from "./drop-area";

// Resizer Component
export default class Resizer extends React.Component {
  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.removeEventListener("mouseup", this.onMouseUp.bind(this), false);
  }
  onMouseDown(e) {
    console.log("Resizer.onMouseDown");

    this.props.updateStateResizing(this.props.id, true);
  }
  onMouseMove(e) {
    console.log("Resizer.onMouseMove");
    if (this.props.isResizing) {
      this.props.funcResizing(this.props.id, e.clientX, e.clientY);
    }
  }
  onMouseUp(e) {
    console.log("Resizer.onMouseUp");
    if (this.props.isResizing) {
      this.props.updateStateResizing(this.props.id, false);
    }
  }
  render() {
    const style = {
      width: this.props.resizerWidth,
      height: this.props.resizerHeight
    };
    return (
      <div
        className="resizer"
        style={style}
        onMouseDown={this.onMouseDown.bind(this)}
      />
    );
  }
}
Resizer.propTypes = {
  id: PropTypes.number.isRequired,
  isResizing: PropTypes.bool.isRequired,
  funcResizing: PropTypes.func.isRequired,
  updateStateResizing: PropTypes.func.isRequired,
  resizerWidth: PropTypes.number.isRequired,
  resizerHeight: PropTypes.number.isRequired
};

// Render Dom
//ReactDOM.render(<DropArea />, document.getElementById("app"));
