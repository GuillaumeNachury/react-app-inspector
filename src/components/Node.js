/*
    Guillaume Nachury
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {act_toggleHighligth, act_showCodeForFile} from '../actions';

import './Node.css';

class Node extends Component {

render() {
    let _style = {...this.props.style};
    if( this.props.searchPattern.length >0 &&
        this.props.file.name.toUpperCase().indexOf(this.props.searchPattern.toUpperCase()) !== -1){
            _style = {..._style, border:"1px solid rgba(219, 0, 0,1)", backgroundColor:'rgba(219, 0, 0,.3)'}
        }
    return (
        <div className='Node' style={{..._style}}>
                <h3>{this.props.file.name}</h3>
                <span>{this.props.file.relativePath}</span>
                <i className="fa fa-random Highlighter" aria-hidden="true" onClick={()=>this.props.act_toggleHighligth(this.props.file.key)}></i>
                <i className="fa fa-code Code" aria-hidden="true" onClick={()=>this.props.act_showCodeForFile(this.props.file.key)}></i>
                {this.props.hasComments && <i className="fa fa-commenting Com" aria-hidden="true"></i> } 
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        searchPattern : state.appContent.searchPattern
    }
}

export default connect(mapStateToProps, {act_toggleHighligth, act_showCodeForFile})(Node);