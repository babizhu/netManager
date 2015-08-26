package com.bbz.mac.module;

import org.joda.time.DateTime;
import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Ok;

/**
 * Created by   liu_k
 * Time         2015/8/26 16:43
 */

@IocBean
@InjectName
@At("/mac")
public class MacModule{
    @At
    @Ok("raw:html")
    public String list(){

        return new DateTime().toString();
    }

}
