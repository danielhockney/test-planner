module.exports = {
  HOST_NAME: 'localhost',
  NODE_PORT: process.env.PORT || 3000,
  DB_SETTINGS : {
    HOST : 'localhost',
    PORT : 27017,
    NAME : 'PLANNER'
  },
  PRODUCTION_DB_SETTINGS : {
    USERNAME: '',
    PASSWORD: '',
    NAME: ''
  }
};
