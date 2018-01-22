using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using CegekaBDayPlatform.Model;

namespace CegekaBDayPlatform.Service
{
    public class PersonService
    {
        public Person CreatePerson(Person person)
        {
            using (var context = new CegekaBDayPlatformContext())
            {
                person.Id = Guid.NewGuid();
                context.Persons.Add(person);
                var success = context.SaveChanges();
                if (success != 1) person = null;
                return person;
            }
        }

        public void FixGewoonNeNaam()
        {
            var instance = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }

        public Person GetPerson(Guid id)
        {
            using (var context = new CegekaBDayPlatformContext())
            {
                return context.Persons.FirstOrDefault(s => s.Id == id);
            }

        }

        public List<Person> GetAllPersons()
        {
            using (var context = new CegekaBDayPlatformContext())
            {
                return context.Persons.ToList();
            }

        }

        public List<Person> GetUpcommingBirthDays(int count)
        {
            using (var context = new CegekaBDayPlatformContext())
            {
                var persons = new List<Person>();
                var temp1 = context.Persons.Where(p =>
                    p.DateOfBirth.Month * 100 + p.DateOfBirth.Day >=
                    DateTime.Today.Month * 100 + DateTime.Today.Day)
                    .OrderBy(p => p.DateOfBirth.Month * 100 + p.DateOfBirth.Day)
                    .Take(count)
                    .ToList();

                persons.AddRange(temp1);

                if (persons.Count < count)
                {
                    var temp2 = context.Persons.Where(p =>
                        p.DateOfBirth.Month * 100 + p.DateOfBirth.Day <
                        DateTime.Today.Month * 100 + DateTime.Today.Day)
                        .OrderBy(p => p.DateOfBirth.Month * 100 + p.DateOfBirth.Day)
                        .Take(count)
                        .ToList();

                    persons.AddRange(temp2);
                }

                return persons;
            }

        }

        public Person UpdatePerson(Person person)
        {
            using (var context = new CegekaBDayPlatformContext())
            {
                context.Persons.Attach(person);
                context.Entry(person).State = System.Data.Entity.EntityState.Modified;
                var result = context.SaveChanges();
                return result == 1 ? context.Persons.FirstOrDefault(s => s.Id == person.Id) : null; ;
            }

        }

        public Person DeletePerson(Guid id)
        {
            using (var context = new CegekaBDayPlatformContext())
            {
                Person person = context.Persons.FirstOrDefault(s => s.Id == id);
                if (person != null)
                {
                    context.Persons.Attach(person);
                    context.Entry(person).State = System.Data.Entity.EntityState.Deleted;
                    context.SaveChanges();
                }
                return context.Persons.FirstOrDefault(s => s.Id == id);
            }

        }
    }
}
