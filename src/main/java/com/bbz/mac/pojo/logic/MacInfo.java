package com.bbz.mac.pojo.logic;

import lombok.Data;
import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Table;

/**
 * Created by   liu_k
 * Time         2015/8/26 16:30
 */
@Table("mac_info")   // 声明了Person对象的数据表

@Data

public class MacInfo{
    @Id       // 表示该字段为一个自增长的Id,注意,是数据库表中自增!!
    private int id;


    @Column
    private String uname;


    @Column
    private String device;


    @Column
    private String mac;


}
