using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CegekaBDayPlatform.Model;

namespace CegekaBDayPlatform
{
    public class CegekaBDayPlatformContext : DbContext
    {
            public DbSet<Person> Persons { get; set; }
            public DbSet<UserRole> UserRoles { get; set; }
            public DbSet<User> Users { get; set; }
        
    }
}
