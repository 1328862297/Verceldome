<template>
  <!-- <div class="background"></div>
  <div class="">
    <nav class="floating-nav">
      <div class="nav-item" @click="scrollToTop">首页</div>
      <div class="nav-item" @click="focusSearch">搜索</div>
      <div class="nav-item" @click="setActiveCategory(0)">全部</div>
    </nav>

    <div class="container">

      <header class="header fade-in-up">
        <h1 class="main-title">参考资料阅览室</h1>
        <div class="subtitle">知识的殿堂</div>
        <p class="description">
          汇聚一手市场资讯与经典潮流观点，为您提供深度思考的养料
        </p>
        <div class="stats">
          <span>📚</span>
          <span>{{ totalArticles }} 篇精选内容</span>
        </div>
      </header>

    
      <div class="search-bar fade-in-up">
        <div class="search-icon">🔍</div>
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索文章标题或内容..."
          @input="handleSearch"
        />
      </div>

   
      <div class="filter-tabs fade-in-up">
        <div
          v-for="(category, index) in categories"
          :key="index"
          :class="['filter-tab', { active: activeCategory === index }]"
          @click="setActiveCategory(index)"
        >
          {{ category }}
        </div>
      </div>

   
      <Transition name="slide-fade" mode="out-in">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <span>加载中...</span>
        </div>
        <div v-else-if="filteredArticles.length === 0" class="empty-state">
          <div class="icon">📝</div>
          <h3>暂无相关内容</h3>
          <p>尝试调整搜索条件或选择其他分类</p>
        </div>
        <div v-else class="articles-grid">
          <TransitionGroup name="slide-fade" appear>
            <article
              v-for="(article, index) in displayedArticles"
              :key="article.id"
              class="article-card"
              @click="openArticle(article)"
            >
              <div :class="['article-icon', `type-${(index % 5) + 1}`]">
                {{ article.icon }}
              </div>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-meta">
                <div class="read-time">
                  <span>⏱</span>
                  <span>{{ article.readTime }} 分钟阅读</span>
                </div>
                <div class="category-tag">{{ article.category }}</div>
              </div>
            </article>
          </TransitionGroup>
        </div>
      </Transition>


      <div v-if="hasMore && !loading" class="load-more">
        <button class="load-more-btn" @click="loadMore" :disabled="loadingMore">
          {{ loadingMore ? "加载中..." : "加载更多内容" }}
        </button>
      </div>
    </div>
  </div> -->
  <div class="px-6 py-10 max-w-4xl mx-auto text-[#3d2b23]">
    <h1
      class="font-bold text-center text-[#b66b7c] mb-4"
      style="font-size: 30px; line-height: 80px; padding-top: 40px"
    >
      女子的命运阅读食谱
    </h1>
    <p
      class="text-center text-[#7a5b5b] mb-10"
      style="line-height: 30px; padding-bottom: 40px"
    >
      20~50岁女生都会遇到的成长命题，你的参考答案都在这里。
    </p>

    <div class="grid grid-cols-2 gap-4">
      <div
        @click="herfs(article)"
        v-for="(article, index) in displayedArticles"
        :key="index"
        style="padding: 24px; cursor: pointer"
        class="bg-white rounded-xl shadow hover:bg-[#fff3f6] border border-[#fde6ec]"
      >
        <h2 class="text-lg/8 font-semibold text-[#b66b7c]">
          {{ article.title }}
        </h2>
        <ul style="max-height: 120px">
          <li class="text-sm/8 ellipsis">{{ article.content }}</li>
          <li class="text-sm/8 ellipsis">{{ article.content }}</li>
          <li class="text-sm/8 ellipsis">{{ article.content }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import {
  DArrowLeft,
  Memo,
  Notebook,
  Collection,
  ScaleToOriginal,
  Tickets,
  Document,
  Reading,
  Operation,
  DArrowRight,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
import {
  ref,
  reactive,
  onMounted,
  computed,
  defineEmits,
  watch,
  nextTick,
} from "vue";
const searchInput = ref(null);
const searchQuery = ref("");
const activeCategory = ref(0);
const loading = ref(false);
const loadingMore = ref(false);
const currentPage = ref(1);
const itemsPerPage = 6;
import mammoth from "mammoth";
// 分类数据
const categories = ref([
  "全部",
  "市场洞察",
  "职场成长",
  "思维方法",
  "管理智慧",
]);

// 文章数据
const iconss = ["📖", "🎯", "💼", "🚀", "⚡", " 📊", "🌱", "💡"];
const allArticles = ref([
  {
    id: 1,
    icon: "📖",
    title: "1如何在有限的生命中，做真正重要的事",
    excerpt:
      "时间管理不是关于如何更快地完成更多任务，而是关于如何识别和专注于真正重要的事情。本文探讨了价值导向的时间分配策略，帮助你在有限的生命中创造最大的意义。",
    readTime: 8,
    category: "思维方法",
  },
  {
    id: 2,
    icon: "🎯",
    title: "建立系统，而非目标",
    excerpt:
      "目标设定往往让我们陷入结果导向的焦虑中，而系统构建则关注过程的持续改进。通过建立有效的行为系统，我们能够实现更稳定和可持续的成长。",
    readTime: 6,
    category: "职场成长",
  },
  {
    id: 3,
    icon: "💼",
    title: "德鲁克：做自己人生的CEO",
    excerpt:
      "管理大师德鲁克的经典思想：每个人都应该像管理企业一样管理自己的人生。了解自己的优势、价值观和工作方式，是个人成功的基础。",
    readTime: 12,
    category: "管理智慧",
  },
  {
    id: 4,
    icon: "🚀",
    title: "Amazon成长飞轮：职场快速成长心法",
    excerpt:
      "亚马逊内部广泛应用的成长飞轮模型，通过构建正向循环的成长机制，实现个人能力的指数级提升。探索如何在职场中建立自己的成长飞轮。",
    readTime: 10,
    category: "职场成长",
  },
  {
    id: 5,
    icon: "⚡",
    title: "管理你的能量，而非时间",
    excerpt:
      "传统的时间管理已经过时，真正的高效来自于能量管理。了解自己的能量节奏，在最佳状态下处理最重要的工作，是现代人必备的技能。",
    readTime: 7,
    category: "思维方法",
  },
  {
    id: 6,
    icon: "📊",
    title: "数据驱动决策的艺术",
    excerpt:
      "在信息爆炸的时代，如何从海量数据中提取有价值的洞察？本文分享了数据分析的思维框架和实践方法，帮助你做出更明智的决策。",
    readTime: 9,
    category: "市场洞察",
  },
  {
    id: 7,
    icon: "🌱",
    title: "成长型思维：从固定思维到成长思维",
    excerpt:
      "斯坦福心理学家卡罗尔·德韦克的突破性研究表明，我们对能力的信念决定了我们的成就。探索如何培养成长型思维，释放无限潜能。",
    readTime: 11,
    category: "思维方法",
  },
  {
    id: 8,
    icon: "💡",
    title: "创新思维：如何产生突破性想法",
    excerpt:
      "创新不是天赋，而是可以学习的技能。通过掌握系统性的创新方法论，任何人都能够产生具有价值的创意和解决方案。",
    readTime: 8,
    category: "职场成长",
  },
]);

// 计算属性
const totalArticles = computed(() => files.value.length);
const filteredArticles = computed(() => {
  let articles = files.value; //files  allArticles

  // 分类筛选
  if (activeCategory.value > 0) {
    const selectedCategory = categories.value[activeCategory.value];
    articles = articles.filter(
      (article) => article.category === selectedCategory
    );
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
  }

  return articles;
});

const displayedArticles = computed(() => {
  const endIndex = currentPage.value * itemsPerPage;
  return filteredArticles.value.slice(0, endIndex);
});

const hasMore = computed(() => {
  return displayedArticles.value.length < filteredArticles.value.length;
});

// 方法
const setActiveCategory = (index) => {
  activeCategory.value = index;
  currentPage.value = 1;
  scrollToTop();
};

const handleSearch = () => {
  currentPage.value = 1;
};

const herfs = (article) => {
  // 这里可以添加路由跳转或模态框逻辑
  let jsons = JSON.stringify(article);
  router.push({
    path: "/typelist",
    query: {
      data: jsons,
    },
  });
  // alert(`即将打开文章：${article.title}`);
};
const openArticle = (article) => {
  // 这里可以添加路由跳转或模态框逻辑
  let jsons = JSON.stringify(article);
  router.push({
    path: "/wordPage",
    query: {
      data: jsons,
    },
  });
  // alert(`即将打开文章：${article.title}`);
};

const loadMore = async () => {
  loadingMore.value = true;
  // 模拟加载延迟
  await new Promise((resolve) => setTimeout(resolve, 800));
  currentPage.value++;
  loadingMore.value = false;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const focusSearch = () => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
};

// 监听搜索和分类变化，重置分页
watch([searchQuery, activeCategory], () => {
  currentPage.value = 1;
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const files = ref([]);
const ajaxlist = async () => {
  const pdfFiles = import.meta.glob("../../public/pdfs/*.docx"); // 注意路径可能需要根据你的项目结构调整

  for (const path in pdfFiles) {
    const name = path.split("/").pop(); // 获取文件名
    files.value.push({ name, url: `/pdfs/${name}` }); // 添加到文件列表中，注意这里的URL需要根据实际部署情况调整
  }

  for (let i = 0; i < files.value.length; i++) {
    const item = files.value[i];
    ((item) => {
      loadDocument(item.url).then((value) => {
        item.content = value;
        item.title = item.name;
        item.icon = iconss[getRandomInt(0, 7)];
        item.category = categories.value[getRandomInt(0, 4)];
        item.readTime = getRandomInt(0, 10);
        item.excerpt = value;
      });
    })(item);
  }
  console.log(files.value);
  // let arrst = []; //
  // let olds = files.value;
  // for (let s = 0; s < olds.length; s++) {
  //   arrst.push({
  //     id:s,
  //     name: olds[s].name,
  //     title: olds[s].name,
  //     content: olds[s].content,
  //     icons: iconss[0],

  //     //Math.floor(Math.random() * icons.length)
  //   });
  // }

  // id: 1,
  //   icon: "📖",
  //   title: "1如何在有限的生命中，做真正重要的事",
  //   excerpt:
  //     "时间管理不是关于如何更快地完成更多任务，而是关于如何识别和专注于真正重要的事情。本文探讨了价值导向的时间分配策略，帮助你在有限的生命中创造最大的意义。",
  //   readTime: 8,
  //   category: "思维方法",

  // selectFile(files.value[0].name)
  //   .then((res) => {
  //     console.log(res)
  //   });

  // const file = event.target.files[0];
  // let htmlContent= ''
  // if (file) {
  //   const arrayBuffer = await file.arrayBuffer();  // 通过接口可以直接过去arrayBuffer文件流
  //   const result = await mammoth.convertToHtml({ arrayBuffer });
  //   htmlContent = result.value; // 获取转换后的 HTML 内容
  // }
};

async function loadDocument(url) {
  try {
    // 从URL获取文档内容
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `无法获取文档: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();

    // 使用mammoth.js解析DOCX
    const result = await mammoth.convertToHtml({ arrayBuffer });

    if (result.messages.some((msg) => msg.type === "error")) {
      console.warn("解析文档时出现警告:", result.messages);
    }
    // console.log(result);
    // 文档内容
    return result.value;
  } catch (err) {
    console.error("加载文档失败:", err);
  } finally {
  }
}

function selectFile(accept) {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = accept;
    fileInput.style.display = "none";

    fileInput.addEventListener("change", (event) => {
      if (!event || !event.target) {
        reject({ message: "请选择文件" });
      }
      const selectdFile = (event.target as HTMLInputElement).files?.[0];
      const isDocx = selectdFile?.name.endsWith(".docx");
      if (selectdFile) {
        const render = new FileReader();
        render.onload = (e) => {
          const content = e.target?.result as string | ArrayBuffer;

          mammoth
            .extractRawText({ arrayBuffer: content as ArrayBuffer })
            .then((res) => {
              resolve(res.value);
            });
        };

        render.readAsArrayBuffer(selectdFile);
      } else {
        reject({ message: "请选择有效的文件" });
      }

      document.body.removeChild(fileInput);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
  });
}

// 生命周期

onMounted(async () => {
  ajaxlist();
  loading.value = true;
  // 模拟初始加载
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;

  // 添加滚动动画观察器
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // 观察所有卡片
  await nextTick();
  const cards = document.querySelectorAll(".article-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});
</script>
  
  
  
  <style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.ellipsis {
  width: 100%;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}
.ellipsis p {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis;
}
/* body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
    "SF Pro Text", Helvetica, Arial, sans-serif;
  background: #000;
  color: #f5f5f7;
  min-height: 100vh;
  overflow-x: hidden;
} */

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at top,
    #1a1a2e 0%,
    #16213e 45%,
    #0f0f23 100%
  );
  z-index: -1;
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="%23ffffff" opacity="0.03"/><circle cx="75" cy="25" r="0.3" fill="%23ffffff" opacity="0.02"/><circle cx="50" cy="50" r="0.4" fill="%23ffffff" opacity="0.025"/><circle cx="25" cy="75" r="0.2" fill="%23ffffff" opacity="0.015"/><circle cx="75" cy="75" r="0.6" fill="%23ffffff" opacity="0.035"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.5;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 80px;
  padding: 60px 0;
}

.main-title {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.subtitle {
  font-size: 24px;
  color: #86868b;
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.description {
  font-size: 17px;
  color: #a1a1a6;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.stats {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #86868b;
  backdrop-filter: blur(10px);
}

.search-bar {
  max-width: 400px;
  margin: 0 auto 40px;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 16px 24px 16px 50px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 25px;
  color: #f5f5f7;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.search-input::placeholder {
  color: #86868b;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #86868b;
  font-size: 18px;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 60px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.filter-tab {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #86868b;
  position: relative;
}

.filter-tab.active {
  background: rgba(255, 255, 255, 0.12);
  color: #f5f5f7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.filter-tab:hover:not(.active) {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.06);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.article-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.article-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
}

.article-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.article-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 24px;
  position: relative;
}

.article-icon.type-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.article-icon.type-2 {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
.article-icon.type-3 {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
.article-icon.type-4 {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}
.article-icon.type-5 {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.article-title {
  font-size: 20px;
  font-weight: 600;
  color: #f5f5f7;
  margin-bottom: 12px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.article-excerpt {
  font-size: 15px;
  color: #a1a1a6;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #86868b;
}

.read-time {
  display: flex;
  align-items: center;
  gap: 6px;
}

.category-tag {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.load-more-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px 32px;
  color: #f5f5f7;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.load-more-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.load-more-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.floating-nav {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 8px;
  backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  gap: 4px;
}

.nav-item {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #86868b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.1);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #86868b;
}

.empty-state .icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #86868b;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid #86868b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 12px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 20px 16px;
  }

  .header {
    margin-bottom: 40px;
    padding: 40px 0;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .article-card {
    padding: 24px;
  }

  .filter-tabs {
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .floating-nav {
    display: none;
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
  