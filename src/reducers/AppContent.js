import {push} from 'react-router-redux';
import Analyzer from '../engine/Analyzer';
import Commentator from '../engine/Commentator';
import {act_analyzeFinished} from '../actions';
import Config from '../engine/Config';
import { setTimeout } from 'core-js/library/web/timers';

const electron = window.require('electron')
const remote = electron.remote
const mainProcess = remote.require('./electron')
const mainWin = mainProcess.mainWindow();



const reducer = (state, action)=>{

    if(!state){
        state = {
            version : "v. 0.26(beta)",
            addComponent:false,
            files:[],
            highLightedNode:undefined,
            fileContent:"",
            currentEditorFile:"",
            editorExpanded:false,
            fileInEditor:false,
            projectInfo:undefined,
            searchPattern:"",
            highLightedEditorLines : {},
            fileComments: {},
            showAddComment:false,
            projectData:{},
            config:{}
        };
    }
   
    switch(action.type){
        case 'INIT':
            return {...state, config:{...Config.load()}}
        case 'SEARCH_PATTERN':
            return {...state,searchPattern:action.p }
        case  'EDITOR_EXPAND':
            return {...state, editorExpanded:true};
        case  'EDITOR_CONTRACT':
            return {...state, editorExpanded:false};
        case 'EDITOR_CLOSE':
            return {...state, fileContent:'', fileInEditor:false, currentEditorFile:""}
        case 'TOGGLE_HIGHLIGHT_NODE':
            return {...state, highLightedNode:(state.highLightedNode === action.n) ? undefined: action.n}
        case 'SELECT_ANALYZE':   
            action.asyncDispatch(push('/existing_project'));
            return {...state};
        case 'TOOL_LOAD_PROJECT':
            action.asyncDispatch(push('/existing_project'));
            return {...state};
        case 'SELECT_CREATE':
            action.asyncDispatch(push('/playground'));
            return {...state};
        case 'START_ANALYSIS':

            let _info = undefined;
            let _package = JSON.parse(Analyzer.getFileContent(action.scanData.packagePath));
            let _projectPath = action.scanData.packagePath.substr(0,action.scanData.packagePath.lastIndexOf('/'));
            if(_package){
                _info = _package.name + '_'+_package.version;
            }
            let _cfg = {...state.config, reviewer:action.scanData.reviewer, exclusions: action.scanData.exclusions};
            Config.save(_cfg);
            
            let _prjData = Commentator.loadProject(_info,action.scanData.reviewer, _projectPath);
            mainWin.setTitle('React Auditor => '+_info);

            setTimeout(()=>
            Analyzer.analyze(_projectPath, action.scanData.exclusions, _info).then(
                r=>action.asyncDispatch(act_analyzeFinished(r))
            ), 500);
            action.asyncDispatch(push('/waitprocess'));
            return {...state, projectInfo:_info, highLightedNode:undefined,
                                fileContent:"",
                                editorExpanded:false,
                                fileInEditor:false,
                                searchPattern:"",
                                projectData:{..._prjData},
                                config : _cfg
                            };
        case 'SHOW_ADD_COMPONENT':
            return {...state, addComponent:true}
        case 'ADD_COMPONENT':
            return {...state, addComponent:false, files:[...state.files, {id:new Date().getTime()}]}
        case 'ANALYZE_FINISHED':
            action.asyncDispatch(push('/playground'));
            return {...state, files:action.r}
        case 'SHOW_CODE_FOR_FILE':
            let _fileContent = Analyzer.getFileContent(action.f);
            Commentator.loadCommentsForFile(action.f, _fileContent).then(
                ({coms,projectData})=>action.asyncDispatch({type:"_ON_COMMENT_ADDED", coms,projectData})
            );
            return {...state, fileInEditor:action.f, 
                    currentEditorFile : action.f,
                    fileContent:_fileContent,
                    highLightedEditorLines:{}
                }
        case 'TOGGLE_EDITOR_LINE':
            Commentator.toggleLine(action.l).then(d=>action.asyncDispatch({type:"_ON_HIGHLINE_LINE_RESULT", lines:d}))
            return {...state}
        case '_ON_HIGHLINE_LINE_RESULT':
            return {...state, highLightedEditorLines:{...action.lines}}
        case 'TOGGLE_COM_BLOCK':
            return {...state, showAddComment:action.visible}
        case 'ADD_COMMENT':
            Commentator.addComment(action.com).then(
                ({coms,projectData})=>action.asyncDispatch({type:"_ON_COMMENT_ADDED", coms,projectData})
            )
            return {...state}
        case '_ON_COMMENT_ADDED':
            return {...state,  showAddComment:false, fileComments:{...action.coms}, projectData:{...action.projectData},highLightedEditorLines:{}}
        case 'EXPORT_REVIEW':
            Commentator.exportReview(state.projectInfo);
            return {...state}
        case 'REQUEST_EDIT_FILE':
            Config.editFile(state.currentEditorFile);
            return {...state};
        default:
            return {...state}
    }


}


export default reducer;