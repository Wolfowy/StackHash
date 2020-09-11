function Stack(interpreter){
    this.content = []

    this.put = (x,y)=>{
        let type;
        if(y==undefined){
            if(typeof(x)=="string"){
                if(x[0]=="{"){
                    type = "function"
                } else {
                    type = "string"
                }
            } else if (typeof(x)=="number" || "boolean"){
                type = "number"
            }
        } else {
            type = y
        }
        this.content.unshift([x,type])
    }

    this.add = ()=>{
        this.ridadd(this.content[1][0]+this.content[0][0])   
    }

    this.sub = ()=>{
        this.ridadd(this.content[1][0]-this.content[0][0])    
    }

    this.if = ()=>{
        if(this.content[1][0]){
            this.run(this.content[0][0])
        }
    }

    this.toBool = ()=>{
        let s = this.content[0][0];
        this.shift()
        this.put(Boolean(s)|0);
    }

    this.run = (exec) => interpreter(exec);
    
    this.mul = ()=>{
        let s;
        if(this.content[1][1]=="number"&&this.content[0][1]=="number"){
            s = this.content[1][0]*this.content[0][0];
        } else if (this.content[0][1]=="string"&&this.content[1][1]=="number"){
            s = this.content[0][0].repeat(Number(this.content[1][0]));
        } else if (this.content[0][1]=="number"&&this.content[1][1]=="string"){
            s = this.content[1][0].repeat(Number(this.content[0][0]));
        } else if (this.content[1][1]=="string"&&this.content[0][1]=="string"){
            s = this.content[1][0]+this.content[0][0]
        }

        this.ridadd(s) 
    }

    this.pow = ()=>{
        this.ridadd(this.content[1][0]**this.content[0][0])
    }

    this.div = ()=>{
        let s = this.content[1][0]/this.content[0][0];
        this.ridadd(s)   
    }

    this.mod = ()=>{
        let s = this.content[1][0]%this.content[0][0];
        this.ridadd(s)   
    }

    this.xor = ()=>{
        let s = this.content[0][0]^this.content[1][0];
        this.ridadd(s)    
    }

    this.and = ()=>{
        let s = this.content[0][0]&this.content[1][0];
        this.ridadd(s)    
    }

    this.or = ()=>{
        let s = this.content[0][0]|this.content[1][0];
        this.ridadd(s)    
    }

    this.bigger = ()=>{
        let s = this.content[0][0]>this.content[1][0];
        this.ridadd(s)   
    }

    this.biggereq = ()=>{
        let s = this.content[0][0]>=this.content[1][0];
        this.ridadd(s)   
    }

    this.less = ()=>{
        let s = this.content[0][0]<this.content[1][0];
        this.ridadd(s)    
    }

    this.lesseq = ()=>{
        let s = this.content[0][0]<=this.content[1][0];
        this.ridadd(s)  
    }

    this.eq = ()=>{
        let s = this.content[1][0]==this.content[0][0];
        this.ridadd(s)  
    }

    this.duplicate = ()=>{
        this.put(this.index(0)[0]);    
    }

    this.threetoone = ()=>{
        [this.content[2],this.content[0]]=[this.content[0],this.content[2]]
    }

    this.twotoone = ()=>{
        [this.content[1],this.content[0]]=[this.content[0],this.content[1]]
    }

    this.signrev = ()=>{
        if((this.index(0)[1])=="number"){
            this.content[0][0] = -this.content[0][0];
        } else if((this.index(0)[1])=="string") {
            this.content[0][0] = this.index(0)[0].split``.reverse().join``;
        }  
    }

    this.charCode = ()=>{
        if(this.index(0)[1]=="number"){
            this.content[0][0] = String.fromCharCode(this.content[0][0])
        } else if (this.index(0)[1]=="string" && this.index(1)[1]=="number"){
            this.content[0][0] = this.content[0][0].charCodeAt(this.index(1)[0]==""?this.index(1):0);
        } else if (this.index(0)[0]=="string"){
            this.content[0][0] = this.content[0][0].charCodeAt(0);
        }
    }

    this.ridadd = x=>{
        this.shift();
        this.shift();
        this.put(x); 
    }

    this.print = x =>{
        console.log(x)
    }

    this.index = (i)=>{
        return i>=this.content.length?"":this.content[i]
    }

    this.shift = ()=>{this.content.shift()}
}

module.exports = Stack
