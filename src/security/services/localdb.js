import cookie from "react-cookies";
/**
 * @description
 */
class LocalDb {
  /**
   * @description
   * @param {STRING} name
   */
  get(name = "session", path = "/") {
    const data = cookie.load(name);
    return data;
  }

  /**
   * @description
   * @param {STRING} name
   */
  set(data, name = "session", path = "/") {
    cookie.save(name, data, { path });
    return this;
  }

  /**
   * @description
   */
  del(name = "session") {
    cookie.remove(name);
    return this;
  }
}
// ......................................................................
const obj = new LocalDb();
obj.Lib = LocalDb;
// ......................................................................
export default obj;
