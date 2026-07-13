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
                  <span v-html="highlightLabel(item)">
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
import useMenuStore from '@/store/modules/menu'
import { useRouter } from 'vue-router'
import { pinyin } from 'pinyin-pro'
const router = useRouter()
const menuStore = useMenuStore()

let list = menuStore.menu.map(item => {
  return item.children
})
list = [].concat(...list).map(item => {
  const pinyinArr = pinyin(item.label, { type: 'array', toneType: 'none' }).map(p => p.toLowerCase())
  return {
    ...item,
    pinyinFull: pinyinArr.join(''),
    pinyinFirst: pinyinArr.map(char => char[0]).join(''),
    pinyinArr
  }
})
const searchValue = ref('');

const isShowSearch = defineModel();
const emit = defineEmits(['update:modelValue'])
const wrapRef = ref();
const handleJump = (item) => {
  router.push({
    name:item.path
  })
  emit('update:modelValue', false)
}
const searchEdList = ref([]);
const handleInput = () => {
  searchEdList.value = list.filter(item => {
    if (item.label && searchValue.value) {
      const keyword = searchValue.value.toLowerCase()
      return item.label.toLowerCase().includes(keyword) || item.pinyinFull.includes(keyword) || item.pinyinFirst.includes(keyword)
    }
  })
}
const handleClick = () => {
  emit('update:modelValue', false)
}
const highlightLabel = (item) => {
  const keyword = searchValue.value.toLowerCase()
  if (!keyword) return item.label
  if (item.label.toLowerCase().includes(keyword)) {
    return item.label.replace(new RegExp(keyword, 'gi'), match => `<span style="color: var(--primary-6);">${match}</span>`)
  }
  const pinyinFirstMatch = item.pinyinFirst.indexOf(keyword)
  if (pinyinFirstMatch !== -1) {
    const chars = item.label.split('')
    const highlighted = chars.map((char, index) => {
      if (index >= pinyinFirstMatch && index < pinyinFirstMatch + keyword.length) {
        return `<span style="color: var(--primary-6);">${char}</span>`
      }
      return char
    })
    return highlighted.join('')
  }
  const pinyinFullMatch = item.pinyinFull.indexOf(keyword)
  if (pinyinFullMatch !== -1) {
    const pinyinLengths = item.pinyinArr.map(p => p.length)
    let charIndex = 0
    let currentLength = 0
    const startChar = []
    while (charIndex < pinyinLengths.length && currentLength + pinyinLengths[charIndex] <= pinyinFullMatch) {
      currentLength += pinyinLengths[charIndex]
      charIndex++
    }
    startChar.push(charIndex)
    let endChar = charIndex
    let remainingLength = keyword.length
    while (endChar < pinyinLengths.length && remainingLength > 0) {
      remainingLength -= pinyinLengths[endChar]
      endChar++
    }
    const chars = item.label.split('')
    const highlighted = chars.map((char, index) => {
      if (index >= startChar[0] && index < endChar) {
        return `<span style="color: var(--primary-6);">${char}</span>`
      }
      return char
    })
    return highlighted.join('')
  }
  return item.label
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
      // border: 1px solid var(--border-color-2);
        box-shadow: 
    inset 0 1px 1px rgba(255,255,255,0.5),
    inset 0 -1px 1px rgba(0,0,0,0.1),
    0 1px 0 var(--toyar-gray-6),
    0 2px 2px rgba(0,0,0,0.1);
  transform: translateY(2px);
  margin-top: -3px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      // box-shadow: inset 0 -2px transparent, inset 0 0 1px 1px var(--toyar-gray-5), 0 1px 2px 1px var(--toyar-gray-6);
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
