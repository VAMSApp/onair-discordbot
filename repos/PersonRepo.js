const BaseRepo = require('./BaseRepo');
const CompanyRepo = require('./CompanyRepo');

class PersonRepoClass extends BaseRepo {
    IsSyncable = true;
    
    constructor() {
        super('person')
        this.translate = this.translate.bind(this);
        this.upsertByGuid = this.upsertByGuid.bind(this);
        this.findByGuid = this.findByGuid.bind(this);
    }

    translate(input) {
        if (!input) throw new Error('No input provided');
        
        // determine if this is an update or a create by checking if the id is present
        const isUpdate = (input.id) ? true : false;
        let translated = {};

        if (!isUpdate) {
            translated = {
                guid: input.Id,
                pseudo: input.Pseudo,
                companyGuid: input.CompanyId,
                flightHoursTotalBeforeHiring: parseInt(input.FlightHoursTotalBeforeHiring),
                flightHoursInCompany: parseInt(input.FlightHoursInCompany),
                category: parseInt(input.Category),
                status: parseInt(input.Status),
                lastStatusChange: (input.LastStatusChange) ? new Date(input.LastStatusChange) : null,
                isOnline: input.IsOnline,
                flightHoursGrandTotal: parseInt(input.FlightHoursGrandTotal),
                onAirSyncedAt: (input.OnAirSyncedAt) ? (typeof input.OnAirSyncedAt !== Date) ? new Date(input.OnAirSyncedAt) : input.OnAirSyncedAt : null,
                company: (input.Company?.id) ? {
                    connect: {
                        id: (typeof input.Company.id !== 'number') ? parseInt(input.Company.id) : input.Company.id
                    }
                } : undefined,
            }
        } else {
            translated = {
                guid: input.Id,
                pseudo: input.Pseudo,
                companyGuid: input.CompanyId,
                flightHoursTotalBeforeHiring: parseInt(input.FlightHoursTotalBeforeHiring),
                flightHoursInCompany: parseInt(input.FlightHoursInCompany),
                category: parseInt(input.Category),
                status: parseInt(input.Status),
                lastStatusChange: (input.LastStatusChange) ? new Date(input.LastStatusChange) : null,
                isOnline: input.IsOnline,
                flightHoursGrandTotal: parseInt(input.FlightHoursGrandTotal),
                onAirSyncedAt: (input.OnAirSyncedAt) ? (typeof input.OnAirSyncedAt !== Date) ? new Date(input.OnAirSyncedAt) : input.OnAirSyncedAt : null,
                company: (input.Company?.id) ? {
                    connect: {
                        id: (typeof input.Company.id !== 'number') ? parseInt(input.Company.id) : input.Company.id
                    }
                } : undefined,
            }
        }

        return translated;
    }

    async upsertByGuid(personId, payload, opts) {
        const self = this;
        if (!personId) throw new Error('personId is required');
        if (!payload) throw new Error('payload is required');

        const translated = this.translate(payload);

        const query = {
            where: {
                guid: (typeof personId === 'string') ? personId : personId.toString(),
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

    async findByGuid(personId, opts) {
        const self = this;
        if (!personId) throw new Error('personId is required');

        const query = {
            where: {
                guid: (typeof personId === 'string') ? personId : personId.toString(),
            },
            include: (opts?.include) ? opts.include : undefined,
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
        }

        return await this.Model.findUnique(query)
        .then((x) => self.determineCanSync(x))
        .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
        .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
        .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

}

module.exports = new PersonRepoClass();