import React from 'react';
import {connect} from 'react-redux';

import {act_addComment,act_toggle_comBlock} from '../actions';





class AddComment extends React.Component{

    constructor(props){
        super(props);
        this.state={
            msg:''
        }
    }

    

    
    
    render(){
        return (
                
                    <div className="Form" style={{alignSelf:'center', position:'absolute', marginTop:100}}>
                        <h3>Add a comment for the selected lines</h3>
                       
                        <span style={{marginTop:20}} >Message</span>
                       
                         <textarea rows='10' value={this.state.msg} onChange={e=>this.setState({msg:e.target.value})} autoFocus></textarea>
                       
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <div className="CancelButton" style={{marginRight:20}} onClick={()=>this.props.act_toggle_comBlock(false)}>Cancel</div>
                            <div className="ActionButton" onClick={()=>this.props.act_addComment(this.state.msg)}>Add</div>
                        </div>
                    </div>
               )
    }
}

function mapStateToProps(state, ownProps){
    return {
    }
}

export default connect(
  mapStateToProps,
  {act_addComment,act_toggle_comBlock}
)(AddComment)