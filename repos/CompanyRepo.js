const BaseRepo = require('./BaseRepo');

class CompanyRepoClass extends BaseRepo {
    constructor() {
        super('company')
        this.upsert = this.upsert.bind(this)
        this.upsertByGuid = this.upsertByGuid.bind(this)
        this.findByOwnerId = this.findByOwnerId.bind(this)
        this.findByGuid = this.findByGuid.bind(this)
        this.translate = this.translate.bind(this)
    }

    async findByOwnerId(ownerId, opts) {
        const self = this;
        if (!ownerId) throw new Error('ownerId is required');
        const query = {
            where: {
                ownerId: (typeof ownerId !== 'number') ? Number(ownerId) : ownerId,
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findUnique(query)
            .then((x) => self.determineCanSync(x))
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    determineCanSync (x) {
        if (!x) return null;
        let canSync = false;
    
        // if onAirSyncedAt is not null
        if (x.onAirSyncedAt) {
            const currentDate = new Date()
            const onAirSyncedAt = new Date(x.onAirSyncedAt)
            const ONE_MIN = 1*60*1000
    
            // if the difference between the current date and the onAirSyncedAt date is greater than 1 minute
            if ((currentDate - onAirSyncedAt) > ONE_MIN) {
                canSync = true
            }
        }
    
        return {
            ...x,
            canSync,
        }
    }

    async upsert(id, payload, opts) {
        const self = this;
        if (!id) throw new Error('id is required');
        if (!payload) throw new Error('payload is required');

        const query = {
            where: {
                id: (typeof id === 'string') ? Number(id) : id,
            },
            update: {
                ...payload,
            },
            create: {
                ...payload,
            },
        }

        return await this.Model.upsert(query)
            .then((x) => self.determineCanSync(x))
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async upsertByGuid(companyId, payload, opts) {
        const self = this;
        if (!companyId) throw new Error('companyId is required');
        if (!payload) throw new Error('payload is required');
        const translated = await this.translate(payload);
        const query = {
            where: {
                guid: (typeof companyId === 'string') ? companyId : companyId.toString(),
            },
            update: translated,
            create: translated,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.upsert(query)
            .then((x) => self.determineCanSync(x))
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async translate(input) {
        if (!input) throw new Error('No input provided');
        
        // determine if this is an update or a create by checking if the id is present
        const isUpdate = (input.id) ? true : false;
        let translated = {};

        if (!isUpdate) {
            translated = {
                name: input.Name,
                guid: input.Id,
                airlineCode: input.AirlineCode,
                apiKey: input.ApiKey,
                lastConnection: (input.LastConnection) ? new Date(input.LastConnection) : null,
                lastReportDate: (input.LastReportDate) ? new Date(input.LastReportDate) : null,
                reputation: input.Reputation,
                creationDate: (input.CreationDate) ? new Date(input.CreationDate) : null,
                difficultyLevel: input.DifficultyLevel,
                uTCOffsetinHours: input.UTCOffsetinHours,
                paused: input.Paused,
                pausedDate: (input.PausedDate) ? new Date(input.PausedDate) : null,
                level: input.Level,
                levelXP: input.LevelXP,
                transportEmployeeInstant: input.TransportEmployeeInstant,
                transportPlayerInstant: input.TransportPlayerInstant,
                forceTimeInSimulator: input.ForceTimeInSimulator,
                useSmallAirports: input.UseSmallAirports,
                useOnlyVanillaAirports: input.UseOnlyVanillaAirports,
                enableSkillTree: input.EnableSkillTree,
                checkrideLevel: input.CheckrideLevel,
                enableLandingPenalities: input.EnableLandingPenalities,
                enableEmployeesFlightDutyAndSleep: input.EnableEmployeesFlightDutyAndSleep,
                aircraftRentLevel: input.AircraftRentLevel,
                enableCargosAndChartersLoadingTime: input.EnableCargosAndChartersLoadingTime,
                inSurvival: input.InSurvival,
                payBonusFactor: input.PayBonusFactor,
                enableSimFailures: input.EnableSimFailures,
                disableSeatsConfigCheck: input.DisableSeatsConfigCheck,
                realisticSimProcedures: input.RealisticSimProcedures,
                travelTokens: input.TravelTokens,
                virtualAirlineId: input.VirtualAirlineId,
                currentBadgeId: input.CurrentBadgeId,
                currentBadgeUrl: input.CurrentBadgeUrl,
                currentBadgeName: input.CurrentBadgeName,
                lastWeeklyManagementsPaymentDate: (input.LastWeeklyManagementsPaymentDate) ? new Date(input.LastWeeklyManagementsPaymentDate) : null,
                onAirSyncedAt: (input.OnAirSyncedAt) ? new Date(input.OnAirSyncedAt) : null,
                virtualAirline: (input.vaId) ? { connect: { id: input.vaId } } : undefined,
                owner: (input.ownerId) ? { connect: { id: input.ownerId} } : undefined,
            }
        } else {
            translated = {
                name: input.Name,
                guid: input.Id,
                airlineCode: input.AirlineCode,
                apiKey: input.ApiKey,
                lastConnection: (input.LastConnection) ? new Date(input.LastConnection) : null,
                lastReportDate: (input.LastReportDate) ? new Date(input.LastReportDate) : null,
                reputation: input.Reputation,
                creationDate: (input.CreationDate) ? new Date(input.CreationDate) : null,
                difficultyLevel: input.DifficultyLevel,
                uTCOffsetinHours: input.UTCOffsetinHours,
                paused: input.Paused,
                pausedDate: (input.PausedDate) ? new Date(input.PausedDate) : null,
                level: input.Level,
                levelXP: input.LevelXP,
                transportEmployeeInstant: input.TransportEmployeeInstant,
                transportPlayerInstant: input.TransportPlayerInstant,
                forceTimeInSimulator: input.ForceTimeInSimulator,
                useSmallAirports: input.UseSmallAirports,
                useOnlyVanillaAirports: input.UseOnlyVanillaAirports,
                enableSkillTree: input.EnableSkillTree,
                checkrideLevel: input.CheckrideLevel,
                enableLandingPenalities: input.EnableLandingPenalities,
                enableEmployeesFlightDutyAndSleep: input.EnableEmployeesFlightDutyAndSleep,
                aircraftRentLevel: input.AircraftRentLevel,
                enableCargosAndChartersLoadingTime: input.EnableCargosAndChartersLoadingTime,
                inSurvival: input.InSurvival,
                payBonusFactor: input.PayBonusFactor,
                enableSimFailures: input.EnableSimFailures,
                disableSeatsConfigCheck: input.DisableSeatsConfigCheck,
                realisticSimProcedures: input.RealisticSimProcedures,
                travelTokens: input.TravelTokens,
                virtualAirlineId: input.VirtualAirlineId,
                currentBadgeId: input.CurrentBadgeId,
                currentBadgeUrl: input.CurrentBadgeUrl,
                currentBadgeName: input.CurrentBadgeName,
                lastWeeklyManagementsPaymentDate: (input.LastWeeklyManagementsPaymentDate) ? new Date(input.LastWeeklyManagementsPaymentDate) : null,
                onAirSyncedAt: (input.OnAirSyncedAt) ? new Date(input.OnAirSyncedAt) : null,
                virtualAirline: (input.vaId) ? { connect: { id: input.vaId } } : undefined,
                owner: (input.ownerId) ? { connect: { id: input.ownerId} } : undefined,
            }
        }

        return translated
    }

    async findByGuid(guid, opts) {
        const self = this;
        if (!guid) throw new Error('guid is required');

        const query = {
            where: {
                guid: guid,
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findUnique(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

}

module.exports = new CompanyRepoClass();
