using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace FarmersGrid.BAL
{
    public class BlobServiceManager
    {
        private readonly StorageSharedKeyCredential _credentials;
        private readonly string _containerName;

        public BlobServiceManager(StorageSharedKeyCredential credentials)
        {
            _credentials = credentials;
            _containerName = "farmers-grid-storage";
           
        }

        public string GenerateSasUri()
        {
            var sasBuilder = new BlobSasBuilder
            {
                BlobContainerName = _containerName,
                ExpiresOn = DateTime.UtcNow.AddDays(1),
                Resource = "b"
            };
            sasBuilder.SetPermissions(BlobContainerSasPermissions.All);

            var sasUri = sasBuilder.ToSasQueryParameters(_credentials);
            return sasUri.ToString();
        }
    }
}
