import React, { Component } from 'react';
import LayoutPage from './layout/LayoutPage';
import Inventory from './components/Inventory';

class App extends Component{
    render(){
        return(
            <div className='appSection'>
                <LayoutPage>
                    <Inventory />
                </LayoutPage>
            </div>
        )
    }
};

export default App;