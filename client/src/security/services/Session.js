import db from "../../app/services/localdb";
/**
 * @description Higher order layer for Session
 */
class Session {

    constructor() {
        this.key = 'session';
    }

    /**
     * @description select cookie by name
     * @param {BOLEAN} name
     */
    isValid(key=null) {
        key = key || this.key;
        const session = db.get(key);
        //const from = session && session.from ? session.from.pathname : '/';
        console.log('session', session);
        return session && session.access_token ? true : false;
    }

    /**
     * @description get session
     * @param {OBJECT} 
     */
    get(key=null) {
        key = key || this.key;
        return db.get(key);
    }

    /**
     * @description clean session
     */
    del(key=null) {
        key = key || this.key;
        db.del(key);
        return this;
    }

    /**
     * @description update session
     */
    set(payload, key=null) {
        key = key || this.key;
        db.set(payload, this.key);
    }
}
// ......................................................................
const obj = new Session();
obj.Cls = Session;
// ......................................................................
export default obj;
