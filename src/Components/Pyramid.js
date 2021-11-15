import React from 'react';
import Layer from './Layer'

class Pyramid extends React.Component {
    render() {
        return <div class = "pyramid" >
           <Layer name={['a']}/>
           <Layer name={['b', 'c']}/>
           <Layer name={['d', 'e', 'f', 'g']}/>
           <Layer name={['h', 'i', 'j', 'k', 'l', 'm']}/>
           <Layer name={['n', 'o', 'p', 'q', 'r', 's', 't', 'u']}/>
           <Layer name={['v', 'w', 'x', 'y', 'z', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']}/>
        </div>
    }
}

export default Pyramid;