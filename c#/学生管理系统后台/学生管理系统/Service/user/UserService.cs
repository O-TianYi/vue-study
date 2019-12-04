using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using 学生管理系统.Models;
using 学生管理系统.Models.Response;
using 学生管理系统.Models.User;

namespace 学生管理系统.Service
{
    public class UserService:ServiceBase
    {
        
        //添加用户
        public int AddUser(User user)
        {
            string sql = "insert into users (userName,password,roleId,majorId,classId,isRemoved,createTime) values ( '" + user.UserName + "','" + user.Password + "'," + user.RoleId+ ","  + user.MajorId + "," + user.ClassId + "," + user.IsRemoved+",'"+user.CreateTime+"')";
            int num = Insert_Delete_Update(sql);
            return num;
        }
        //添加角色
        public int AddRole(Role role)
        {
            string sql = "insert into roles (roleName,authId,isRemoved,createTime) values ( '" + role.RoleName + "'," + role.AuthId + "," + role.IsRemoved + ",'" + role.CreateTime + "')";
            int num = Insert_Delete_Update(sql);
            return num;
        }
        //添加权限
        public int AddAuth(Auth auth)
        {
            string sql = "insert into authority (authId,action,roleId,isRemoved,createTime) values ( " + auth.AuthId + ",'" + auth.Action + "'," + auth.IsRemoved + ",'" + auth.CreateTime + "')";
            int num = Insert_Delete_Update(sql);
            return num;
        }

        //假删除
        public int DelUser(int id)
        {
            bool isExitId = QueryExistId(id);
            if (!isExitId)
            {
                return 0;
            }
            string sql = "update users set isRemoved = 1 where userId=" + id;
            int num = Insert_Delete_Update(sql);
            return num;
        }

        //更新
        public int UpdateUser(int id,User user)
        {
            bool isExitId = QueryExistId(id);
            if (!isExitId)
            {
                return 0;
            }
            string sql = "update users set userName='" + user.UserName + "',password='" + user.Password + "',createTime='"+user.CreateTime+"' where userId=" +id;
            int num = Insert_Delete_Update(sql);
            return num;
        }






        /********-------------          查询的外部方法    ------------------********/

        //查询所有用户并返回所有权限，，，,有则返回一个对象，否则返回为空
        public List<CompleteUserResponse> QueryAllUser()
        {
            List<CompleteUserResponse> list = Query_null_allusermessage();
            return list;
        }


        //根据id查询用户,,有则返回一个对象，否则返回为空
        public CompleteUserResponse QueryOneUser(int userid)
        {
            CompleteUserResponse user = Query_userid_usermessage(userid);
            return user;
        }

        //分页查询
        public List<CompleteUserResponse> QueryPage(int index, int number)
        {
            List<CompleteUserResponse> list = Query_indexnumber_usermessage(index, number);
            return list;
        }


        //根据用户名查询用户,,,true表示存在用户，false表示用户不存在
        public bool QueryUserName(string name)
        {
            bool isUserName = Query_username_bool(name);
            return isUserName;
        }



        //判断用户id是否存在
        public bool QueryExistId(int userid)
        {
            bool result = Query_userid_bool(userid);
            return result;
        }



        //登陆
        public CompleteUserResponse Login(User user)
        {
            CompleteUserResponse usr = Query_user_login(user);
            return usr;
        }



        /********-------------          查询的外部方法    ------------------********/



        //777777777777777777   查询其他表
        //查询所有班级
        public List<string> QueryAllClasses()
        {
            List<string> list = Query_null_allclasses();
            return list;
        }
        //查询所有年级
        public List<string> QueryAllGrades()
        {
            List<string> list = Query_null_allgrades();
            return list;
        }
        //查询所有专业
        public List<string> QueryAllMajors()
        {
            List<string> list = Query_null_allmajors();
            return list;
        }
        //查询所有学科
        public List<string> QueryAllSubjects()
        {
            List<string> list = Query_null_allsubjects();
            return list;
        }


        //查询所有选修科目
        public List<string> QueryAllElectiveSubjects()
        {
            List<string> list = Query_null_electivesubjects();
            return list;
        }
        //查询所有选修科目，返回对象
        public List<ElectiveSubject> QueryAllElectiveSubjectsObj()
        {
            List<ElectiveSubject> list = Query_null_electivesubjectsobj();
            return list;
        }

        //根据用户id查询该用户的所有选修课程
        public List<string> QueryOneElectiveSubjects(int userid)
        {
            List<string> list = Query_userid_electivesubjects(userid);
            return list;
        }
        

        //--- ---------    对userelectives表的增删
        //根据userid和electiveSubjectId添加个人选课表
        public int AddOneElectiveSubject(UserElective ue)
        {
            string sql = "insert into userelectives (userId,electiveSubjectId,isRemoved,createTime) values ( " + ue.UserId + "," + ue.ElectiveSubjectId + "," + ue.IsRemoved + ",'" + ue.CreateTime + "')";
            int num = Insert_Delete_Update(sql);
            return num;
        }
        //假删除
        public int DelOneElectiveSubject(UserElective  one)
        {
            string sql = "update userelectives set isRemoved = 1 where userId=" + one.UserId+" and electiveSubjectId="+one.ElectiveSubjectId;
            int num = Insert_Delete_Update(sql);
            return num;
        }
        //--- ---------    对userelectives表的增删


        //根据用户id输出课程表（所有的选修和必修）
        public OneAllSubjectResponse QueryOneAllSubjects(int userid)
        {
            bool isExitId = QueryExistId(userid);
            if (!isExitId)
            {
                return null;
            }
            OneAllSubjectResponse one = Query_userid_oneallsubjects(userid);
            return one;
        }
        



    }
}