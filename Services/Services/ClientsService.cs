using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Models.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ClientsService
    {
        private readonly dbContext context;

        public ClientsService(dbContext context)
        {
            this.context = context;
        }

        public async Task<Client> CreateClientAsync(ClientDto client)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            var newClient = new Client
            {
                FirstName = client.FirstName,
                LastName = client.LastName,
                Email = client.Email,
                PhoneNumber = client.PhoneNumber,
                ClientType = (ClientType)client.ClientType
            };
            context.Clients.Add(newClient);
            await context.SaveChangesAsync();
            return newClient;
        }

        public async Task<Client> GetClientByIdAsync(int id)
        {
            return await context.Clients
                .Include(c => c.InterestedEstates)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<List<Client>> GetAllClientsAsync()
        {
            return await context.Clients
                .Include(c => c.InterestedEstates)
                .ToListAsync();
        }

        public async Task<Client> UpdateClientAsync(int id, Client updatedClient)
        {
            if (updatedClient == null)
            {
                throw new ArgumentNullException(nameof(updatedClient));
            }

            var existingClient = await context.Clients
                .Include(c => c.InterestedEstates)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (existingClient == null)
            {
                throw new InvalidOperationException("Client not found.");
            }

            existingClient.FirstName = updatedClient.FirstName;
            existingClient.LastName = updatedClient.LastName;
            existingClient.Email = updatedClient.Email;
            existingClient.PhoneNumber = updatedClient.PhoneNumber;
            existingClient.ClientType = updatedClient.ClientType;
            existingClient.InterestedEstates = updatedClient.InterestedEstates;

            await context.SaveChangesAsync();
            return existingClient;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var clientToDelete = await context.Clients
                .FirstOrDefaultAsync(c => c.Id == id);

            if (clientToDelete == null)
            {
                throw new InvalidOperationException("Client not found.");
            }

            context.Clients.Remove(clientToDelete);
            await context.SaveChangesAsync();
            return true;
        }
    }

}
