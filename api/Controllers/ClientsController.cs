using Data;
using Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Models.Client;
using Services.Services;

[Authorize]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ClientsService clientsService;

    public ClientsController(ClientsService clientsService)
    {
        this.clientsService = clientsService;
    }

    // GET api/clients
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        var clients = await clientsService.GetAllClientsAsync();
        return Ok(clients);
    }

    // GET api/clients/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClient(int id)
    {
        var client = await clientsService.GetClientByIdAsync(id);

        if (client == null)
        {
            return NotFound();
        }

        return Ok(client);
    }

    // POST api/clients
    [HttpPost]
    public async Task<ActionResult<Client>> CreateClient([FromBody] ClientDto client)
    {
        var createdClient = await clientsService.CreateClientAsync(client);
        return CreatedAtAction(nameof(GetClient), new { id = createdClient.Id }, createdClient);
    }

    // PUT api/clients/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<Client>> UpdateClient(int id, [FromBody] Client client)
    {
        try
        {
            var updatedClient = await clientsService.UpdateClientAsync(id, client);
            return Ok(updatedClient);
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }

    // DELETE api/clients/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteClient(int id)
    {
        var success = await clientsService.DeleteClientAsync(id);

        if (success)
        {
            return NoContent();
        }
        else
        {
            return NotFound();
        }
    }
}

