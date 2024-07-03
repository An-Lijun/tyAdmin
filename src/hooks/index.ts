import { watch } from "vue";
import useAppStore from '@/store/modules/app'
import {generateColor} from 'toyar-design/dist/index.js'

export function watchPcolor(){
  const appStore =useAppStore()
  watch(()=> appStore.pColor,(newV)=>{
    appStore.pColors= generateColor(newV,{list:true}).slice(2,9)
  },{
    immediate:true
  })
}