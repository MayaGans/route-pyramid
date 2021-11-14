import React from 'react';

// each layer component defaults to a block state of 1
// the block prop will determine how many 
// Block divs to put inside the layer div

class Block extends React.Component {
    render() {
        return <div class = "block" >
          Climb Name
        </div>
    }
}

export default Block;