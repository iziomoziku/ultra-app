### **1️⃣ Create a Migration**

If you made changes to your models, generate a new migration:

```sh
dotnet ef migrations add <MigrationName>
```

Replace `<MigrationName>` with a meaningful name, like `InitialCreate` or `AddNewColumn`.

### **2️⃣ Apply Migrations to the Database**

After creating the migration, update the database with:

```sh
dotnet ef database update

```
