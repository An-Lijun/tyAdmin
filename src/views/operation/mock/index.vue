<template>
  <div class="divRoot">
    <tHeader title="mock" info="toyar-admin 自己封装mock插件" />
    <div class="tyAdmin__container">
      <TyTabs v-model="tabs" style="border: unset;">
        <TyTabItem title="插件" name="plugin">
          <ty-caution title="mock服务" style="margin-bottom: 16px;">
            基于vite-plugin-mock封装的插件
            <br/>
            vite-plugin-mock 用于劫持和代理http接口
            <br/>
            vite-mock-server 自定义插件用于启动服务并将请求成功的接口写入vite-plugin-mock支持的文件结构
            <br/>
            使用方式
            <br/>
            修改env VITE_MOCK_OPEN 为 true
            <br/>
            注意: mockjs 在开启时不会覆盖已经存在的mock数据，需要覆盖时需要手动删除mock文件
            <!-- Toyar-Design 封装了打印函数，方便打印html模板，表格，html字符串，class名，id名。
              -->
          </ty-caution>
        </TyTabItem>
        <TyTabItem title="数据" name="data">
          <div class="inner">
            <ul class="leftMenu">
              <template v-for="code in codeViewerList">
                <li @click="handleClick(code[0], code[1])" :class="{
                  'active': code[0] === activeCode
                }">
                  {{ code[0] }}
                </li>
              </template>
            </ul>
            <div class="rightCode" style="max-height: 500px;overflow-y: auto;">
              <codeViewer :code="codeViewerHtml" lang="json">
              </codeViewer>
            </div>
          </div>
        </TyTabItem>
      </TyTabs>

    </div>
  </div>
</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import codeViewer from '@/components/codeViewer.vue';
import { ref } from 'vue'
const codeViewerHtml = ref('')
const mockList = import.meta.glob('../../../../mock/src/*.js');
const activeCode = ref('')
const codeViewerList = ref([]);
const tabs = ref('plugin')
for (const path in mockList) {
  mockList[path]().then((module) => {
    // 这里可以使用加载的模块
    // console.log('加载的模块:', module);
    const p2 = path.split('/').pop().replace('.js', '');
    codeViewerList.value.push([p2, module.default])
  }).catch((error) => {
    console.error('加载模块时出错:', error);
  });
}
const handleClick = (name, value) => {
  activeCode.value = name
  codeViewerHtml.value = value.response()
}

</script>
<style lang="scss" scoped>
.tyAdmin__container {
  height: 600px;
}

.inner {
  display: flex;
  height: 500px;

  .leftMenu {
    width: 200px;
    background-color: var(--);
    border: var(--border-1) solid var(--border-color-2);
    background-color: var(--color-bg-2);
    margin: unset;
    padding: unset;
    border-radius: 4px;

    li {
      list-style: none;
      height: 35px;
      line-height: 35px;
      padding: unset;
      padding-left: 10px;

      &.active,
      &:hover {
        background-color: var(--primary-6);
        color: #fff;
        cursor: pointer;
      }

    }
  }

  .rightCode {
    flex: 1;
    margin-left: 12px;
  }
}
</style>
