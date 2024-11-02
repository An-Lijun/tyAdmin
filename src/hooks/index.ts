import { watch } from "vue";
import useAppStore from '@/store/modules/app'
import {generateColor} from 'toyar-design/dist/index.js'
import { onBeforeRouteLeave } from 'vue-router'
import { TyAlert } from 'toyar-design'

export function watchPcolor(){
  const appStore =useAppStore()
  watch(()=> appStore.pColor,(newV)=>{
    appStore.pColors= generateColor(newV,{list:true}).slice(2,9)
  },{
    immediate:true
  })
}



export function leaveAlert(){
  const handleRouteLeave = () => {
    return new Promise((resolve,reject) => {
    const  {distroy} = TyAlert('Are you sure you want to leave?', {
        type: 'warning',
        sure: {
          code: () => {
            console.log("reslove");
            resolve(true);
            distroy()
          }
        },
        cancel: {
          code: () => {
            console.log("cancel");
            reject(false);
            distroy()
          }
        },
      });
      console.log(distroy);
      
    });
  };
  
  
  
  onBeforeRouteLeave(async (to, from) => {
    try {
      await handleRouteLeave()
      return true
    } catch (error) {
      return false
    }
  })
  
}