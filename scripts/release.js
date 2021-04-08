#! /usr/bin/env node

const inquirer = require('inquirer');
const { execSync, exec } = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const { failConsole, successConsole, validateEmpty } = require('./utils');

const relaseTypePrompt = [
  {
    type: 'list',
    name: 'type',
    message: '发布版本的类型',
    choices: ['patch', 'minor', 'major', '指定版本号' ],
    default: 'patch',
  },
];

const versionCodePrompt = [ 
  {
    type: 'input',
    name: 'versionCode',
    message: '需要指定的版本号：',
    validate: validateEmpty,
  }
]

const buildDocPrompt = [ 
  {
    type: "confirm",
    name: 'isBuildDoc',
    message: '是否需要部署组件库文档？',
    choices: ['yes', 'no'],
    validate: validateEmpty,
  }
]

const pubilshPrompt = [ 
  {
    type: "confirm",
    name: 'isPublishNpm',
    message: '是否更新改动到npm库中？',
    validate: validateEmpty,
  }
]

const hasChangeVersion = [
  {
    type: "confirm",
    name: 'hasChangeVersion',
    message: '是否只需要将改动部署到远端',
  },
];


function buildCode() {
  execSync(`npm run build`, { cwd: './' });
  successConsole(`${chalk.yellow('1:')} ----------code build结束--------`);

}

function buildDoc() {
  execSync(`npm run docz:build`, { cwd: './' });
  successConsole(`${chalk.yellow('2:')} ----------docz build结束--------`);
}

/**
 * 检查网络，并拉取tag，修改package和package-lock 版本号
 */
function changeVersion(version, type) {
  exec('git fetch --tags -f', { cwd: './' }, error => {
    if (error) {
      failConsole(chalk.red('git fetch 出错,检查网络链接'));
    } else {
      if (version) {
        execSync(`npm run standard-version -- --release-as ${version}`, { cwd: './' });
      } else {
        execSync(`npm run standard-version -- --release-as ${type}`, { cwd: './' });
      }
      successConsole(`${chalk.yellow('3:')} ----------package.json，package-lock.json version 已修改, tag 和 changeLog 已生成----------`);
      pullNewVersion();
    }
  });
}

async function pullNewVersion() {
  const package = JSON.parse(fs.readFileSync('./package.json').toString()); 
  const { version } = package;
  const { stdout, stderr } = await exec(`git push origin v${version}`, { cwd: './' });
  console.log(stderr)
  // if (stderr) {
  //   failConsole(`请检查网络和github连接后，运行 ${chalk.green(`git push origin v${version}`)} `);
  // } else {
    successConsole(`${chalk.yellow('4:')} v${version} tag 已推送到远端`);
    const { isPublishNpm } = await inquirer.prompt(pubilshPrompt)
    if (isPublishNpm) {
      successConsole('开始publish-----', version)
      publishNpmPackage(version)
    } else {
      successConsole(`发布完成`);
    }
  // }
}

function publishNpmPackage(version) {
  console.log('login ing----')
  // exec(`npm adduser`, { cwd: './' }, error => {
  //   if (error) {
  //     console.log('login error----')
  //     failConsole(`npm 登录失败 ${error}`);
  //   } else {
      exec(`npm publish`, { cwd: './' }, error => {
        if (error) {
          failConsole(error);
        } else {
          successConsole(`${chalk.yellow('5:')} v${version} npm 包已更新`);
          successConsole(`发布完成`);
        }
      });
  //   }
  // }) 
}

async function build() {
  buildCode();
  try {
    const { isBuildDoc } = await inquirer.prompt(buildDocPrompt);
    if (isBuildDoc) {
      console.log()
      buildDoc();
    }
  } catch (error) {
    failConsole(error);
  }
}
async function main() { 
  const answers = await inquirer.prompt(hasChangeVersion);
  if (answers && answers.hasChangeVersion) {
    pullNewVersion();
  } else {
    try {
      await build();
      try {
        const { type } = await inquirer.prompt(relaseTypePrompt)
        if (type === '指定版本号') {
          try {
            const { versionCode } = await inquirer.prompt(versionCodePrompt)
            changeVersion(versionCode)
          } catch (error) {
            failConsole(error);
          }
        } else {
          changeVersion('', type)
        }
      } catch (error) {
        failConsole(error);
      }
    } 
    catch (error) {
    failConsole(error);
  }
}    
}

main();
  

