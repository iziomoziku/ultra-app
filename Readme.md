# Project Setup Guide

## 🚀 Getting Started

Follow these steps to set up and run the project.

### 1️⃣ Connect SQL Using Docker

```
Ensure you have Docker installed and running, then connect your SQL database.
Check DockerSQL.md file in Api/Documents for more information.
```

### 2️⃣ Run Your Database on Azure Data Studio

```
Open **Azure Data Studio**, connect to your database, and verify that it's running.
```

### 3️⃣ Start Your Backend

```
Run the following commands in your terminal:

dotnet restore
dotnet tool install --global dotnet-ef
dotnet ef database update
dotnet watch run
```

#### 🛑 If the Port Is Already in Use

Use these commands to free up the port and restart your backend:

```sh
lsof -i :<PORT>
kill -9 <PID>
```

Replace `<PORT>` with the actual port number and `<PID>` with the process ID.

### 4️⃣ Start Your Frontend

```sh
Run the following steps to set up and start your frontend:

npm install
```

✅ Add a **`.env` file** to the `/frontend` directory with the necessary environment variables.

---

## 🎯 You're all set! Start coding 🚀
