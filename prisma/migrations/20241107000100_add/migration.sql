/*
  Warnings:

  - Added the required column `listId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL,
    "priority" INTEGER NOT NULL,
    CONSTRAINT "tasks_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("id", "isChecked", "name", "priority") SELECT "id", "isChecked", "name", "priority" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
