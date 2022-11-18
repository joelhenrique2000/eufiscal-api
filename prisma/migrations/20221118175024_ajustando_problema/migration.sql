/*
  Warnings:

  - Added the required column `denunciaIrregular` to the `Problema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Problema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problema" ADD COLUMN     "denunciaIrregular" BOOLEAN NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ALTER COLUMN "criadoEm" DROP DEFAULT;
