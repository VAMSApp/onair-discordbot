-- CreateTable
CREATE TABLE "job" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "WorldId" INTEGER NOT NULL,
    "WorldGuid" TEXT NOT NULL,
    "MainAirportGuid" TEXT,
    "BaseAirportGuid" TEXT,
    "ValuePerLbsPerDistance" DOUBLE PRECISION NOT NULL,
    "IsGoodValue" BOOLEAN NOT NULL,
    "MaxDistance" INTEGER NOT NULL,
    "TotalDistance" INTEGER NOT NULL,
    "MainAirportHeading" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "ExpirationDate" TIMESTAMP(3) NOT NULL,
    "Pay" INTEGER NOT NULL,
    "PayLastMinuteBonus" INTEGER NOT NULL,
    "Penality" INTEGER NOT NULL,
    "ReputationImpact" INTEGER NOT NULL,
    "CompanyGuid" TEXT NOT NULL,
    "CompanyId" INTEGER NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "TakenDate" TIMESTAMP(3) NOT NULL,
    "TotalCargoTransported" INTEGER NOT NULL,
    "TotalPaxTransported" INTEGER NOT NULL,
    "Category" INTEGER NOT NULL,
    "State" INTEGER NOT NULL,
    "XP" INTEGER NOT NULL,
    "SkillPoint" INTEGER NOT NULL,
    "MinCompanyReput" INTEGER NOT NULL,
    "RealPay" INTEGER NOT NULL,
    "RealPenality" DOUBLE PRECISION NOT NULL,
    "CanAccess" BOOLEAN NOT NULL,
    "CanAccessDisplay" TEXT NOT NULL,
    "IsLastMinute" BOOLEAN NOT NULL,
    "IsFavorited" BOOLEAN NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_Guid_key" ON "job"("Guid");

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "world"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
