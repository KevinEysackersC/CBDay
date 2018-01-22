using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using CegekaBDayPlatform.Model;
using CegekaBDayPlatform.Service;
using Newtonsoft.Json;

namespace Angular.Controllers
{
    public class PersonController : ApiController
    {
        private static PersonService _service;

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        public PersonController()
        {
            _service = new PersonService();
        }

        // GET api/person/GetAll
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            return ToJson(_service.GetAllPersons());

        }

        // POST api/person/Upcomming
        //[ActionName("Upcomming")]
        [HttpPost]
        public HttpResponseMessage Upcomming([FromBody]int count)
        {
            return ToJson(_service.GetUpcommingBirthDays(count));
        }

        // POST api/person/Create
        //[ActionName("Create")]
        [HttpPost]
        public HttpResponseMessage Create([FromBody]Person value)
        {
            return ToJson(_service.CreatePerson(value));
        }

        [HttpPut]
        public HttpResponseMessage Update(Guid id, [FromBody]Person value)
        {
            value.Id = id;
            return ToJson(_service.UpdatePerson(value));
        }

        [HttpDelete]
        public HttpResponseMessage Delete(Guid id)
        {
            return ToJson(_service.DeletePerson(id));
        }

    }
}
