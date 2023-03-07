function sqlCompile(template) {
  /**
   * $表达式 动态拦截
   */
  if (/\$([\w\.]{0,})(\W)/g.test(template)) {
    // console.log('数据库关键字拦截');
    // 数据库关键字拦截
    if (/where|select|sleep|benchmark/gi.test(template)) {
      throw new Error(
        '$ value not allowed include where、select、sleep、benchmark keyword !',
      );
    }
  }

  template =
    'print(`' +
    template
      // 解析#动态表达式
      .replace(/#([\w\.]{0,})(\W)/g, '`); \n  print_str( $1 ); \n  print(`$2')
      // 解析$动态表达式
      .replace(/\$([\w\.]{0,})(\W)/g, '`); \n  print( $1 ); \n  print(`$2')
      // 解析<%%>动态语句
      .replace(/<%([\s\S]+?)%>/g, '`); \n $1 \n  print(`') +
    '`);';
  return `(function parse(data){
      let output = "";
      function print(str){
        output += str;
      }
      function print_str(str){
       output += "\'" + str + "\'";
      }
      ${template}
      return output.replace(/[\\r\\n]/g,"").replace(/('undefined'|'null')/g, null).trim();
    })`;
}

function outputSQL(mappingString, data) {
  const mapperFun = eval(sqlCompile(mappingString));
  const sql = mapperFun(data);
  // console.log('-------------mapper输出sql:-----------------\n' + sql);
  return sql;
}

module.exports = {
  outputSQL
}