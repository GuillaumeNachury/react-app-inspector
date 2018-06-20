/*
    Guillaume Nachury 
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Toolbar.css';

import {getFilter} from '../utils/Coloring';

import {act_toolLoadProject, act_search_pattern, act_exportReview, act_togglePackageColors, 
    act_applyColorFilter,
    act_toggleColorSettings} from '../actions';

class Toolbar extends Component {
constructor(props){
    super(props);
    this.state={
        colorFilter:getFilter()
    }
}
/*
getDerivedStateFromProps(nextProps, prevState){
    if(this.props.colorSettingsDisplayed == false && nextProps.colorSettingsDisplayed == true){
        this.setState({colorFilter:getFilter()});
    }
}*/

componentWillReceiveProps(nextProps){
    if(this.props.colorSettingsDisplayed == false && nextProps.colorSettingsDisplayed == true){
        this.setState({colorFilter:getFilter()});
    }
}

render() {

    let colorSettings =  (<span style={{paddingTop:10, borderTopColor:'#EFEFEF', borderWidth:0, borderTopWidth:1, borderStyle:"dashed", marginTop:10}}>
                            <span  >
                                    Exclude these packages from coloring 
                                    <input type='search' style={{border:0, borderRadius:5,height:20,paddingLeft:5, paddingRight:5, width:276, marginLeft:10}}
                                        value={this.state.colorFilter}
                                        onChange={e=>{
                                            this.setState({colorFilter: e.target.value});
                                        }}
                                    />
                                    <span style={{marginLeft:20, cursor:'pointer'}} onClick={()=>this.props.act_applyColorFilter(this.state.colorFilter)}>Apply</span>
                                </span>
                        </span>)

    return (
        
        <div className='Toolbar'>
        <span>
            <span onClick={()=>{this.props.act_toolLoadProject()}}><i className="fa fa-wpexplorer" aria-hidden="true"></i> <span style={{color:'#FFF', marginLeft:5, cursor:'pointer'}}>Audit another project</span></span>
            {/*<span style={{marginLeft:20}} onClick={()=>{this.props.act_toolLoadProject()}}><i className="fa fa-refresh" aria-hidden="true"></i> <span style={{color:'#FFF', marginLeft:5, cursor:'pointer'}}>Synchronize with filesystem</span></span>
            */}
            <span style={{marginLeft:20}} ><i className="fa fa-search" aria-hidden="true"></i> <span style={{color:'#FFF', marginLeft:5, cursor:'pointer'}}>
                <input type='search' style={{border:0, borderRadius:5,height:20,paddingLeft:5, paddingRight:5, width:300}}
                    value={this.props.searchPattern}
                    onChange={e=>{
                        this.props.act_search_pattern(e.target.value);
                    }}
                />
                </span>
            </span>
            <span style={{marginLeft:20}} onClick={()=>{this.props.act_exportReview()}}><i className="fa fa-file-text" aria-hidden="true"></i> <span style={{color:'#FFF', marginLeft:5, cursor:'pointer'}}>Export code review</span></span>
            
            <span style={{marginLeft:20, color:this.props.packageColoring?"#B6B61E":"#FFF"}} onClick={()=>{this.props.act_togglePackageColors()}} ><i className="fa fa-paint-brush" aria-hidden="true"></i> 
                <span style={{ marginLeft:5, marginRight:5, cursor:'pointer'}}>Toggle package colors</span>
               
                </span>
                <span style={{cursor:"pointer"}}
                    onClick={()=>this.props.act_toggleColorSettings()}
                    >
                <i className="fa fa-caret-down" aria-hidden="true" style={{verticalAlign: "bottom",transform:`rotate(${this.props.colorSettingsDisplayed?"180":"0"}deg)`, transition:'all 300ms'}}
                    ></i>
                </span>
         </span> 
             {
                 this.props.colorSettingsDisplayed && colorSettings
             }       

        
        </div>
       
        )
    }
}


export default connect(
        ({appContent:{searchPattern,packageColoring,colorSettingsDisplayed}})=>({searchPattern,packageColoring,colorSettingsDisplayed}), 
        {act_toolLoadProject, act_search_pattern, act_exportReview, 
            act_applyColorFilter,
            act_togglePackageColors,act_toggleColorSettings}
    )(spy(Toolbar));


function spy(Comp){

    return class extends Component{
        componentWillReceiveProps = function(nextProps){
            console.log("-->", nextProps);
        }
    
        render(){
           return  <Comp {...this.props} />
        }
    }
    

}

