import React from 'react';
import Layer from './Layer'

class Pyramid extends React.Component {
    render() {
        return <div class = "pyramid" >
           <Layer/>
           <Layer/>
           <Layer/>
           <Layer/>
           <Layer/>
           <Layer/>
        </div>
    }
}

export default Pyramid;