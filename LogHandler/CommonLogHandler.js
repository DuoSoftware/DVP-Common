var winston = require('winston');
require('winston-logstash-udp');

/*
winston.add(winston.transports.File, { filename: 'D:/somefile.log' });

var WriteLog = funnpm install ction(message)
{
    winston.log('info', 'Hello distributed log files!');
    winston.info('Hello again distributed logs');
};

module.exports.WriteLog = WriteLog;
*/
//winston.addColors({debug: 'green',info:  'cyan',silly: 'magenta',warn:  'yellow',error: 'red'});

 var logger = new winston.Logger();

var level = 'debug';

if(process.env.LOG_LEVEL) {
    level = process.env.LOG_LEVEL;
}

if (process.env.DEPLOYMENT_ENV == 'docker') {

     logger.add(winston.transports.Console, {colorize: true, level: level});
     //logger.add(winston.transports.File, { filename: 'logger.log' });

 }
 else {

     logger.add(winston.transports.Console, {colorize: true, level: level});

     if(process.env.LOG_PATH) {
         logger.add(winston.transports.File, {filename: process.env.LOG_PATH + '/logger.log', level: level});
     }else{
         logger.add(winston.transports.File, {filename: 'logger.log', level: level});

     }
 }


if(process.env.LOG_SERVER && process.env.LOG_PORT){


    winston.add(winston.transports.LogstashUDP, {
        port: process.env.LOG_PORT,
        appName: process.env.HOST_NAME,
        host: LOG_SERVER,
        level: level
    });

}



module.exports.logger = logger;
