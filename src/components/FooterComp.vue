<template>
  <footer class="footer">
    <div class="copy">
      <a href="https://leiberbertel.github.io/" target="_blank">
        © {{ new Date().getFullYear() }} Leiber Bertel
      </a>
    </div>
  </footer>
</template>
  
<script>
export default {
  name: "FooterComponent"
}
</script>
  
<style>
.copy {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}

a {
  display: flex;
  position: relative;
  text-decoration: none;
  color: #fff
}

.copy a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 1px;
  background-color: #fff;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.copy a:hover::after {
  transform: scaleX(1);
}

.footer {
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
  