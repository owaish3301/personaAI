/*
  Warnings:

  - A unique constraint covering the columns `[personaId,userId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_personaId_userId_key" ON "Conversation"("personaId", "userId");
