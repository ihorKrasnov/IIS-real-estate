using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Data;
using Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Services.Services;
using Services.Models.Estate;
using System.Text.Json;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EstatesController : ControllerBase
    {
        private readonly EstateService estateService;

        public EstatesController(EstateService estateService)
        {
            this.estateService = estateService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estate>>> GetEstates()
        {
            var estates = await estateService.GetAllEstatesAsync();
            return Ok(estates);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estate>> GetEstate(int id)
        {
            var estate = await estateService.GetEstateByIdAsync(id);
            if (estate == null)
            {
                return NotFound();
            }
            return Ok(estate);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<EstateDto>> CreateEstate([FromForm] EstateCreateOrUpdateRequest request)
        {
            EstateDto estateDto;
            try
            {
                estateDto = JsonSerializer.Deserialize<EstateDto>(request.Estate, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? throw new JsonException("Invalid estate data");
            }
            catch (JsonException ex)
            {
                return BadRequest($"Invalid estate data: {ex.Message}");
            }

            var createdEstate = await estateService.CreateEstateAsync(estateDto, request.Images);
            return Ok(createdEstate);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<EstateDto>> UpdateEstate(int id, [FromForm] EstateCreateOrUpdateRequest request)
        {
            EstateDto estateDto;
            try
            {
                estateDto = JsonSerializer.Deserialize<EstateDto>(request.Estate, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? throw new JsonException("Invalid estate data");
            }
            catch (JsonException ex)
            {
                return BadRequest($"Invalid estate data: {ex.Message}");
            }

            var createdEstate = await estateService.UpdateEstateAsync(id, estateDto, request.Images);
            return Ok(createdEstate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEstate(int id)
        {
            var success = await estateService.DeleteEstateAsync(id);
            if (success)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("markers")]
        public async Task<ActionResult<IEnumerable<EstateMarkerDto>>> GetEstateMarkers()
        {
            return Ok(await estateService.GetEstateMarkersAsync());
        }
    }

}
