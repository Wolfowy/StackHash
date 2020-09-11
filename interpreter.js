const Stack = require("./stack");
const st = new Stack(interpret)
let variables = [];

function interpret(exec, join = true, dev = false, scopeIndex=0, infunct = false){

    if(!infunct){
        variables.push([])
    }

    this.addVariable = (n,f,g,si)=>{
        let index = variables[si].findIndex(x=>x[0]==n);
        let gindex = variables[0].findIndex(x=>x[0]==n);
        
        if (si == 0) { // if actual scope i global
            if(!(index+1)){ // if doesnt exist in actual scope
                variables[0].push([n,f,"global"]) // put it
            } else if ((index+1)){ // if exists in global (actual in this case) scope 
                variables[0][gindex][1] = f;
            }
        } else if(g){ // must init global
            if(!(gindex+1) && !(index+1)){ // if doesnt exist in both scopes
                variables[si].push([n,f,"global"]) // put into actual scope
                variables[0].push([n,f,"global"]) // put into global scope
            } else if(!(gindex+1) && (index+1)){ // if doesnt exist in global
                variables[0].push([n,f,"global"]) // put into global
            } else if ((gindex+1) && !(index+1)){ // if is in global, but not in actual
                variables[si].push([n,variables[0][gindex][1],"global"]) // put to actual with the value of global one
            } else if((index+1) && (global+1)){
                console.log("already exists in both global and actual scopes")
            }
        } else { // musn't init global
            if(!(index+1)){ // if doesnt exist in actual scope
                variables[si].push([n,f,["scope",si]]) // put into the actual scope
            } else if ((index+1)){ // if already exists in actual scope
                if(variables[si][index][2] == "global"){ // if global
                    variables[0][gindex][1] = f;
                } else { // if not global
                    variables[si][index][1] = f;
                }
            }
        }
    }

    this.readvar = (n,funDo=true,si=0)=>{
        let a;
        try {
            a = variables[si].filter(x=>x[0]==n)[0][1]
            if(a=="global"){
                a = variables[0].filter(x=>x[0]==n)[0][1]
            }
        } catch {
            a = variables[0].filter(x=>x[0]==n)[0][1]
        }
        
        if(a[1]=="function"){
            if(funDo){
                st.put(interpret(a[0], true, false, si+1))
                st.shift()
            } else {
                st.put(a[0],a[1])
            }
        } else {
            st.put(a[0],a[1])
        }
    }

    this.destroyVariable = (n)=>{
        variables[scopeIndex].splice(variables[scopeIndex].findIndex(x=>x[0]==n),1)
    }

    for(let ch = 0; ch < exec.length; ch++){
        if(parseInt(exec[ch]) || exec[ch]=="0"){
            let f = ch;
            for(;ch<exec.length;ch++){
                if( ( ( !(parseInt(exec[ch])) && exec[ch]!=="0") && exec[ch]!==".") ){
                    --ch
                    st.put(Number(exec.substr(f,ch-f+1)))
                    break;
                } else if (ch == exec.length-1){
                    st.put(Number(exec.substr(f,ch-f+1)))
                    break;
                }
            }
        }

        if(exec[ch]=="<"){
            if(exec[ch+1]=="="){
                st.biggereq()
                ++ch
                break;
            } else {
                st.bigger()
            }
        }

        if(exec[ch]==">"){
            if(exec[ch+1]=="="){
                st.lesseq()
                ++ch
                break;
            } else {
                st.less()
            }
        }

        if(exec[ch]=="i" && exec[ch+1]=="f"){
            if(exec[ch+2] == "e" && exec[ch+3] == "l"){
                interpret(st.content[2][0], true, false, scopeIndex, true)
                if(st.content[0][0]){
                    let toInter = st.content[2][0]
                    st.shift()
                    st.shift()
                    st.shift()
                    st.shift()
                    interpret(toInter, true, false, scopeIndex, true)
                } else {
                    let toInter = st.content[1][0]
                    st.shift()
                    st.shift()
                    st.shift()
                    st.shift()
                    interpret(toInter, true, false, scopeIndex, true)
                }
                ch+=4
            } else {
                interpret(st.content[1][0], true, false, scopeIndex, true)
                if(st.content[0][0]){
                    let toInter = st.content[1][0]
                    st.shift()
                    st.shift()
                    st.shift()
                    interpret(toInter, true, false, scopeIndex, true)
                } else {
                    st.shift()
                    st.shift()
                    st.shift()
                }
                ch+=2
            }
        }

        if(exec[ch]=="w"&&exec[ch+1]=="h"&&exec[ch+2]=="i"&&exec[ch+3]=="l"&&exec[ch+4]=="e"){
            let war = st.content[1][0], fun = st.content[0][0];
            st.shift();
            st.shift();
            while(true){
                interpret(war, true, false, scopeIndex, true)
                
                //console.log(st.content)
                if(st.content[0][0]){
                    st.shift()
                    interpret(fun, true, false, scopeIndex, true);
                } else {
                    st.shift()
                    break;
                }
            }
            ch+=5;
        }

        this.checkFunction = ()=>{
            if(exec[ch]==`{`){
                let f = ch+1;
                let off = 0;
                for(++ch;ch<exec.length;ch++){
                    if(exec[ch] == `}` && off == 0){
                        if(exec[ch+1]==":" || !(exec[ch+1]==")"&&exec[f-2]=="(")){
                            st.put(exec.substr(f,ch-f),"function")
                        } else if((exec[ch+1]!==":" || (exec[ch+1]==")"&&exec[f-2]=="("))||ch == exec.length-1){
                            interpret(exec.substr(f,ch-f), true, false, scopeIndex+1)
                            ch++
                        }
                        break;
                    } else if (exec[ch] == '}' && off > 0){
                        off--
                    } else if (exec[ch] == '{'){
                        off++
                    }
                }
            }
        }

        this.checkFunction()

        if(exec[ch]==`"`){
            let f = ch+1;
            for(++ch;ch<exec.length;ch++){
                if(exec[ch] == `"` && exec[ch-1] !== "\\"){
                    st.put(exec.substr(f,ch-f))
                    break;
                }
            }
        }

        if(exec[ch]==":") {
            let f = ch+1;
            for(++ch;ch<exec.length;ch++){
                if((exec[ch] == " " || exec[ch] == ";" || exec[ch].charCodeAt(0) == 10) && !RegExp(/^\p{L}/,'u').test(exec[ch])){
                    this.addVariable(exec.substr(f,ch-f),st.index(0),false,scopeIndex)
                    break;
                } else if (ch == exec.length-1){
                    this.addVariable(exec.substr(f,ch-f+1),st.index(0),false,scopeIndex)
                    break;
                }
            }
        }

        if(exec[ch]=="$"){
            let f = ch+1;
            for(++ch;ch<exec.length;ch++){
                if((exec[ch] == " " || exec[ch] == ";" || exec[ch] == "\n") && !RegExp(/^\p{L}/,'u').test(exec[ch])){
                    this.addVariable(exec.substr(f,ch-f),"global",true,scopeIndex)
                    break;
                } else if (ch == exec.length-1){
                    this.addVariable(exec.substr(f,ch-f+1),"global",true,scopeIndex)
                    break;
                }
            }
        }

        if(RegExp(/^\p{L}/,'u').test(exec[ch])) {
            let f = ch;
            if (ch == exec.length - 1 || exec[ch-1]==":"){
                if(exec[f-1] == "(" && exec[ch+1] == ")")
                    this.readvar(exec.substr(f,ch-f+1),false,scopeIndex)
                else 
                    this.readvar(exec.substr(f,ch-f+1),true,scopeIndex)
                break;
            }
            for(++ch;ch<exec.length;ch++){
                if(!RegExp(/^\p{L}/,'u').test(exec[ch])){
                    if(exec[f-1] == "(" && exec[ch] == ")"){
                        this.readvar(exec.substr(f,ch-f),true,scopeIndex)
                    } else {
                        this.readvar(exec.substr(f,ch-f),false,scopeIndex)
                    }
                        
                    break;
                } else if (ch == exec.length - 1){
                    this.readvar(exec.substr(f,ch-f+1),true,scopeIndex)
                    ch++
                    break;
                }
                continue;
            }
            --ch
        }

        switch(exec[ch]){
            case "+":
                st.add()
                break;

            case "-":
                st.sub()
                break;

            case "*":
                if(exec[ch+1]=="*"){
                    st.pow()
                    ch++
                } else {
                    st.mul()
                }
                break;

            case "/":
                st.div()
                break;

            case "~":
                st.toBool()
                break;
            case "%":
                st.mod()
                break;

            case "^":
                st.xor()
                break;

            case "&":
                st.and()
                break;

            case "|":
                st.or()
                break;

            case ",":
                st.duplicate()
                break;

            case "@":
                st.threetoone()
                break;

            case "#":
                st.twotoone()
                break;

            case "?":
                st.signrev()
                break;

            case "=":
                st.eq()
                break;

            case ";":
                st.shift()
                break;

            case "[":
                console.log(st.content)
                console.log("")
                break;

            case "€":
                st.charCode()
                break;

            case "_":
                st.print(st.content[0][0])
                break;

            default:
                break;
        }
    }

    if(!infunct){
        variables.pop()
    }

    if(join){
        let joined = ""
        for(let i = 0; i < st.content.length; i++){
            joined += st.content[i][0]
        }
        return joined
    } else if (dev){
        return [st,variables]
    }
    return st.content
}

module.exports = [interpret,st]
