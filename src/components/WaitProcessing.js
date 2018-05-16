import React from 'react';
import {connect} from 'react-redux';





class WaitProcessing extends React.Component{
    
    render(){
        return (
                <div className="App">
                    <div className="Form" style={{padding:0}}>
                        <h3>Analysing the files... please wait</h3>
                    </div>
                </div>)
    }
}

function mapStateToProps(state, ownProps){
    return {
    }
}

export default connect(
  mapStateToProps,
  {}
)(WaitProcessing)