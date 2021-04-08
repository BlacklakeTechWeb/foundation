const chalk = require('chalk');
const _ = require('lodash');

const failConsole = error => {
  console.log(chalk.red('错误!'), error);
};

const successConsole = meaasge => {
  console.log('-------------------------------');
  console.log(meaasge);
};

const validateEmpty = value => {
  const _value = _.trim(value);
  if (!_value) {
    return '不能为空';
  }
  return true;
};

module.exports = { failConsole, validateEmpty, successConsole };
