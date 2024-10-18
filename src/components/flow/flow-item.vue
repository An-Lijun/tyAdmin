<template>
  <div class="flow-item">
    <TyCard shadow="hover">
      <template #header>
        <header class="flow-item__header" :class="[status]">
          {{ title }}
        </header>
      </template>
      <main class="flow-item__main" v-if="label && value">
        <div>
          <span class="flow-item__label" v-if="label">
            {{ label }}
          </span>
          <span class="flow-item__value">
            {{ value }}
          </span>
        </div>
        <TyIcon icon="ty-arrow-right-s-line" />
      </main>
    </TyCard>
  </div>

</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  status: {
    type: String,
    default: 'start',
  },
  label: {
    type: String,
  },
  value: {
    type: String,
  },
})
</script>
<!-- 
  已经审批过 examined,
  正在审批   examining,
  未审批     unapproved
-->
<style lang="scss" scoped>
:deep(.ty-card__header),
:deep(.ty-card__main) {
  padding: unset;
}

.flow-item {
  width: 250px;
  border: 1px solid #000;

  &__header {
    height: 35px;
    line-height: 35px;
    text-align: left;
    padding: 0 25px;
    color: #fff;
  }

  &__main {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;
    color: var(--text-1);
  }

  &__label {
    &::after {
      content: ':';
      margin-left: 5px;
    }

    margin-right: 10px;
  }

  &__value {
    color: var(--text-2);
  }
}

.examined {
  background: var(--success-6);
}

.examining {
  background: var(--warning-6);
}

.unapproved {
  background: var(--primary-6);
}

.start {
  background: var(--primary-2);
}

.danger {
  background: var(--danger-6);
}
</style>
