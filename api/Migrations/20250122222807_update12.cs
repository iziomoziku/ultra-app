using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class update12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Schedules_RoutineId_RoutineUserId",
                table: "Schedules");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_RoutineId_RoutineUserId",
                table: "Schedules",
                columns: new[] { "RoutineId", "RoutineUserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Schedules_RoutineId_RoutineUserId",
                table: "Schedules");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_RoutineId_RoutineUserId",
                table: "Schedules",
                columns: new[] { "RoutineId", "RoutineUserId" },
                unique: true,
                filter: "[RoutineId] IS NOT NULL AND [RoutineUserId] IS NOT NULL");
        }
    }
}
