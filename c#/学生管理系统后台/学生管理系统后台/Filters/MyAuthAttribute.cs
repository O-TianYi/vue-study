using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统后台.Filters
{
    public class MyAuthAttribute: AuthorizeAttribute
    {
        private UserIBLL userBll = new UserBLL();
         /// <summary>
         /// 验证是否授权
         /// </summary>
         /// <param name="actionContext"></param>
         /// <returns></returns>
         protected override bool IsAuthorized(HttpActionContext actionContext)
         {
             //获取header头信息
             IEnumerable<string> tokenInfo;
             actionContext.Request.Headers.TryGetValues("Token", out tokenInfo);
             IEnumerable<string> id;
             actionContext.Request.Headers.TryGetValues("id", out id);
             if (tokenInfo != null)
             {
                 string token = tokenInfo.ToList<string>()[0];
                 var userid = id.ToList<string>()[0];
                 if (!string.IsNullOrEmpty(token))
                 {
                     try
                     {
                         UserEntity userEntity = userBll.GetEntityByUserId(id.ToList<string>()[0]);
                         if (userEntity == null)
                         {
                             return false;
                         }
                         IJsonSerializer serializer = new JsonNetSerializer();
                         IDateTimeProvider provider = new UtcDateTimeProvider();
                         IJwtValidator validator = new JwtValidator(serializer, provider);
                         IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                         IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);
                         var json = decoder.Decode(token, userEntity.Secret, verify: true);
                         if (string.IsNullOrEmpty(json))
                         {
                             return false;
                         }
                         var newModel = json.ToObject<UserEntity>();
                         if (newModel.F_UserId != userEntity.F_UserId || newModel.Secret != userEntity.Secret)
                         {
                             return false;
                         }
                         return true;
                     }
                     catch (Exception)
                    {
                         return false;
                     }
                 }
             }
            return false;
        }
    }
}