# Step 1: Build the API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-api
WORKDIR /app
COPY api/*.csproj .
RUN dotnet restore
COPY api/ .
RUN dotnet publish -c Release -o /app/publish

# Step 2: Runtime environment for the API
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime-api
WORKDIR /app
COPY --from=build-api /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "api.dll"]
