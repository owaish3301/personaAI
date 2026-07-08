/*
  Warnings:

  - You are about to drop the `Personas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Personas";

-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "systemPrompt" TEXT NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);
