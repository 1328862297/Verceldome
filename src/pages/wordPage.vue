<template>
  <div class="background"></div>

  <!-- 阅读进度条 -->
  <div class="reading-progress">
    <div class="progress-bar" :style="{ width: readingProgress + '%' }"></div>
  </div>

  <div>
    <!-- 浮动导航 -->
    <nav class="floating-nav" :class="{ scrolled: isScrolled }">
      <div class="nav-item" @click="goBack">
        <span>←</span>
        <span>返回</span>
      </div>
      <!-- <div class="nav-item" @click="toggleBookmark">
        <span>{{ isBookmarked ? "★" : "☆" }}</span>
        <span>收藏</span>
      </div>
      <div class="nav-item" @click="shareArticle">
        <span>⤴</span>
        <span>分享</span>
      </div> -->
    </nav>

    <div class="container">
      <!-- 文章头部 -->
      <header class="article-header fade-in-up">
        <div class="article-category">{{ article.category }}</div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <div class="meta-item">
            <span>📅</span>
            <span>{{ article.publishDate }}</span>
          </div>
          <div class="meta-item">
            <span>⏱</span>
            <span>{{ article.readTime }} 分钟阅读</span>
          </div>
          <div class="meta-item">
            <span>👀</span>
            <span>{{ article.views }} 次阅读</span>
          </div>
        </div>
      </header>

      <!-- 文章摘要 -->
      <!-- <div class="article-summary fade-in-up">
        <h3>文章摘要</h3>
        <p>{{ article.summary }}</p>
      </div> -->

      <!-- 目录 -->
      <!-- <div class="table-of-contents fade-in-up">
        <h3>📋 目录</h3>
        <ul class="toc-list">
          <li
            v-for="(section, index) in tableOfContents"
            :key="index"
            class="toc-item"
          >
            <a
              :href="'#section-' + index"
              class="toc-link"
              :class="{ active: activeSection === index }"
              @click.prevent="scrollToSection(index)"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </div> -->

      <!-- 文章内容 -->
      <div class="article-content fade-in-up">
        <div
       
        >
          <h2>{{ article.title }}</h2>
          <div v-html="article.summary"></div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons fade-in-up">
        <button class="action-btn primary" @click="likeArticle">
          <span>{{ isLiked ? "❤️" : "🤍" }}</span>
          <span>{{ isLiked ? "已点赞" : "点赞" }} ({{ article.likes }})</span>
        </button>
        <button class="action-btn" @click="toggleBookmark">
          <span>{{ isBookmarked ? "★" : "☆" }}</span>
          <span>{{ isBookmarked ? "已收藏" : "收藏" }}</span>
        </button>
        <button class="action-btn" @click="shareArticle">
          <span>📤</span>
          <span>分享文章</span>
        </button>
        <button class="action-btn" @click="downloadPdf">
          <span>📄</span>
          <span>导出PDF</span>
        </button>
      </div>

      <!-- 相关文章 -->
      <!-- <div class="related-articles fade-in-up">
        <h2 class="related-title">相关推荐</h2>
        <div class="related-grid">
          <div
            v-for="(relatedArticle, index) in relatedArticles"
            :key="index"
            class="related-card"
            @click="openRelatedArticle(relatedArticle)"
          >
            <h4>{{ relatedArticle.title }}</h4>
            <p>{{ relatedArticle.excerpt }}</p>
          </div>
        </div>
      </div> -->
    </div>

    <!-- 返回顶部按钮 -->
    <div
      class="back-to-top"
      :class="{ show: showBackToTop }"
      @click="scrollToTop"
    >
      <span>↑</span>
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
import { useRouter } from 'vue-router';

const router = useRouter();

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

