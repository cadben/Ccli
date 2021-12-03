const { getRepoList } = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise


async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    console.log(error)
    spinner.fail('download tempalte Faild！')
  }
}
class Generator {
    constructor(name, targetDir) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    async download(templateType) {
      if (templateType == 'vue') {
        // 1）拼接下载地址
        const requestUrl = `cadben/vue-simple-template`;
        // 2）调用下载方法
        await wrapLoading(
          this.downloadGitRepo, // 远程下载方法
          'downloading vue template', // 加载提示信息
          requestUrl,
          path.resolve(process.cwd(), this.targetDir))
      } else if (templateType == 'react') {
        const requestUrl = `cadben/react-simple-template`;
        await wrapLoading(
          this.downloadGitRepo, // 远程下载方法
          'downloading react template', // 加载提示信息
          requestUrl,
          path.resolve(process.cwd(), this.targetDir))
      }
    }

    async create(templateType) {
        // 1）获取模板名称
        await this.download(templateType)
    }
}

module.exports = Generator;

    // async getRepo() {
    //     // 1）从远程拉取模板数据
    //     const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    //     if (!repoList) return;

    //     // 过滤我们需要的模板名称
    //     const repos = repoList.map(item => item.name);

    //     // 2）用户选择自己新下载的模板名称
    //     const { repo } = await inquirer.prompt({
    //         name: 'repo',
    //         type: 'list',
    //         choices: repos,
    //         message: 'Please choose a template to create project'
    //     })

    //     // 3）return 用户选择的名称
    //     return repo;
    // }