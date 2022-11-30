-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyGuid" TEXT NOT NULL,
    "aircraftGuid" TEXT,
    "flightGuid" TEXT,
    "accountGuid" TEXT,
    "employeeGuid" TEXT,
    "employeeId" INTEGER,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isNotification" BOOLEAN NOT NULL DEFAULT false,
    "zuluEventTime" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyGuid" TEXT NOT NULL,
    "flightHoursTotalBeforeHiring" DOUBLE PRECISION,
    "flightHoursInCompany" DOUBLE PRECISION,
    "category" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "lastStatusChange" TIMESTAMP(3) NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "flightHoursGrandTotal" DOUBLE PRECISION,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_guid_key" ON "Notification"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_guid_key" ON "Employee"("guid");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
