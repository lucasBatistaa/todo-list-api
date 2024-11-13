/*
  Warnings:

  - You are about to drop the column `listId` on the `labels` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "label_on_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "listId" INTEGER NOT NULL,
    "labelId" INTEGER NOT NULL,
    CONSTRAINT "label_on_list_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "label_on_list_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "labels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_labels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_labels" ("id", "name") SELECT "id", "name" FROM "labels";
DROP TABLE "labels";
ALTER TABLE "new_labels" RENAME TO "labels";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
