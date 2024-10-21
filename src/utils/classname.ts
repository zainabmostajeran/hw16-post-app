export const classNames=(...strings:string[])=>{
    return strings.filter(Boolean).join("");
}