const BaseRepo = require('./BaseRepo');

class AppConfigRepoClass extends BaseRepo {
    constructor() {
        super('appConfig')
        this.getFirst = this.getFirst.bind(this)
    }

    async getFirst(opts) {
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
}

module.exports = new AppConfigRepoClass();