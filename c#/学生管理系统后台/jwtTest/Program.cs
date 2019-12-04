using JWT;
using JWT.Algorithms;
using JWT.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace jwtTest
{
    class Program
    {
        static void Main(string[] args)
        {
            // 自定义秘钥
            // jwt 的生成和解析都需要使用
            const string secret = "GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk";

            // 使用 JwtBuilder 来生成 token
            string token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm()) // 使用算法
                .WithSecret(secret) // 使用秘钥
                .AddClaim("exp", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds())
                .AddClaim("claim2", "claim2-value")
                .Build();

            Console.WriteLine("jwt加密后的内容："+token);

            // 使用 JwtBuilder 来解析 token
            try
            {
                string json = new JwtBuilder()
                    .WithSecret(secret)
                    .MustVerifySignature()
                    .Decode(token);

                Console.WriteLine("jwt解析后："+json);
            }
            catch (TokenExpiredException)
            {
                Console.WriteLine("token 已过期");
            }
            catch (SignatureVerificationException)
            {
                Console.WriteLine("token 签名无效");
            }

            Console.ReadLine();

        }
    }
}
