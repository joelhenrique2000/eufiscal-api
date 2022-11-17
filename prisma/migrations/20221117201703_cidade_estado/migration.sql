/*
  Warnings:

  - You are about to drop the column `tagIcon` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Problema` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Problema` table. All the data in the column will be lost.
  - Added the required column `cidadeID` to the `Problema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "tagIcon",
ALTER COLUMN "criadoEm" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "atualizadoEm" DROP NOT NULL,
ALTER COLUMN "removidoEm" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Problema" DROP COLUMN "cidade",
DROP COLUMN "estado",
ADD COLUMN     "cidadeID" INTEGER NOT NULL,
ALTER COLUMN "criadoEm" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "atualizadoEm" DROP NOT NULL,
ALTER COLUMN "removidoEm" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "criadoEm" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "atualizadoEm" DROP NOT NULL,
ALTER COLUMN "removidoEm" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "criadoEm" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "atualizadoEm" DROP NOT NULL,
ALTER COLUMN "removidoEm" DROP NOT NULL;

-- CreateTable
CREATE TABLE "HistoricoProblema" (
    "id" SERIAL NOT NULL,
    "problemaID" INTEGER NOT NULL,
    "statusID" INTEGER NOT NULL,

    CONSTRAINT "HistoricoProblema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "removidoEm" TIMESTAMP(3),

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "latitude" BIGINT NOT NULL,
    "longitude" BIGINT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "removidoEm" TIMESTAMP(3),
    "estadoID" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problema" ADD CONSTRAINT "Problema_cidadeID_fkey" FOREIGN KEY ("cidadeID") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoProblema" ADD CONSTRAINT "HistoricoProblema_problemaID_fkey" FOREIGN KEY ("problemaID") REFERENCES "Problema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoProblema" ADD CONSTRAINT "HistoricoProblema_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estadoID_fkey" FOREIGN KEY ("estadoID") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
