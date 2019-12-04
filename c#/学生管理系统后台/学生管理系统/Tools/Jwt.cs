using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace 学生管理系统.Tools
{
    public class Jwt 
    {
        //加密
        public static string Encode(Dictionary<string, object> payload, string key)
        {
            //加密串
            var secret = key;//不要外泄
            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            //添加一个jwt失效串，即失效时间
            payload.Add("timeout", DateTime.Now.AddDays(1));//一天

            return encoder.Encode(payload, secret);
        }

        //加密的私钥
        public static string key = "jiamidechuan";


        //解密,,以Dictionary<string ,object> 键值对的形式输出
        public static Dictionary<string, object> Decode(string token, string key)
        {
            var secret = key;

            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

                var json = decoder.Decode(token, key: secret, verify: true);


                // 把接受的字符串转换为键值对形式（和加密的时候相反）
                //把json的内容（字符串）转换为Dictionary<string,object>格式（键值对格式），
                //若字符串转为对象就该JsonConvert.DeserializeObject<Student>(json)即可。
                var result = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);
                //判断是否过期
                if ((DateTime)result["timeout"] < DateTime.Now)
                {
                    Dictionary<string, object> result1 = new Dictionary<string, object>();
                    result1.Add("Message", "token过期！");
                    return result1;
                }
                //没有过期
                result.Remove(key: "timeout");//因为该数据是加密时候自己添加的，无需该用户返回

                return result;  

            }
            catch (TokenExpiredException e)
            {
                //Console.WriteLine("token已经过期");
                //throw e;
                Dictionary<string, object> result = new Dictionary<string, object>();
                result.Add("Message","token过期！");
                return result;
            }
            catch
            {
                //Console.WriteLine("token已被改动");
                Dictionary<string, object> result = new Dictionary<string, object>();
                result.Add("Message", "token已经被改动！");
                return result;
                //throw; 
            }

        }



        //判断请求头是否携带token
        //检验是否登陆,,,,,,返回1为登陆过的,返回2则需要登陆
        public static Dictionary<string, object> IsLogined(HttpRequestHeaders headers) 
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            result.Add("Message", "请登录！");
            //判断token是否为空,headers.GetValues(name: "token").Any()判断是否为空,返回是一个boolean值,非空则返回true,空返回true
            //TryGetValues
            try
            {
                if (headers.GetValues(name: "token") == null || !headers.GetValues(name: "token").Any())
                {
                    return result;
                }
            }
            catch
            {
                return result;
            }

            return Decode(token:headers.GetValues(name: "token").First(), key:key);
            //return Decode(token: headers.GetValues(name:"Cookie")
            
        }




        //判断请求头是否携带token
        //检验是否登陆,,,,,,返回1为登陆过的,返回2则需要登陆
        public static Dictionary<string, object> IsLogined1(string token)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            result.Add("Message", "token不存在，请登录！");
            if (token == null || token=="")
            {
                return result;
            }
            return Decode(token: token, key: key);
        }







    }
}
