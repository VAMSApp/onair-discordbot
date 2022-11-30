const BaseRepo = require('./BaseRepo');
const CompanyRepo = require('./CompanyRepo');

class EmployeeRepoClass extends BaseRepo {
    constructor() {
        super('employee')
        this.upsert = this.upsert.bind(this);
        this.upsertByGuid = this.upsertByGuid.bind(this);
        this.translate = this.translate.bind(this);
    }

    async upsert(employee, opts) {
        if (!employee) throw new Error('Employee is required');

        const query = {
            orderBy: (opts?.orderBy) ? opts.orderBy : undefined,
            include: (opts?.include) ? opts.include : undefined,
        }

        if (employee.id) {
            query.where = {
                id: (typeof employee.id !== 'number') ? Number(employee.id) : employee.id,
            };
        } else if (employee.Id) {
            // is an insert
            query.where = {
                Id: employee.Id
            };
        }

        query.create = this.translate(employee);

        query.update = {
            guid: employee.Id,
            companyGuid: employee.CompanyId,
            aircraftGuid: employee.AircraftId,
            flightGuid: employee.FlightId,
            accountGuid: employee.AccountId,
            employeeGuid: employee.PeopleId,
            isRead: employee.isRead,
            isEmployee: employee.isEmployee,
            zuluEventTime: employee.zuluEventTime,
            categoryId: employee.categoryId,
            actionId: employee.actionId,
            description: employee.description,
            amount: employee.amount,
            va: {
                connect: {
                    guid: employee.CompanyId
                }
            },
        }

        return await this.Model.upsert(query)
            .then((x) => (x && opts?.omit) ? self.omit(x, opts.omit) : x)
            .then((x) => (x && opts?.humanize) ? self.humanize(x, opts.humanize) : x)
            .then((x) => (x && opts?.serialize) ? self.serialize(x) : x)
        
    }

    
    async upsertByGuid(employeeId, payload, opts) {
        const self = this;
        if (!employeeId) throw new Error('employeeId is required');
        if (!payload) throw new Error('payload is required');

        const translated = await this.translate(payload);

        const query = {
            where: {
                guid: (typeof employeeId === 'string') ? employeeId : employeeId.toString(),
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

    async translate(input) {
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
                company: (input.Company) ? {
                    connect: {
                        id: input.Company.id
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
                company: (input.Company) ? {
                    connect: {
                        id: input.Company.id
                    }
                } : undefined,
            }
        }

        return translated;
    }
}

module.exports = new EmployeeRepoClass();