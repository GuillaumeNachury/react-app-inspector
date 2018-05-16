import React, {Component} from 'react';
import {connect} from 'react-redux';
import {act_editor_close,act_editor_contract, act_editor_expand, act_requestEditFile} from '../actions';
import './EditorBar.css';

class EditorBar extends Component {

render() {
    return (
        <div className='EditorBar' style={{width:this.props.width}}>
        <span>
            {this.props.canExpand && <span className='Action' onClick={()=>this.props.act_editor_expand()}><i className="fa fa-long-arrow-left" aria-hidden="true"></i>
            &nbsp;Expand viewer</span>}
            {!this.props.canExpand && <span className='Action' onClick={()=>this.props.act_editor_contract()}><i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            &nbsp;Contract viewer</span>}
            <span className='Action' style={{marginLeft:20}} onClick={()=>this.props.act_requestEditFile()}><i className="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;Edit file with external tool</span>
            </span>
            <span className='Action' onClick={()=>this.props.act_editor_close()}><i className="fa fa-window-close-o" aria-hidden="true"></i>
            &nbsp;Close viewer</span>
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        canExpand : !state.appContent.editorExpanded,
    }
}

export default connect(mapStateToProps, {act_editor_close,act_editor_contract, act_editor_expand, act_requestEditFile})(EditorBar);