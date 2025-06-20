<template>
  <!-- <el-row :gutter="20">
    <el-col :span="4">

    </el-col>
    <el-col :span="16"> 2 </el-col>
    <el-col :span="4"> 3 </el-col>


       
  </el-row> -->
  <div style="display: flex; height: 100%; overflow-x: hidden">
    <div>
      <el-menu
        :collapse-transition="true"
        default-active="1"
        class="custom-menu"
        :collapse="isCollapse_l"
        @open="handleOpen"
        @close="handleClose"
      >
        <div class="box1" v-show="isCollapse_l">
          <div style="box-sizing: border-box; width: 360px; padding: 10px">
            <div class="box1_content" v-show="isCollapse_l">
              <div
                style="
                  display: flex;
                  box-sizing: border-box;
                  padding: 0 40px 0px 0px;
                "
              >
                <div style="flex-grow: 1">
                  <img
                    src="../assets/tope.jpeg"
                    style="
                      height: 40px;
                      margin: 0 atuo;
                      display: inline-block;
                      border-radius: 10px;
                    "
                    alt=""
                  />
                </div>
                <div style="flex-grow: 8; font-size: 14px">
                  <div style="line-height: 22px">参考答案阅览室</div>
                  <div style="font-size: 12px; color: #6b7280">{{ files.length }} 篇内容</div>
                </div>
              </div>
              <el-tabs
                v-show="isCollapse_l"
                v-model="activeName"
                stretch
                @tab-click="handleClick"
              >
                <el-tab-pane style="text-align: center" name="first">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"
                        ><Operation
                      /></el-icon>
                      <span style="vertical-align: middle">首页</span>
                    </span>
                  </template>
                  <div>
                    <ul style="text-align: left">
                      <!-- <li class="list">
                        <el-icon
                          style="vertical-align: middle; display: inline-block"
                          ><Notebook
                        /></el-icon>
                        <span
                          style="
                            vertical-align: middle;
                            display: inline-block;
                            padding-left: 4px;
                          "
                          >如何在有限的生命，做真正重要的事</span
                        >
                      </li> -->
                      <li class="list" v-for="file in files" :key="file.name" @click="pdfClick(file)">
                        <el-icon style="vertical-align: middle"
                          ><Notebook
                        /></el-icon>
                        <span
                          style="vertical-align: middle; padding-left: 4px"
                          >{{ file.name }}</span
                        >
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane style="text-align: center" name="second">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"><Memo /></el-icon>
                      <span style="vertical-align: middle">刊目</span>
                    </span>
                  </template>
                  <ul style="text-align: left">
                    <li class="list">
                      <el-icon style="vertical-align: middle"
                        ><Notebook
                      /></el-icon>
                      <span style="vertical-align: middle; padding-left: 4px"
                        >如何在有限的生命，做真正重要的事</span
                      >
                    </li>
                    <li class="list">
                      <el-icon style="vertical-align: middle"
                        ><Notebook
                      /></el-icon>
                      <span style="vertical-align: middle; padding-left: 4px"
                        >如何在有限的生命，做真正重要的事</span
                      >
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane style="text-align: center" name="third">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"><Memo /></el-icon>
                      <span style="vertical-align: middle">标签</span>
                    </span>
                  </template>
                  <ul style="text-align: left">
                    <li class="list">
                      <el-icon style="vertical-align: middle"
                        ><Notebook
                      /></el-icon>
                      <span style="vertical-align: middle; padding-left: 4px"
                        >如何在有限的生命，做真正重要的事</span
                      >
                    </li>
                    <li class="list">
                      <el-icon style="vertical-align: middle"
                        ><Notebook
                      /></el-icon>
                      <span style="vertical-align: middle; padding-left: 4px"
                        >如何在有限的生命，做真正重要的事</span
                      >
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </el-menu>
    </div>
    <div style="flex-grow: 4">
      <div style="box-sizing: border-box; padding: 10px">
        <div style="background: white; border-radius: 12px">
          <div style="display: flex">
            <div style="flex-grow: 1; text-align: left">
              <span
                class="r_btn"
                v-show="isCollapse_l"
                @click="isCollapse_l = false"
              >
                <el-icon style="margin-left: 0"><DArrowLeft /></el-icon>
              </span>
              <span
                class="r_btn"
                v-show="!isCollapse_l"
                @click="isCollapse_l = true"
              >
                <el-icon style="margin-left: 0"><DArrowRight /></el-icon>
              </span>
            </div>

            <div style="flex-grow: 1; text-align: right">
              <span
                class="r_btn"
                v-show="!isCollapse_r"
                style="float: right; margin-right: 6px"
                @click="isCollapse_r = true"
              >
                <el-icon style="margin-left: 0"><DArrowLeft /></el-icon>
              </span>

              <span
                class="r_btn"
                style="float: right; margin-right: 6px"
                v-show="isCollapse_r"
                @click="isCollapse_r = false"
              >
                <el-icon style="margin-left: 0"><DArrowRight /></el-icon>
              </span>

              <!-- <el-button
                v-show="!isCollapse_r"
                :icon="DArrowLeft"
                @click="isCollapse_r = true"
              />
              <el-button
                v-show="isCollapse_r"
                :icon="DArrowRight"
                @click="isCollapse_r = false"
              /> -->
            </div>
          </div>
          <div class="content">
         <PDFView   :pdfUrl="pdfUrls"/> 
            <!-- <texts /> -->
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-menu
        class="custom-menu2"
        default-active="2"
        :collapse="isCollapse_r"
        @open="handleOpen2"
        @close="handleClose2"
        :popper-offset="123"
        background-color="#00000000"
      >
        <div class="box2" v-show="isCollapse_r">
          <div style="box-sizing: border-box; padding: 10px">
            <div class="box2_content">
              <el-tabs
                v-model="activeName2"
                class="demo-tabs"
                stretch
                @tab-click="handleClick"
              >
                <el-tab-pane name="first">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"
                        ><Collection
                      /></el-icon>
                    </span>
                  </template>
                  <div class="textlist">
                    <div class="flex flex-col w-full p-5 gap-5">
                      <div class="">
                        <div
                          class="text-wrap text-[#2A2B2E] text-base font-medium mb-[6px]"
                        >
                          建立系统，而非目标
                        </div>
                        <div
                          class="break-words text-neutral-600 text-xs font-medium cursor-pointer"
                        >
                          www.notion.so
                        </div>
                      </div>
                      <div
                        class="flex py-4 border-b border-t border-neutral-50"
                      >
                        <div
                          class="mr-3"
                          style="margin-right: 13px; margin-top: 2px"
                        >
                          <div
                            class="w-9 h-9 rounded-full overflow-hidden text-white flex items-center justify-center"
                            style="background-color: rgb(77, 77, 77)"
                          >
                            S
                          </div>
                        </div>
                        <div>
                          <div class="text-[13px] font-medium leading-5">
                            Scott Adams
                          </div>
                          <div class="text-xs leading-5 text-neutral-600">
                            暂无发布时间
                          </div>
                        </div>
                      </div>
                      <div
                        class="flex flex-col gap-3 pb-5 border-b border-neutral-50"
                      >
                        <div class="text-neutral-800 text-[13px] font-medium">
                          基本信息
                        </div>
                        <div class="flex items-center text-sm leading-[22px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            class="mr-2"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.4 5.4H9.6C8.59681 5.4 7.92861 5.40109 7.41521 5.44304C6.91816 5.48365 6.69071 5.55547 6.54662 5.62889C6.15148 5.83022 5.83022 6.15148 5.62889 6.54662C5.55547 6.69071 5.48365 6.91816 5.44304 7.41521C5.40109 7.92861 5.4 8.59681 5.4 9.6V12.4C5.4 13.4032 5.40109 14.0714 5.44304 14.5848C5.48365 15.0818 5.55547 15.3093 5.62889 15.4534C5.83022 15.8485 6.15148 16.1698 6.54662 16.3711C6.69071 16.4445 6.91816 16.5164 7.41521 16.557C7.92861 16.5989 8.59681 16.6 9.6 16.6H12.4C13.4032 16.6 14.0714 16.5989 14.5848 16.557C15.0818 16.5164 15.3093 16.4445 15.4534 16.3711C15.8485 16.1698 16.1698 15.8485 16.3711 15.4534C16.4445 15.3093 16.5164 15.0818 16.557 14.5848C16.5989 14.0714 16.6 13.4032 16.6 12.4V9.6C16.6 8.59681 16.5989 7.92861 16.557 7.41521C16.5164 6.91816 16.4445 6.69071 16.3711 6.54662C16.1698 6.15148 15.8485 5.83022 15.4534 5.62889C15.3093 5.55547 15.0818 5.48365 14.5848 5.44304C14.0714 5.40109 13.4032 5.4 12.4 5.4ZM4.38148 5.91103C4 6.65972 4 7.63982 4 9.6V12.4C4 14.3602 4 15.3403 4.38148 16.089C4.71703 16.7475 5.25247 17.283 5.91103 17.6185C6.65972 18 7.63982 18 9.6 18H12.4C14.3602 18 15.3403 18 16.089 17.6185C16.7475 17.283 17.283 16.7475 17.6185 16.089C18 15.3403 18 14.3602 18 12.4V9.6C18 7.63982 18 6.65972 17.6185 5.91103C17.283 5.25247 16.7475 4.71703 16.089 4.38148C15.3403 4 14.3602 4 12.4 4H9.6C7.63982 4 6.65972 4 5.91103 4.38148C5.25247 4.71703 4.71703 5.25247 4.38148 5.91103ZM8.3 9.3C8.3 8.9134 8.6134 8.6 9 8.6H13C13.3866 8.6 13.7 8.9134 13.7 9.3C13.7 9.6866 13.3866 10 13 10H9C8.6134 10 8.3 9.6866 8.3 9.3ZM9 11.6C8.6134 11.6 8.3 11.9134 8.3 12.3C8.3 12.6866 8.6134 13 9 13H10C10.3866 13 10.7 12.6866 10.7 12.3C10.7 11.9134 10.3866 11.6 10 11.6H9Z"
                              fill="black"
                              fill-opacity="0.5"
                            ></path>
                          </svg>
                          <div class="text-left text-neutral-700 mr-7">
                            文章来自
                          </div>
                          <div class="text-neutral-950">www.notion.so</div>
                        </div>
                        <div class="flex items-center text-sm leading-[22px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            class="mr-2"
                          >
                            <circle
                              cx="11"
                              cy="11"
                              r="6.8"
                              stroke="black"
                              stroke-opacity="0.5"
                              stroke-width="1.4"
                            ></circle>
                            <path
                              d="M11 8V10.5388C11 11.1463 11.2762 11.7209 11.7506 12.1005L13.5 13.5"
                              stroke="black"
                              stroke-opacity="0.5"
                              stroke-width="1.4"
                              stroke-linecap="round"
                            ></path>
                          </svg>
                          <div class="text-left text-neutral-700 mr-7">
                            收集时间
                          </div>
                          <div class="text-neutral-950">24/11/14 · 00:00</div>
                        </div>
                        <div class="flex items-center text-sm leading-[22px]">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-2"
                          >
                            <g id="éè¯»æ¶é¿">
                              <path
                                id="Outlined"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11 18C11 18 9.21096 17.3072 8 17.0857C7.18114 16.936 6.14817 16.9143 5.234 16.9386C4.04053 16.9703 3 16.0398 3 14.8459V7.10405C3 6.17463 3.64053 5.36569 4.56096 5.23681C5.60696 5.09034 6.97502 4.98232 8 5.20011C9.25087 5.46591 11 6.43143 11 6.43143C11 6.43143 12.7574 5.49658 14 5.20025C14.9663 4.9698 16.2521 4.97509 17.2778 5.03526C18.2699 5.09345 19 5.93762 19 6.93143V14.8459C19 16.0398 17.9595 16.9703 16.766 16.9386C15.8518 16.9143 14.8189 16.936 14 17.0857C12.789 17.3072 11 18 11 18ZM10.3 7.64437L10.2615 7.6236C10.2169 7.59973 10.1501 7.56435 10.0653 7.52063C9.89525 7.43289 9.65594 7.31312 9.38131 7.18609C8.80555 6.91975 8.17343 6.66822 7.70901 6.56954C6.94196 6.40655 5.78464 6.47912 4.7551 6.62328C4.5923 6.64608 4.4 6.80384 4.4 7.10405V14.8459C4.4 15.1817 4.71868 15.5518 5.19687 15.5391C6.13674 15.5142 7.28672 15.5321 8.25182 15.7086C8.92271 15.8312 9.70089 16.0668 10.3 16.2655V7.64437ZM11.7 7.6452L11.7217 7.63388C11.7672 7.61031 11.8351 7.57549 11.9211 7.53242C12.0936 7.44602 12.336 7.32773 12.6141 7.20111C13.1932 6.93747 13.8414 6.67732 14.3248 6.56206C15.0785 6.38231 16.1896 6.37382 17.1958 6.43285C17.3819 6.44377 17.6 6.61102 17.6 6.93143V14.8459C17.6 15.1817 17.2813 15.5518 16.8031 15.5391C15.8633 15.5142 14.7133 15.5321 13.7482 15.7086C13.0773 15.8312 12.2991 16.0668 11.7 16.2655V7.6452Z"
                                fill="black"
                                fill-opacity="0.5"
                              ></path>
                            </g>
                          </svg>
                          <div class="text-left text-neutral-700 mr-7">
                            文章字数
                          </div>
                          <div class="text-neutral-950">
                            2471字 · 阅读约5分钟
                          </div>
                        </div>
                        <div class="flex items-center text-sm leading-[22px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            class="mr-2"
                          >
                            <circle
                              cx="11"
                              cy="11"
                              r="8.5"
                              fill="#4DB207"
                              fill-opacity="0.1"
                            ></circle>
                            <path
                              d="M7.55029 11.3284L8.96451 12.7426C9.35503 13.1332 9.9882 13.1332 10.3787 12.7426L14.6214 8.5"
                              stroke="#4DB207"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                          </svg>
                          <div class="text-left text-neutral-700 mr-7">
                            阅读进度
                          </div>
                          <div class="text-neutral-950 flex items-center">
                            <div class="flex items-center">
                              <span class="mr-3">100%</span
                              ><span
                                class="text-neutral-600 cursor-pointer hover:text-[#55C408]"
                                >重置</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="flex flex-col gap-3 pb-5 border-b border-neutral-50"
                      >
                        <div
                          class="text-neutral-800 text-[13px] font-medium flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="20"
                            viewBox="0 0 14 20"
                            fill="none"
                            class="mr-[6px]"
                          >
                            <path
                              d="M6 4L7.62054 8.37946L12 10L7.62054 11.6205L6 16L4.37946 11.6205L0 10L4.37946 8.37946L6 4Z"
                              fill="#55C408"
                            ></path>
                            <path
                              d="M12 2L12.5402 3.45982L14 4L12.5402 4.54018L12 6L11.4598 4.54018L10 4L11.4598 3.45982L12 2Z"
                              fill="url(#paint0_linear_8884_106455)"
                            ></path>
                            <defs>
                              <linearGradient
                                id="paint0_linear_8884_106455"
                                x1="12"
                                y1="2"
                                x2="12"
                                y2="6"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#55C408"></stop>
                                <stop offset="1" stop-color="#4DB207"></stop>
                              </linearGradient>
                            </defs>
                          </svg>
                          摘要
                        </div>
                        <div class="text-sm leading-6 whitespace-pre-wrap">
                          这篇文章通过作者的亲身经历阐述了一个深刻的职业发展观点：相比于设定具体的目标，拥有并遵循一个有效的系统对于成功更为关键。
                          文章以作者21岁时第一次乘飞机前往加利福尼亚州的经历为起点，讲述了他在飞机上与一位商业CEO的对话，从中学到了一个重要的职业生涯规划理念：不应只专注于一个具体的职业目标，而是应该不断寻找更好的工作机会，形成一个持续的职业发展系统。
                          作者通过观察和比较系统导向和目标导向的人的差异，发现使用系统的人往往更成功。文章中提到，系统导向的人认识到了每一次应用他们的系统本身就是一次成功，而目标导向的人则常常陷入一种持续的失败感中。
                          作者通过多个例子，包括奥运运动员、Facebook创始人马克·扎克伯格和投资大师沃伦·巴菲特的例子，进一步阐述了系统和目标的不同以及系统如何在不同领域发挥作用。
                          文章的核心观点是，成功更多地依赖于建立和遵循一个有效的系统，而不是单纯追求特定的目标。作者强调，通过持续的努力和合理的规划，一个良好的系统能够带来长期的成功和满足感。
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="second">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"
                        ><ScaleToOriginal
                      /></el-icon>
                    </span> </template
                ></el-tab-pane>
                <el-tab-pane name="third">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"
                        ><Tickets
                      /></el-icon>
                    </span> </template
                ></el-tab-pane>
                <el-tab-pane name="fourth">
                  <template #label>
                    <span class="custom-tabs-label">
                      <el-icon style="vertical-align: middle"
                        ><Reading
                      /></el-icon>
                    </span> </template
                ></el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </el-menu>
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

