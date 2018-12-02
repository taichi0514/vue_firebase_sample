<template>
  <div id="editor">
    <h1>エディター画面</h1>
    <h2>{{ user.displayName }}さん</h2>
    <p>色々書いていってな！</p>
    <button @click="logout">logout</button>
    <div class="editorWrapper">
      <div class="memoListWrapper">
        <div class="memoList" v-for="(memo,index) in memos" :key="index" @click="selectMemo(index)"
             :data-selcted="index == selectedIndex">
          <p class="memoTitle">
            {{displayTitle(memo.markdown)}}
          </p>
        </div>
        <button class="addMemo" @click="addMemo">memo add</button>
        <button class="deleteMemo" v-if="memos.length > 1" @click="deleteMemo">選択中のメモ削除</button>
        <button class="saveMemo" @click="saveMemo">メモの保存</button>
      </div>
      <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
      <div class="preview" v-html="preview()"></div>
    </div>
  </div>
</template>

<script>
  import marked from "marked";

  export default {
    name: "editor",
    props: ["user"],
    data() {
      return {
        memos: [
          {markdown: ""}
        ],
        selectedIndex: 0
      };
    },
    methods: {
      logout: function () {
        firebase.auth().signOut();
      },
      preview: function () {
        return marked(this.memos[this.selectedIndex].markdown);
      },
      addMemo: function () {
        this.memos.push({
          markdown: "無題メモ"
        });
      },
      selectMemo: function (index) {
        this.selectedIndex = index;
      },
      displayTitle: function (text) {
        return text.split(/\n/)[0]
      },
      deleteMemo: function () {
        this.memos.splice(this.selectedIndex, 1);
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
      },
      saveMemo: function () {
        firebase.database().ref("memos/" + this.user.uid).set(this.memos);
      },
    },
    created: function () {
      firebase.database().ref("memos/" + this.user.uid).once("value").then(result => {
        if (result.val()) {
          this.memos = result.val();
        }
      })
    }
  }
</script>

<style scoped>
  .editorWrapper {
    display: flex;
    padding: 20px;
  }

  .markdown {
    width: 50%;
    height: 500px;
    padding: 10px;
  }

  .preview {
    width: 40%;
    text-align: left;
    padding: 0 10px;
  }

  .preview *  :first-child{
    margin-top:0;
  }

  *:before, *:after {
    content: "";
    box-sizing: border-box;
  }

  .memoListWrapper {
    width: 20%;
    border-top: 1px solid #000;
  }

  .memoList {
    padding: 10px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #000;
  }

  .memoList:nth-child(even) {
    background-color: #ccc;
  }

  .memoList[data-selcted="true"] {
    background-color: #ccf;
  }

  .memoTitle {
    height: 1.5em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
  }

  .addMemo {
    margin-top: 20px;
  }

  .markdown {
    width: 40%;
    height: 500px;
  }

  .deleteMemo {
    margin: 10px;
  }
</style>
