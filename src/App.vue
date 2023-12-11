<template>
  <header-nav></header-nav>
  <div id="app">
    <main>
      <router-view />
    </main>
    <footer-tag></footer-tag>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../public/bg-main.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
}
</style>