import type { TabsPaneContext } from "element-plus";
import PDFView from "../components/Pdf.vue";
import texts from "../components/text.vue";
import folderSource from "../assets/test.pdf";
import mammoth from "mammoth";
import {
  ref,
  reactive,
  onMounted,
  defineProps,
  defineEmits,
  watch,
  nextTick,
} from "vue";
const files = ref([]);
const activeName = ref("first");
const activeName2 = ref("first");
const pdfUrls = ref("");

const isCollapse_l = ref(true);
const isCollapse_r = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleOpen2 = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose2 = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const pdfClick = (el) => {
  console.log(el)
  pdfUrls.value = el.url
};

const htmlContent = ref("");

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const arrayBuffer = await file.arrayBuffer();  // 通过接口可以直接过去arrayBuffer文件流
    const result = await mammoth.convertToHtml({ arrayBuffer });
    htmlContent.value = result.value; // 获取转换后的 HTML 内容
  }
};
onMounted(async () => {
  const pdfFiles = import.meta.glob("../../public/pdfs/*.pdf"); // 注意路径可能需要根据你的项目结构调整

  for (const path in pdfFiles) {
    const name = path.split("/").pop(); // 获取文件名
    files.value.push({ name, url: `/pdfs/${name}` }); // 添加到文件列表中，注意这里的URL需要根据实际部署情况调整
  }
  console.log(files.value);

  if(files.value.length){
    pdfUrls.value = files.value[0].url

  }


});
</script>



