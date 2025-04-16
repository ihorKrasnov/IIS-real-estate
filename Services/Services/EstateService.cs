using Data;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Services.Models.Estate;

namespace Services.Services
{
    public class EstateService
    {
        private readonly dbContext context;
        private readonly IHostingEnvironment env;

        public EstateService(dbContext context, IHostingEnvironment env)
        {
            this.context = context;
            this.env = env;
        }

        public async Task<EstateDto> CreateEstateAsync(EstateDto estate, IFormFile[] images)
        {
            if (estate == null)
            {
                throw new ArgumentNullException(nameof(estate));
            }

            var newEstate =
            new Estate
            {
                Address = estate.Address,
                Area = estate.Area,
                City = estate.City,
                CreatedAt = DateTime.UtcNow,
                Description = estate.Description,
                Features = new(),
                Images = new(),
                IsAvailable = true,
                Price = estate.Price,
                Region = estate.Region,
                SoldAt = null,
                Title = estate.Title,
                Type = (EstateType)estate.Type,
                Latitude = estate.Latitude,
                Longitude = estate.Longitude
            };

            context.Estates.Add(newEstate);
            await context.SaveChangesAsync();

            if (images != null && images.Length > 0)
            {
                foreach (var image in images)
                {
                    var filePath = await SaveImageToFileSystem(image);
                    var estateImage = new EstateImage
                    {
                        EstateId = newEstate.Id,
                        ImageUrl = filePath
                    };
                    context.EstateImages.Add(estateImage);
                }
                await context.SaveChangesAsync();
            }

            return await GetEstateDtoByIdAsync(newEstate.Id);
        }
        public async Task<EstateDto> GetEstateByIdAsync(int id)
        {
            var estate = await context.Estates
                .Include(e => e.Images)
                .Include(e => e.Features)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (estate == null)
            {
                throw new InvalidOperationException("Estate not found.");
            }

            return await ConvertToEstateDtoAsync(estate);
        }

        public async Task<List<EstateDto>> GetAllEstatesAsync()
        {
            var estates = await context.Estates
                .Include(e => e.Images)
                .Include(e => e.Features)
                .ToListAsync();

            return estates.Select(e => ConvertToEstateDtoAsync(e).Result).ToList();
        }

        public async Task<EstateDto> UpdateEstateAsync(int id, EstateDto updatedEstate, IFormFile[] images)
        {
            var estate = await context.Estates
                .Include(e => e.Images)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (estate == null)
            {
                throw new InvalidOperationException("Estate not found.");
            }

            estate.Title = updatedEstate.Title;
            estate.Description = updatedEstate.Description;
            estate.Type = updatedEstate.Type;
            estate.Price = updatedEstate.Price;
            estate.Area = updatedEstate.Area;
            estate.Address = updatedEstate.Address;
            estate.City = updatedEstate.City;
            estate.Region = updatedEstate.Region;
            estate.Latitude = updatedEstate.Latitude;
            estate.Longitude = updatedEstate.Longitude;

            if (images != null && images.Length > 0)
            {
                foreach (var oldImage in context.EstateImages.Where(x => x.EstateId == estate.Id))
                {
                    var filePath = Path.Combine(env.WebRootPath, oldImage.ImageUrl);
                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }
                }
                context.EstateImages.RemoveRange(context.EstateImages
                                        .Where(x => x.EstateId == estate.Id));


                foreach (var image in images)
                {
                    var filepath = await SaveImageToFileSystem(image);
                    var estateimage = new EstateImage
                    {
                        EstateId = estate.Id,
                        ImageUrl = filepath
                    };
                    context.EstateImages.Add(estateimage);
                }
            }

            await context.SaveChangesAsync();
            return await GetEstateDtoByIdAsync(estate.Id);
        }

        public async Task<bool> DeleteEstateAsync(int id)
        {
            var estate = await context.Estates
                .Include(e => e.Images)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (estate == null)
            {
                throw new InvalidOperationException("Estate not found.");
            }

            foreach (var image in estate.Images)
            {
                var filePath = Path.Combine(env.WebRootPath, image.ImageUrl);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }

            context.Estates.Remove(estate);
            await context.SaveChangesAsync();
            return true;
        }

        private async Task<string> SaveImageToFileSystem(IFormFile image)
        {
            try
            {
                var uploadsFolder = Path.Combine(env.WebRootPath, "uploads", "estate_images");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                return Path.Combine("uploads", "estate_images", fileName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<EstateDto> GetEstateDtoByIdAsync(int estateId)
        {
            var estate = await context.Estates
                .Include(e => e.Images)
                .FirstOrDefaultAsync(e => e.Id == estateId);

            return await ConvertToEstateDtoAsync(estate);
        }

        private async Task<EstateDto> ConvertToEstateDtoAsync(Estate estate)
        {
            if (estate == null) return null;

            var estateDto = new EstateDto
            {
                Id = estate.Id,
                Title = estate.Title,
                Description = estate.Description,
                Type = estate.Type,
                Price = estate.Price,
                Area = estate.Area,
                Address = estate.Address,
                City = estate.City,
                Region = estate.Region,
                Latitude = estate.Latitude,
                Longitude = estate.Longitude,
                Images = estate.Images.Select(img => new EstateImageDto
                {
                    Id = img.Id,
                    Url = img.ImageUrl 
                }).ToList()
            };

            return estateDto;
        }

        public async Task<IList<EstateMarkerDto>> GetEstateMarkersAsync()
        {
            var markers = await context.Estates.Select(e => new EstateMarkerDto
            {
                Id = e.Id,
                Title = e.Title,
                Price = e.Price,
                Latitude = e.Latitude,
                Longitude = e.Longitude
            }).ToListAsync();

            return markers;
        }
    }
}
