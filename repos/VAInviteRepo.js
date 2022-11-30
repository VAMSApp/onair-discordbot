const BaseRepo = require('./BaseRepo');

class VAInviteRepoClass extends BaseRepo {
    constructor() {
        super('VAInvitation');
        this.create = this.create.bind(this);
        this.findPendingById = this.findPendingById.bind(this);
    }

    async create(payload, opts) {
        const self = this;
        if (!payload) throw new Error('Payload is required');

        const query = {
            data: payload,
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.create(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }

    async findPendingById(id, opts) {
        const self = this;
        if (!id) throw new Error('ID is required');

        const query = {
            where: {
                id: (typeof id === 'string') ? Number(id) : id,
                isPending: true,
            },
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        return await this.Model.findFirst(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
    }
}

module.exports = new VAInviteRepoClass();
