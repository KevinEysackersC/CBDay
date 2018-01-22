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
    public class DashboardController : ApiController
    {
        private static PersonService _service;

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        public DashboardController()
        {
            _service = new PersonService();
        }


        public HttpResponseMessage PostUpcomming(int count)
        {
            return ToJson(_service.GetUpcommingBirthDays(count));
        }


    }
}
