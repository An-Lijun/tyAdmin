import CryptoJS from 'crypto-js';
import {isSimpleType,is} from 'robinson'

/**
 * params:{}
 * options.format :[Hex, Base64, Latin1]  默认Hex
 */
self.addEventListener('message', ({data}) => {


  //从data中取参数 注意由于这里data不能是object所以做了序列化
  const [
    oText,
    type,
    opt
  ]  = JSON.parse(data)

  // 对配置项进行默认值
  let options = Object.assign({
    params:{},
    format:'Hex',
    decrypt:false
  },opt)
  
  // 转换后的字符串
  let encryptStr = ''
  
  //处理参数
  let parmas = [options.params]
  
  //处理text 
  let text = 
  oText

  if(!isSimpleType(text)){
    text = JSON.stringify(text)
  }

  if(is(options.params,'Array')){
    parmas= options.params
  }
  if(['SHA1','SHA224','SHA256','SHA3','SHA512','MD5',
    'HmacMD5','HmacSHA1','HmacSHA256','HmacSHA512','PBKDF2'
  ].includes(type)){
    let hash = CryptoJS[type](text,...parmas)
    encryptStr= hash.toString(CryptoJS.enc[options.format])
  }else if(
    ['AES'].includes(type)
  ){
    let str = options.decrypt?'decrypt':'encrypt'
    let hash  = CryptoJS.AES[str](text,...parmas)
    if(!options.decrypt){
      encryptStr =  hash.toString()
    }else{
      encryptStr = JSON.parse(hash.toString(CryptoJS.enc.Utf8))
    }
  }
  self.postMessage(encryptStr)
});