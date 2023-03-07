module.exports = {
  insert: `
    insert into user(userName, userAccount, userPassword) values(#data.userName, #data.userAccount, #data.userPassword);
  `,
  update: `
    update user set api_path = #data.api_path, api_content = #data.api_content, delay = #data.delay, api_description=#data.api_description where id=#data.id;
    `,
  findByUserAccount: `
    select id, userName, userAccount, userPassword from user where userAccount = #data.userAccount
    `,
  delete: `
    delete from user where id = #data.id
    `,
};