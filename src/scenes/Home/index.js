import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import './Home.css';

import TypeSelector from '../../components/TypeSelector';
import DirectorySelector from '../../components/DirectorySelector';
import WaitProcessing from '../../components/WaitProcessing';

class Home extends Component {
 
  render() {
    return (
    <div className="App">
      <Switch>
        <Route path={`${this.props.match.path}existing_project`} component={DirectorySelector} />
        <Route path={`${this.props.match.path}waitprocess`} component={WaitProcessing} />
        <Route component={TypeSelector} />
      </Switch>
    </div>
    );
  }
}


function mapStateToProps(state, ownProps){
    return {
    }
}

export default connect(
  mapStateToProps,
  {}
)(Home)