<script setup lang="ts">
import AutoLink from "@theme/AutoLink.vue";
import {
  ClientOnly,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import type { FunctionalComponent } from "vue";
import { computed, h, onMounted } from "vue";
import type { DefaultThemeHomePageFrontmatter } from "../../shared/index.js";
// import { useDarkMode } from "../composables/index.js";

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();
const siteLocale = useSiteLocaleData();
// const isDarkMode = useDarkMode();

var isDarkMode = false;

const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark;
  }
  return frontmatter.value.heroImage;
});

const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null;
  }
  return frontmatter.value.heroText || siteLocale.value.title || "Hello";
});

const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || "hero"
);

const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null;
  }
  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    "Welcome to your VuePress site"
  );
});

const overview = computed(() => {
  if (frontmatter.value.overview === null) {
    return null;
  }
  return (
    frontmatter.value.overview ||
    siteLocale.value.description ||
    "Welcome to your VuePress site"
  );
});

const actions = computed(() => {
  if (!isArray(frontmatter.value.actions)) {
    return [];
  }

  return frontmatter.value.actions.map(({ text, link, type = "primary" }) => ({
    text,
    link,
    type,
  }));
});
</script>

<template>
  <section class="hero">
    <!-- <h1 v-if="heroText" id="main-title">
      {{ heroText }}
    </h1> -->

    <p v-if="actions.length" class="actions">
      <AutoLink
        v-for="action in actions"
        :key="action.text"
        class="action-button"
        :class="[action.type]"
        :item="action"
      />
    </p>
  </section>
</template>
