export const normalize = p=>{

    let _ar = p.split(/\\/);
    let ptr = 0;
    while(true){
    if(ptr>_ar.length) break;
    
    switch(_ar[ptr]){
        case '':
        case '.':
            _ar.splice(ptr,1);
            ptr--;
        break;
        case '..':
            _ar.splice(ptr-1,2);
            ptr -=2;
        break;
    }
    
    ptr++;
    }

    return(_ar.join('\\'));
    
    }
 