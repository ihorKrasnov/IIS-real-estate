using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options): base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Estate> Estates { get; set; }
        public DbSet<EstateFeature> EstateFeatures { get; set; }
        public DbSet<EstateImage> EstateImages { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<InterestedEstate> InterestedEstates { get; set; }
    }
}
