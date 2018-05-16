import React from 'react';
import {connect} from 'react-redux';

import {act_addComment,act_toggle_comBlock} from '../actions';





class Settings extends React.Component{

    constructor(props){
        super(props);
    }

    
    
    render(){
        return (
                
                    <div className="Form" style={{alignSelf:'center', position:'absolute', marginTop:100}}>
                        <h3>Settings</h3>
                        <span style={{marginTop:20}} >Your reviwer name</span>
                        <input type="text"
                            value={this.props.reviewer}
                        />
                        <span style={{marginTop:20}} >External editor command</span>
                        <input type="text"
                            value={this.props.editor || "system default"}
                        />
                       
                    </div>
               )
    }
}

function mapStateToProps(state, ownProps){
    return {
        config : state.appContent.config
    }
}

export default connect(
  mapStateToProps,
  {}
)(Settings)