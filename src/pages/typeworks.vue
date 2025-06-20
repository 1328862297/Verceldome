<template>
  <div class="px-6 py-10 max-w-2xl  text-[#3d2b23]" style="margin: 0 auto;">
    <h1 class="text-2xl font-bold text-[#b66b7c] mb-4" style="line-height: 80px; margin-top: 40px; margin-bottom: 40px; font-size: 28px;" >
      为什么我总吸引控制型、冷暴力的伴侣？
    </h1>
    <!-- <p class="text-[#7a5b5b] mb-6">
      这篇文章帮你看清潜意识中那些让你“反复受伤”的盲区。
    </p> -->
    <div class="bg-[#fff4f6]  rounded-xl mb-6">
       <div v-html="datas.content" style="line-height: 40px; padding: 20px;"></div>
    </div>
    <!-- <p className="text-[15px] leading-loose">
      你越习惯被忽视、被控制，越容易觉得那才是“正常亲密感”。
    </p> -->
  </div>
</template>

    <script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  defineEmits,
  watch,
  nextTick,
} from "vue";
const isScrolled = ref(false);
const showBackToTop = ref(false);
const readingProgress = ref(0);
const activeSection = ref(0);
const isLiked = ref(false);
const isBookmarked = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from "vue-router";
const route = useRoute();
const datas = JSON.parse(route.query.data);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(datas)
</script> 
  
    <style>
@import "tailwindcss";
</style>