const BaseRepo = require('./BaseRepo');

class VirtualAirlineRepoClass extends BaseRepo {
    constructor() {
        super('virtualAirline')
        this.upsert = this.upsert.bind(this)
        this.upsertByGuid = this.upsertByGuid.bind(this)
        this.findByOwnerId = this.findByOwnerId.bind(this)
        this.getFirst = this.getFirst.bind(this)
        this.determineCanSync = this.determineCanSync.bind(this)
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

    async upsertByGuid(vaId, payload, opts) {
        const self = this;
        if (!vaId) throw new Error('vaId is required');
        if (!payload) throw new Error('payload is required');

        const translated = await this.translate(payload);

        const query = {
            where: {
                guid: (typeof vaId === 'string') ? vaId : vaId.toString(),
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
        } else {
            canSync = true
        }
    
        return {
            ...x,
            canSync,
        }
    }

    async getFirst(opts) {
        const self = this;
        const query = {
            where: {
                id: {
                    gt: 0,
                }
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findFirst(query)
        .then((x) => (x) ? self.determineCanSync(x) : x)
        .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
        .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
        .then((x) => {
            if (x && opts?.serialize) {
                x.lastDividendsDistribution = x.lastDividendsDistribution.toString();
                x.createdAt = x.createdAt.toString()
                x.updatedAt = x.updatedAt.toString()
                return JSON.parse(JSON.stringify(x));
            } else {
                return x
            }
        })
    }

    async translate(input) {
        if (!input) throw new Error('No input provided');
        
        // determine if this is an update or a create by checking if the id is present
        const isUpdate = (input.id) ? true : false;
        let translated = {};

        if (!isUpdate) {
            translated = {
                name: input.Name,
                airlineCode: input.AirlineCode, 
                guid: input.Id,
                apiKey: input.apiKey,
                initalOwnerEquity: (input.InitalOwnerEquity) ? parseInt(input.InitalOwnerEquity) : undefined,
                percentDividendsToDistribute: (input.PercentDividendsToDistribute) ? parseInt(input.PercentDividendsToDistribute) : undefined,
                lastDividendsDistribution: (input.LastDividendsDistribution) ? new Date(input.LastDividendsDistribution) : null,
                imageName: input.ImageName,
                forceAssignJobsToPilots: input.ForceAssignJobsToPilots,
                automaticallyAssignJobWhenTaken: input.AutomaticallyAssignJobWhenTaken,
                automaticallyAssignJobWhenLoaded: input.AutomaticallyAssignJobWhenLoaded,
                restrictEmployeesUsage: input.RestrictEmployeesUsage,
                restrictLoadingVAJobsIntoNonVAAircraft: input.RestrictLoadingVAJobsIntoNonVAAircraft,
                restrictLoadingNonVAJobsIntoVAAircraft: input.RestrictLoadingNonVAJobsIntoVAAircraft,
                memberCount: (input.MemberCount) ? parseInt(input.MemberCount) : undefined,
                lastConnection: (input.LastConnection) ? new Date(input.LastConnection) : null,
                lastReportDate: (input.LastReportDate) ? new Date(input.LastReportDate) : null,
                reputation: (input.Reputation) ? parseInt(input.Reputation) : undefined,
                creationDate: (input.CreationDate) ? new Date(input.CreationDate) : null,
                difficultyLevel: (input.DifficultyLevel) ? parseInt(input.DifficultyLevel) : undefined,
                uTCOffsetinHours: (input.UTCOffsetinHours) ? parseInt(input.UTCOffsetinHours) : undefined,
                paused: input.Paused,
                level: (input.Level) ? parseInt(input.Level) : undefined,
                levelXP: (input.LevelXP) ? parseInt(input.LevelXP) : undefined,
                transportEmployeeInstant: input.TransportEmployeeInstant,
                transportPlayerInstant: input.TransportPlayerInstant,
                forceTimeInSimulator: input.ForceTimeInSimulator,
                useSmallAirports: input.UseSmallAirports,
                useOnlyVanillaAirports: input.UseOnlyVanillaAirports,
                enableSkillTree: input.EnableSkillTree,
                checkrideLevel: (input.CheckrideLevel) ? parseInt(input.CheckrideLevel) : undefined,
                enableLandingPenalities: input.EnableLandingPenalities,
                enableEmployeesFlightDutyAndSleep: input.EnableEmployeesFlightDutyAndSleep,
                aircraftRentLevel: (input.AircraftRentLevel) ? parseInt(input.AircraftRentLevel) : undefined,
                enableCargosAndChartersLoadingTime: input.EnableCargosAndChartersLoadingTime,
                inSurvival: input.InSurvival,
                payBonusFactor: (input.PayBonusFactor) ? parseInt(input.PayBonusFactor) : undefined,
                enableSimFailures: input.EnableSimFailures,
                disableSeatsConfigCheck: input.DisableSeatsConfigCheck,
                realisticSimProcedures: input.RealisticSimProcedures,
                travelTokens: (input.TravelTokens) ? parseInt(input.TravelTokens) : undefined,
                onAirSyncedAt: (input.OnAirSyncedAt) ? new Date(input.OnAirSyncedAt) : null,
            }
        } else {
            translated = {
                name: input.name,
                airlineCode: input.airlineCode, 
                guid: input.guid, 
                apiKey: input.apiKey, 
                initalOwnerEquity: (input.initalOwnerEquity) ? parseInt(input.initalOwnerEquity) : undefined,
                percentDividendsToDistribute: (input.percentDividendsToDistribute) ? parseInt(input.percentDividendsToDistribute) : undefined,
                lastDividendsDistribution: (input.lastDividendsDistribution) ? new Date(input.lastDividendsDistribution) : null,
                imageName: input.imageName,
                forceAssignJobsToPilots: input.forceAssignJobsToPilots,
                automaticallyAssignJobWhenTaken: input.automaticallyAssignJobWhenTaken,
                automaticallyAssignJobWhenLoaded: input.automaticallyAssignJobWhenLoaded,
                restrictEmployeesUsage: input.restrictEmployeesUsage,
                restrictLoadingVAJobsIntoNonVAAircraft: input.restrictLoadingVAJobsIntoNonVAAircraft,
                restrictLoadingNonVAJobsIntoVAAircraft: input.restrictLoadingNonVAJobsIntoVAAircraft,
                memberCount: (input.memberCount) ? parseInt(input.memberCount) : undefined,
                lastConnection: (input.lastConnection) ? new Date(input.lastConnection) : null,
                lastReportDate: (input.lastReportDate) ? new Date(input.lastReportDate) : null,
                reputation: (input.reputation) ? parseInt(input.reputation) : undefined,
                creationDate: (input.creationDate) ? new Date(input.creationDate) : null,
                difficultyLevel: (input.difficultyLevel) ? parseInt(input.difficultyLevel) : undefined,
                uTCOffsetinHours: (input.uTCOffsetinHours) ? parseInt(input.uTCOffsetinHours) : undefined,
                paused: input.paused,
                level: (input.level) ? parseInt(input.level) : undefined,
                levelXP: (input.levelXP) ? parseInt(input.levelXP) : undefined,
                transportEmployeeInstant: input.transportEmployeeInstant,
                transportPlayerInstant: input.transportPlayerInstant,
                forceTimeInSimulator: input.forceTimeInSimulator,
                useSmallAirports: input.useSmallAirports,
                useOnlyVanillaAirports: input.useOnlyVanillaAirports,
                enableSkillTree: input.enableSkillTree,
                checkrideLevel: (input.checkrideLevel) ? parseInt(input.checkrideLevel) : undefined,
                enableLandingPenalities: input.enableLandingPenalities,
                enableEmployeesFlightDutyAndSleep: input.enableEmployeesFlightDutyAndSleep,
                aircraftRentLevel: (input.aircraftRentLevel) ? parseInt(input.aircraftRentLevel) : undefined,
                enableCargosAndChartersLoadingTime: input.enableCargosAndChartersLoadingTime,
                inSurvival: input.inSurvival,
                payBonusFactor: (input.payBonusFactor) ? parseInt(input.payBonusFactor) : undefined,
                enableSimFailures: input.enableSimFailures,
                disableSeatsConfigCheck: input.disableSeatsConfigCheck,
                realisticSimProcedures: input.realisticSimProcedures,
                travelTokens: (input.travelTokens) ? parseInt(input.travelTokens) : undefined,
                onAirSyncedAt: (input.onAirSyncedAt) ? new Date(input.onAirSyncedAt) : null,
            }
        }

        return translated;
    }
}

module.exports = new VirtualAirlineRepoClass();
