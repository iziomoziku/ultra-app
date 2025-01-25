Here’s a summary of the steps we took to successfully connect to your SQL Server running in Docker:

---

### **Steps to Connect to SQL Server in Docker**

1. **Install Docker**
   - Ensure Docker is installed and running on your system. If not, download and install it from the [official Docker website](https://www.docker.com/).

2. **Pull the SQL Server Docker Image**
   - Run the following command to pull the latest SQL Server image:
     ```bash
     docker pull mcr.microsoft.com/mssql/server:2022-latest
     ```

3. **Run the SQL Server Container**
   - Use the following command to create and start a SQL Server container:
     ```bash
     docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Izi12345678" -p 1433:1433 --name sqlserver --platform linux/amd64 -d mcr.microsoft.com/mssql/server:2022-latest
     ```
   - Key options explained:
     - `-e "ACCEPT_EULA=Y"`: Accepts the SQL Server license terms.
     - `-e "SA_PASSWORD=YourPassword"`: Sets the password for the `sa` (System Administrator) account.
     - `-p 1433:1433`: Maps port `1433` from the container to the host machine.
     - `--name sqlserver`: Assigns a name to the container.
     - `--platform linux/arm64`: Ensures compatibility with your ARM architecture.
     - `-d`: Runs the container in detached mode.

4. **Verify the Container Status**
   - Check if the container is running:
     ```bash
     docker ps
     ```
   - Confirm that the `sqlserver` container is listed and its `PORTS` column shows `0.0.0.0:1433->1433/tcp`.

5. **Test the Connection**
   - Use the `sqlcmd` utility or a client like Azure Data Studio to test the connection to SQL Server.
   - Example with `sqlcmd`:
     ```bash
     sqlcmd -S localhost,1433 -U sa -P YourPassword
     ```
     If successful, you'll see the `1>` prompt.

6. **Troubleshooting Connection Issues**
   - Ensure the following:
     - The `ACCEPT_EULA` and `SA_PASSWORD` environment variables are correctly set.
     - Port `1433` is mapped and not blocked by a firewall.
     - Use the `TrustServerCertificate=True` flag in your connection string for development environments.

7. **Update the .NET Core Application Connection String**
   - Replace the LocalDB connection string with the Docker container's connection string in `appsettings.json`:
     ```json
     "ConnectionStrings": {
       "UltraDbConnection": "Server=localhost,1433;Database=Ultra;User Id=sa;Password=YourPassword;Encrypt=False;TrustServerCertificate=True;"
     }
     ```

8. **Test the Application**
   - Run your .NET Core application and ensure that database operations (e.g., migrations, queries) work correctly with the new Docker-hosted SQL Server.

9. **Verify Database and Tables**
   - Use Azure Data Studio or SQL Server Management Studio (SSMS) to connect to `localhost,1433` and verify the database and tables.

10. **Debug and Fix Issues**
    - We identified and resolved several potential issues:
      - Ensured the SQL Server image matched the platform (`linux/arm64`).
      - Added the `TrustServerCertificate=True` flag for development purposes.
      - Fixed connection string issues (port, password, etc.).

11. **Successful Connection**
    - Once the application successfully connected to the Docker-hosted SQL Server, we tested CRUD operations via the frontend and backend.

---

### Key Lessons Learned:
- Always ensure compatibility between the Docker image and the host system's architecture.
- Use the `sqlcmd` utility or client tools to verify the SQL Server connection before troubleshooting further.
- Update the connection string in your application to match the Docker-hosted database.

This step-by-step process should serve as a template for similar Docker-SQL Server setups.