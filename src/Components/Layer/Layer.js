import React from "react";
import Block from "../Block/Block";

class Layer extends React.Component {
  render() {
    return (
      <div class="layer">
        <Block name={this.props.name} grade={this.props.grade} />
      </div>
    );
  }
}

export default Layer;
