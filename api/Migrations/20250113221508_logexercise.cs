using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class logexercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExercises_Routines_RoutinesId",
                table: "RoutineExercises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Routines",
                table: "Routines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExercises_ExercisesId_ExercisesUserId",
                table: "RoutineExercises");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Schedules",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoutinesUserId",
                table: "RoutineExercises",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "ExerciseLogs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Routines",
                table: "Routines",
                columns: new[] { "Id", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises",
                columns: new[] { "ExercisesId", "ExercisesUserId", "RoutinesId", "RoutinesUserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_UserId",
                table: "Schedules",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoutineExercises_RoutinesId_RoutinesUserId",
                table: "RoutineExercises",
                columns: new[] { "RoutinesId", "RoutinesUserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExercises_Routines_RoutinesId_RoutinesUserId",
                table: "RoutineExercises",
                columns: new[] { "RoutinesId", "RoutinesUserId" },
                principalTable: "Routines",
                principalColumns: new[] { "Id", "UserId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_AspNetUsers_UserId",
                table: "Schedules",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExercises_Routines_RoutinesId_RoutinesUserId",
                table: "RoutineExercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_AspNetUsers_UserId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_UserId",
                table: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Routines",
                table: "Routines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExercises_RoutinesId_RoutinesUserId",
                table: "RoutineExercises");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "RoutinesUserId",
                table: "RoutineExercises");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "ExerciseLogs",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Routines",
                table: "Routines",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises",
                columns: new[] { "RoutinesId", "ExercisesId", "ExercisesUserId" });

            migrationBuilder.CreateIndex(
                name: "IX_RoutineExercises_ExercisesId_ExercisesUserId",
                table: "RoutineExercises",
                columns: new[] { "ExercisesId", "ExercisesUserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExercises_Routines_RoutinesId",
                table: "RoutineExercises",
                column: "RoutinesId",
                principalTable: "Routines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
