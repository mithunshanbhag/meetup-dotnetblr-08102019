using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace implicit_flow_demo_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        [Route("public")]
        public ActionResult<string> GetPublic()
        {
            return "Good Morning DotNetBlr! No authorization required to view this message.";
        }

        [HttpGet]
        [Route("protected")]
        [Authorize]
        public ActionResult<string> GetProtected()
        {
            return "Good Morning DotNetBlr! A valid access_token is required to view this message.";
        }

        [HttpGet]
        [Route("protectedbypermission")]
        [Authorize("read:values")]
        public ActionResult<string> GetProtectedByPermission()
        {
            return "Good Morning DotNetBlr! The 'read:values' permission is required in the access_token to view this message.";
        }

        [HttpGet]
        [Route("protectedbyrole")]
        [Authorize(Roles = "administrator")]
        public ActionResult<string> GetProtectedByRole()
        {
            return "Good Morning DotNetBlr! Membership of the 'administrator' group is required to view this message.";
        }
    }
}
