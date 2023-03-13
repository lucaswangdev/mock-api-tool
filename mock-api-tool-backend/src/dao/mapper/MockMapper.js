module.exports = {
  insert: `
    insert into api_list(api_path, api_content, delay, api_description, userId, projectCode) values(#data.api_path, #data.api_content, #data.delay, #data.api_description, #data.userId, #data.projectCode)
  `,
  update: `
    update api_list set api_path = #data.api_path, api_content = #data.api_content, delay = #data.delay, api_description=#data.api_description where id=#data.id and projectCode=#data.projectCode
    `,
  findById: `
    select id, api_path, api_content, delay, api_description, create_time, update_time from api_list where id = #data.id and projectCode=#data.projectCode
    `,
  delete: `
    delete from api_list where id = #data.id and projectCode=#data.projectCode
    `,
  findByApiPath: `
    select id, api_path, api_content, delay, api_description, create_time, update_time from api_list where api_path = #data.api_path and projectCode=#data.projectCode
    `,
  findAll: `
    select id, api_path, api_content, delay, api_description, create_time, update_time from api_list where projectCode=#data.projectCode
    `,
};