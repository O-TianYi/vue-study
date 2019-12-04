using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MD5加密算法
{
    class Program
    {
        static void Main(string[] args)
        {
        }

        // MD5加密
        public static string MD5Encrypt(string input, Encoding encoding = null)
        {
            if (encoding == null)
            {
                encoding = Encoding.UTF8;
            }
            MD5 md5Hasher = MD5.Create();
            byte[] data = md5Hasher.ComputeHash(encoding.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            return sBuilder.ToString();
        }


        //MD5验证传入的密文是否经由传入的明文加密所得
        public static bool MD5Verify(string input, string hash, Encoding encoding = null)
        {
            string hashOfInput = MD5Encrypt(input, encoding); // Create a StringComparer and compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;
            return 0 == comparer.Compare(hashOfInput, hash);
        }





    }
}
