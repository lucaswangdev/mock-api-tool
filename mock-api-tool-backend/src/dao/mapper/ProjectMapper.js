module.exports = {
  insert: `
    insert into project(projectName, projectCode) values(#data.projectName, #data.projectCode);
  `,
  update: `
    update project set projectName = #data.projectName where id=#data.id;
  `,
  findAllByUserId: `
    select id, projectName, projectCode from project WHERE projectCode in (SELECT projectCode from project_user WHERE userId = #data.userId);
  `,
  delete: `
    delete from project where id = #data.id
  `,
};