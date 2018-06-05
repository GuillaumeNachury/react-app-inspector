import React from 'react';
import {connect} from 'react-redux';

import {act_select_analyze, act_select_createProject} from '../actions';
import logo from '../assets/icons/256x256.png';

const TypeSelector = (props)=> (
    <div className="App">
    <img src={logo} style={{width:96, height:96,marginBottom:20}}/>
    <div className="Row">
      
      <div className="BigButton" onClick={()=>props.act_select_analyze()} > 
         Audit an existing project
      </div>
      
     
      </div>
      <span>{props.version}</span>
  </div>
)

function mapStateToProps(state, ownProps){
    return {
      version: state.appContent.version
    }
}

export default connect(
  mapStateToProps,
  {act_select_analyze, act_select_createProject}
)(TypeSelector)