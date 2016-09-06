import R from 'ramda';

class Storage {
    insert(databaseName, object) {
        const id = (new Date()).getTime();
        const dbObject = R.assoc('id', id, object);
        window.localStorage.setItem(`${databaseName}-${id}`, JSON.stringify(dbObject));
        return dbObject;
    }

    update(databaseName, id, object) {
        const key = `${databaseName}-${id}`;
        const oldObject = window.localStorage.getItem(key);
        if (!oldObject) {
            return Promise.reject(new Error(`No Object ${id} in ${databaseName}`));
        }
        window.localStorage.setItem(key, JSON.stringify(object));
        return object;
    }

    delete(databaseName, id) {
        const key = `${databaseName}-${id}`;
        const oldObject = window.localStorage.getItem(key);
        if (!oldObject) {
            return new Error(`No Object ${id} in ${databaseName}`);
        }
        window.localStorage.removeItem(`${databaseName}-${id}`);
    }

    find(databaseName) {
        const regex = new RegExp(`^${databaseName}`);
        const values = [];
        for(const key in window.localStorage){
            if (regex.test(key)) {
                values.push(window.localStorage.getItem(key));
            }
        }
        return values.map(JSON.parse.bind(JSON));
    }

    query(databaseName, query) {
        const all = this.find(databaseName);
        const checkQuery = R.pipe(
            R.pick(R.keys(query)),
            R.equals(query)
        )
        return all.filter(checkQuery);
    }

    findById(databaseName, id) {
        const key = `${databaseName}-${id}`;
        return JSON.parse(window.localStorage.getItem(key));
    }

}
export let storage = new Storage(); 