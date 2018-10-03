import React from "react";

import "./tooltip.css";

export default class Tooltip extends React.Component {
        constructor(props) {
          super(props)
      
          this.state = {
            displayTooltip: false
          }
        }
        
        displayTooltip = (displayTooltip) => {
            this.setState({displayTooltip});
        }
      
        render() {
          let message = this.props.message
          let position = this.props.position
          return (
            <span className='tooltip'
                onMouseLeave={() => this.displayTooltip(false)}
              >
              {this.state.displayTooltip &&
              <div className={`tooltip-bubble tooltip-${position}`}>
                <div className='tooltip-message'>{message}</div>
              </div>
              }
              <span 
                className='tooltip-trigger'
                onMouseOver={() => this.displayTooltip(true)}
                >
                {this.props.children}
              </span>
            </span>
          )
        }
      }
      