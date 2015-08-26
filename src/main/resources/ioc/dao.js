var ioc = {

    dataSource : {
        type : "com.alibaba.druid.pool.DruidDataSource",
        events : {
            //create : 'init',
            depose : 'close'
        },
        fields : {
            // 请修改下面的数据库连接信息
            //url : 'jdbc:h2:~/apps/nutzdemo-shiro/db/db;CACHE_SIZE=131072;AUTO_RECONNECT=TRUE',
            url: 'jdbc:mysql://192.168.1.11:3306/mac?',
            username : 'root',
            password : '123',
            maxActive : 20,
            validationQuery : "SELECT 1",
            testWhileIdle : true,
            testOnBorrow : false,
            testOnReturn : false
        }
    },

    dao : {
        type : 'org.nutz.dao.impl.NutDao',
        args : [ {
            refer : 'dataSource'
        } ]
    }
};
