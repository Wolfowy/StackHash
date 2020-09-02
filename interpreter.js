const Stack = require("./stack");

function interpret(exec, join=false){

    const st = new Stack()

    for(let ch = 0; ch < exec.length; ch++){

        if(parseInt(exec[ch])){
            let f = ch;
            for(;ch<exec.length;ch++){
                if(((!(parseInt(exec[ch]))&&exec[ch]!=="0")&&exec[ch]!==".")){
                    --ch
                    st.put(Number(exec.substr(f,ch-f+1)))
                    break;
                } else if (ch == exec.length-1){
                    st.put(Number(exec.substr(f,ch-f+1)))
                    break;
                }
            }
        }

        if(exec[ch]==">"){
            if(exec[ch+1]=="="){
                st.biggereq()
                ++ch
            } else {
                st.bigger()
            }
        }

        if(exec[ch]=="<"){
            if(exec[ch+1]=="="){
                st.biggereq()
                ++ch
            } else {
                st.bigger()
            }
        }

        if(exec[ch]==`"`){
            let f = ch+1;
            for(++ch;ch<exec.length;ch++){
                if(exec[ch] == `"`){
                    st.put(exec.substr(f,ch-f))
                    break;
                }
            }
        }

        switch(exec[ch]){
            case "+":
                st.add()
                break;

            case "-":
                st.sub()
                break;

            case "*":
                st.mul()
                break;

            case "/":
                st.div()
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

            case ";":
                st.shift()
                break;

            case "c":
                st.charCode()
                break;

            default:
                break;
        }
    }

    return join==true?st.content.join``:st.content
}

module.exports = interpret
