FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY TodoList.csproj .
RUN dotnet restore TodoList.csproj
COPY . .
RUN dotnet build TodoList.csproj --no-restore -c Release -o /app/build

FROM build AS publish
RUN dotnet publish TodoList.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoList.dll"]
