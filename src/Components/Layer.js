import React from 'react';
import Block from './Block'

// each layer component defaults to a block state of 1
// the block prop will determine how many 
// Block divs to put inside the layer div

class Layer extends React.Component {
    render() {
        return <div class = "layer" >
          <Block/>
        </div>
    }
}

export default Layer;