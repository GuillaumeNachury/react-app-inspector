/*
    Guillaume Nachury 
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Toolbar.css';

import {act_toolLoadProject, act_search_pattern, act_exportReview} from '../actions';

class Toolbar extends Component {


render() {
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
            
         </span> 
         
         
        </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        searchPattern : state.appContent.searchPattern
    }
}

export default connect(mapStateToProps, {act_toolLoadProject, act_search_pattern, act_exportReview})(Toolbar);