<template>
  <div class="divRoot">
    <tHeader title="打印函数" info="toyar-admin 自己封装打印函数" />
    <div class="tyAdmin__container">
      <TyCard>

        <TyButton @click="printByhtmlTpl" style="margin-right: 10px;">打印html模板</TyButton>
        <TyButton @click="printDataSource" style="margin-right: 10px;">打印表格</TyButton>
        <TyButton @click="printByHTMLStr" style="margin-right: 10px;">打印HTML字符串</TyButton>
        <TyButton @click="printByClass" style="margin-right: 10px;">打印class名</TyButton>
        <TyButton @click="printByID">打印id</TyButton>
      </TyCard>


        <TyCard style="margin-top: 20px; ">
          这里class名为print1 的容器
          <div class="print1">
            <h1>12346</h1>
            <ty-button>ty按钮</ty-button>
            <h2>666</h2>
          </div>
        </TyCard>
        <TyCard style="margin-top: 20px; ">
          这里id名为printid的容器

          <div id="printid">
            <h1>12346</h1>
            <ty-button>ty按钮</ty-button>
            <h2>666</h2>

          </div>
        </TyCard>
    </div>

  </div>
</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import enterTpl from '@/printTpl/entry.html?raw'
import printer from '@/utils/src/print'

const printByhtmlTpl = () => {
  printer(enterTpl, {
    data: {
      djh: 'No1055391601',
      riqi: '2024-07-23',
      rkck: '南京市雨花台区仓库',
      ypbh: '10306014',
      ypfl: '入库111111111111'
    },
    header: '北京拓源软件系统股份有限公司',
    waterMark: '北京拓源软件系统股份有限公司'
  })
}
const printDataSource = () => {
  printer({
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
      },
      {
        title: '电话号',
        dataIndex: 'telNo',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '是否独生子女',
        dataIndex: 'isAlone',
      }
    ],
    data: [
      {
        name: '张三',
        age: 30,
        address: '北京市海淀区',
        telNo: '13800138000',
        sex: '男',
        isAlone: '是'
      },
      {
        name: '李四',
        age: 25,
        address: '北京市朝阳区',
        telNo: '13800138001',
        sex: '女',
        isAlone: '否'
      },
      {
        name: '王五',
        age: 35,
        address: '北京市丰台区',
        telNo: '13800138002',
        sex: '男',
        isAlone: '是'
      }
    ]
  }, {
    header: '北京拓源软件系统股份有限公司'
  })
}

const printByHTMLStr = () => {
  let htmlStr = `
    <div>
      <h1>我是html字符串打印出来的内容</h1>
      <h2>h2</h2>
    </div>
  `
  const custStyle = `
    h1{
      color:red;
    }
    h2{
      color:blue;
    }
  `
  printer(htmlStr, {
    custStyle
  })
}

const printByClass = () => {
  printer('.print1')
}
const printByID = () => {
  printer('#printid')

}
</script>
<style lang="scss" scoped>
.print1>h1 {
  color: rgb(0, 255, 76);
}

.print1>h2 {
  color: rgb(255, 0, 242);
}

#printid>h1 {
  color: red
}

#printid>h2 {
  color: rgb(31, 7, 241)
}
</style>
