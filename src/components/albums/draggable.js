import React from "react";
import PropTypes from 'prop-types';  

import Resizer from "./resizer";

// draggable Component
export default class Draggable extends React.Component {
  onMouseDown(e) {
    console.log("Draggable.onMouseDown");
    var elm = document.elementFromPoint(e.clientX, e.clientY);
    if (elm.className !== "resizer") {
      this.props.updateStateDragging(this.props.id, true);
    }
  }
  onMouseUp(e) {
    console.log("Draggable.onMouseUp");
    this.props.updateStateDragging(this.props.id, false);
  }
  onDragStart(e) {
    console.log("Draggable.onDragStart");

    const nodeStyle = this.refs.node.style;
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id: this.props.id,
        // mouse position in a draggable element
        x: e.clientX - parseInt(nodeStyle.left, 10),
        y: e.clientY - parseInt(nodeStyle.top, 10)
      })
    );
  }
  onDragEnd(e) {
    console.log("Draggable.onDragEnd");

    this.props.updateStateDragging(this.props.id, false);
  }
  render() {
    const styles = {
      top: this.props.top,
      left: this.props.left,
      width: this.props.width,
      height: this.props.height
    };
    return (
      <div
        ref={"node"}
        draggable={this.props.isDragging}
        id={"item_" + this.props.id}
        className="item unselectable"
        style={styles}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onDragStart={this.onDragStart.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
      >
        {"item_" + this.props.id}
        <Resizer
          ref={"resizerNode"}
          id={this.props.id}
          isResizing={this.props.isResizing}
          resizerWidth={16}
          resizerHeight={16}
          updateStateResizing={this.props.updateStateResizing}
          funcResizing={this.props.funcResizing}
        />
      </div>
    );
  }
}
Draggable.propTypes = {
  id: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isResizing: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  updateStateDragging: PropTypes.func.isRequired,
  updateStateResizing: PropTypes.func.isRequired,
  funcResizing: PropTypes.func.isRequired
};
