/*
    Guillaume Nachury
*/

import React, {Component} from 'react';
import {connect} from 'react-redux';

import Node from '../components/Node';

class InfiniteHolder extends Component {

constructor(props) {
    super(props);
    this._elements  = [];
    
}

  componentDidMount(){
    window.addEventListener("resize", this._resizR.bind(this));
}

componentWillUnmount(){
    window.removeEventListener("resize", this._resizR.bind(this));
}

_resizR(){
    this.forceUpdate();
}

_createNode(file, idx){
    let _faded = ( this.props.highLightedNode === undefined || this.props.highLightedNode === file.key) ? false:true;
    let _hasCom = !!(this.props.projectData.files[file.key]) 

    let _xPos = (idx % this._gridW) *  (this._nW+20)
    this._yPtr += (idx % this._gridW === 0) ? 1 : 0;
    let _pos = {top:20+(this._yPtr*(this._nH+20)), left:_xPos+20};
    let n = <Node key={`k${idx}`} file={file} style={{..._pos, opacity:_faded?.3:1}} hasComments={_hasCom}/>;
    
    this._elements.push({
        ..._pos, view:n, file
    })
    return n;
}

_createAnchors(el, idx){
    let _faded = ( this.props.highLightedNode === undefined || this.props.highLightedNode === el.file.key) ? false:true;


    return (<g key={`anc${idx}`}>
            <circle cx={(el.left+ 4+(150>>1))} cy={el.top} r={4} style={{fill:"#d35400", opacity:_faded?.3:1}} />
            <circle cx={(el.left+ 4+(150>>1))} cy={el.top+82} r={4} style={{fill:"#2980b9", opacity:_faded?.3:1}} />
        </g>)
}

_createLinks(el, idx){
    let _faded = ( this.props.highLightedNode === undefined || this.props.highLightedNode === el.file.key) ? false:true;


     let _paths =  el.file.imports.map((imp, index)=>{
         let aNode = this._findElementFromPath(imp);
         if(aNode)
            return this._generateLink(el, aNode, `${idx}:${index}`, _faded)
        else
            return undefined 
        })

    return _paths;
}

_generateLink(from, to, idx, faded){
    if(faded){
        faded = ( this.props.highLightedNode === to.file.key) ? false:true;
    }
    let dx = (from.left+ (150>>1)) - (to.left+ (150>>1));
    let dy = from.top - to.top+82;
    let dist = Math.sqrt(dx*dx + dy*dy);
    let t = Math.round(.2 * dist);
    let s = Math.round(Math.min(.5 * dist, 8));

    let _orientation = from.left > to.left ? -1:1;

    const d = [
        "M"+[ from.left+ (150>>1), from.top ],
        "L"+[ from.left+ (150>>1) + (s*_orientation), from.top ],
        "C"+[ from.left+ (150>>1) + (t*_orientation), from.top ],
        [ to.left+ (150>>1) - (t*_orientation), to.top+82 ],
        [ to.left+ (150>>1) - (s*_orientation), to.top+82 ],
        "L"+[ to.left+ (150>>1), to.top+82 ]
      ].join(" ");

      return <path key={'l'+idx} d={d} className='DashLink' style={{fill:'none', stroke:'#BBB', strokeWidth:1, opacity:faded?0:1 }}/>
}

_findElementFromPath(path){
    return this._elements.find(el=>el.file.key === path);
}

_findViewportSize(){
    return {width:this._gridW * (this._nW+20), height:Math.ceil(this.props.files.length/this._gridW)*(this._nH+20)}
}

render() {
    this._w = global.window.innerWidth;
    this._h = global.window.innerHeight;
    this._nW = 190;
    this._gridW = Math.floor(this._w/(this._nW+20));
    this._nH = 90;
    this._yPtr = -1;
    this._elements = [];
    return (
        <div className='InfiniteHolder'>
            <div className='ComponentsBlocks'>
                {
                    this.props.files.map((file, idx)=> this._createNode(file, idx))
                }
            </div>
            <svg {...this._findViewportSize()} style={{position:'absolute',WebkitPointerEvents: "none",
      pointerEvents: "none"}}>
                    

                    {
                        this._elements.map((el, idx)=>this._createLinks(el, idx))
                    }
                    {
                        this._elements.map((el, idx)=>this._createAnchors(el, idx))
                    }
                </svg>
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        files:state.appContent.files,
        highLightedNode:state.appContent.highLightedNode,
        projectData:state.appContent.projectData
    }
}

export default connect(mapStateToProps, {})(InfiniteHolder);