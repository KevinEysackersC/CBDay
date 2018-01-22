using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using CegekaBDayPlatform.Service;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            PersonService service = new PersonService();
            var list = service.GetUpcommingBirthDays(10);
            foreach (var item in list)
            {
                Console.WriteLine(item.DateOfBirth);
            }
        }
    }
}
