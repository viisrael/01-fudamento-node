﻿import {Readable, Writable, Transform} from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1
    
    _read(){
        const i = this.index++
        
        setTimeout(() =>{
            if(i > 100){
                this.push(null)
            }else{
                const buf = Buffer.from(String(i))
                this.push(buf) //tudo que está no push é o chuck
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1
        
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable{
    _write(chuck, encoding, callback){
        console.log(Number(chuck.toString()) * 10)
        
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())