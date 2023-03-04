module.exports = {
  insert: `
    insert into api_list(api_path, api_content, delay) values(#data.api_path, #data.api_content, #data.delay);
  `,
  update: `
    update api_list set api_path = #data.api_path, api_content = #data.api_content, delay = #data.delay where id=#data.id;
    `,
  findById: `
    select id, api_path, api_content, delay, create_time, update_time from api_list where id = #data.id
    `,
  delete: `
    delete from api_list where id = #data.id
    `,
  findByApiPath: `
    select id, api_path, api_content, delay, create_time, update_time from api_list where api_path = #data.api_path
    `,
  findAll: `
    select id, api_path, api_content, delay, create_time, update_time from api_list
    `,
};