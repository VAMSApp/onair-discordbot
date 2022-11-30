const BaseRepo = require('./BaseRepo');

class AccountRepoClass extends BaseRepo {
    constructor() {
        super('account')

        this.findByDiscordId = this.findByDiscordId.bind(this)
        this.toggleField = this.toggleField.bind(this)
        this.upsert = this.upsert.bind(this)
    }

    async findByDiscordId(discordId, opts) {
        const self = this;
        if (!discordId) throw new Error('Discord ID is required');

        const query = {
            where: {
                discordId: (typeof discordId !== 'string') ? discordId.toString() : discordId,
            },
            include: (opts?.include) ? opts.include : undefined,
        }

        return this.Model.findUnique(query)
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

        return await this.update(x.id, x, opts)
    }

    async upsert(discordId, payload, opts) {
        const self = this;
        if (!discordId) throw new Error('Discord ID is required');
        if (!payload) throw new Error('Payload is required');

        const query = {
            where: {
                discordId,
            },
            update: {
                username: payload.username,
                email: payload.email,
                locale: payload.locale,
                verified: payload.verified,
                isAdmin: payload.isAdmin,
                isEnabled: payload.isEnabled,
                lastLogin: payload.lastLogin,
                updatedAt: payload.updatedAt,
            },
            create: {
                discordId: payload.discordId,
                username: payload.username,
                discriminator: payload.discriminator,
                email: payload.email,
                locale: payload.locale,
                verified: payload.verified,
                isAdmin: payload.isAdmin,
                isEnabled: payload.isEnabled,
                lastLogin: payload.lastLogin,
                updatedAt: payload.updatedAt,
            },
            include: (opts?.include) ? opts.include : undefined,
        }

        const x = await this.Model.upsert(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (opts?.serialize) ? self.serialize(x) : x)
            .catch((err) => console.error(err))

        return x;
    }

}

module.exports = new AccountRepoClass();