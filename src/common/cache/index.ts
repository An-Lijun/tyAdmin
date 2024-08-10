import localforage from 'localforage'
import createCache from './src/cache'
/** 
 * 
 * LocalForage 
 * 
 * 存值  indexDB.setItem("data1", "今天是个好日子")
 * 取值  indexDB.getItem('data1').then(value=> {
          console.log("数据data1",value);
         })
        .catch(err => {
          console.log('错误信息', err)
        });
 * 删除  indexDB.removeItem('data3');
 * 重置清空数据库 indexDB.clear()
 * 获取存储key的数量               indexDB.length().then(resKeys=>{console.log(resKeys)})
 * 根据key的索引获取名称           indexDB.key(2).then(keyNm=>{})
 * 获取索引keys                   indexDB.keys().then(res=>{console.log(res)})
 * 迭代循环打印所有key-value值    indexDB.iterate((val,key,iterationNum)=>{}).then(()=>{console.log('迭代完成')})
 * 
 * 删除仓库   localforage.dropInstance({
 *              name:'xxx
 *           })
 * 

——————————————————————————————————————————————————————————————————————————————————————————————

 * 选择特定存储引擎
    默认情况下，localForage 按照以下顺序选择数据仓库的后端驱动：
    （1） IndexedDB
    （2） WebSQL
    （3） localStorage
    如果你想强制使用特定的驱动，可以使用 setDriver()，参数为以下的某一个或多个：
    （1） localforage.INDEXEDDB
    （2） localforage.WEBSQL
    （3） localforage.LOCALSTORAGE

    强制设置 localStorage 为后端的驱动
    localforage.setDriver(localforage.LOCALSTORAGE);

    列出可选的驱动，以优先级排序
    localforage.setDriver([localforage.LOCALSTORAGE, localforage.INDEXEDDB]);

————————————————————————————————————————————————————————————————————————————————————————————

  配置
    localforage.config({
      driver      : localforage.LOCALSTORAGE, // 使用 LOCALSTORAGE；也可以使用 setDriver()
      name        : 'firstIndexedDB',
      version     : 1.0,
      size        : 4980736, // 数据库的大小，单位为字节。现仅 WebSQL 可用
      storeName   : 'keyvaluepairs1', // 仅接受字母，数字和下划线
      description : 'some description'
    });
    
————————————————————————————————————————————————————————————————————————————————————————————

 */

export const indexDBCache = localforage.createInstance({
  name: 'myFirstIndexedDB',
  // 支持config所有配置
  // storeName: 'keyvaluepairs', // 仅接受字母，数字和下划线
})




export const localCache = createCache(localStorage)
export const sessionCache = createCache(sessionStorage)
