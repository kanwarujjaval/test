class Util {
    /**
     *
     * Query parser to user template literal with mysql module
     * forked from https://github.com/christianmalek/node-mysql-es6-query
     * pass mysql.escape or pool.escape for escaperFn
     *
     * @param escaperFn mysql.escape or pool.escape
     * @returns formatted and escaped query
     *
     * usage mysql.query(queryParser`select * from users`)
     */
    static queryParser(escaperFn) {
        return function (parts) {
            let props = [];
            for (let _len = arguments.length, _key = 1; _key < _len; _key++) {
                //values[_key - 1] = arguments[_key];
                props.push(arguments[_key]);
            }
            return parts.reduce(function (prev, curr, i) {
                return prev + escaperFn(props[i - 1]) + curr;
            });
        };
    }
}

module.exports = Util;