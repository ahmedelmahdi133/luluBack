const { parse } = require('pg-connection-string');
const url = "postgresql://postgres:1231@localhost:5432/jenan";
const config = parse(url);
console.log(config);
console.log('Password type:', typeof config.password);
