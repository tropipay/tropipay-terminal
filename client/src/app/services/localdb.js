import cookie from "react-cookies";
/**
 * @description Higher order layer for web storage (cookie, web Storage, etc)
 */
class LocalDb {
  /**
   * @description select cookie by name
   * @param {STRING} name
   */
  get(name = "session", path = "/") {
    const data = cookie.load(name);
    return this.decode(data);
  }

  /**
   * @description insert cookie by name
   * @param {STRING} name
   */
  set(data, name = "session", path = "/") {
    data = this.encode(data);
    cookie.save(name, data, { path });
    return this;
  }

  /**
   * @description delete cookie by name
   */
  del(name = "session") {
    cookie.remove(name);
    return this;
  }

  /**
   * @description save JSON decode
   */
  decode(str) {
    try {
      return typeof str === 'string' ? JSON.parse(str) : str;
    }
    catch(e){
      return str;
    }
  }

  /**
   * @description save JSON encode
   */
  encode(obj){
    try {
      return typeof obj !== 'string' ? JSON.stringify(obj) : obj;
    }
    catch(e){
      return obj;
    }
  }
}
// ......................................................................
const obj = new LocalDb();
obj.Cls = LocalDb;
// ......................................................................
export default obj;
