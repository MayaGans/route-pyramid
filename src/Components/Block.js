import React from 'react';

// each layer component defaults to a block state of 1
// the block prop will determine how many 
// Block divs to put inside the layer div

// and we also need to pass down the name of climbs 
// to the proper block components
// so itll be a for each climbname create a block 

class Block extends React.Component {
    render(props) {

      var renderedOutput = this.props.name.map(item => <div class="block"> {item} </div>)

      return (
        <div class="blocks">
          <div class="block no-border">{this.props.grade}</div>
          {renderedOutput}
        </div>
      );
    }
}

export default Block;