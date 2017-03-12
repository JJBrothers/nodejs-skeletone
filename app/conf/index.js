process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = 4000;
const jwt = {
  algorithm : 'HS256',
  param : 'token',
  secret : 'secret',
  session : {
    session : false
  },
  excludeUrl : [
    /\/swgr|\/swgr\/|\/page\/|\/favicon.ico/g, // url중 /swgr 와 /swgr/이 포함되어있다면 검사하지않도록함 .
    ///\/smpl\//g,  // url중 /smpl로 들어오는 요청이있다면 검사하지않도록함 .현재 /smpl 로 들어오는 모든 url을 token 검사하지않음
    { url: '/', methods: ['GET','POST','PUT','DELETE']  }
  ]
}

const mysql = {
  dialect: 'mysql',
  host : process.env.HOME_DB_HOST,
  port : process.env.HOME_DB_PORT,
  user : process.env.HOME_DB_UESR,
  database : process.env.HOME_DB_NAME,
  password : process.env.HOME_DB_PASSWD,
  connectionLimit: 10,
  logging: false,
  multipleStatements: true
}

const sqlite = {
  dialect: 'sqlite',
  storage: 'db.development.sqlte'
}

const mailSender = {
  mailId : 'nainfoxservice@gmail.com',
  passwd : 'nainfox88',
  smtpDomain : 'gmail.com',
  from : '나인폭스'
}

const config  = {
  development: {
    port : port,
    db: mysql,
    auth : jwt,
    mailSender : mailSender
  },
  production: {
    port : port,
    db: mysql,
    auth : jwt,
    mailSender : mailSender
  }
}

//sample
// sudo vi ~/.bash_profile
// source ~/.bash_profile

// # 개발머신에 적용
// export NC_DB_UESR=root
// export NC_DB_PASSWD=0625
// export NC_DB_NAME=timering
// export NC_DB_HOST=210.221.219.131
// export NC_DB_PORT=3306
// export NC_USE_SWGR=Y
// export NC_SWGR_HOST=localhost:4000

// # 배포서버에 적용
// export NC_DB_UESR=root
// export NC_DB_PASSWD=0625
// export NC_DB_NAME=timering
// export NC_DB_HOST=210.221.219.131
// export NC_DB_PORT=3306
// export NC_USE_SWGR=Y
// export NC_SERVER_HOST=210.221.219.131:187
module.exports = config[process.env.NODE_ENV];
