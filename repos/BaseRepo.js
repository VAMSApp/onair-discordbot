const Prisma = require('@db');
const moment = require('moment');

function _humanize(date) {
    if (!date) throw new Error('Date is required');
    const humanized = moment(date).fromNow();

    return humanized.toString();
}

class BaseRepo {
    Model;
    prisma = Prisma;

    constructor(model) {
        if (!model) throw new Error('No model name provided');

        this.Model = this.prisma[model];
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.destroy = this.destroy.bind(this);
        this.humanize = this.humanize.bind(this);
        this.serialize = this.serialize.bind(this);
        this.omit = this.omit.bind(this);
        
    }

    serialize(x) {
        if (!x) throw new Error('Record is required');
        return JSON.parse(JSON.stringify(x));
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