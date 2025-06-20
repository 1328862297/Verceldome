 <template>
    <div>
      <vue-pdf-embed :source="urls" style="width: 100%; height: 600px;"></vue-pdf-embed>
    </div>
  </template>
   
  <script>
  import VuePdfEmbed from 'vue-pdf-embed';
   
  export default {
    components: {
      VuePdfEmbed
    },
    props:{
      pdfUrl:{
        type: String,
        default: "",
      }
    },
    watch: {
      pdfUrl: {
      handler(news, old) {
        //this.$emit("trade_time_ajax", news);
        console.log(news)
        this.urls = '../../public/'+news+''
      },
    },
  },
    data() {
      return {
        urls:'',
       // pdfUrl: '../../public/static/test.pdf' // 可以是本地路径或网络URL
      };
    }
  }
  </script> 

  