<style scoped>
.content {
  height: calc(100vh - 80px);
  overflow-y: auto;
}

/* .content::-webkit-scrollbar {
  width: 0;
} */

.textlist {
  height: calc(100vh - 130px);
  overflow-y: auto;
  font-size: 14px;
}
.textlist::-webkit-scrollbar {
  width: 0;
}
.r_btn {
  padding: 10px;
  background: #f6f6f8;
  margin-top: 12px;
  margin-bottom: 10px;
  width: 40px;
  margin-left: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: block;
}
.box2 {
  width: 340px;
  height: 100vh;
  background: transparent;
}
.box1 {
  width: 360px;
  height: 100vh;
  background: transparent;
}
.box1_content {
  height: calc(100vh - 20px);
  box-sizing: border-box;
  padding: 20px 20px;
  background: white;
  border-radius: 12px;
}

.box2_content {
  width: 100%;
  height: calc(100vh - 20px);
  box-sizing: border-box;
  padding: 10px 20px;

  background: white;
  border-radius: 12px;
}
.custom-menu {
  width: 100%;
  max-width: 360px;
  background: transparent !important;
}
.custom-menu:not(.el-menu--collapse) {
  width: 10px;

  background: transparent !important;
  min-height: 100%;
}
.custom-menu2 {
  width: 100%;
  max-width: 340px;
  background: transparent !important;
}
.custom-menu2:not(.el-menu--collapse) {
  width: 10px;

  min-height: 400px;
}
/* .custom-menu.el-menu--collapse {
    width: 200px !important;
} */
.list {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 38px;
  border-radius: 4px;
  color: #020618e6;
}
.list:hover {
  border-radius: 4px;
  background: #f7f7f9;
}
</style>
