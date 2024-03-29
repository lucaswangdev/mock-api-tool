const getPoolConnection = require("./DataBase");
const { outputSQL } = require("./SqlCompile");
const { camelizeKeys } = require("./utils");

/**
 *  CtxData
 */
class CtxData{
  constructor(ctx){
    // connection  
    this.connection = null;
    // is connected
    this.connected = false;
    // ctx
    this.ctx = ctx;
    this.camelizeKeys = camelizeKeys;
    this.outputSQL = outputSQL;

  }

  /**
   * connection 
   * @returns {object} database connection object
   */
  getConnection = () =>{
    return this.connection;
  }

  /**
   * connect 
   * @returns {boolean}  database connected 
   */
  isConnected = () => {
    return this.connected ;
  };

  /**
   * start
   * @param {boolean} transaction 
   */
  start = async (transaction = false) =>{
    this.transaction  = transaction ;
    this.connection   = await getPoolConnection();
    this.connected    = this.connection !== null ? true : false;
    if(this.transaction === true){
      await this.beginTransaction();
    }
  }

  /**
   * end
   * @param {boolean} complete 
   */
  end = async (complete = true) =>{
    if(this.isConnected() === true) {
      if (this.transaction === true) {
        if (complete === true) {
          await this.commit();
        } else {
          await this.rollback();
        }
      } else {
        await this.release();
      }
    }
  }

  /**
   * transaction error
   */
  error = async () =>{
    if(this.transaction === true){
      await this.rollback();
    }
  }

  /**
   * begin transaction
   */
  beginTransaction = async () =>{
    await this.connection.beginTransaction();
  }

  /**
   * commit transaction
   */
  commit = async () => {
    console.log(`commit operation`);
    await this.connection.commit();
    await this.release();
  }

  /**
   * rollback transaction
   */
  rollback = async () => {
    console.log(`rollback operation`);
    await this.connection.rollback();
    await this.release();
  }

  /**
   * connection release
   */
  release = async () =>{
    await this.connection.release();
    this.connected = false ;
  }

  /**
   * 返回分页数据
   * @param {} pageNum 
   * @param {*} pageSize 
   * @param {*} apiContentList 
   * @returns 
   */
  handlePages = (pageNum, pageSize, apiContentList) => {
    let total = apiContentList.length;
    let startRow = total > 0 ? ((pageNum - 1) * pageSize + 1) : 0;
    let endRow = pageNum * pageSize <= total ? pageNum * pageSize : total;
    return {
      success: true,
      msg: "",
      errorCode: "",
      data: {
        pageNum,
        pageSize,
        recordCounts: total,
        startRow,
        endRow,
        tableData: apiContentList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
      }
    }
  }
}

module.exports = CtxData;
