export const act_select_analyze=()=>{
    return {
        type:'SELECT_ANALYZE'
    }
}

export const act_select_createProject=()=>{
    return {
        type:'SELECT_CREATE'
    }
}

export const act_startAnalysis=(scanData)=>{
    return {
        type:'START_ANALYSIS', scanData
    }
}

export const act_showAddComponentForm=()=>{
    return {
        type:'SHOW_ADD_COMPONENT'
    }
}

export const act_toolReload=()=>{
    return {
        type:'TOOL_RELOAD'
    }
}

export const act_toolLoadProject=()=>{
    return {
        type:'TOOL_LOAD_PROJECT'
    }
}

export const act_addComponent=()=>{
    return {
        type:'ADD_COMPONENT'
    }
}

export const act_analyzeFinished = r=>{
    return {
        type:'ANALYZE_FINISHED', r
    }
}

export const act_toggleHighligth = n=>{
    return {
        type:'TOGGLE_HIGHLIGHT_NODE', n
    }
}

export const act_showCodeForFile = f=>{
    return {
        type:'SHOW_CODE_FOR_FILE', f
    }
}

export const act_editor_expand = ()=>{
    return{
        type:'EDITOR_EXPAND'
    }
}
export const act_editor_contract = ()=>{
    return{
        type:'EDITOR_CONTRACT'
    }
}
export const act_editor_close = ()=>{
    return{
        type:'EDITOR_CLOSE'
    }
}
export const act_search_pattern = p =>{
    return{
        type:'SEARCH_PATTERN', p
    }
}

export const act_toggleEditorLine = (l,lineData)=>{
    return{
        type:'TOGGLE_EDITOR_LINE', l,lineData
    }
}

export const act_toggle_comBlock = visible=>{
    return{
        type:'TOGGLE_COM_BLOCK', visible
    }
}

export const act_addComment = com=>{
    return{
        type:'ADD_COMMENT', com
    }
}

export const act_exportReview = ()=>{
    return {
        type:"EXPORT_REVIEW"
    }
}

export const act_requestEditFile = ()=>{
    return{
        type:'REQUEST_EDIT_FILE'
    }
}

export const act_init = ()=>{
    return {
        type:'INIT'
    }
}