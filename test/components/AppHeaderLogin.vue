<template>
  <header>
    <b-navbar toggleable="sm" type="light" class="navbar">
      <b-navbar-brand>
        <NuxtLink to="/">
          <img class="logo" src="https://i.imgur.com/YBA96aZ.png" alt="logo" />
        </NuxtLink>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <NuxtLink to="login" class="nav-link">Login</NuxtLink>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
</script>

<style>
.logo {
  width: 10rem;
}
header {
  margin-bottom: 3rem;
}
</style>