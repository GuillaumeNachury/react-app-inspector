/*
    Guillaume Nachury 
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { findDOMNode } from 'react-dom';
import highlight from 'highlight.js';
import EditorBar from '../components/EditorBar';
import {act_toggleEditorLine, act_toggle_comBlock} from '../actions';
import './Editor.css';

import SyntaxHighlighter, {createElement} from 'react-syntax-highlighter';



class Editor extends Component {
    componentDidMount(){
        window.addEventListener("resize", this._resizR.bind(this));
    }
    
    componentWillUnmount(){
        window.removeEventListener("resize", this._resizR.bind(this));
    }
    
    _resizR(){
        this.forceUpdate();
    }
    
    _customRenderer({ row, stylesheet, useInlineStyles }, { index, key, style }){
        let _el = createElement({
            node: row,
            stylesheet,
            style,
            useInlineStyles,
            key
        });
        return <span className="tooltip" key={`s${key}`} style={{cursor:'pointer'}} onClick={()=> this.props.act_toggleEditorLine(index+1)}>
            {this.props.fileComments[`l${index+1}`] && <div className="tooltiptext">{this.props.fileComments[`l${index+1}`]}</div>}
        
        {_el}
            
        </span>;
    }

    _onEnter(){
       this.props.act_toggle_comBlock(true);
    }


render() {
    let _xPos = this.props.fileInEditor?(this.props.editorExpanded?0:global.window.innerWidth-800):global.window.innerWidth;
    let _w = (_xPos === 0) ? global.window.innerWidth : 800;
    return (
        <div className="Editor" style={{left:_xPos, width:_w}}
            onKeyUp={e=>e.key === 'Enter' && this._onEnter()}
            tabIndex="0"
            >
            <EditorBar width={_w}/>
            <div style={{marginTop:60, paddingLeft:10}}>
            <SyntaxHighlighter language='javascript' 
            lineStyle={
                ln=>{
                    let style = { display: 'block' };
                    if(this.props.fileComments[`l${ln}`]){
                        style.backgroundColor = '#f39c12';
                    }
                    if (this.props.highLightedEditorLines[`l${ln}`]) {
                        style.backgroundColor = '#1abc9c';
                    }
                    return style;
                }
            }
            renderer={({ rows, stylesheet, useInlineStyles })=>{
                
                return (<div style={{height: "100%"}}>
                    {rows.map((row,index)=> this._customRenderer({row, stylesheet, useInlineStyles}, {index, key:`aR${index}`,style:{} }))}
                    </div>
                    )
            }}
            showLineNumbers >{this.props.fileContent}</SyntaxHighlighter>
            </div>
        </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        fileInEditor : state.appContent.fileInEditor,
        fileContent : state.appContent.fileContent,
        editorExpanded : state.appContent.editorExpanded,
        highLightedEditorLines: state.appContent.highLightedEditorLines,
        fileComments:state.appContent.fileComments
    }
}

export default connect(mapStateToProps, {act_toggleEditorLine, act_toggle_comBlock})(Editor);