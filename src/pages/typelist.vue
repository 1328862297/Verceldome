<template>
  <div class="px-6 py-10 max-w-5xl  text-[#3d2b23]" style="margin:  0 auto;">
    <h1 style="line-height: 80px; margin-top: 40px; margin-bottom: 40px; font-size: 28px;" class=" font-bold text-[#b66b7c] mb-6 text-center  text-3xl">
      亲密关系与婚姻家庭
    </h1>
    <div class="grid gap-6">
      <div
      @click="listWord(article)"
        style="padding: 24px"
        v-for="(article, index) in articles"
        :key="index"
        class="bg-white border border-[#fddde7] rounded-xl shadow hover:bg-[#fff4f7]"
      >
        <h2 class="text-lg font-semibold text-[#b66b7c]">
          {{ article.title }}
        </h2>
        <p class="text-sm text-[#5c4141] mt-2">{{ article.summary }}</p>
      </div>
    </div>
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
const articles = ref([
  {
    title: "为什么我总吸引控制型、冷暴力的伴侣？",
    summary: "深入剖析女性在关系中失衡的底层心理动因，并提供识别与走出的策略。",
    content:'',
  },
  {
    title: "结婚后，我感觉自己像保姆而不是爱人？",
    summary: "解构亲密关系中的结构性不平等：从分工、期待到情绪劳动。",
    content:'',
  },
]);
// 文章数据
const article = ref({
  title: "如何在有限的生命中，做真正重要的事",
  category: "思维方法",
  publishDate: "2025年6月10日",
  readTime: 8,
  views: 1247,
  likes: 89,
  summary:
    "时间管理不是关于如何更快地完成更多任务，而是关于如何识别和专注于真正重要的事情。本文将探讨价值导向的时间分配策略，帮助你在有限的生命中创造最大的意义和价值。",
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const goBack = () => {
  router.go(-1);
};
const listWord = (article) => {
  console.log("打开文章:", article);
  // 这里可以添加路由跳转或模态框逻辑
  let jsons = JSON.stringify(article);
  router.push({
    path: "/typeworks",
    query: {
      data: jsons,
    },
  });
  // alert(`即将打开文章：${article.title}`);
};
import { useRoute } from "vue-router";
const route = useRoute();
const datas = JSON.parse(route.query.data);
let objs = {
  title: datas.title,
  category: datas.category,
  publishDate: "2025年6月10日",
  readTime: datas.readTime,
  views: getRandomInt(100, 1000),
  likes: getRandomInt(10, 100),
  summary: datas.content,
};

let arrs= articles.value;
for (let k = 0; k < arrs.length; k++) {
    arrs[k].content = datas.excerpt
    
}
article.value = objs;
articles.value = arrs;
console.log(articles.value)
console.log(datas)
</script> 
  
    <style>
@import "tailwindcss";
</style>