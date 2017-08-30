<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  * {
    box-sizing: border-box;
    outline: none;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    margin: 0;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  input[type=button],
  input[type=file],
  input[type=reset],
  input[type=submit],
  .btn,
  .button {
    border: 0;
    cursor: pointer;
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  [disabled] {
    pointer-events: none;
  }

  [hidden] {
    display: none;
  }

  .clearfix:after {
    clear: both;
    content: "";
    display: table;
  }
</style>
