using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class updateschedule13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Schedules_ScheduleId_ScheduleUserId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ScheduleId_ScheduleUserId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ScheduleUserId",
                table: "Exercises");

            migrationBuilder.CreateTable(
                name: "ScheduleExercises",
                columns: table => new
                {
                    ExercisesId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ExercisesUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SchedulesId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SchedulesUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleExercises", x => new { x.ExercisesId, x.ExercisesUserId, x.SchedulesId, x.SchedulesUserId });
                    table.ForeignKey(
                        name: "FK_ScheduleExercises_Exercises_ExercisesId_ExercisesUserId",
                        columns: x => new { x.ExercisesId, x.ExercisesUserId },
                        principalTable: "Exercises",
                        principalColumns: new[] { "Id", "UserId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ScheduleExercises_Schedules_SchedulesId_SchedulesUserId",
                        columns: x => new { x.SchedulesId, x.SchedulesUserId },
                        principalTable: "Schedules",
                        principalColumns: new[] { "Id", "UserId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleExercises_SchedulesId_SchedulesUserId",
                table: "ScheduleExercises",
                columns: new[] { "SchedulesId", "SchedulesUserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScheduleExercises");

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
    }
}
