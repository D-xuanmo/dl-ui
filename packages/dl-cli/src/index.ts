import { program } from 'commander'
import inquirer from 'inquirer'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import download from 'download-git-repo'
import logSymbols from 'log-symbols'
import ora from 'ora'

enum DLUI {
  PC = 'PC',
  MOBILE = 'MOBILE'
}

const repositories: Record<`${DLUI}`, string> = {
  [DLUI.PC]: 'D-xuanmo/dlui-template-pc',
  [DLUI.MOBILE]: 'D-xuanmo/dlui-template-mobile'
}

program
  .command('create <projectName>')
  .description('create a new project.')
  .alias('c')
  .option('-pc, --pc', 'Vue3 DLUI PC template.')
  .option('-m, --mobile', 'Vue3 DLUI Mobile template.')
  .action((projectName) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'template',
          message: '请选择项目类型',
          choices: [DLUI.PC, DLUI.MOBILE]
        }
      ])
      .then((answer) => {
        const spinner = ora('Loading unicorns')
        spinner.text = '项目模板下载中...'
        spinner.start()
        download(repositories[answer.template as `${DLUI}`], projectName, (error: any) => {
          if (error) {
            spinner.fail('模板下载失败')
            return console.log(logSymbols.error, `下载失败，状态码：${error.statusCode}`)
          }
          spinner.stop()
          console.log(
            logSymbols.success,
            `
下载成功，进入 ${projectName} 目录，执行以下命令即可开始项目：
yarn install
yarn dev
          `
          )
        })
      })
  })

program.parse()
