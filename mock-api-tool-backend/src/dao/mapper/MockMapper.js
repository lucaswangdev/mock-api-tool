module.exports = {
  insert: `
    insert into api_list(api_path, api_content, delay, api_description, userId) values(#data.api_path, #data.api_content, #data.delay, #data.api_description, #data.userId)
  `,
  update: `
    update api_list set api_path = #data.api_path, api_content = #data.api_content, delay = #data.delay, api_description=#data.api_description where id=#data.id and userId=#data.userId
    `,
  findById: `
    select id, api_path, api_content, delay, api_description, create_time, update_time from api_list where id = #data.id and userId=#data.userId
    `,
  delete: `
    delete from api_list where id = #data.id and userId=#data.userId
    `,
  findByApiPath: `
    select id, api_path, api_content, delay, api_description, create_time, update_time from api_list where api_path = #data.api_path and userId=#data.userId
    `,
  findAll: `
    select id, api_path, api_content, delay, api_description, create_time, update_time from api_list where userId=#data.userId
    `,
};