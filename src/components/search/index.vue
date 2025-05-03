<template>
  <Teleport to="body">
    <div class="tyAdmin_search_wrap" ref="wrapRef" @click="handleClick" v-show="isShowSearch">
      <transition name="zoom-fade" mode="out-in">
        <div v-if="isShowSearch">
          <div class="tyAdmin_search" @click="(e) => { e.stopPropagation() }">
            <div class="tyAdminSearchItem">
              <TyInput size="large" v-model="searchValue" placeholder="搜索" @input="handleInput">
                <template #innerPre>
                  <TyiSearchLine/>
                </template>
              </TyInput>
            </div>
            <main>
              <div class="tyAdmin__searchItem" v-for="item in searchEdList" @click="handleJump(item)">
                <div>
                  <template v-if="item.parent">
                    <!-- <TyIcon :icon="item.parent.icon"></TyIcon> -->
                    <span>
                      {{ item.parent.label }}
                    </span>
                    <TyiArrowRightSLine/>

                  </template>
                  {{ item.label }}
                  <span v-html="transHightLight(item.label, searchValue, 'var(--primary-6)')">
                  </span>
                </div>
                <div>
                  <svgIcon icon="enter"></svgIcon>
                </div>
              </div>
            </main>
            <footer>
              <div class="tyAdminIcon">
                <svgIcon icon="enter"></svgIcon>
              </div>
              <span class="tyAdmin_search_text">
                确认
              </span>
              <div class="tyAdminIcon">
                <svgIcon icon="up"></svgIcon>
              </div>
              <div class="tyAdminIcon" style="margin-left: 5px;">
                <svgIcon icon="down"></svgIcon>
              </div>
              <span class="tyAdmin_search_text">

                切换
              </span>
              <div class="tyAdminIcon">
                <svgIcon icon="esc"></svgIcon>
              </div>
              <span class="tyAdmin_search_text">

                关闭
              </span>
            </footer>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>
<script setup>
import { ref } from 'vue';
import svgIcon from '@/components/svgIcon.vue';
import { pageRoute } from '@/router/index'
import { transHightLight } from 'robinson'
import { useRouter } from 'vue-router'
const router = useRouter()

const sPageRoute = pageRoute.map(item => {
  if (item.children) {
    item.children.forEach(ite => {
      ite.parent = item
    })
  }
})

let list = pageRoute.map(item => {
  return item.children
})
const searchValue = ref('');

list = [].concat(...list);

const isShowSearch = defineModel();
const emit = defineEmits(['update:modelValue'])
const wrapRef = ref();
const handleJump = (item) => {
  router.push(item.path)
  emit('update:modelValue', false)
}
const searchEdList = ref([]);
const handleInput = () => {
  searchEdList.value = list.filter(item => {
    if (item.label && searchValue.value) {
      return item.label.includes(searchValue.value)
    }
  })
}
const handleClick = () => {
  emit('update:modelValue', false)
}
</script>
<style lang="scss" scoped>
.tyAdmin_search_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--zindex-50);
  background-color: var(--opcity-5);
}

// zoom-fade
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition:
    transform 0.2s,
    opacity 0.3s ease-out;
}

.zoom-fade-enter-from {
  transform: scale(0.92);
  opacity: 0;
}

.zoom-fade-leave-to {
  transform: scale(1.06);
  opacity: 0;
}

.tyAdmin_search {
  position: absolute;
  z-index: 99;
  left: 50%;
  top: 100px;
  width: 600px;
  box-shadow: 0 25px 50px -12px #00000040;
  background-color: var(--color-bg-2);
  transform: translateX(-50%);
  height: 250px;
  padding: var(--padding-2);
  border-radius: 12px;

  .tyAdminSearchItem {
    height: 50px;
    display: flex;
    align-items: center;
  }

  main {
    height: calc(100% - 90px);

    .tyAdmin__searchItem {
      height: 40px;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      margin-bottom: 10px;
      box-shadow: 0 1px 3px #d4d9e1;
      padding: 0 12px;

      &:hover {
        background-color: var(--primary-3);
        cursor: pointer;
      }
    }

    overflow-y: auto;
  }

  footer {
    height: 40px;
    display: flex;
    margin: 0 -12px;
    border-top: 1px solid var(--border-color-2);
    padding: 10px 12px;
    box-sizing: border-box;

    .tyAdminIcon {
      border: 1px solid var(--border-color-2);
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: inset 0 -2px transparent, inset 0 0 1px 1px var(--toyar-gray-5), 0 1px 2px 1px var(--toyar-gray-6);
      border-radius: 3px;
    }

    .tyAdmin_search_text {
      margin: 0 10px 0 5px;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
