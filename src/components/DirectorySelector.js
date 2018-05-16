import React from 'react';
import {connect} from 'react-redux';

import {act_startAnalysis} from '../actions';

const electron = window.require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')




class DirectorySelector extends React.Component{

    constructor(props){
        super(props);
        this.state={
            path:undefined,
            packagePath:undefined,
            exclusions:props.config.exclusions,
            reviewer:props.config.reviewer
        }
    }

    _onDirectorySelected(files){
        if(files && files.length > 0){
            this.setState({path:files[0]});
        }
    }
    
    
    render(){
        return (
                <div className="App">
                    <div className="Form" style={{width:500}}>
                    
                        <h3>Choose an existing project</h3>

                        <span style={{marginTop:20}} >Locate the project package.json file (in your root project directory)</span>
                        <div className="ActionButton" style={{margin:0, overflowX:'hidden', whiteSpace:'nowrap'}} onClick={()=>mainProcess.selectFile(files=>{
                            if(files && files.length>0) this.setState({packagePath:files[0]})})
                        }>
                            {this.state.packagePath ?`> ${this.state.packagePath}`: '> Click to select'}
                        </div>

                        <span style={{marginTop:20}} >Exclude files and/or directories (use comma as separator)</span>
                        <input type="text" value={this.state.exclusions}
                            style={{color:"grey", fontStyle:'italic'}}
                            onChange={e=>this.setState({exclusions:e.target.value})}
                        />

                        <span style={{marginTop:20}} >Your reviewer name</span>
                        <input type="text" value={this.state.reviewer}
                            style={{color:"grey", fontStyle:'italic'}}
                            onChange={e=>this.setState({reviewer:e.target.value})}
                        />
                        
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <div className="ActionButton" onClick={()=>{if(this.state.packagePath)this.props.act_startAnalysis(this.state)}}>Start analysis</div>
                        </div>
                    </div>
                </div>)
    }
}

function mapStateToProps(state, ownProps){
    return {
        config : state.appContent.config
    }
}

export default connect(
  mapStateToProps,
  {act_startAnalysis}
)(DirectorySelector)