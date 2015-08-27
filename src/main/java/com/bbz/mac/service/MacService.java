package com.bbz.mac.service;

import com.bbz.mac.pojo.logic.MacInfo;
import org.nutz.dao.Dao;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.service.IdEntityService;

import java.util.List;

/**
 * Created by   liu_k
 * Time         2015/8/26 17:16
 */

@IocBean(args = {"refer:dao"})
public class MacService extends IdEntityService<MacInfo>{

    public MacService( Dao dao ){
        super( dao );
    }

    public List<MacInfo> getAll(){
        return query( null,null );
    }

    public MacInfo create( MacInfo macInfo ){
        return dao().insert( macInfo );
    }

    public void delete( MacInfo macInfo ){
        dao().delete( macInfo );
    }

    public void update( MacInfo macInfo ){
        dao().update( macInfo );
    }

}
