export const checkExtension = (file:string)=>{

    const size = file.length;
    const extension = (file.substr(size-3));
    
    return extension;
}