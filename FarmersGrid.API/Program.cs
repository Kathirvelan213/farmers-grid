using Azure.Storage;
using FarmersGrid.API;
using FarmersGrid.API.Data;
using FarmersGrid.BAL;
using FarmersGrid.DAL;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using FarmersGrid.API.Hubs;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(x =>
    new StorageSharedKeyCredential(
        builder.Configuration["AzureStorage:AccountName"],
        builder.Configuration["AzureStorage:AccountKey"]));

builder.Services.AddSingleton<IUserIdProvider, UserIdProvider>();


// Add services to the container.
builder.Services.AddAuthentication("CookieAuth")
    .AddCookie("CookieAuth", options =>
    {
        options.Cookie.Name = "auth_token"; // name of the cookie
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // HTTPS only
        options.Cookie.SameSite = SameSiteMode.None;
        options.ExpireTimeSpan = TimeSpan.FromDays(1);
        options.Events = new CookieAuthenticationEvents
        {
            OnRedirectToLogin = context =>
            {
                // Return 401 for API requests instead of redirecting
                if (context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    return Task.CompletedTask;
                }

                // Otherwise do normal redirect
                context.Response.Redirect(context.RedirectUri);
                return Task.CompletedTask;
            }
        };
        options.LoginPath = "/"; // optional
        //options.AccessDeniedPath = "/denied"; // optional
    });

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(builder.Configuration["Cors:AllowedOrigins"] ?? "http://localhost:3000")
        .AllowCredentials()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddSignalR();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<IdentityDbContext>(options => 
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnectionString")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<IdentityDbContext>()
    .AddDefaultTokenProviders();

// 1. Add JWT Authentication
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,

//            ValidIssuer = builder.Configuration["Jwt:Issuer"],
//            ValidAudience = builder.Configuration["Jwt:Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//        };
//    });

// 2. Add Authorization Middleware
//builder.Services.AddAuthorization();

//Adding BAL and DAL to service for DI
builder.Services.AddScoped<DbService>();

builder.Services.AddScoped<ProductsData>();
builder.Services.AddScoped<ProductsManager>();

builder.Services.AddScoped<RequestProductsData>();
builder.Services.AddScoped<RequestProductsManager>();

builder.Services.AddScoped<ChatData>();
builder.Services.AddScoped<ChatManager>();

builder.Services.AddScoped<UserData>();
builder.Services.AddScoped<AppUsersManager>();

builder.Services.AddScoped<ProductMatchData>();
builder.Services.AddScoped<ProductMatchManager>();

builder.Services.AddScoped<RequestsData>();
builder.Services.AddScoped<RequestsManager>();

builder.Services.AddScoped<TransportationData>();
builder.Services.AddScoped<TransportationManager>();

builder.Services.AddScoped<BlobServiceManager>();

var app = builder.Build();


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseRouting();    //apparently not needed anymore.. just map controllers and map hub is enough
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chathub");
app.MapHub<RequestsHub>("/requestshub");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
    dbContext.Database.Migrate();

    var services = scope.ServiceProvider;
    await RoleSeeder.SeedRolesAsync(services);
}

app.Run();


