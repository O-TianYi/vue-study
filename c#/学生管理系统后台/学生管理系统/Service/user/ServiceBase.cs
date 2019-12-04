using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using 学生管理系统.Models;
using 学生管理系统.Models.Response;
using 学生管理系统.Models.User;

namespace 学生管理系统.Service
{
    public class ServiceBase
    {
        private DBTools db = new DBTools();

        /*-------------          查询的私有类    ------------------*/
        //根据输入的表的名称查询表
        protected IEnumerable<DataRow> QueryBase(string tablename)
        {
            SqlCommand cmd = db.OpenCommand();
            cmd.CommandText = "select * from "+ tablename + " where isRemoved=0";
            DataSet ds = new DataSet();
            SqlDataAdapter apdater = new SqlDataAdapter(cmd);
            apdater.Fill(ds);//把数据库映射到了ds上
            db.CloseConn();//关闭数据库
            IEnumerable<DataRow> query = from obj in ds.Tables[0].AsEnumerable()
                                            select obj;
            return query;
        }


        //*********************         查users表的部分开始
        //1、根据userId查询id是否存在
        private bool QueryUserId_bool(int userid)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    return true;
                }
            }
            return false;
        }

        //2、根据userId查询用户名称
        private bool QueryUsersName_bool(string username)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<string>("userName") == username)
                {
                    return true;
                }
            }
            return false;
        }

        //3、根据userId查询用户名
        private string QueryUserId_username(int userid)
        {
            var query = QueryBase("users");
            foreach(DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    return obj.Field<string>("userName");
                }
            }
            return null;
        }

        //4、根据userId查询密码
        private string QueryUserId_password(int userid)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    return obj.Field<string>("password");
                }
            }
            return null;
        }



        //5、根据userId查询roleId
        private int QueryUsersId_roleid(int userid)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    return obj.Field<int>("roleId");
                }
            }
            return 0;
        }

        //6、根据userId查询majorId
        private int QueryUsersId_majorid(int userid)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    return obj.Field<int>("majorId");
                }
            }
            return 0;
        }

        //7、根据userId查询classId
        private int QueryUsersId_classid(int userid)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    return obj.Field<int>("classId");
                }
            }
            return 0;
        }

        //*********************         查users表的部分结束



        //===================         查roles表的部分开始

        //1、根据roleId查询authId
        private int QueryRolesId_authid(int roleid)
        {
            var query = QueryBase("roles");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("roleId") == roleid)
                {
                    return obj.Field<int>("authId");
                }
            }
            return 0;
        }
        //2、根据roleId查询roleName
        private string QueryRolesId_rolename(int roleid)
        {
            var query = QueryBase("roles");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("roleId") == roleid)
                {
                    return obj.Field<string>("roleName");
                }
            }
            return null;
        }

        //===================         查roles表的部分结束




        //&&&&&&&&&&&&&&&&&        查authority表的部分开始
        //1、根据authId查询action
        private List<string> QueryAuthId_actions(int authid)
        {
            var query = QueryBase("authority");
            List<string> actions = new List<string>();
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("authId") == authid)
                {
                    actions.Add(obj.Field<string>("action"));
                }
            }
            return actions;
        }


        //&&&&&&&&&&&&&&&&&        查authority表的部分结束


        //*************         查classes表的部分开始
        //1、根据classId查询classId
        private int QueryClassId_gradeid(int classid)
        {
            var query = QueryBase("classes");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("classId") == classid)
                {
                    return obj.Field<int>("gradeId");
                }
            }
            return 0;
        }
        //2、根据classId查询className
        private string QueryClassId_classname(int classid)
        {
            var query = QueryBase("classes");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("classId") == classid)
                {
                    return obj.Field<string>("className");
                }
            }
            return null;
        }
        //*************         查classes表的部分结束


        //￥￥￥￥￥￥￥￥￥￥￥   查grades表的部分开始

        //1、根据gradeId查询gradeId
        private string QueryGradeId_gradename(int gradeid)
        {
            var query = QueryBase("grades");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("gradeId") == gradeid)
                {
                    return obj.Field<string>("gradeName");
                }
            }
            return null;
        }
        //￥￥￥￥￥￥￥￥￥￥￥   查grades表的部分结束



        //………………………    查majors表的部分开始
        //1、根据majorId查询subjectId
        private string QueryMajorId_majorname(int majorid)
        {
            var query = QueryBase("majors");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("majorId") == majorid)
                {
                    return obj.Field<string>("majorName");
                }
            }
            return null;
        }

        //………………………    查majors表的部分开始

        //%%%%%%%%%%%%%%%%    查subjects表的部分开始
        //1、根据majorIdId查询subjectId
        private int QuerySubjectMajorId_subjectid(int majorid)
        {
            var query = QueryBase("subjects");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("majorId") == majorid)
                {
                    return obj.Field<int>("subjectId");
                }
            }
            return 0;
        }
        //2、根据majorIdId查询subjectName
        private List<string> QuerySubjectMajorId_subjectname(int majorid)
        {
            var query = QueryBase("subjects");
            List<string> list = new List<string>();
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("majorId") == majorid)
                {
                    string subjectname= obj.Field<string>("subjectName");
                    list.Add(subjectname);
                }
            }
            return list;
        }
        //3、根据majorIdId查询subjectName
        private string QuerySubjectId_subjectname(int subjectid)
        {
            var query = QueryBase("subjects");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("subjectId") == subjectid)
                {
                    return obj.Field<string>("subjectName");
                }
            }
            return null;
        }
        //%%%%%%%%%%%%%%%%    查subjects表的部分结束

        //?????????????????    查electivesubject表开始
        //1、根据electiveSubjectId查询electiveName
        private string QueryElectiveId_electivename(int electiveid)
        {
            var query = QueryBase("electivesubjects");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("electiveSubjectId") == electiveid)
                {
                    string subjectname = obj.Field<string>("electiveName");
                    return subjectname;
                }
            }
            return null;
        }
        //2、根据electiveSubjectId查询所有信息
        private ElectiveSubject QueryElectiveId_electivemessage(int electiveid)
        {
            var query = QueryBase("electivesubjects");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("electiveSubjectId") == electiveid)
                {
                    ElectiveSubject subject = new ElectiveSubject() { };
                    subject.ElectiveName= obj.Field<string>("electiveName");
                    subject.ElectiveSubjectId = obj.Field<int>("electiveSubjectId");
                    return subject;
                }
            }
            return null;
        }

        //?????????????????    查electivesubject表结束

        //**************      查userelectives表开始
        //1、根据usertId查询electiveId
        private int QueryUserId_electiveid(int userid)
        {
            var query = QueryBase("userelectives");
            foreach (DataRow obj in query)
            {
                if (obj.Field<int>("userId") == userid)
                {
                    int electiveid = obj.Field<int>("electiveSubjectId");
                    return electiveid;
                }
            }
            return 0;
        }
        //**************      查userelectives表结束





        /*************         年级、班级、分数的查询的私有类    ***********/

        /*-------------          增删改的私有类    ------------------*/
        //增删改的方法,
        protected int Insert_Delete_Update(string sql)
        {
            SqlCommand cmd = db.OpenCommand();
            cmd.CommandText = sql;
            int num = cmd.ExecuteNonQuery();
            db.CloseConn();
            return num;

        }
        /*-------------          增删改的私有类    ------------------*/






        //!!!!!!!!!!!!!!!~~~~~~~~          逻辑的层        ~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //----*********￥￥￥￥￥￥    利用上面返回的内容综合部分
        //输入userId返回权限列表
        protected List<string> Query_userid_ActionsList(int userid)
        {
            int roleid = QueryUsersId_roleid(userid);
            if (roleid == 0)
            {
                return null;
            }
            int authid = QueryRolesId_authid(roleid);
            if (authid == 0)
            {
                return null;
            }
            List<string> actions = QueryAuthId_actions(authid);
            return actions;
        }

        /// <summary>
        /// 二次优化部分，，，都是由userid查询对应的名称（string)
        /// </summary>
        /// <param name="userid">用户id</param>
        /// <returns>string</returns>
        //根据userId查找majorName
        protected string Query_userid_majorname(int userid)
        {
            int majorid = QueryUsersId_majorid(userid);
            string majorname = QueryMajorId_majorname(majorid);
            return majorname;
        }

        //根据userId查询subjectName列表
        protected List<string> Query_userid_subjectname(int userid)
        {
            int majorid = QueryUsersId_majorid(userid);
            List<string> subjectList = QuerySubjectMajorId_subjectname(majorid);
            return subjectList;
        }

        //根据userId查询班级className
        protected string Query_userid_classname(int userid)
        {
            int classid = QueryUsersId_classid(userid);
            string classname = QueryClassId_classname(classid);
            return classname;
        }
        //根据userId查询年级gradeName
        protected string Query_userid_gradename(int userid)
        {
            int classid = QueryUsersId_classid(userid);
            int gradeid = QueryClassId_gradeid(classid);
            string gradename = QueryGradeId_gradename(gradeid);
            return gradename;
        }
        //根据userId查询角色名称roleName
        protected string Query_userid_rolename(int userid)
        {
            int roleid = QueryUsersId_roleid(userid);
            string rolename = QueryRolesId_rolename(roleid);
            return rolename;
        }
        //根据userId查询权限authName
        protected List<string> Query_userid_authname(int userid)
        {
            int roleid = QueryUsersId_roleid(userid);
            int authid = QueryRolesId_authid(roleid);
            List<string> actionsList = QueryAuthId_actions(authid);
            return actionsList;
        }



        /// <summary>
        /// 查询单个
        /// </summary>
        /// <param name="userid">用户id</param>
        /// <returns>对象CompleteUserResponse</returns>
        //根据userid查询整个用户user{UserId,UserName,RoleId,RoleName,Auths,Subjects,MajorName,ClassName,GradeName}
        protected CompleteUserResponse Query_userid_usermessage(int userid)
        {
            if (userid<=0 ){
                return null;
            }
            CompleteUserResponse user=new CompleteUserResponse();
            string username = QueryUserId_username(userid);
            int roleid = QueryUsersId_roleid(userid);
            if (roleid == 0)
            {
                return null;
            }
            string rolename = Query_userid_rolename(userid);
            List<string> auths = Query_userid_authname(userid);
            List<string> subjects = Query_userid_subjectname(userid);
            string majorname = Query_userid_majorname(userid);
            string classname = Query_userid_classname(userid);
            string gradename = Query_userid_gradename(userid);
            user.UserId = userid;
            user.UserName = username;
            user.RoleId = roleid;
            user.RoleName = rolename;
            user.Auths = auths;
            user.Subjects = subjects;
            user.MajorName = majorname;
            user.ClassName = classname;
            user.GradeName = gradename;
            return user;
        }

        /// <summary>
        /// 查询所有
        /// </summary>
        /// <returns></returns>
        //查询所有用户返回用户对象
        protected List<CompleteUserResponse> Query_null_allusermessage()
        {
            var queryUsers = QueryBase("users");
            List<CompleteUserResponse> list = new List<CompleteUserResponse>();
            foreach (DataRow user in queryUsers)
            {
                CompleteUserResponse temp = Query_userid_usermessage(user.Field<int>("userId"));
                list.Add(temp);
            }
            return list;
        }

        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="index"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        //分页查询
        protected List<CompleteUserResponse> Query_indexnumber_usermessage(int index,int number)
        {
            var query = QueryBase("users");
            if (index + number > query.Count())
            {
                number = query.Count() - index;
            }
            if (index < 0 || number <= 0)
            {
                return null;
            }
            List<CompleteUserResponse> list = new List<CompleteUserResponse>();
            foreach (var user in query)
            {
                if (user.Field<int>("userId") >= index && user.Field<int>("userId") <= index + number)
                {
                    CompleteUserResponse temp = Query_userid_usermessage(user.Field<int>("userId"));
                    list.Add(temp);
                }
            }
            return list;
        }


        /// <summary>
        /// 查询用户名是否存在
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        protected bool Query_username_bool(string name)
        {
            bool result = QueryUsersName_bool(name);
            return result;
        }


        /// <summary>
        /// 用户id是否存在
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        protected bool Query_userid_bool(int userid)
        {
            bool result = QueryUserId_bool(userid);
            return result;
        }

        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        protected CompleteUserResponse Query_user_login(User u)
        {
            var query = QueryBase("users");
            foreach (DataRow obj in query)
            {
                if (obj.Field<string>("userName") == u.UserName && obj.Field<string>("password") == u.Password)
                {
                    CompleteUserResponse temp = Query_userid_usermessage(obj.Field<int>("userId"));
                    return temp;                
                }
            }
            return null;
        }

        /*-------------          查询的私有类    ------------------*/


        //7777777777777777      班级表的查询
        //查询所有的班级
        protected List<string> Query_null_allclasses()
        {
            var queryUsers = QueryBase("classes");
            List<string> list = new List<string>();
            foreach (DataRow cla in queryUsers)
            {
                string temp = QueryClassId_classname(cla.Field<int>("classId"));
                list.Add(temp);
            }
            return list;
        }

        //查询所有年级
        protected List<string> Query_null_allgrades()
        {
            var queryUsers = QueryBase("grades");
            List<string> list = new List<string>();
            foreach (DataRow grade in queryUsers)
            {
                string temp = QueryGradeId_gradename(grade.Field<int>("gradeId"));
                list.Add(temp);
            }
            return list;
        }

        //查询所有的专业
        protected List<string> Query_null_allmajors()
        {
            var queryUsers = QueryBase("majors");
            List<string> list = new List<string>();
            foreach (DataRow major in queryUsers)
            {
                string temp = QueryMajorId_majorname(major.Field<int>("majorId"));
                list.Add(temp);
            }
            return list;
        }

        //查询专业的所有的学科
        protected List<string> Query_null_allsubjects()
        {
            var queryUsers = QueryBase("subjects");
            List<string> list = new List<string>();
            foreach (DataRow subject in queryUsers)
            {
                string temp = QuerySubjectId_subjectname(subject.Field<int>("subjectId"));
                list.Add(temp);
            }
            return list;
        }

        //7777777777777777      班级表的查询结束


        //>>>>>>>>>>>>     根据userid返回用户的选修科目
        protected List<string> Query_userid_electivesubjects(int userid)
        {
            var query = QueryBase("userelectives");
            List<string> list = new List<string>();
            foreach (DataRow subject in query)
            {
                if (subject.Field<int>("userId") == userid)
                {
                    string electivename = QueryElectiveId_electivename(subject.Field<int>("electiveSubjectId"));
                    list.Add(electivename);
                }          
            }
            return list;
        }
        protected List<ElectiveSubject> Query_userid_electivesubjectsobj(int userid)
        {
            var query = QueryBase("userelectives");
            List<ElectiveSubject> list = new List<ElectiveSubject>();
            foreach (DataRow subject in query)
            {
                if (subject.Field<int>("userId") == userid)
                {
                    ElectiveSubject electiveobj = new ElectiveSubject();
                    string electivename=QueryElectiveId_electivename(subject.Field<int>("electiveSubjectId"));
                    electiveobj.ElectiveName = electivename;
                    electiveobj.ElectiveSubjectId = subject.Field<int>("electiveSubjectId");
                    list.Add(electiveobj);
                }
            }
            return list;
        }

        //<<<<<<<<<<<<<<<    查询所有选修科目
        protected List<string> Query_null_electivesubjects()
        {
            var query = QueryBase("electivesubjects");
            List<string> list = new List<string>();
            foreach (DataRow subject in query)
            {
                string electivename = QueryElectiveId_electivename(subject.Field<int>("electiveSubjectId"));
                list.Add(electivename);
            }
            return list;
        }
        //返回选修科目的所有对象
        protected List<ElectiveSubject> Query_null_electivesubjectsobj()
        {
            var query = QueryBase("electivesubjects");
            List<ElectiveSubject> list = new List<ElectiveSubject>();
            foreach (DataRow subject in query)
            {
                ElectiveSubject temp = QueryElectiveId_electivemessage(subject.Field<int>("electiveSubjectId"));
                list.Add(temp);
            }
            return list;
        }

        //根据userid返回所有专业学科+选修学科
        protected OneAllSubjectResponse Query_userid_oneallsubjects(int userid)
        {
            OneAllSubjectResponse one = new OneAllSubjectResponse();
            List<string> electives = Query_userid_electivesubjects(userid);
            List<string> subjects = Query_userid_subjectname(userid);
            one.MajorSubjects = subjects;
            one.ElectiveSubjects = electives;
            one.UserId = userid;
            return one;
        }









    }
}