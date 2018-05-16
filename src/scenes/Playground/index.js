import React, { Component } from 'react';
import {connect} from 'react-redux';


import Toolbar from '../../components/Toolbar';
import AddComment from '../../components/AddComment';
import InfiniteHolder from '../../components/InfiniteHolder';
import Editor from '../../components/Editor';

class Playground extends Component {
 


  render() {
    let {showAddComment,projectInfo} = this.props;
    return (
    <div className="Container">
      <Toolbar />
      <InfiniteHolder />
      <Editor />
      {showAddComment && <AddComment />}
    </div>
    );
  }
}



function mapStateToProps(state, ownProps){
    return {
      addComponent: state.appContent.addComponent,
      projectInfo : state.appContent.projectInfo,
      showAddComment:state.appContent.showAddComment
    }
}

export default connect(
  mapStateToProps,
  {
    
  }
)(Playground)