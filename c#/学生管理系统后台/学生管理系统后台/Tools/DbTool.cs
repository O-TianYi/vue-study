using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using 学生管理系统后台.Dto;
using 学生管理系统后台.Models;

namespace 学生管理系统后台.Tools
{
    public class DbTool
    {
        //-------     自带的私有方法，数据库的连接以及一些对象的创建
        //连接数据库方法
        private SqlConnection Conn()
        {
            SqlConnection sqlConn =
                new SqlConnection(
                 "Data Source=LY-20170722SOCC;Initial Catalog=学生管理系统;Integrated Security=True;User Id=sa;Password=sa");
            return sqlConn;
        }
        //创建执行sql语句对象
        private SqlCommand Comm(SqlConnection conn)
        {
            SqlCommand cmd = conn.CreateCommand();
            return cmd;
        }
        //command结合dataset一起使用
        private DataSet DataSet_Comm(SqlCommand cmd)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(ds);
            return ds;
        }


        //--------   向外暴露的方法，增删改的方法
        //增删改返回是否一个int类型，成功返回受影响的行数，否则返回1
        public int ExecuteNonQuery(string sql)
        {  
            using (SqlConnection conn =this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                {
                    cmd.CommandText = sql;
                    int num = cmd.ExecuteNonQuery();
                    return num;
                }
            }
        }



        //注册方法，返回一个对象
        public StudentDto Register(int id)
        {
            using (SqlConnection conn = this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                {
                    cmd.CommandText = "select Name,Id from students where isRemoved=0";
                    DataSet ds = DataSet_Comm(cmd);
                    IEnumerable<DataRow> result = from student in ds.Tables[0].AsEnumerable()
                                                  where student.Field<int>("Id") == id
                                                  select student;
                    foreach (DataRow s in result)
                    {
                        if (s.Field<int>("Id") == id)
                        {
                            return new StudentDto() { Id = s.Field<int>("Id"), Name = s.Field<string>("name") };
                        }
                        return new StudentDto();
                    }
                    return new StudentDto();

                }
            }
        }
















        //查的方法，返回为一个dto对象，即可以返回一些除了敏感信息的类
        //查所有学生
        public List<StudentDto> QueryAll()
        {
            using (SqlConnection conn = this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                {
                    cmd.CommandText = "select * from students where isRemoved=0";
                    DataSet ds = DataSet_Comm(cmd);
                    List<StudentDto> studentList = new List<StudentDto>();
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        int id = (int)ds.Tables[0].Rows[i][0];
                        string name = ds.Tables[0].Rows[i][1].ToString();
                        StudentDto temp = new StudentDto() { Name = name, Id = id };
                        studentList.Add(temp);
                    }
                    return studentList;
                }
            }
        }



        //根据id查询学生
        public StudentDto Query_from_Id(int id)
        {
            using (SqlConnection conn = this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                {
                    cmd.CommandText = "select * from students  where isRemoved=0 and id=" + id;
                    DataSet ds = DataSet_Comm(cmd);
                    //判断是否有值，即判断用户输入是否正确
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //返回一个对象
                        int stuId = (int)ds.Tables[0].Rows[0][0];
                        string stuName = ds.Tables[0].Rows[0][1].ToString();
                        StudentDto tempStu = new StudentDto() { Name = stuName, Id = stuId };
                        return tempStu;
                    }
                    //用户输入不存在
                    return new StudentDto() { Name = "输入的用户不存在" };
                }
            }
        }


        //分页查询
        public List<StudentDto> PageQuery(int index,int number)
        {
            using (SqlConnection conn = this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                { 
                    cmd.CommandText = "select * from students where isRemoved=0";
                    DataSet ds = DataSet_Comm(cmd);
                    List<StudentDto> studentList = new List<StudentDto>();
                    if(index+number> ds.Tables[0].Rows.Count)
                    {
                        number = ds.Tables[0].Rows.Count-index;
                    }
                    for (int i = index; i < index+number; i++)
                    {
                        int id = (int)ds.Tables[0].Rows[i][0];
                        string name = ds.Tables[0].Rows[i][1].ToString();
                        StudentDto temp = new StudentDto() { Name = name, Id = id };
                        studentList.Add(temp);
                    }
                    return studentList;
                }
            }
        }


        //登陆查询,,,,,测试接口成功
        public StudentDto Login(string name, string password)
        {
            using (SqlConnection conn = this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                {
                    cmd.CommandText = "select * from students where isRemoved=0 and Name='" + name+"'and Password='"+password+"'";
                    DataSet ds = DataSet_Comm(cmd);
                    //判断是否有值，即判断用户输入是否正确
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //返回一个对象
                        int stuId = (int)ds.Tables[0].Rows[0][0];
                        string stuName = ds.Tables[0].Rows[0][1].ToString();
                        StudentDto tempStu = new StudentDto() { Name = stuName, Id = stuId };
                        return tempStu;
                    }
                    //用户输入不存在
                    return new StudentDto() { Name = "输入的用户不存在" };

                }
            }
        }



        //检查用户名是否被注册
        public int CheckName(string name)
        {
            using (SqlConnection conn = this.Conn())
            {
                conn.Open();
                using (SqlCommand cmd = Comm(conn))
                {
                    cmd.CommandText = "select * from students where isRemoved=0 and Name='" + name + "'";
                    DataSet ds = DataSet_Comm(cmd);
                    //判断是否有值，即判断用户输入是否正确
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        return 1;
                    }
                    //用户输入不存在
                    return 0;

                }
            }
        }







    }
}