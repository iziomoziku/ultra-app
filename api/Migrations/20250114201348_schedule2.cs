using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class schedule2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Routines_Schedules_ScheduleId",
                table: "Routines");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_AspNetUsers_UserId",
                table: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Routines_ScheduleId",
                table: "Routines");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "Routines");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RoutineId",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoutineId1",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoutineUserId",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoutineUserId1",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules",
                columns: new[] { "Id", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_RoutineId_RoutineUserId",
                table: "Schedules",
                columns: new[] { "RoutineId", "RoutineUserId" },
                unique: true,
                filter: "[RoutineId] IS NOT NULL AND [RoutineUserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_RoutineId1_RoutineUserId1",
                table: "Schedules",
                columns: new[] { "RoutineId1", "RoutineUserId1" },
                unique: true,
                filter: "[RoutineId1] IS NOT NULL AND [RoutineUserId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_AspNetUsers_UserId",
                table: "Schedules",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Routines_RoutineId1_RoutineUserId1",
                table: "Schedules",
                columns: new[] { "RoutineId1", "RoutineUserId1" },
                principalTable: "Routines",
                principalColumns: new[] { "Id", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Routines_RoutineId_RoutineUserId",
                table: "Schedules",
                columns: new[] { "RoutineId", "RoutineUserId" },
                principalTable: "Routines",
                principalColumns: new[] { "Id", "UserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_AspNetUsers_UserId",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Routines_RoutineId1_RoutineUserId1",
                table: "Schedules");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Routines_RoutineId_RoutineUserId",
                table: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_RoutineId_RoutineUserId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_RoutineId1_RoutineUserId1",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "RoutineId1",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "RoutineUserId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "RoutineUserId1",
                table: "Schedules");

            migrationBuilder.AlterColumn<string>(
                name: "RoutineId",
                table: "Schedules",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "ScheduleId",
                table: "Routines",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Schedules",
                table: "Schedules",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Routines_ScheduleId",
                table: "Routines",
                column: "ScheduleId",
                unique: true,
                filter: "[ScheduleId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Routines_Schedules_ScheduleId",
                table: "Routines",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_AspNetUsers_UserId",
                table: "Schedules",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
