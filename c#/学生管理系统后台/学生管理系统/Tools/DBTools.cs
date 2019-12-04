using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models
{
    public class DBTools
    {
        //创建连接对象
        private SqlConnection conn = null;
        public SqlCommand cmd = null;
        //创建连接所需要的信息
        private string ConnStr = "Data Source=LY-20170722SOCC;Initial Catalog=学生管理系统数据库;Integrated Security=True;User Id=sa;Password=sa";    
        //开启数据库
        public bool OpenConn()
        {
            if (conn == null)
            {
                conn = new SqlConnection(ConnStr);
            }
            try
            {
                conn.Open();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //数据库关闭
        public void CloseConn()
        {         
            conn.Close();
            conn.Dispose();
        }
        //数据库重新启动
        public void Restart()
        {
            conn = new SqlConnection(ConnStr);
            conn.Open();
        }
        //创建一个command对象
        public SqlCommand OpenCommand()
        {
            if (OpenConn())
            {
                cmd = conn.CreateCommand();
                return cmd;
            }
            Restart();
            cmd = conn.CreateCommand();
            return cmd;
        }

    }
}