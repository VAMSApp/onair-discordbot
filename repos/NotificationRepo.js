const BaseRepo = require('./BaseRepo');
const PersonRepo = require('./PersonRepo');

class NotificationRepoClass extends BaseRepo {
    constructor() {
        super('notification')
        this.upsert = this.upsert.bind(this);
        this.update = this.update.bind(this);
        this.create = this.create.bind(this);
        this.translate = this.translate.bind(this);
    }

    async upsert(notification, opts) {
        if (!notification) throw new Error('Notification is required');
        const identifier = (notification.id) ? 'id' : 'guid';

        const translated = this.translate(notification);

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

    async update(id, x, opts) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        const translated = this.translate(x);

        const query = {
            where: {
                id: (typeof id !== 'number') ? Number(id) : id,
            },
            data: translated,
        }

        if (opts?.include) {
            query.include = opts.include;
        }

        const newX = await this.Model.update(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)

        return newX;
    }

    async create(input, opts) {
        if (!input) throw new Error('No input provided');

        const translated = this.translate(input);

        const query = {
            data: translated,
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        const newX = await this.Model.create(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)

        return newX;
        
    }

    translate(input) {
        if (!input) throw new Error('No input provided');
        
        // determine if this is an update or a create by checking if the id is present
        const isUpdate = (input.id) ? true : false;
        let translated = {};

        if (!isUpdate) {
            translated = {
                guid: input.Id,
                vaGuid: input.CompanyId,
                aircraftGuid: (input.AircraftId) ? input.AircraftId : null,
                flightGuid: (input.FlightId) ? input.FlightId : null,
                accountGuid: (input.AccountId) ? input.AccountId : null,
                companyGuid: (input.Company) ? input.Company.CompanyId : null,
                personGuid: (input.PeopleId) ? input.PeopleId : null,
                isRead: input.IsRead,
                isNotification: input.IsNotification,
                zuluEventTime: (input.ZuluEventTime) ? new Date(input.ZuluEventTime) : null,
                categoryId: parseInt(input.Category),
                actionId: parseInt(input.Action),
                description: input.Description,
                amount: parseInt(input.Amount),
                person: (input.Person) ? {
                    connect: {
                        id: (typeof input.Person.id !== 'number') ? Number(input.Person.id) : input.Person.id,
                    }
                } : undefined,
                company: (input.Company) ? {
                    connect: {
                        id: (typeof input.Person.id !== 'number') ? Number(input.Person.id) : input.Person.id,
                    }
                } : undefined,
                va: (input.va) ? {
                    connect: {
                        id: (typeof input.va.id !== 'number') ? Number(input.va.id) : input.va.id,
                    }
                } : undefined,
            }
        } else {
            translated = {
                guid: input.Id || input.guid,
                vaGuid: input.CompanyId || input.vaGuid,
                aircraftGuid: input.AircraftId || input.aircraftGuid,
                flightGuid: input.FlightId || input.flightGuid,
                accountGuid: input.AccountId || input.accountGuid,
                companyGuid: (input.Company) ? input.Company.CompanyId : (input.companyGuid) ? input.companyGuid : null,
                personGuid: input.PeopleId || input.personGuid,
                isRead: input.IsRead || input.isRead,
                isNotification: input.IsNotification || input.isNotification,
                zuluEventTime: (input.ZuluEventTime)
                    ? new Date(input.ZuluEventTime)
                    : (input.zuluEventTime && typeof input.zuluEventTime !== Date)
                        ? new Date(input.zuluEventTime)
                        : (input.zuluEventTime)
                            ? input.zuluEventTime
                            : null,
                categoryId: parseInt(input.Category) || parseInt(input.categoryId),
                actionId: parseInt(input.Action) || parseInt(input.actionId),
                description: input.Description || input.description,
                amount: parseInt(input.Amount) || parseInt(input.amount),
                person: (input.Person) ? {
                    connect: {
                        id: (typeof input.Person.id !== 'number') ? Number(input.Person.id) : input.Person.id,
                    }
                } : undefined,
                company: (input.Company) ? {
                    connect: {
                        id: (typeof input.Company.id !== 'number') ? Number(input.Company.id) : input.Company.id,
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