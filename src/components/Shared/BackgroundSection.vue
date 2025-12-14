<template>
  <section class="background-section">
    <div class="hero-background">
      <div class="hero-overlay"></div>
      <div class="animated-shapes">
        <div class="shape shape-1">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <div class="shape shape-2">
          <i class="fa-solid fa-truck-fast"></i>
        </div>
        <div class="shape shape-3">
          <i class="fa-solid fa-box"></i>
        </div>
        <div class="shape shape-4">
          <i class="fa-solid fa-warehouse"></i>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BackgroundSection',
}
</script>

<style scoped>
.background-section {
  position: relative;
  background: var(--bg-dark);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, var(--orange-10) 0%, transparent 60%);
  opacity: 0.5;
}

.animated-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shape {
  position: absolute;
  color: var(--accent-orange);
  opacity: 0.08;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 20s ease-in-out infinite;
}

.shape i {
  font-size: inherit;
}

.shape-1 {
  font-size: 15rem;
  top: -50px;
  right: 10%;
  animation-delay: 0s;
}

.shape-2 {
  font-size: 12rem;
  bottom: 10%;
  left: 5%;
  animation-delay: 5s;
}

.shape-3 {
  font-size: 10rem;
  top: 20%;
  left: 60%;
  animation-delay: 10s;
}

.shape-4 {
  font-size: 8rem;
  bottom: 30%;
  right: 5%;
  animation-delay: 15s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(50px, -50px) rotate(15deg) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) rotate(-15deg) scale(0.9);
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
}
</style>
