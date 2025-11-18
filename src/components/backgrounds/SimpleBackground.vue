<template>
  <div class="simple-bg"></div>
</template>

<style scoped>
.simple-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: linear-gradient(135deg, #0a0a2a 0%, #1a1a3a 50%, #2a2a4a 100%);
  overflow: hidden;
}

.simple-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(0, 100, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 0, 100, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(100, 0, 255, 0.03) 0%, transparent 70%);
  animation: subtleShift 20s ease-in-out infinite alternate;
}

@keyframes subtleShift {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  100% {
    transform: translate(-20px, 10px) scale(1.02);
  }
}
</style>
