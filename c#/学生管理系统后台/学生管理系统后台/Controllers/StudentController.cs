using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using 学生管理系统后台.Dto;
using 学生管理系统后台.Models;
using 学生管理系统后台.Tools;

namespace 学生管理系统后台.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]//解决跨域
    [RoutePrefix(prefix: "student")]//路由前缀
    public class StudentController : ApiController
    {
        //登陆接口，，测试成功
        [HttpPost]
        [Route(template: "login")]
        public IHttpActionResult Login(Student s)
        {
            DbTool db = new DbTool();
            StudentDto stu=db.Login(s.Name, s.Password);
            if (stu.Id == 0)
            {
                return Ok(new ResponseData() { Message =stu.Name, Code = 2 });
            }
            //生成token并返回给用户
            return Ok(new ResponseData() { Data=stu,Message="登陆成功",Code=1 });
        }




        //注册接口，，添加
        [HttpPost]
        [Route(template: "register")]
        public IHttpActionResult Register(Student s)
        {
            DbTool db = new DbTool();
            string sql = "insert into students (Name,Password) values ('" + s.Name + "','" + s.Password + "')";
            int response = db.ExecuteNonQuery(sql);
            if (response >= 1)
            {
                //注册成功
                return Ok(new ResponseData() { Message = "注册成功！",Code = 1 });
            }
            else
            {
                //注册失败
                return Ok(new ResponseData() { Message = "注册失败！", Code = 2 });
            }

        }


        //分页查询数据库
        [HttpGet]
        [Route(template: "pagequery")]
        public IHttpActionResult PageQuery(int index,int number)
        {
            if (index < 0 || number <= 0)
            {
                return Ok(new ResponseData() { Message = "index或者number，输入有误" });
            }
            DbTool db = new DbTool();
            List<StudentDto> students=db.PageQuery(index, number);
            if (students == null)
            {
                //分页查询没有学生信息，
                return Ok(new ResponseData() { Message = "没有适合的学生信息" ,Code=2 });
            }
            return Ok(new ResponseData() { Data=students, Message = "查询成功", Code = 1 });
        }





        //查询数据库
        [HttpPost]
        [Route(template: "query")]
        public IHttpActionResult QueryAll()
        {
            DbTool db = new DbTool();
            List<StudentDto> students = db.QueryAll();
            if (students == null)
            {
                //查询所有学生信息失败
                return Ok(new ResponseData() {  Message = "查询失败",Code=2 });
            }
            //查询所有学生信息成功，返回所有学生列表
            return Ok(new ResponseData() { Data = students, Message = "查询成功", Code = 1 });
        }


        //真删除操作,,protected类型
        [HttpDelete]
        [Route(template: "truedelete")]
        public  IHttpActionResult TrueDelete(int id)
        {
            DbTool db = new DbTool();
            string sql = "delete from students where isRemoved=0 and id=" + id;
            int response = db.ExecuteNonQuery(sql);
            if (response >= 1)
            {
                //删除成功
                return Ok(new ResponseData() { Message = "删除成功！", Code = 1 });
            }
            else
            {
                //删除失败
                return Ok(new ResponseData() { Message = "删除失败！", Code = 2 });
            }
            
        }



        //假删除，更新isRemoved的状态
        [HttpPut]
        [Route(template: "falsedelete")]
        public IHttpActionResult FalseDelete(int id)
        {
            DbTool db = new DbTool();
            string sql = "update students set isRemoved=1 where isRemoved=0 and id=" + id;
            int response = db.ExecuteNonQuery(sql);
            if (response >= 1)
            {
                //删除成功
                return Ok(new ResponseData() { Message="删除成功！", Code = 1 } );
            }
            else
            {
                //删除失败
                return Ok(new ResponseData() { Message = "删除失败！", Code = 2 });
            }
            
        }



        //更新操作
        [HttpPut]
        [Route(template: "update")]
        public IHttpActionResult Update(int id,Student s)
        {
            DbTool db = new DbTool();
            string sql = "update students set name='" + s.Name + "',password='" + s.Password + "' where isRemoved=0 and id=" + id;
            int response = db.ExecuteNonQuery(sql);
            if (response >= 1)
            {
                //更新成功，
                return Ok(new ResponseData() { Message = "更新成功！",Code =1} );
            }
            else
            {
                //更新失败
                return Ok(new ResponseData() { Message = "更新失败！", Code = 2 });
            }
            
        }



        //查询用户名称是否被注册,,IEnumerable<DataRow>
        [HttpGet]
        [Route(template: "checkname")]
        public IHttpActionResult CheckName(string name)
        {
            DbTool db = new DbTool();
            int response = db.CheckName(name);
            if (response == 0)
            {
                //用户名不存在，可以注册
                return Ok(new ResponseData() { Message = "可以注册使用",Code=1 });
            }
            //用户名存在，不可注册
            return Ok(new ResponseData() { Message = "用户名已经被注册",Code=2 });

        }




        //根据id查询学生
        [HttpGet]
        [Route(template: "queryfromid")]
        public IHttpActionResult QueryFromId(int id)
        {
            DbTool db = new DbTool();
            StudentDto student = db.Query_from_Id(id);
            if (student.Id == 0)
            {
                //没有对应的学生
                return Ok(new ResponseData() { Message=student.Name, Code = 2 });
            }
            //有对应的学生，返回学生对象
            return Ok(new ResponseData() { Data = student, Code = 1 });
        }
        




        //测试接口
        [HttpPost]
        [Route(template: "test")]
        public IHttpActionResult Test(int id)
        {
            DbTool db = new DbTool();
            //string sql = "insert into students (Name,Password) values ('" + s.Name + "','" + s.Password + "')";
            StudentDto student = db.Register(id);
            return Ok(new ResponseData() { Data = student });
        }




    }
}
