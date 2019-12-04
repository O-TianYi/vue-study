using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using 学生管理系统.Models;

namespace 学生管理系统.Tools
{
    public class DataBaseTools
    {
        private static string conn = "Data Source=LY-20170722SOCC;Initial Catalog=学生管理系统数据库;Integrated Security=True;User Id=sa;Password=sa";
         
        //增删改查，，，返回变化的行数
        public int Insert_Delete_Update(string sql)
        {
            using (SqlConnection con = new SqlConnection(conn))
            {
                con.Open();
                using (SqlCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = sql;
                    int num = cmd.ExecuteNonQuery();
                    return num;
                }
            }
        } 

        

        //根据id查询用户
        public string QueryId(int id)
        {
            using (SqlConnection con = new SqlConnection(conn))
            {
                con.Open();
                using (SqlCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = "select * from students where isRemoved=0 and id="+id;
                    DataSet ds = new DataSet();
                    SqlDataAdapter apdater = new SqlDataAdapter(cmd);
                    apdater.Fill(ds);
                    var obj = from student in ds.Tables[0].AsEnumerable()
                              select student;
                    if (obj.Count() == 0)
                    {
                        return "id不存在" ;
                    }
                    return"查询成功";
                }
            }
        }






    }
       
}