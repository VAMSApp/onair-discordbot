const prisma = require('@lib/prisma')
const WorldRepo = require('./WorldRepo')

const CompanyRepo = {
    findAll: async () => {
        return await prisma.company.findMany()
    },
    findByGuid: async (guid) => {
        if (!guid) return;

        return await prisma.company.findUnique({
            where: {
                Guid: guid
            }
        })
    },

    findById: async (id) => {
        if (!id) return;
        
        return await prisma.company.findUnique({
            where: {
                Id: id
            }
        })
    },

    translate: function translate (x) {
        const translated = {
            Guid: x.Id,
            WorldGuid: x.WorldId,
            Name: x.Name,
            AirlineCode: x.AirlineCode,
            LastConnection: (x.LastConnection) ? new Date(x.LastConnection) : null,
            LastReportDate: (x.LastReportDate) ? new Date(x.LastReportDate) : null,
            Reputation: x.Reputation,
            CreationDate: (x.CreationDate) ? new Date(x.CreationDate) : null,
            DifficultyLevel: x.DifficultyLevel,
            UTCOffsetinHours: x.UTCOffsetinHours,
            Paused: x.Paused,
            PausedDate: (x.PausedDate) ? new Date(x.PausedDate) : null,
            Level: x.Level,
            LevelXP: x.LevelXP,
            TransportEmployeeInstant: x.TransportEmployeeInstant,
            TransportPlayerInstant: x.TransportPlayerInstant,
            ForceTimeInSimulator: x.ForceTimeInSimulator,
            UseSmallAirports: x.UseSmallAirports,
            UseOnlyVanillaAirports: x.UseOnlyVanillaAirports,
            EnableSkillTree: x.EnableSkillTree,
            CheckrideLevel: x.CheckrideLevel,
            EnableLandingPenalities: x.EnableLandingPenalities,
            EnableEmployeesFlightDutyAndSleep: x.EnableEmployeesFlightDutyAndSleep,
            AircraftRentLevel: x.AircraftRentLevel,
            EnableCargosAndChartersLoadingTime: x.EnableCargosAndChartersLoadingTime,
            InSurvival: x.InSurvival,
            PayBonusFactor: x.PayBonusFactor,
            EnableSimFailures: x.EnableSimFailures,
            DisableSeatsConfigCheck: x.DisableSeatsConfigCheck,
            RealisticSimProcedures: x.RealisticSimProcedures,
            TravelTokens: x.TravelTokens,
            CurrentBadgeId: x.CurrentBadgeId,
            CurrentBadgeUrl: x.CurrentBadgeUrl,
            CurrentBadgeName: x.CurrentBadgeName,
            LastWeeklyManagementsPaymentDate: (x.LastWeeklyManagementsPaymentDate) ? new Date(x.LastWeeklyManagementsPaymentDate) : null,
        }

        return translated
    }, 

    upsert: async function upsert (newX) {
        if (!newX) return;

        return await prisma.company.upsert({
            where: {
                Guid: newX.Guid
            },
            create: {
                ...newX,
                World: {
                    connect: {
                        Guid: newX.WorldGuid
                    }
                }
            },
            update: newX,
        })
    },

    create: async (newX) => {
        if (!newX) return;

        return await prisma.company.create({
            data: newX,
        })
    }
}
module.exports = CompanyRepo