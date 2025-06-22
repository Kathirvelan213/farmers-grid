using Microsoft.AspNetCore.Mvc;
using FarmersGrid.BAL;

namespace FarmersGrid.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StorageController : ControllerBase
    {
        private BlobServiceManager _blobServiceManger;
        public StorageController(BlobServiceManager blobServiceManager)
        {
            _blobServiceManger = blobServiceManager;
        }

        [HttpGet("sas")]
        public IActionResult GetSasUri() {
            string sasUrl = _blobServiceManger.GenerateSasUri();
            return Ok(new { sasUrl });
        }
    }
}
