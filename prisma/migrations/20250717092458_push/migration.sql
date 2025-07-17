-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_typeId_fkey";

-- CreateIndex
CREATE INDEX "Income_typeId_idx" ON "Income"("typeId");
