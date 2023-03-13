module.exports = {
  insert: `
    insert into project_user(projectCode, userId) values(#data.projectCode, #data.userId);
  `,
  delete: `
    delete from project_user where projectCode = #data.projectCode and userId = #data.userId
    `,
};