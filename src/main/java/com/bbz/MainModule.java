package com.bbz;

/**
 * Created by   liu_k
 * Time         2015/8/26 16:41
 */

import org.nutz.mvc.annotation.*;
import org.nutz.mvc.ioc.provider.ComboIocProvider;

/**
 * user         LIUKUN
 * time         2015-3-17 16:02
 */

//@Modules({ MacModule.class})
//@Modules(value={Abc.class, Xyz.class}, scanPackage = true)
@Modules(scanPackage = true)
@SetupBy(NetManagerSetUp.class)
@IocBy(type=ComboIocProvider.class, args={"*js", "ioc/",
        "*anno", "com.bbz.mac",
        "*tx"})
//@IocBy(type = ComboIocProvider.class, args = { "*org.nutz.ioc.loader.json.JsonLoader", "*.js",
//        "*org.nutz.ioc.loader.annotation.AnnotationIocLoader", "com.bbz.ecms" })

//@IocBy(type = ComboIocProvider.class, args = { "*org.nutz.ioc.loader.json.JsonLoader", "dao.js" })
@Fail("json")
//@Filters(@By(type = ShiroActionFilter.class))
@Localization("msg")
public class MainModule{



}