<template>
  <div class="tab-navigation">
    <div class="tabs-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{
          active: currentTab === tab.id,
          completed: completedTabs.includes(tab.id),
          clickable: tab.id < currentTab || completedTabs.includes(currentTab),
        }"
        @click="handleTabClick(tab.id)"
      >
        <div class="tab-icon">
          <i v-show="!completedTabs.includes(tab.id)" :class="tab.icon"></i>
          <i v-show="completedTabs.includes(tab.id)" class="fas fa-check"></i>
        </div>
        <div class="tab-content">
          <div class="tab-label">{{ tab.label }}</div>
          <div class="tab-number">Step {{ tab.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
  props: {
    currentTab: {
      type: Number,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
    completedTabs: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:tab'],
  methods: {
    handleTabClick(tabId) {
      if (tabId < this.currentTab || this.completedTabs.includes(this.currentTab)) {
        this.$emit('update:tab', tabId)
      }
    },
  },
}
</script>

<style scoped>
.tab-navigation {
  margin-bottom: var(--gap-xxl);
}

.tabs-wrapper {
  display: flex;
  gap: var(--gap-md);
  flex-wrap: wrap;
}

.tab-item {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-lg);
  background: var(--primary-dark);
  border: 2px solid var(--orange-10);
  border-radius: var(--radius-lg);
  transition: var(--transition-base);
  position: relative;
}

.tab-item.active {
  background: var(--orange-10);
  border-color: var(--accent-orange);
  box-shadow: 0 0 20px var(--orange-20);
}

.tab-item.completed {
  border-color: var(--accent-orange);
}

.tab-item.clickable {
  cursor: pointer;
}

.tab-item.clickable:hover {
  background: var(--orange-10);
  transform: translateY(-2px);
}

.tab-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary-dark);
  border-radius: var(--radius-round);
  font-size: 1.25rem;
  color: var(--text-gray);
  transition: var(--transition-base);
  flex-shrink: 0;
}

.tab-item.active .tab-icon {
  background: var(--accent-orange);
  color: var(--bg-dark);
  box-shadow: 0 4px 12px var(--orange-25);
}

.tab-item.completed .tab-icon {
  background: var(--accent-orange);
  color: var(--bg-dark);
}

.tab-content {
  flex: 1;
}

.tab-label {
  font-weight: 600;
  color: var(--text-light);
  font-size: 1rem;
  margin-bottom: 2px;
}

.tab-number {
  font-size: var(--font-sm);
  color: var(--text-gray);
}

.tab-item.active .tab-number {
  color: var(--accent-orange);
}

@media (max-width: 768px) {
  .tabs-wrapper {
    flex-direction: column;
  }

  .tab-item {
    min-width: 100%;
  }
}
</style>