// 目录数据
const tableOfContents = ref([
  {
    title: "重新思考时间的本质",
    content: `
                            <p>我们经常听到"时间就是金钱"这句话，但这个比喻本身就存在问题。金钱可以储存、可以投资、可以复利增长，但时间不行。时间是一种流动的资源，每一秒都在消逝，无法挽回。</p>
                            
                            <p>更重要的是，<strong>时间本身并没有价值，有价值的是我们在时间里做的事情</strong>。同样的一小时，用来刷短视频和用来深度学习，创造的价值完全不同。</p>
                            
                            <blockquote>
                                "我们的生命就是用时间来衡量的，浪费时间就是浪费生命，掌握时间就是掌握生命。" —— 富兰克林
                            </blockquote>
                            
                            <p>因此，真正的时间管理不是管理时间本身，而是管理我们的注意力和精力，确保它们投入到最有价值的事情上。</p>
                        `,
  },
  {
    title: "识别真正重要的事情",
    content: `
                            <p>如何识别什么是真正重要的事情？这里有一个实用的框架：</p>
                            
                            <h3>价值评估矩阵</h3>
                            <ul>
                                <li><strong>长期影响</strong>：这件事对你的未来有多大影响？</li>
                                <li><strong>个人成长</strong>：它能帮助你学到什么或成为怎样的人？</li>
                                <li><strong>关系建设</strong>：它对你的人际关系有什么作用？</li>
                                <li><strong>内在满足</strong>：做这件事能给你带来真正的满足感吗？</li>
                            </ul>
                            
                            <p>真正重要的事情通常具备以下特征：</p>
                            <ol>
                                <li>与你的核心价值观高度一致</li>
                                <li>对长期目标有显著推进作用</li>
                                <li>即使困难也值得坚持</li>
                                <li>完成后会带来深层次的满足感</li>
                            </ol>
                        `,
  },
  {
    title: "构建价值导向的时间系统",
    content: `
                            <p>一旦识别了重要的事情，下一步就是构建一个系统来确保这些事情得到优先处理。</p>
                            
                            <h3>三层时间架构</h3>
                            
                            <p><strong>第一层：核心时间（25%）</strong><br>
                            每天最佳状态的时间段，专门用于处理最重要、最有挑战性的工作。这是你的"黄金时间"，不允许任何干扰。</p>
                            
                            <p><strong>第二层：协作时间（50%）</strong><br>
                            用于处理需要与他人协作的事务，包括会议、沟通、团队工作等。这部分时间相对灵活，但仍需要良好的规划。</p>
                            
                            <p><strong>第三层：缓冲时间（25%）</strong><br>
                            用于处理突发事件、日常事务和休息恢复。这是系统的"安全边际"，确保不会因为意外情况而完全打乱节奏。</p>
                            
                            <blockquote>
                                记住：这不是一个严格的时间分配，而是一个指导原则。关键是确保最重要的事情总是得到最好的时间和精力。
                            </blockquote>
                        `,
  },
  {
    title: "实践中的常见障碍与解决方案",
    content: `
                            <p>理论很美好，但实践中我们总会遇到各种障碍。以下是最常见的几个问题及其解决方案：</p>
                            
                            <h3>障碍一：完美主义陷阱</h3>
                            <p><strong>问题</strong>：总是想把每件事都做到完美，结果花费过多时间在细节上。</p>
                            <p><strong>解决方案</strong>：采用"好够了"原则，明确每项任务的最低可接受标准，避免过度投入。</p>
                            
                            <h3>障碍二：选择困难症</h3>
                            <p><strong>问题</strong>：面对多个选择时犹豫不决，浪费大量时间在决策上。</p>
                            <p><strong>解决方案</strong>：建立决策框架，设定决策时限，相信"足够好的决策比完美的决策更有价值"。</p>
                            
                            <h3>障碍三：社交压力</h3>
                            <p><strong>问题</strong>：难以拒绝他人的请求，经常被打断或被迫参与不重要的活动。</p>
                            <p><strong>解决方案</strong>：学会温和而坚定地说"不"，建立清晰的边界，让他人了解你的优先级。</p>
                        `,
  },
  {
    title: "建立可持续的生活节奏",
    content: `
                            <p>最后，真正的时间管理不是短期的技巧，而是建立一种可持续的生活方式。这需要我们在效率和幸福之间找到平衡。</p>
                            
                            <h3>可持续发展的原则</h3>
                            <ul>
                                <li><strong>定期评估和调整</strong>：每周花30分钟回顾和规划，确保方向正确</li>
                                <li><strong>保持学习和成长</strong>：持续提升技能，提高单位时间的价值创造</li>
                                <li><strong>照顾身心健康</strong>：健康是一切效率的基础，不可忽视</li>
                                <li><strong>培养深度关系</strong>：与重要的人建立深度连接，而不是浅层的社交</li>
                            </ul>
                            
                            <p>记住，生命的意义不在于我们活了多长时间，而在于我们如何度过这些时间。当我们学会在有限的生命中专注于真正重要的事情时，我们就能创造出无限的价值和意义。</p>
                            
                            <blockquote>
                                "不是时间不够用，是我们没有把时间用在对的事情上。" —— 史蒂夫·乔布斯
                            </blockquote>
                        `,
  },
]);

