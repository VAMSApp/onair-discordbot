const BaseRepo = require('./BaseRepo');

class MenuRepoClass extends BaseRepo {
    constructor() {
        super('menu')
        this.findBySlug = this.findBySlug.bind(this)
        this.toggleField = this.toggleField.bind(this)
        this.findEnabled = this.findEnabled.bind(this)
    }
    
    async findEnabled(opts) {
        const self = this
        const query = {
            where: {
                isDisabled: {
                    equals: false,
                },
            },
            include: {
                items: {
                    where: {
                        isDisabled: {
                            equals: false,
                        }
                    }
                },
                ...opts?.include,
            }
        }
        
        const x = await this.Model.findMany(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (opts?.serialize) ? self.serialize(x) : x)

        
        return x.filter((menu) => {
            menu.items = menu.items.filter((item) => {
                return item.isDisabled === false
            })
        
            return (menu.isDisabled === false && menu.items.length > 0)
        });
    }

    
    async findBySlug(slug, opts) {
        const query = {
            where: {
                slug,
            },
        }

        if (opts?.include) {
            query.include = opts.include;
        }

        return await this.Model.findUnique(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (opts?.serialize) ? self.serialize(x) : x)
    }

    async toggleField(id, fieldKey, opts) {
        const self = this;
        const x = await this.findById(id);

        if (!x) {
            throw new Error('Account not found');
        }

        x[fieldKey] = !x[fieldKey];

        return await this.update(x.id, x, opts);
    }
}

module.exports = new MenuRepoClass();