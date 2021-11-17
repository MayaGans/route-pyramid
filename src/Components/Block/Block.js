import React from "react";

class Block extends React.Component {
  render() {
    var renderedOutput = this.props.name.map((item, index) => (
      <div className="block" key={item + index}> {item} </div>
    ));

    return (
      <div className="blocks">
        <div className="block no-border">{this.props.grade}</div>
        {renderedOutput}
      </div>
    );
  }
}

export default Block;
