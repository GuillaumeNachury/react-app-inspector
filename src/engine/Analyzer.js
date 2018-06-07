import {normalize} from "../utils/normalizer";
const electron = window.require('electron')
const remote = electron.remote
const mainProcess = remote.require('./electron')
const fs = mainProcess.fs();
const os = mainProcess.os();
const _path = require('path');
const IMPORT_PATTERN = /import(?:["'\s]*[\w*{}\n, ]+from\s*)?["'\s](.*[@\w/_-]+)["'\s].*/g
const _separator = os.platform().indexOf('win') === 0 ? "\\":"/";

class Analyzer{

  
    init(store){
      this._store = store;
  }
  
   analyze(path, exclusions, info){
        if(exclusions){
            this.exclusions = exclusions.split(',').map(el=>el.replace(/\s/g,''));
        }
        
        
        
        this._basePath = path;
        
        return new Promise((res,rej)=>{
            this._deferredRes = res;
            this._deferredRej = rej;
            this._aliasMap = {};
            this._result = [];
            this._needPostprocess = false;
            this.browse(path);
            if(this._needPostprocess){
                this._postProcess();
            }
            this._deferredRes(this._result);
        })
    }

   browse(path){
    let _files = fs.readdirSync(path);
    let _fullPath;
    
    
    for(var _i=0; _i<_files.length; _i++){
        if(this.exclusions && this.exclusions.indexOf(_files[_i])!== -1 ) continue;
        
        _fullPath = path+_separator+_files[_i];

        if(fs.lstatSync(_fullPath).isDirectory()){
            this.browse(_fullPath)
        }
        else{
            let fTxt=undefined;
            //manage package aliases
            if(_files[_i] === 'package.json'){
                fTxt = mainProcess.readFile(_fullPath);
                if(fTxt){
                    let _dirPkg = JSON.parse(fTxt);
                    if(_dirPkg && _dirPkg.name){
                        this._aliasMap[_dirPkg.name] = _fullPath.replace(_separator+'package.json','');
                    }
                }
                continue;
            }
            let _xt = _path.extname(_fullPath).toLowerCase();
            if(_xt !== '.js') continue;
            
            if(!fTxt)
                fTxt = mainProcess.readFile(_fullPath);

            let match = null;
            let _imports = [];
            let _deps =[];
            let _resolvedPath;
            while ( (match = IMPORT_PATTERN.exec( fTxt )) !== null  ){
                let _importSrc= match[1];
                if(_importSrc.indexOf('@') === 0){
                    this._needPostprocess = true;
                    _imports.push(_importSrc)
                }
                else if(_importSrc.indexOf('.') !== 0){
                    _deps.push(_importSrc)
                }
                else{
                    _importSrc = this.findRealFileName(path, _importSrc);
                    //_imports.push(_path.resolve(path+'/'+_importSrc));
                    _resolvedPath = _path.resolve(path+_separator+_importSrc);
                    if(os.platform().indexOf("win") === 0){
                        if(_resolvedPath.indexOf("/")===0) _resolvedPath = _resolvedPath.substr(1);
                        _resolvedPath=normalize(_resolvedPath)
                    }
                    _import.push(_resolvedPath);
                }     
            }
            let _relP = path.replace(this._basePath, '');
            _relP = _relP == '' ? '/':_relP; 
            this._result.push({
                name : _files[_i],
                key:_fullPath,
                relativePath:_relP,
                imports : _imports,
                dependencies : _deps
            })   

        }   
    }
    
  }

  _postProcess(){
      this._result.forEach((el, idx, src)=>{
        if(el.imports && el.imports.length>0){
            el.imports.forEach((imp, impIdx, srcImp)=>{
                if(imp.indexOf("@") === 0){
                    let _alias = imp.match(/(@\S*)/)[0];
                    let _hasSlash = _alias.indexOf(_separator);
                    if(_hasSlash>-1){
                        _alias = _alias.substr(0,_hasSlash);
                    }
                    srcImp[impIdx] = this.findRealFileName(undefined, imp.replace(_alias,this._aliasMap[_alias]));
                }
            })
        }
      })
  }


  getFileContent(path){
    return mainProcess.readFile(path);
  }

  findRealFileName(path, importedPath){

        if(path) path +=_separator;
        else path = "";

        if(os.platform().indexOf('win') === 0){
            importedPath = importedPath.replace(/\//g, _separator);
        }
        

        if(fs.existsSync(path+importedPath) && fs.lstatSync(path+importedPath).isFile()){
            return importedPath;
        }
        if(fs.existsSync(path+importedPath+'.js') && fs.lstatSync(path+importedPath+'.js').isFile()){
            return importedPath+'.js';
        }
        if(fs.existsSync(path+importedPath+'.android.js') && fs.lstatSync(path+importedPath+'.android.js').isFile()){
            return importedPath+'.android.js';
        }
        if(fs.existsSync(path+importedPath+'.ios.js') && fs.lstatSync(path+importedPath+'.ios.js').isFile()){
            return importedPath+'.ios.js';
        }
        if(fs.existsSync(path+importedPath+_separator+'index.js') && fs.lstatSync(path+importedPath+_separator+'index.js').isFile()){
            return importedPath+_separator+'index.js';
        }
        if(fs.existsSync(path+importedPath+_separator+'index.android.js') && fs.lstatSync(path+importedPath+_separator+'index.android.js').isFile()){
            return importedPath+_separator+'index.android.js';
        }
        if(fs.existsSync(path+importedPath+_separator+'index.ios.js') && fs.lstatSync(path+importedPath+_separator+'index.ios.js').isFile()){
            return importedPath+_separator+'index.ios.js';
        }

    }

}

export default new Analyzer();