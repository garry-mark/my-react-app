const log4js = require('log4js');
const path = require('path');

log4js.addLayout('json', function (config) {
  return function (logEvent) { return JSON.stringify(logEvent) + config.separator; }
});

function createDateFileAppender(filename, options) {
  return Object.assign({
    type: 'dateFile',
    layout: { type: 'json', separator: ',' },
    pattern: 'yyyy-MM-dd.log',
    alwaysIncludePattern: true,
    daysToKeep: 7,
    compress: true,
    filename: path.resolve(__dirname, filename),
  }, options);
}

module.exports = {
  app: {
    development: {
      baseURL: '/api',
      port: 5000,
      bodyParserOptions: {
        // onerror: function (err, ctx) {
        //   ctx.throw('body parse error', 422);
        // },
        // extendTypes: {
        //   json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
        // }
      },
      dbConfig: {
        connectionLimit: 10,
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'blog'
      },
      validateConfig: {
        // validateRoot: true,
        // convert: true,
        // widelyUndefined: true,
      },
      log4jsConfig: {
        appenders: {
          console: {
            type: 'console',
            layout: {
              type: 'pattern',
              pattern: '%[[%r] [%p] [%c]%] - %m%n'
            }
          },
        },
        categories: {
          default: {
            appenders: ['console'], level: log4js.levels.ALL,
          }
        }
      },
    },
    production: {
      baseURL: '/api',
      port: 5000,
      bodyParserOptions: {
        onerror: function (err, ctx) {
          ctx.throw('body parse error', 422);
        },
        extendTypes: {
          json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
        }
      },
      dbConfig: {
        connectionLimit: 10,
        host: 'db',
        port: 3306,
        user: 'root',
        database: 'blog'
      },
      log4jsConfig: {
        pm2: true,
        pm2InstanceVar: 'INSTANCE_ID',
        appenders: {
          console: {
            type: 'console',
            layout: {
              type: 'pattern',
              pattern: '%[[%r] [%p] [%c]%] - %m%n'
            }
          },
          accessDateFile: createDateFileAppender('log/access/_'),
          operationDateFile: createDateFileAppender('log/operation/_'),
          appDateFile: createDateFileAppender('log/app/_'),
        },
        categories: {
          default: {
            appenders: ['console'], level: log4js.levels.ALL,
          },
          ACCESS: {
            appenders: ['accessDateFile'], level: log4js.levels.ALL,
          },
          OPERATION: {
            appenders: ['operationDateFile'], level: log4js.levels.ERROR,
          },
          APP: {
            appenders: ['appDateFile'], level: log4js.levels.ERROR,
          }
        }
      }
    }
  }
}