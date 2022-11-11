-- CreateTable
CREATE TABLE "company" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "WorldId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "AirlineCode" TEXT NOT NULL,
    "LastConnection" TIMESTAMP(3) NOT NULL,
    "LastReportDate" TIMESTAMP(3) NOT NULL,
    "Reputation" DOUBLE PRECISION NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "DifficultyLevel" INTEGER NOT NULL,
    "UTCOffsetinHours" INTEGER NOT NULL,
    "Paused" BOOLEAN NOT NULL,
    "PausedDate" TIMESTAMP(3) NOT NULL,
    "Level" INTEGER NOT NULL,
    "LevelXP" INTEGER NOT NULL,
    "TransportEmployeeInstant" BOOLEAN NOT NULL,
    "TransportPlayerInstant" BOOLEAN NOT NULL,
    "ForceTimeInSimulator" BOOLEAN NOT NULL,
    "UseSmallAirports" BOOLEAN NOT NULL,
    "UseOnlyVanillaAirports" BOOLEAN NOT NULL,
    "EnableSkillTree" BOOLEAN NOT NULL,
    "CheckrideLevel" INTEGER NOT NULL,
    "EnableLandingPenalities" BOOLEAN NOT NULL,
    "EnableEmployeesFlightDutyAndSleep" BOOLEAN NOT NULL,
    "AircraftRentLevel" INTEGER NOT NULL,
    "EnableCargosAndChartersLoadingTime" BOOLEAN NOT NULL,
    "InSurvival" BOOLEAN NOT NULL,
    "PayBonusFactor" INTEGER NOT NULL,
    "EnableSimFailures" BOOLEAN NOT NULL,
    "DisableSeatsConfigCheck" BOOLEAN NOT NULL,
    "RealisticSimProcedures" BOOLEAN NOT NULL,
    "TravelTokens" INTEGER NOT NULL,
    "CurrentBadgeId" TEXT NOT NULL,
    "CurrentBadgeUrl" TEXT NOT NULL,
    "CurrentBadgeName" TEXT NOT NULL,
    "LastWeeklyManagementsPaymentDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_Guid_key" ON "company"("Guid");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "world"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
