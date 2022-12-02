const BaseRepo = require('./BaseRepo');

class CompanyRepoClass extends BaseRepo {
    IsSyncable = true;

    constructor() {
        super('company')
        this.upsert = this.upsert.bind(this)
        this.upsertByGuid = this.upsertByGuid.bind(this)
        this.findByOwnerId = this.findByOwnerId.bind(this)
        this.findByAirlineCode = this.findByAirlineCode.bind(this)
        this.translate = this.translate.bind(this)
    }

    async findByAirlineCode(airlineCode, opts) {
        const self = this;
        if (!airlineCode) throw new Error('Airline Code is required');

        const query = {
            where: {
                airlineCode: airlineCode,
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
        const translated = this.translate(payload);
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

    translate(input) {
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
                currentBadgeId: input.CurrentBadgeId,
                currentBadgeUrl: input.CurrentBadgeUrl,
                currentBadgeName: input.CurrentBadgeName,
                lastWeeklyManagementsPaymentDate: (input.LastWeeklyManagementsPaymentDate) ? new Date(input.LastWeeklyManagementsPaymentDate) : null,
                onAirSyncedAt: (input.OnAirSyncedAt) ? (typeof input.OnAirSyncedAt !== Date) ? new Date(input.OnAirSyncedAt) : input.OnAirSyncedAt : null,
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
                onAirSyncedAt: (input.OnAirSyncedAt) ? (typeof input.OnAirSyncedAt !== Date) ? new Date(input.OnAirSyncedAt) : input.OnAirSyncedAt : null,
                virtualAirline: (input.vaId) ? { connect: { id: input.vaId } } : undefined,
                owner: (input.ownerId) ? { connect: { id: input.ownerId} } : undefined,
            }
        }

        return translated
    }

}

module.exports = new CompanyRepoClass();
