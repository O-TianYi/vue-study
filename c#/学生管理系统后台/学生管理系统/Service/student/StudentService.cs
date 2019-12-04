using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using 学生管理系统.Models;

namespace 学生管理系统.Service
{
    public class StudentService
    {
        private DBTools db = new DBTools();


        //打开数据库并获取cmd对象
        //SqlCommand cmd = db.OpenCommand();
        //cmd.CommandText = sql;
            //int num = cmd.ExecuteNonQuery();
        //db.CloseConn();//关闭数据库
          //  return num;

        

        //增删改的方法,
        public int Insert_Delete_Update(string sql)
        {      
            SqlCommand cmd=db.OpenCommand();
            cmd.CommandText = sql;
            int num = cmd.ExecuteNonQuery();
            db.CloseConn();
            return num;
           
        }



        //查询用户
        //查询操作的基本，数据库表的映射
        public DataSet QueryBase()
        {
            SqlCommand cmd=db.OpenCommand();
            cmd.CommandText = "select * from students where isRemoved=0";
            DataSet ds = new DataSet();
            SqlDataAdapter apdater = new SqlDataAdapter(cmd);
            apdater.Fill(ds);//把数据库映射到了ds上
            db.CloseConn();//关闭数据库
            return ds;
        }


        //查询所有
        public List<StudentDto> QueryAll()
        {
            DataSet ds = QueryBase();
            var query = from student in ds.Tables[0].AsEnumerable()
                        select student;
            List<StudentDto> list = new List<StudentDto>();
            foreach (var stu in query)
            {
                StudentDto temp = new StudentDto() { Id = stu.Field<int>("id"), Name = stu.Field<string>("name") };
                list.Add(temp); 
            }
            return list;
        }


        //根据id查询用户
        public List<StudentDto> QueryId(int id)
        {
            DataSet ds = QueryBase();
            var query = from student in ds.Tables[0].AsEnumerable()
                        select student;
            List<StudentDto> list = new List<StudentDto>();
            foreach (var stu in query)
            {
                if (stu.Field<int>("id") == id)
                {
                    StudentDto temp = new StudentDto() { Id = stu.Field<int>("id"), Name = stu.Field<string>("name") };
                    list.Add(temp);
                }    
            }
            return list;
        }


        //根据用户名和用户密码查询用户
        public List<StudentDto> query_for_login(Student s)
        {
            DataSet ds = QueryBase();
            var query = from student in ds.Tables[0].AsEnumerable()
                        select student;
            List<StudentDto> list = new List<StudentDto>();
            foreach (var stu in query)
            {
                if (stu.Field<string>("name").Equals(s.Name)&& stu.Field<string>("password").Equals(s.Password))
                {
                    StudentDto temp = new StudentDto() { Id = stu.Field<int>("id"), Name = stu.Field<string>("name") };
                    list.Add(temp);
                }
            }
            return list;
        }



        //根据用户名查询用户
        public List<StudentDto> query_name(string name)
        {
            DataSet ds = QueryBase();
            var query = from student in ds.Tables[0].AsEnumerable()
                        select student;
            List<StudentDto> list = new List<StudentDto>();
            foreach (var stu in query)
            {
                if (stu.Field<string>("name").Equals(name))
                {
                    StudentDto temp = new StudentDto() { Id = stu.Field<int>("id"), Name = stu.Field<string>("name") };
                    list.Add(temp);
                }
            }
            return list;
        }


        //分页查询
        public List<StudentDto> query_page(int index,int number)
        {
            DataSet ds = QueryBase();
            var query = from student in ds.Tables[0].AsEnumerable()
                        select student;
            if (index + number > query.Count())
            {
                number = query.Count() - index;
            }
            if (index < 0 || number <= 0)
            {
                return null;
            }
            List<StudentDto> list = new List<StudentDto>();
            foreach (var stu in query)
            {
                if (stu.Field<int>("id")>=index && stu.Field<int>("id") <= index+number)
                {
                    StudentDto temp = new StudentDto() { Id = stu.Field<int>("id"), Name = stu.Field<string>("name") };
                    list.Add(temp);
                }
            }
            return list;
        }






        //根据id查询id是否存在，，，，，预防前端保存的id被修改的情况
        public bool is_exist_id(int id)
        {
            DataSet ds = QueryBase();
            var query = from student in ds.Tables[0].AsEnumerable()
                        select student;
            foreach (var stu in query)
            {
                if (stu.Field<int>("id") == id)
                {
                    return true;
                }
            }
            return false;
        }









    }
}