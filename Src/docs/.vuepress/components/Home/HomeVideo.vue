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
import { computed, h, onMounted, onUnmounted, onBeforeUpdate } from "vue";
import type { DefaultThemeHomePageFrontmatter } from "../../shared/index.js";
// import { useDarkMode } from "../composables/index.js";

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();
const siteLocale = useSiteLocaleData();
// const isDarkMode = useDarkMode();
let videoElement: HTMLVideoElement;

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

const HomeHeroImage: FunctionalComponent = () => {
  if (!heroImage.value) return null;
  const img = h("img", {
    src: withBase(heroImage.value),
    alt: heroAlt.value,
    class: "slogan-image",
    height: "300",
    width: "300",
  });
  if (frontmatter.value.heroImageDark === undefined) {
    return img;
  }
  // wrap hero image with <ClientOnly> to avoid ssr-mismatch
  // when using a different hero image in dark mode
  return h(ClientOnly, () => img);
};

const HeroVideo = () => {
  const { videoSrc } = frontmatter.value;

  if (!videoSrc) return null;

  const video = h("video", {
    src: videoSrc,
    alt: heroAlt.value,
    autoplay: true,
    muted: true,
    loop: true,
    preload: "auto",
    controlls: false,
    playsinline: true,
    id: "inline-video",
  });

  return h(ClientOnly, () => video);
};

function playVideo() {
  videoElement.muted = false;
  videoElement.play();
}

function movieModeNavbar() {
  const navbarEle = document.getElementsByTagName("header")[0];
  navbarEle.classList.add("immersive");
  navbarEle.style.backgroundColor = "transparent";
  navbarEle.style.borderBottom = "none";
  navbarEle.style.color = "#adbac7";
}

function defaultNavbar() {
  const navbarEle = document.getElementsByTagName("header")[0];

  navbarEle.classList.remove("immersive");
  navbarEle.style.borderBottom = "1px solid var(--c-border)";
  navbarEle.style.backgroundColor = "var(--c-bg-navbar)";
  navbarEle.style.color = "var(--c-text)";
}

function handleScroll() {
  if (document.documentElement.scrollTop <= 200) {
    movieModeNavbar();
  } else {
    defaultNavbar();
  }
}

onUnmounted(() => {
  defaultNavbar();

  window.removeEventListener("scroll", handleScroll);
});

onMounted(() => {
  movieModeNavbar();

  function checkVideoElement() {
    videoElement = document.getElementById("inline-video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.addEventListener("canplay", function () {
        videoElement.play();
      });
    } else {
      requestAnimationFrame(checkVideoElement);
    }
  }

  checkVideoElement();

  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <section class="DIS(flex) JC(center)" id="slogan">
    <div class="video-warpper">
      <div class="video-warpper-inline">
        <HeroVideo />
      </div>
      <div class="video-filter"></div>
    </div>

    <div
      class="slogan-content AN(fadein) DIS(flex) FLD(column) JC(center) H(100%)"
    >
      <div class="slogan-content-inline DIS(flex) JC(center)">
        <HomeHeroImage />
        <div class="DIS(flex) FLD(column)">
          <div v-if="tagline" class="AN(fadein) FW(900) FS(45) TC(white)">
            <span @click="playVideo"></span>{{ tagline }}
          </div>
          <p v-if="overview" class="FS(20) MW(300) TC(white)">
            {{ overview }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
