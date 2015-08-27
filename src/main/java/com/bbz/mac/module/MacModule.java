package com.bbz.mac.module;

import com.bbz.mac.pojo.logic.MacInfo;
import com.bbz.mac.service.MacService;
import org.joda.time.DateTime;
import org.nutz.ioc.annotation.InjectName;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.mvc.adaptor.JsonAdaptor;
import org.nutz.mvc.annotation.AdaptBy;
import org.nutz.mvc.annotation.At;
import org.nutz.mvc.annotation.Ok;
import org.nutz.mvc.annotation.Param;

import java.util.List;

/**
 * Created by   liu_k
 * Time         2015/8/26 16:43
 */

@IocBean
@InjectName
@At("/mac")
public class MacModule{
    public static final String RESULT = "{\"success\":true,\"message\":\"数据提交完毕 \",\"data\":[]}";

    @Inject
    private MacService macService;

    @At
    @Ok("json")

    public List<MacInfo> read(){


        return macService.getAll();
    }

    @At
    @Ok("raw")
    @AdaptBy(type = JsonAdaptor.class)
    public String create( @Param("data") MacInfo[] macs ){

        String ids = "";
        for( MacInfo mac : macs ) {

            System.out.println( mac );
            macService.create( mac );
            //{"id":10
            ids += "\"id\":";
            ids += mac.getId();
            ids += ",";
        }
        //ids = StrUtil.removeLastChar( ids );
        return "{\"success\":true,\"message\":\"数据提交完毕 \",\"data\":[{" + ids + "}]}";
    }


    @At
    @Ok("raw")
    @AdaptBy(type = JsonAdaptor.class)
    public String update( @Param("data") MacInfo[] macs ){
        for( MacInfo mac : macs ) {
            macService.update( mac );
        }
        return RESULT;
    }

    @At
    @Ok("raw")
    @AdaptBy(type = JsonAdaptor.class)
    public String destroy( @Param("data") MacInfo[] macs ){

        for( MacInfo mac : macs ) {

            macService.delete( mac );
        }
        return RESULT;
    }

    @At
    @Ok("raw:html")
    public String list(){

        return new DateTime().toString();
    }

}
