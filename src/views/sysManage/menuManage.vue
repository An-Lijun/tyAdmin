<template>
  <div class="tyAdmin__container" style="height: calc(100vh - 170px)">
    <TyCard>
      <TyForm
        size="large"
        :formData="formData"
        :rules="rules"
        ref="formRef"
        class="animationBox"
      >
        <TyRow align="top" gutter="4">
          <TyCol :span="8">
            <TyFormItem label="菜单名称" name="label">
              <TyInput v-model="formData.label" placeholder="请输入菜单名称" />
            </TyFormItem>
          </TyCol>
          <TyCol :span="8">
            <TyFormItem label="状态" name="status">
              <TySelect v-model="formData.status" placeholder="请选择状态">
                <TyOption value="1">启用</TyOption>
                <TyOption value="2">禁用</TyOption>
              </TySelect>
            </TyFormItem>
          </TyCol>
          <TyCol :span="8">
            <TySpace>
              <TyButton @click="formSearch">查询</TyButton>
              <TyButton
                type="secondary"
                @click="
                  () => {
                    console.log(formData)
                  }
                "
                >重置</TyButton
              >
            </TySpace>
          </TyCol>
        </TyRow>
      </TyForm>
    </TyCard>

    <TyCard style="margin-top: 20px">
      <TySpace>
        <TyButton @click="addMenu">新增</TyButton>
      </TySpace>
      <TyTable :columns="columns" :data="tableData">
        <template #operation="{ row }">
          <TySpace style="width: 50px">
            <TyButton @click="addMenu(row)">新增</TyButton>
            <TyButton size="small">编辑</TyButton>
            <TyButton size="small">删除</TyButton>
          </TySpace>
        </template>
      </TyTable>
    </TyCard>

    <TyDialog v-model="isShowDialog" title="添加菜单">
      <TyForm
        size="small"
        :formData="diaFormData"
        :rules="rules"
        ref="formRef"
        class="animationBox"
      >
        <TyFormItem label="菜单名称" name="label">
          <TyInput v-model="diaFormData.label" placeholder="请输入菜单名称" />
        </TyFormItem>
        <TyFormItem label="菜单url" name="path">
          <TyInput v-model="diaFormData.path" placeholder="请输入菜单url" />
        </TyFormItem>
        <TyFormItem label="菜单排序" name="menuOrder">
          <TyInput
            v-model="diaFormData.menuOrder"
            placeholder="请输入菜单排序"
          />
        </TyFormItem>
        <TyFormItem label="菜单状态" name="status">
          <TyInput v-model="diaFormData.status" placeholder="请输入菜单状态" />
        </TyFormItem>
        <TyFormItem label="菜单图标" name="icon">
          <TyInput v-model="diaFormData.icon" placeholder="请输入菜单图标" />
        </TyFormItem>
        <TyFormItem label="菜单类型" name="type">
          <TyInput v-model="diaFormData.type" placeholder="请输入菜单类型" />
        </TyFormItem>
        <TyFormItem label="重定向" name="redirect">
          <TyInput v-model="diaFormData.redirect" placeholder="请输入重定向" />
        </TyFormItem>
      </TyForm>
      <template #footer>
        <TyButton @click="handleSubmit">确定</TyButton>
        <TyButton type="secondary" @click="handleCancel">取消</TyButton>
      </template>
    </TyDialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import http from '@/common/communication/src/http/index'

const formData = ref({
  label: '',
  status: ''
})

const diaFormData = ref({
  label: '',
  path: '',
  menuOrder: '',
  status: '',
  icon: '',
  type: '',
  redirect: ''
})

const isShowDialog = ref(false)
const columns = [
  { title: '菜单名称', key: 'label' },
  { title: '图标', key: 'icon' },
  { title: '状态', key: 'status' }
  // { title: '权限', key: 'auth' },
]
const tableData = ref([])
let pId='1'
const addMenu = (row) => {
  pId = row.id
  isShowDialog.value = true
}
const handleSubmit = async () => {
  const { data } =
    (await http.post('/api/menu/add', {
      label: diaFormData.value.label,
      path: diaFormData.value.path,
      menuOrder: diaFormData.value.menuOrder,
      status: diaFormData.value.status,
      icon: diaFormData.value.icon,
      type: diaFormData.value.type,
      parentId: pId,
      redirect:diaFormData.value.redirect||''
    })) || {}
  alert(data)
}
const handleCancel = () => {
  isShowDialog.value = false
}
const formSearch = async () => {
  const { data } = (await http.get('/api/menu/list')) || {}
  tableData.value = data.data
}
</script>
<style lang="scss" scoped></style>
