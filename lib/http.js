// lib/http.js

// 通过 axios 处理请求
const axios = require('axios')

axios.interceptors.response.use(res => {
  console.log(res);
  return res.data;
})

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  const res = axios.get('https://api.github.com/repos/cadben/vue-template')
  console.log(res);
  return res
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}