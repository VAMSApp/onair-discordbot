const Prisma = require('@db');
const moment = require('moment');
const { Logger } = require('winston');

function _humanize(date) {
    if (!date) throw new Error('Date is required');
    const humanized = moment(date).fromNow();

    return humanized.toString();
}

class BaseRepo {
    Model;
    prisma = Prisma;
    IsSyncable = false;

    constructor(model) {
        if (!model) throw new Error('No model name provided');

        this.Model = this.prisma[model];
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.findByGuid = this.findByGuid.bind(this)
        this.findFirst = this.findFirst.bind(this)
        this.destroy = this.destroy.bind(this);
        this.humanize = this.humanize.bind(this);
        this.serialize = this.serialize.bind(this);
        this.omit = this.omit.bind(this);
        
        if (this.IsSyncable) {
            this.determineCanSync = this.determineCanSync.bind(this);
        }
    }

    

    determineCanSync (x) {
        if (!x) return null;
        let canSync = false;
    
        // if onAirSyncedAt is not null
        if (x.onAirSyncedAt) {
            const currentDate = new Date()
            const onAirSyncedAt = (typeof x.onAirSyncedAt === 'string') ? new Date(x.onAirSyncedAt) : x.onAirSyncedAt;
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

    serialize(x) {
        if (!x) throw new Error('Record is required');
        let parsedX = undefined;
        try {
            parsedX = JSON.parse(JSON.stringify(x));
        }
        catch(e) {
            Logger.error(`Error parsing JSON ${(e) ? e : ''}`);
            parsedX = x;
        }

        return parsedX
    }

    humanize(x, keys) {
        if (!x) throw new Error('Record is required');
        if (!keys) throw new Error('Keys are required');

        if (!Array.isArray(keys)) throw new Error('Keys must be an array');
        // if Users is an array
        if (Array.isArray(x)) {
            x.forEach((y) => {
                // loop through keys
                keys.forEach((key) => {
                    // if key exists on y
                    if (y[key]) {
                        // humanize it
                        y[`humanized_${key}`] = _humanize(y[key]);
                    }
                });
            });
        } else {
            // loop through keys
            keys.forEach((key) => {
                // if key exists on user
                if (x[key]) {
                    // humanize it
                    x[`humanized_${key}`] = _humanize(x[key]);
                }
            });
        }
        
        return x;
    };

    omit(_x, keys) {
        if (!_x) throw new Error('Record is required');
        if (!keys) throw new Error('Keys are required');
        const X = JSON.parse(JSON.stringify(_x));

        if (Array.isArray(X)) {
            X.forEach((x) => {
                keys.forEach((key) => {
                    delete x[key];
                });
            });
        } else {
            keys.forEach((key) => {
                delete X[key];
            });
        }

        return X;
    }

    async create(newX, opts) {
        const self = this;
        if (!newX) throw new Error('New Record is required');

        const query = {
            data: newX,
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async update(id, x, opts) {
        const self = this;
        if (!x) throw new Error('New Record is required');

        const query = {
            where: {
                id: (typeof id !== 'number') ? Number(id) : id,
            },
            data: x,
        }

        if (opts?.include) {
            query.include = opts.include;
        }

        return await this.Model.update(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findAll(opts) {
        const self = this;

        const query = {
            where: {},
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return this.Model.findMany(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findById(id, opts) {
        const self = this;
        if  (!id) throw new Error('Id is required');
        
        const query = {
            where: {
                id: (typeof id !== 'number') ? Number(id) : id,
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return this.Model.findUnique(query)
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

        try {
            const x = await this.Model.findUnique(query)
            return x;
        }
        catch(err) {
            Logger.error(`Error finding by guid: ${err}`);
            return null;
        }
    }

    async findFirst(opts) {
        const self = this;

        const query = {
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findFirst(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    
    async destroy(id, opts) {
        const self = this;
        if (!id) throw new Error('Id is required');

        const query = {
            where: {
                id: (typeof id !== 'number') ? Number(id) : id,
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.delete(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

module.exports = BaseRepo