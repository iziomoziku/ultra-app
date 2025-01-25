using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class createCompositePK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId",
                table: "ExerciseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Reps_Exercises_ExerciseId",
                table: "Reps");

            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExercises_Exercises_ExercisesId",
                table: "RoutineExercises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExercises_RoutinesId",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_Reps_ExerciseId",
                table: "Reps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseLogs_ExerciseId",
                table: "ExerciseLogs");

            migrationBuilder.AddColumn<string>(
                name: "ExercisesUserId",
                table: "RoutineExercises",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExerciseUserId",
                table: "Reps",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Exercises",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExerciseUserId",
                table: "ExerciseLogs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises",
                columns: new[] { "RoutinesId", "ExercisesId", "ExercisesUserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises",
                columns: new[] { "Id", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_RoutineExercises_ExercisesId_ExercisesUserId",
                table: "RoutineExercises",
                columns: new[] { "ExercisesId", "ExercisesUserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Reps_ExerciseId_ExerciseUserId",
                table: "Reps",
                columns: new[] { "ExerciseId", "ExerciseUserId" });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseLogs_ExerciseId_ExerciseUserId",
                table: "ExerciseLogs",
                columns: new[] { "ExerciseId", "ExerciseUserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId_ExerciseUserId",
                table: "ExerciseLogs",
                columns: new[] { "ExerciseId", "ExerciseUserId" },
                principalTable: "Exercises",
                principalColumns: new[] { "Id", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Reps_Exercises_ExerciseId_ExerciseUserId",
                table: "Reps",
                columns: new[] { "ExerciseId", "ExerciseUserId" },
                principalTable: "Exercises",
                principalColumns: new[] { "Id", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExercises_Exercises_ExercisesId_ExercisesUserId",
                table: "RoutineExercises",
                columns: new[] { "ExercisesId", "ExercisesUserId" },
                principalTable: "Exercises",
                principalColumns: new[] { "Id", "UserId" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId_ExerciseUserId",
                table: "ExerciseLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_Reps_Exercises_ExerciseId_ExerciseUserId",
                table: "Reps");

            migrationBuilder.DropForeignKey(
                name: "FK_RoutineExercises_Exercises_ExercisesId_ExercisesUserId",
                table: "RoutineExercises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_RoutineExercises_ExercisesId_ExercisesUserId",
                table: "RoutineExercises");

            migrationBuilder.DropIndex(
                name: "IX_Reps_ExerciseId_ExerciseUserId",
                table: "Reps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseLogs_ExerciseId_ExerciseUserId",
                table: "ExerciseLogs");

            migrationBuilder.DropColumn(
                name: "ExercisesUserId",
                table: "RoutineExercises");

            migrationBuilder.DropColumn(
                name: "ExerciseUserId",
                table: "Reps");

            migrationBuilder.DropColumn(
                name: "ExerciseUserId",
                table: "ExerciseLogs");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Exercises",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoutineExercises",
                table: "RoutineExercises",
                columns: new[] { "ExercisesId", "RoutinesId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_RoutineExercises_RoutinesId",
                table: "RoutineExercises",
                column: "RoutinesId");

            migrationBuilder.CreateIndex(
                name: "IX_Reps_ExerciseId",
                table: "Reps",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseLogs_ExerciseId",
                table: "ExerciseLogs",
                column: "ExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseLogs_Exercises_ExerciseId",
                table: "ExerciseLogs",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reps_Exercises_ExerciseId",
                table: "Reps",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoutineExercises_Exercises_ExercisesId",
                table: "RoutineExercises",
                column: "ExercisesId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
