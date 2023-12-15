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
  background-color: #171723;
}
</style>
