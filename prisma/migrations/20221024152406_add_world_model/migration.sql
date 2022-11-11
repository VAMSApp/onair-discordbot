-- CreateTable
CREATE TABLE "world" (
    "Id" SERIAL NOT NULL,
    "Guid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "ShortName" TEXT NOT NULL,

    CONSTRAINT "world_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "world_Guid_key" ON "world"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "world_ShortName_key" ON "world"("ShortName");
