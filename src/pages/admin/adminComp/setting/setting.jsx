import React, { Component } from 'react';


class Setting extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div >

                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className='changeTheme' style={{ width: '50%', height: 70, }}>
                        <div style={{ borderRadius: 8, boxShadow: '0 2px 5px #aaa', 
                            fontSize: 16, height: 63, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <p style={{fontWeight:500,color:'#333'}}>变更您的主题:</p>

                        </div>
                        <div style={{  borderRadius: 8, boxShadow: '0 2px 5px #aaa', marginTop:24 ,fontSize: 16, height: 70, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <p style={{}}>变更您的主题:</p>

                        </div>

                        <div style={{  borderRadius: 8, boxShadow: '0 2px 5px #aaa', marginTop:24 ,fontSize: 16, height: 70, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <p style={{}}>变更您的主题:</p>

                        </div>

                        <div style={{  borderRadius: 8, boxShadow: '0 2px 5px #aaa', marginTop:24 ,fontSize: 16, height:70, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <p style={{}}>变更您的主题:</p>

                        </div>

                        <div style={{  borderRadius: 8, boxShadow: '0 2px 5px #aaa', marginTop:24 ,fontSize: 16, height: 70, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <p style={{}}>变更您的主题:</p>
  
                        </div>

                        <div style={{  borderRadius: 8, boxShadow: '0 2px 5px #aaa', marginTop:24 ,fontSize: 16, height: 70, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <p style={{}}>变更您的主题:</p>

                        </div>
                        
                    </div>      



                    <div className='changeTheme' style={{marginLeft:24, width: '50%', height: 540, display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 8, boxShadow: '0 2px 5px #aaa' }}>
                        <p style={{ fontSize: 16}}>变更您的主题:</p>

                    </div>
  </div>

            </div>
        )
    }
}

export default Setting;