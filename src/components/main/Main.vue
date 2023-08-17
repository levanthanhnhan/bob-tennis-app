<script setup>
import SideBar from '../sidebar/Sidebar.vue'
import Header from '../header/Header.vue'
import Body from '../body/Body.vue'
import Footer from '../footer/Footer.vue'
</script>

<template>
    <SideBar/>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header/>
        <Body/>
        <Footer/>
    </main>
</template>

<script>
export default {
  mounted() {
    // Toggle Sidenav
    const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
    const iconSidenav = document.getElementById('iconSidenav');
    const sidenav = document.getElementById('sidenav-main');
    let body = document.getElementsByTagName('body')[0];
    let className = 'g-sidenav-pinned';

    if (iconNavbarSidenav) {
      iconNavbarSidenav.addEventListener("click", toggleSidenav);
    }

    if (iconSidenav) {
      iconSidenav.addEventListener("click", toggleSidenav);
    }

    function toggleSidenav() {
      if (body.classList.contains(className)) {
        body.classList.remove(className);
        sidenav.classList.remove('bg-transparent');

      } else {
        body.classList.add(className);
        sidenav.classList.remove('bg-transparent');
        iconSidenav.classList.remove('d-none');
      }
    }
  }
}
</script>