const relatedArticles = ref([
  {
    title: "建立系统，而非目标",
    excerpt:
      "目标设定往往让我们陷入结果导向的焦虑中，而系统构建则关注过程的持续改进...",
  },
]);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const goBack = () => {
  router.go(-1);
};
import { useRoute } from 'vue-router'
const route = useRoute();
const datas = JSON.parse(route.query.data);
  let objs = {
    title:  datas.title,
    category:  datas.category,
    publishDate: "2025年6月10日",
    readTime: datas.readTime,
    views: getRandomInt(100,1000),
    likes: getRandomInt(10,100),
    summary:datas.content
  }

article.value = objs

</script> 

  <style>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
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
  transition: all 0.3s ease;
}

.floating-nav.scrolled {
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-item {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: #86868b;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-item:hover {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.1);
}

.article-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 60px 0 40px;
}

.article-category {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #86868b;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.article-title {
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #86868b;
}

.article-summary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  backdrop-filter: blur(20px);
  text-align: center;
}

.article-summary h3 {
  color: #f5f5f7;
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
}

.article-summary p {
  color: #a1a1a6;
  font-size: 16px;
  line-height: 1.6;
}

.article-content {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 50px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
}

.article-content::before {
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

.article-content h2 {
  color: #f5f5f7;
  font-size: 24px;
  font-weight: 600;
  margin: 40px 0 20px 0;
  letter-spacing: -0.01em;
}

.article-content h2:first-child {
  margin-top: 0;
}

.article-content h3 {
  color: #d1d1d6;
  font-size: 20px;
  font-weight: 600;
  margin: 30px 0 15px 0;
}

.article-content p {
  color: #c8c8cc;
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 20px;
}

.article-content ul,
.article-content ol {
  margin: 20px 0;
  padding-left: 20px;
}

.article-content li {
  color: #c8c8cc;
  font-size: 17px;
  line-height: 1.7;
  margin-bottom: 8px;
}

.article-content blockquote {
  background: rgba(255, 255, 255, 0.05);
  border-left: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 0 12px 12px 0;
  padding: 20px 30px;
  margin: 30px 0;
  font-style: italic;
  color: #a1a1a6;
}

.article-content code {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 2px 6px;
  font-family: "SF Mono", Monaco, monospace;
  font-size: 15px;
  color: #ff6b6b;
}

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1000;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
  border-radius: 0 3px 3px 0;
}

.table-of-contents {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  backdrop-filter: blur(20px);
}

.table-of-contents h3 {
  color: #f5f5f7;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
}

.toc-list {
  list-style: none;
  padding: 0;
}

.toc-item {
  margin-bottom: 12px;
}

.toc-link {
  color: #86868b;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.toc-link:hover {
  color: #f5f5f7;
  background: rgba(255, 255, 255, 0.1);
}

.toc-link.active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 50px 0;
  flex-wrap: wrap;
}

.action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 24px;
  color: #f5f5f7;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: rgba(102, 126, 234, 0.3);
}

.action-btn.primary:hover {
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.related-articles {
  margin-top: 60px;
}

.related-title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #f5f5f7;
  margin-bottom: 40px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.related-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
}

.related-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.related-card h4 {
  color: #f5f5f7;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.related-card p {
  color: #86868b;
  font-size: 14px;
  line-height: 1.5;
}

.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  opacity: 0;
  visibility: hidden;
  z-index: 100;
}

.back-to-top.show {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 20px 16px;
  }

  .article-header {
    padding: 40px 0 20px;
    margin-bottom: 40px;
  }

  .article-content {
    padding: 30px 24px;
  }

  .article-meta {
    flex-direction: column;
    gap: 12px;
  }

  .floating-nav {
    display: none;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .back-to-top {
    bottom: 20px;
    right: 20px;
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

.slide-in {
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>