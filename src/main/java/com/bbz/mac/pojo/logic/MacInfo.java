package com.bbz.mac.pojo.logic;

import lombok.Data;
import org.nutz.dao.entity.annotation.Column;
import org.nutz.dao.entity.annotation.Id;
import org.nutz.dao.entity.annotation.Table;

/**
 * Created by   liu_k
 * Time         2015/8/26 16:30
 */
@Table("mac_info")   // ������Person��������ݱ�

@Data

public class MacInfo{
    @Id       // ��ʾ���ֶ�Ϊһ����������Id,ע��,�����ݿ��������!!
    private int id;


    @Column
    private String uname;


    @Column
    private String device;


    @Column
    private String mac;


}
