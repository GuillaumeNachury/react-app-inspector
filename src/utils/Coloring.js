let skipped = [];
let filter = "";
let _tmpFilter = "";
const HUE_STEP= 33;

let MAP = undefined;

export const getMap = files => new Promise((res, rej)=>{
    if(MAP != undefined) res(MAP);
    const _rootColors = {};
    let _huePtr = 20;
    const _m = {};

    for(let file of files){
        if(_m[file.relativePath] != undefined) continue;
        let _rPath = file.relativePath;
        let _skip = false;

       for(let i=0; i<skipped.length; i++){
           if(skipped[i] == file.relativePath){
            _skip =true;
            break;
           }
           if(_rPath.indexOf(skipped[i]) == 0){
               _rPath = _rPath.replace(skipped[i], "")
               break;
           }
       }

       if(_skip) continue;

        let dirs = _rPath.split('/');
        let _h = _rootColors[dirs[1]];
        if( _h == undefined){
            _rootColors[dirs[1]] = _huePtr;
            _h = _huePtr;
            _huePtr += HUE_STEP
        }
        _m[file.relativePath] = `hsl(${_h}, 70%, ${60+(dirs.length-2)*3}%)`
    }
    res(_m);
})

export const updateFilter = pattern =>{
 filter = pattern;
}

export const getFilter = ()=> {
    _tmpFilter = filter;
    return filter;
};

export const applyFilter = (pattern)=>{
    filter = pattern;
    skipped = filter.split(',')
}
