const BaseRepo = require('./BaseRepo');
const EmployeeRepo = require('./EmployeeRepo');

class NotificationRepoClass extends BaseRepo {
    constructor() {
        super('notification')
        this.upsert = this.upsert.bind(this);
        this.update = this.update.bind(this);
        this.create = this.create.bind(this);
        this.findByGuid = this.findByGuid.bind(this);
        this.translate = this.translate.bind(this);
    }

    async upsert(notification, opts) {
        if (!notification) throw new Error('Notification is required');
        const identifier = (notification.id) ? 'id' : 'guid';

        const translated = await this.translate(notification);

        const query = {
            where: {
                [identifier]: (identifier === 'id') ? notification.id : notification.Id,
            },
            update: translated,
            create: translated,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.upsert(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
        
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

    async update(id, x, opts) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        const translated = await this.translate(x);

        const query = {
            where: {
                id: (typeof id !== 'number') ? Number(id) : id,
            },
            data: translated,
        }

        if (opts?.include) {
            query.include = opts.include;
        }

        return await this.Model.update(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async create(input, opts) {
        if (!input) throw new Error('No input provided');

        const translated = await this.translate(input);

        const query = {
            data: translated,
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
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
                guid: input.Id,
                vaGuid: input.CompanyId,
                aircraftGuid: input.AircraftId,
                flightGuid: input.FlightId,
                accountGuid: input.AccountId,
                employeeGuid: input.PeopleId,
                isRead: input.IsRead,
                isNotification: input.IsNotification,
                zuluEventTime: (input.ZuluEventTime) ? new Date(input.ZuluEventTime) : null,
                categoryId: parseInt(input.Category),
                actionId: parseInt(input.Action),
                description: input.Description,
                amount: parseInt(input.Amount),
                employee: (input.Person) ? {
                    connect: {
                        id: (typeof input.Person.id !== 'number') ? Number(input.Person.id) : input.Person.id,
                    }
                } : undefined,
                va: (input.VirtualAirline) ? {
                    connect: {
                        id: (typeof input.VirtualAirline.id !== 'number') ? Number(input.VirtualAirline.id) : input.VirtualAirline.id,
                    }
                } : undefined,
            }
        } else {
            translated = {
                guid: input.Id,
                vaGuid: input.CompanyId,
                aircraftGuid: input.AircraftId,
                flightGuid: input.FlightId,
                accountGuid: input.AccountId,
                employeeGuid: input.PeopleId,
                isRead: input.IsRead,
                isNotification: input.IsNotification,
                zuluEventTime: (input.ZuluEventTime) ? new Date(input.ZuluEventTime) : null,
                categoryId: parseInt(input.Category),
                actionId: parseInt(input.Action),
                description: input.Description,
                amount: parseInt(input.Amount),
                employee: (input.Person) ? {
                    connect: {
                        id: (typeof input.Person.id !== 'number') ? Number(input.Person.id) : input.Person.id,
                    }
                } : undefined,
                va: (input.VirtualAirline) ? {
                    connect: {
                        id: (typeof input.VirtualAirline.id === 'string') ? parseInt(input.VirtualAirline.id) : input.VirtualAirline.id,
                    }
                } : undefined,
            }
        }

        return translated;
    }
}

module.exports = new NotificationRepoClass();