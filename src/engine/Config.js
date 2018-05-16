const electron = window.require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
const fs = mainProcess.fs();
const os = mainProcess.os();
const app = mainProcess.app();
const shell = electron.shell;


class Config{
    load = ()=>{

       let _cfgFile = app.getPath("userData")+"/~conf.cfg";
       console.log(_cfgFile);
       let _config;
       if(fs.existsSync(_cfgFile)){
            _config = JSON.parse(mainProcess.readFile(_cfgFile));
        }
        else{
            _config = { reviewer:os.hostname(),
                        editor:undefined,
                        exclusions:'sssnode_modules,public,__tests__,ios,android, __mocks__,.git,build'}
            fs.writeFile(_cfgFile,JSON.stringify(_config), function(err) {
                if(err) {
                    return console.log(err);
                }
            })
        }
        return _config;
    }
    
    save = (config)=>{
        let _cfgFile = app.getPath("userData")+"/~conf.cfg";
        
        fs.writeFile(_cfgFile,JSON.stringify(config), function(err) {
            if(err) {
                return console.log(err);
            }
        })
    }

    editFile = path => shell.openItem(path);

}

export default new Config()