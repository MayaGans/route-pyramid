import React from "react";

class Block extends React.Component {
  render() {
    var renderedOutput = this.props.name.map((item) => (
      <div class="block"> {item} </div>
    ));

    return (
      <div class="blocks">
        <div class="block no-border">{this.props.grade}</div>
        {renderedOutput}
      </div>
    );
  }
}

export default Block;
