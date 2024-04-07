<script setup lang="ts">
import HomeContent from "./HomeContent.vue";
import HomeFeatures from "./HomeFeatures.vue";
import HomeFooter from "./HomeFooter.vue";
import HomeHero from "./HomeHero.vue";
import HomeVideo from "./HomeVideo.vue";
</script>

<template>
  <main>
    <HomeVideo />
    <div class="home">
      <HomeHero />
      <HomeFeatures />
      <HomeContent />
      <HomeFooter />
    </div>
  </main>
</template>
