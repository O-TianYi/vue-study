using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using 学生管理系统.Models;
using 学生管理系统.Models.Response;
using 学生管理系统.Models.User;
using 学生管理系统.Service;
using 学生管理系统.Tools;

namespace 学生管理系统.Controllers
{
    //跨域问题
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //添加用户时候，返回用户信息+添加成功信息
    [RoutePrefix(prefix: "user")]//路由前缀
    public class UserController : ApiController
    {

        //jwt的验证
        public int CheckJWT()
        {
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                //return "cookie上不存在token！";
                return 0;
            }
            string token = cookie.ToString().Split('=')[1];
            //判断token的有效性和是否存在token
            Dictionary<string, object> isLogined = Jwt.IsLogined1(token);
            object value;
            if (isLogined.TryGetValue("Message", out value))
            {
                //返回token过期或者token被修改等信息
                //return value.ToString();
                return 2;
            }
            //return "token有效";
            return 1;
        }




        //查找所有用户
        [HttpGet]
        [Route(template: "queryall")]
        public IHttpActionResult QueryAll()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<CompleteUserResponse> list = service.QueryAllUser();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }

        //查找单个用户
        [HttpGet]
        [Route(template: "queryfromid")]
        public IHttpActionResult QueryId(int id)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            CompleteUserResponse user = service.QueryOneUser(id);
            if (user == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功",Data=user });
        }


        //分页查询
        [HttpGet]
        [Route(template: "pagequery")]
        public IHttpActionResult PageQuery(int index,int number)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<CompleteUserResponse> list = service.QueryPage(index, number);
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }


        //查询用户名是否被注册
        [HttpGet]
        [Route(template: "checkname")]
        public IHttpActionResult CheckName(string name)
        {
            UserService service = new UserService();
            bool result = service.QueryUserName(name);
            if (result)
            {
                return Ok(new ResponseData() { Code = 001, Message = "用户名已被使用" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "用户名没有被使用" });
        }


        //查询用户id是否存在
        [HttpGet]
        [Route(template: "checkid")]
        public IHttpActionResult CheckId(int id)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            bool result = service.QueryExistId(id);
            if (result)
            {
                return Ok(new ResponseData() { Code = 001, Message = "id存在" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "id不存在" });
        }

        //登陆接口
        [HttpPost]
        [Route(template: "login")]
        public IHttpActionResult Login(User user)
        {
            //生成一个token字符串
            string token = Jwt.Encode(new Dictionary<string, object>() { { "loginName", user.UserName } }, Jwt.key);

            UserService service = new UserService();
            CompleteUserResponse u = service.Login(user);
            if (u==null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "登陆失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "登陆成功",Data=u,Token=token});
        }




        //添加用户接口
        [HttpPost]
        [Route(template: "register")]
        public IHttpActionResult AddUser(User user)
        {
            UserService service = new UserService();
            int num = service.AddUser(user);
            if (num>=1)
            {
                return Ok(new ResponseData() { Code = 001, Message = "添加成功" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "添加失败" });
        }


        //假删除用户接口
        [HttpPut]
        [Route(template: "delete")]
        public IHttpActionResult DeleteUser(int id)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            int num = service.DelUser(id);
            if (num >= 1)
            {
                return Ok(new ResponseData() { Code = 001, Message = "删除成功" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "删除失败" });
        }

        //更新用户接口
        [HttpPut]
        [Route(template: "update")]
        public IHttpActionResult UpdateUser(int id,User user)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            int num = service.UpdateUser(id, user);
            if (num >= 1)
            {
                return Ok(new ResponseData() { Code = 001, Message = "更新成功" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "更新失败" });
        }



        //-----------------     其他表的操作
        //查找班级
        [HttpGet]
        [Route(template: "queryallclasses")]
        public IHttpActionResult QueryAllClasses()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<string> list = service.QueryAllClasses();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }


        //查找所有年级
        [HttpGet]
        [Route(template: "queryallgrades")]
        public IHttpActionResult QueryAllGrades()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<string> list = service.QueryAllGrades();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }

        //查找所有专业
        [HttpGet]
        [Route(template: "queryallmajors")]
        public IHttpActionResult QueryAllMajors()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<string> list = service.QueryAllMajors();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }

        //查找所有学科
        [HttpGet]
        [Route(template: "queryallsubjects")]
        public IHttpActionResult QueryAllSubjects()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<string> list = service.QueryAllSubjects();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }



        //---------========          选修科目的接口  
        //查找所有选修学科名称
        [HttpGet]
        [Route(template: "queryallelectivesubjects")]
        public IHttpActionResult QueryAllElectiveSubjects()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<string> list = service.QueryAllElectiveSubjects();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }
        //查找所有选修学科对象
        [HttpGet]
        [Route(template: "queryallelectivesubjectsobj")]
        public IHttpActionResult QueryAllElectiveSubjectsObj()
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            List<ElectiveSubject> list = service.QueryAllElectiveSubjectsObj();
            if (list == null)
            {
                return Ok(new ResponseData() { Code = 002, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功", Data = list });
        }

        //添加个人的选修学科
        [HttpPost]
        [Route(template: "addoneelectivesubject")]
        public IHttpActionResult AddOneElectiveSubject(UserElective ue)
        {
            UserService service = new UserService();
            int num = service.AddOneElectiveSubject(ue);
            if (num >= 1)
            {
                return Ok(new ResponseData() { Code = 001, Message = "添加成功" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "添加失败" });
        }

        //删除个人的选修学科
        //假删除用户接口
        [HttpPut]
        [Route(template: "deloneelectivesubject")]
        public IHttpActionResult DelOneElectiveSubject(UserElective one)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            int num = service.DelOneElectiveSubject(one);
            if (num >= 1)
            {
                return Ok(new ResponseData() { Code = 001, Message = "删除成功" });
            }
            return Ok(new ResponseData() { Code = 002, Message = "删除失败" });
        }



        //根据用户id输出该用户的所有学科（选修+必修）
        [HttpGet]
        [Route(template: "queryoneallsubjects")]
        public IHttpActionResult QueryOneAllSubjects(int id)
        {
            //检查token
            int check = CheckJWT();
            if (check == 0)
            {
                return Ok(new ResponseData() { Code = 003, Message = "cookie上没有token，请登录" });
            }
            else if (check == 2)
            {
                return Ok(new ResponseData() { Code = 003, Message = "token过期或者被修改过" });
            }
            //token有效，正常查询
            UserService service = new UserService();
            OneAllSubjectResponse one = service.QueryOneAllSubjects(id);
            if (one == null)
            {
                return Ok(new ResponseData() { Code = 001, Message = "查询失败" });
            }
            return Ok(new ResponseData() { Code = 001, Message = "查询成功",Data=one });
        }



    }
}
