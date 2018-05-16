const electron = window.require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
const fs = mainProcess.fs();
const app = mainProcess.app();
const readline = mainProcess.readline();
const os = mainProcess.os();


class Commentator{

    loadProject = (info,reviewer, projectPath)=>{
        this.projectPath = projectPath;
        this.info = info;
        this.reviewer = reviewer;
        this._prjFile = app.getPath("userData")+"/"+info;
        let _prjFileContent = {creation_date:new Date(),files:{}};
        if(fs.existsSync(this._prjFile)){
            _prjFileContent = JSON.parse(mainProcess.readFile(this._prjFile));
        }
        this.projectData = _prjFileContent;

        return this.projectData;
    }

    loadCommentsForFile = (f,d)=>new Promise((res,rej)=>{
        //let _checksum = mainProcess.getChecksum(d);

        this.highlightedLines = {};
        this.currentFileKey = f;
        this.comments= this.projectData.files[this.currentFileKey] || {}; 
        res({coms:this.comments, projectData:this.projectData})
    })

    toggleLine = ln =>new Promise((res,rej)=>{
        if(this.highlightedLines[`l${ln}`] === true){
            delete this.highlightedLines[`l${ln}`];
        }
        else
        this.highlightedLines[`l${ln}`] = true;

        res(this.highlightedLines);
    })

    addComment = com=> new Promise((res,rej)=>{
        for(let k of Object.keys(this.highlightedLines)){
            this.comments[k] = com;
        }
        this.highlightedLines={};
        this.projectData.files[this.currentFileKey] = this.comments;

        fs.writeFile(this._prjFile,JSON.stringify(this.projectData), function(err) {
            if(err) {
                return console.log(err);
            }
        })
        res({coms:this.comments, projectData:this.projectData});
    })

    exportReview = (info)=> new Promise((res,rej)=>{
        this.deferredPathSel = res;
        mainProcess.saveTo(info, this.onSavePathSelected);  
    })

    onSavePathSelected = (path)=>{
        if(path){
        
            this.exportPathFile = path;
            this.generateMDExport();
        }
        
    }

    generateMDExport = ()=>{
        let _md = "# Code Review for "+this.info+"\n";
        _md += "  * Reviewer : "+this.reviewer+"\n";
        _md += "  * Date : " + new Date()+"\n";
        _md += "\n\nReview\n"; 
        _md += "\n";

        
        this.filesToProcess = Object.keys(this.projectData.files);
        this.processPtr = -1;
        this.buffer = _md;
        this.processFiles();
        
        
        //return _md;
    }

    processFiles(){
        this.processPtr +=1;
        if(this.processPtr<this.filesToProcess.length){
            let _currentFile = this.filesToProcess[this.processPtr];
            let lines = Object.keys(this.projectData.files[_currentFile]);
            
            this.buffer += "\n## ⁍ "+_currentFile.replace(this.projectPath, '')+"\n";
            this.readLinesfromFile(lines,_currentFile)

           
        }
        else{

            fs.writeFile(this.exportPathFile,this.buffer, function(err) {
                if(err) {
                    return console.log(err);
                }
            })

            this.deferredPathSel();
        }
       

    }

    readLinesfromFile=(lines,filePath )=>{
        let _linesNum = lines.map((it)=>it.substr(1));
        let _idx = 0;
        let _result = {};

        let _lineTxt = mainProcess.readFile(filePath).split(os.EOL);
          
        _linesNum.forEach(element => {
            this.buffer += "Message :_"+this.projectData.files[filePath][`l${element}`]+"_\n\n";
            this.buffer += "| line # | Code |\n";
            this.buffer += "|:------:|------|\n";
            this.buffer += `|${element}|${_lineTxt[parseInt(element)-1]}|\n\n\n`;
        });

        this.buffer += "---\n\n\n";
            

        this.processFiles();
          
    }
    

}

export default new Commentator()