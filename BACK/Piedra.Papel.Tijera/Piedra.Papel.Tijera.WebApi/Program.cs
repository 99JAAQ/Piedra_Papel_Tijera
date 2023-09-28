using Microsoft.EntityFrameworkCore;
using Piedra.Papel.Tijera.Common.Utils;
using Piedra.Papel.Tijera.Infraestructure;
using Piedra.Papel.Tijera.Infraestructure.Interfaces;
using Piedra.Papel.Tijera.Service;
using Piedra.Papel.Tijera.Service.Interfaces;
using Piedra.Papel.Tijera.WebApi.Hubs;
using Piedra.Papel.TijeraInfraestructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataBaseContext>(opt => opt.UseSqlServer(
      builder.Configuration.GetConnectionString("ConnectionStringSQLServer"), sqlServerOptionsAction: sqlOptions =>
      {
          sqlOptions.EnableRetryOnFailure();
      }), ServiceLifetime.Transient);

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<UnitOfWork, UnitOfWork>();
builder.Services.AddScoped<DataBaseContext, DataBaseContext>();
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

builder.Services.AddTransient<IRoundService, RoundService>();
builder.Services.AddTransient<IPlayerService, PlayerService>();

builder.Services.AddAutoMapper(typeof(MapperProfile));
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("newPolicy", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();
app.MapHub<SignalHub>("/signalhub");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("newPolicy");
app.Run();
