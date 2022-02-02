import db from "./localdb";
/**
 * @description Higher order layer for Session
 */
class Session {
    /**
     * @description select cookie by name
     * @param {BOLEAN} name
     */
    isValid() {
        const session = db.get('session');
        //const from = session && session.from ? session.from.pathname : '/';
        return session ? true : false;
    }
    /**
     * @description get session
     * @param {OBJECT} 
     */
    get() {
        return db.get('session');
    }

    /**
     * @description clean session
     */
    del() {
        db.del("session");
        return this;
    }
}
// ......................................................................
const obj = new Session();
obj.Cls = Session;
// ......................................................................
export default obj;