import React from 'react';
import {connect} from 'react-redux';

import {act_addComponent} from '../actions';





class AddComponent extends React.Component{

    constructor(props){
        super(props);
        this.state={
            className:undefined
        }
    }

    
    
    render(){
        return (
                
                    <div className="Form" style={{alignSelf:'center', position:'absolute'}}>
                        <h3>Add a new component to the project</h3>
                       
                        <span style={{marginTop:20}} >Class name</span>
                        <input type="text" value={this.state.className}
                            onChange={e=>this.setState({className:e.target.value})}
                        />
                        <span style={{marginTop:20}} >Type of container</span>
                        <select>
                            <option>React.Component</option>
                            <option>Redux connected React.Component</option>
                            <option>Generic</option>
                        </select>
                       
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <div className="ActionButton" onClick={()=>this.props.act_addComponent(this.state)}>Add</div>
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
  {act_addComponent}
)(AddComponent)