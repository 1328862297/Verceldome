<script setup>
import { ref, onMounted, computed } from "vue";

const count = ref(0);

import { useRouter } from "vue-router";
const router = useRouter();
const texts = ref("123");
const style = ref("bold");
const texts2 = ref("");
const background = ref("pink");

const combinedStyle =  computed(() =>{
    return {... getStyle(style.value), ... getBackground(background.value)}

})

onMounted(() => {
//   let ass1 = getStyle(style.value);
//   let ass2 = getBackground(background.value);
//   let stys = { ...ass1, ...ass2 };
//   combinedStyle.value = stys;
});

const setBackground = (e) => {
//   let ass1 = getStyle(style.value);
//   let ass2 = getBackground(e.target.value);
//   let stys = { ...ass1, ...ass2 };
//   combinedStyle.value = stys;
console.log(combinedStyle.value)
};
const setStyle = (e) => {
//   let ass1 = getStyle(e.target.value);
//   let ass2 = getBackground(background.value);
//   let stys = { ...ass1, ...ass2 };
//   combinedStyle.value = stys;
//   console.log(combinedStyle.value);
};
const getStyle = (e) => {
  switch (e) {
    case "bold":
      return {
        fontWeight: "900",
        fontFamily: "Arial Black, sans-serif",
        textShadow: "none",
      };
    case "script":
      return {
        fontWeight: "normal",
        fontFamily: "cursive",
        textShadow: "none",
      };
    case "outline":
      return {
        fontWeight: "bold",
        fontFamily: "Arial",
        textShadow:
          "-1px -1px 0 #ff4fa1, 1px -1px 0 #ff4fa1, -1px 1px 0 #ff4fa1, 1px 1px 0 #ff4fa1",
      };
    default:
      return {};
  }
};

const getBackground = (e) => {
  // console.log(e)
  switch (e) {
    case "pink":
      return { backgroundColor: "#ffeff6", color: "#ff4fa1" };
    case "stripes":
      return {
        background:
          "repeating-linear-gradient(45deg, #fde6ec, #fde6ec 10px, #fff9f9 10px, #fff9f9 20px)",
        color: "#b66b7c",
      };
    case "black":
      return { backgroundColor: "#000", color: "#ff4fa1" };
    case "transparent":
      return { background: "none", color: "#ff4fa1" };
    default:
      return {};
  }
};
</script>

<template>
  <div class="container" style="text-align: center; margin: 0 auto">
    <div class="header">
      <h1>Brat Generator Pink</h1>
    </div>

    <main class="main">
      <h2>Instantly Create BRAT Pink Posters</h2>
      <p>
        Turn your text into aesthetic BRAT-style pink graphics, inspired by
        Charli XCX. Perfect for social posts, profile pics, and more.
      </p>

      <div class="controls">
        <label
          >Font Style:
          <select v-model="style" @change="setStyle">
            <option value="bold">Brat Bold</option>
            <option value="script">Brat Script</option>
            <option value="outline">Brat Outline</option>
          </select>
        </label>
        <label
          >Background:
          <select v-model="background" @change="setBackground">
            <option value="pink">Pink Gradient</option>
            <option value="stripes">Candy Stripes</option>
            <option value="black">Smoky Black</option>
            <option value="transparent">Transparent</option>
          </select>
        </label>
      </div>
      <textarea
        v-model="texts"
        class="textarea"
        placeholder="Type your bratty message here..."
      ></textarea>

      <div class="preview" :style="combinedStyle ">
        {{ texts || "Your preview will appear here..." }}
      </div>
    </main>

    <footer class="footer">
      <p>&copy; 2025 BratGen Studio. Not affiliated with Charli XCX.</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #fff9f9, #fff2f7);
  padding: 0;
  margin: 0;
}

.header {
  padding: 1rem 2rem;
  background-color: #fde6ec;
  border-bottom: 2px solid #b66b7c;
}

.header h1 {
  margin: 0;
  color: #b66b7c;
}

.main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.textarea {
  width: 100%;
  height: 100px;
  font-size: 1.2rem;
  padding: 1rem;
  border: 2px solid #b66b7c;
  border-radius: 10px;
  resize: vertical;
  margin-bottom: 1rem;
}

.preview {
  border: 2px dashed #b66b7c;
  padding: 2rem;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.footer {
  text-align: center;
  padding: 2rem;
  font-size: 0.9rem;
  background-color: #fde6ec;
  color: #888;
}
</style>
