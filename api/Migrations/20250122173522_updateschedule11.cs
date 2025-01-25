using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class updateschedule11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Schedules",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScheduleId",
                table: "Exercises",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScheduleUserId",
                table: "Exercises",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_ScheduleId_ScheduleUserId",
                table: "Exercises",
                columns: new[] { "ScheduleId", "ScheduleUserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Schedules_ScheduleId_ScheduleUserId",
                table: "Exercises",
                columns: new[] { "ScheduleId", "ScheduleUserId" },
                principalTable: "Schedules",
                principalColumns: new[] { "Id", "UserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Schedules_ScheduleId_ScheduleUserId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ScheduleId_ScheduleUserId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ScheduleUserId",
                table: "Exercises");
        }
    }
}
