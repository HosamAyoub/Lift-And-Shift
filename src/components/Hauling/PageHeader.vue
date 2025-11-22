<template>
  <div class="page-header mb-5">
    <h2 class="display-4 text-white mb-3">
      <slot name="title"></slot>
    </h2>
    <p class="lead text-gray mb-0">
      <slot name="subtitle"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
}
</script>

<style scoped>
.page-header {
  padding: var(--gap-xxl) 0;
}

.display-4 {
  font-size: 2.5rem;
  font-weight: 800;
}

.lead {
  font-size: 1.1rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }
}
</style>
