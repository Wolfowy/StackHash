function Stack(){
    this.content = []

    this.put = x=>{
        this.content.unshift(x)
    }

    this.add = ()=>{
        let s = this.content[1]+this.content[0];
        this.ridadd(s)   
    }

    this.sub = ()=>{
        let s = this.content[1]-this.content[0];
        this.ridadd(s)    
    }

    this.mul = ()=>{
        let s;
        if(Number(this.content[0])&&Number(this.content[1])){
            s = this.content[1]*this.content[0];
        } else if (typeof(this.content[0])=="string"&&Number(this.content[1])){
            s = this.content[0].repeat(Number(this.content[1]));
        } else if (Number(this.content[0])&&typeof(this.content[1])=="string"){
            s = this.content[1].repeat(Number(this.content[0]));
        } else if (typeof(this.content[0])=="string"&&typeof(this.content[1])=="string"){
            s = this.content[1]+this.content[0]
        }

        this.ridadd(s) 
    }

    this.div = ()=>{
        let s = this.content[1]/this.content[0];
        this.ridadd(s)   
    }

    this.mod = ()=>{
        let s = this.content[1]%this.content[0];
        this.ridadd(s)   
    }

    this.xor = ()=>{
        let s = this.content[1]^this.content[0];
        this.ridadd(s)    
    }

    this.and = ()=>{
        let s = this.content[1]&this.content[0];
        this.ridadd(s)    
    }

    this.or = ()=>{
        let s = this.content[1]|this.content[0];
        this.ridadd(s)    
    }

    this.bigger = ()=>{
        let s = this.content[1]>this.content[0];
        this.ridadd(s)   
    }

    this.biggereq = ()=>{
        let s = this.content[1]>=this.content[0];
        this.ridadd(s)   
    }

    this.less = ()=>{
        let s = this.content[1]<this.content[0];
        this.ridadd(s)    
    }

    this.lesseq = ()=>{
        let s = this.content[1]<=this.content[0];
        this.ridadd(s)  
    }

    this.duplicate = ()=>{
        this.put(this.index(0));    
    }

    this.threetoone = ()=>{
        [this.content[2],this.content[0]]=[this.content[0],this.content[2]]
    }

    this.twotoone = ()=>{
        [this.content[1],this.content[0]]=[this.content[0],this.content[1]]
    }

    this.signrev = ()=>{
        if(typeof(this.index(0))=="number"){
            this.content[0] = -this.content[0];
        } else if(typeof(this.index(0))=="string") {
            this.content[0] = this.index(0).split``.reverse().join``;
        }  
    }

    this.charCode = ()=>{
        if(typeof(this.index(0))=="number"){
            this.content[0] = String.fromCharCode(this.content[0])
        } else if (typeof(this.index(0))=="string" && typeof(this.index(1))=="number"){
            this.content[0] = this.content[0].charCodeAt(this.index(1)==""?this.index(1):0);
        } else if (typeof(this.index(0))=="string"){
            this.content[0] = this.content[0].charCodeAt(0);
        }
    }

    this.ridadd = x=>{
        this.shift();
        this.shift();
        this.put(x); 
    }

    this.index = i=>{
        return i>=this.content.length?"":this.content[i]
    }
    this.shift = ()=>{this.content.shift()}
}

module.exports = Stack
