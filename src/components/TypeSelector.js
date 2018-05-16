import React from 'react';
import {connect} from 'react-redux';

import {act_select_analyze, act_select_createProject} from '../actions';

const TypeSelector = (props)=> (
    <div className="App">
    <div className="Row">
      <div className="BigButton" onClick={()=>props.act_select_analyze()} >
        <i className="fa fa-wpexplorer" style={{fontSize:80, marginBottom:20}} aria-hidden="true"></i>
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