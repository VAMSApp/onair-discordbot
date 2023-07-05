const { OnAirApi } = require('onair-api')
const Logger = require('@lib/logger.js')
const Config = require('@config')
const _  = require('lodash')
const {
    eachOfSeries,
    eachOfLimit,
    eachOf,
    eachSeries,
} = require('async');

const NotificationRepo = require('@repos/NotificationRepo');
const PersonRepo = require('@repos/PersonRepo');
const CompanyRepo = require('@repos/CompanyRepo');
const VirtualAirlineRepo = require('@repos/VirtualAirlineRepo');
const EventService = require('./EventService');

class OnAir {
    Api = undefined;
    VA = undefined;
    Notifications = [];
    Config = Config;
    CompanyId = Config.onAir.companyId;
    VAId = Config.onAir.vAId;
    ApiKey = Config.onAir.apiKey;
    RefreshCounts = {
        Notifications: 0,
        Flights: 0,
        Aircraft: 0,
        Jobs: 0,
    };

    Processing = {
        Notifications: false,
        Flights: false,
        VAFleet: false,
        Jobs: false,
        VADetails: false,
    };

    constructor() {
        if (!this.CompanyId) throw 'No OnAir Company ID defined in cfg'
        if (!this.VAId) throw 'No OnAir VA ID defined in cfg'
        if (!this.ApiKey) throw 'No OnAir Api Key defined in cfg'
        
        this.updateCount = this.updateCount.bind(this);
        this.resetCount = this.resetCount.bind(this);
        this.increaseCount = this.increaseCount.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
        this.setProcessing = this.setProcessing.bind(this);

        this.resetProcessingState = this.resetProcessingState.bind(this);

        this.refreshVADetails = this.refreshVADetails.bind(this);
        this.processVANotification = this.processVANotification.bind(this);

        this.Api = new OnAirApi({
            apiKey: this.ApiKey,
            companyId: this.CompanyId,
            vaId: this.VAId,
        })

        this.VA = this.loadVADetail();

        if (this.Config.VAEvents.enabled === true && this.Config.VAEvents.refreshOnStartup === true) {
            if (this.Config.VAEvents.poll.VADetails.enabled === true) {
                this.refreshVADetails();
            }

            if (this.Config.VAEvents.poll.VANotifications.enabled === true) {
                this.refreshVANotifications();
            }

            // if (this.Config.VAEvents.poll.VAFleet.enabled === true) {
            //     this.refreshVAFleet();
            // }
        }
    }

    setProcessing(type, bool) {
        if (!type) throw new Error('no type provided')
        this.Processing[type] = bool || !this.Processing[type];
    }
    
    async loadVADetail() {
        Logger.debug('OnAirService.loadVADetail()');
        let x = await VirtualAirlineRepo.findByGuid(this.VAId);

        if (!x) {
            Logger.debug(`OnAirService.loadVADetail() - VA not found, refreshing from OnAir API`);
            x = await this.refreshVADetails();
            return x;
        } else {
            Logger.debug(`OnAirService.loadVADetail() - VA '${x.airlineCode}' found in DB, returning`);
            return x;
        }
    }

    async loadVANotifications() {
        return new Promise(async (resolve, reject) => {
            if (!this.VAId) return reject('no VAId found! Double check the config file');
            const notifications = await this.refreshVANotifications();
            if (!notifications) return reject('no va details found');

            this.Notifications = notifications;

            return resolve(notifications);
        });
    }
    
    updateCount(type) {
        if (!type) throw new Error('no type provided')
        if (!this.RefreshCounts[type]) this.RefreshCounts[type] = 0;
        this.RefreshCounts[type]++;
    }

    resetCount(type) {
        if (!type) throw new Error('no type provided')
        this.RefreshCounts[type] = 0;
    }

    setCount(type, count) {
        if (!type) throw new Error('no type provided')
        if (!count) throw new Error('no count provided')
        this.RefreshCounts[type] = count;
    }

    increaseCount(type) {
        if (!type) throw new Error('no type provided')
        this.RefreshCounts[type]++
    }

    decreaseCount(type) {
        if (!type) throw new Error('no type provided')
        this.RefreshCounts[type]--
    }

    async getFleet() {
        const x = await this.Api.getCompanyFleet();
        return x
    }

    async getJobs() {
        const x = await this.Api.getCompanyJobs(1, 1);
        return x
    }

    async getCompanyFlights() {
        let x = await this.Api.getCompanyFlights();
        if (!x) return []
        
        return x
    }

    async getAirport(icao) {
        if (!icao) throw 'no ICAO provided'

        const x = await this.Api.getAirport(icao)
        return x
    }

    async getCompanyDetail() {
        const x = await this.Api.getCompany()
        return x
    }

    async getVADetail() {
        const x = await this.Api.getVirtualAirline(this.VAId);
        return x
    }

    async getVAJobs() {
        const x = await this.Api.getVirtualAirlineJobs();
        return x
    }

    async getVAFlights(opts) {
        let x = await this.Api.getVirtualAirlineFlights();

        if (opts?.filter) {
            if (opts.filter.aircraftCode !== null) {
                x = x.filter(f => f.Aircraft.Identifier === opts.filter.aircraftCode)
            }

            if (opts.filter.companyCode) {
                x = x.filter(f => f.Company.AirlineCode === opts.filter.companyCode)
            }

            if (!opts.filter.showcompleted) {
                x = x.filter(f => f.StartTime && !f.EndTime)
            }
        }

        if (opts?.sortBy) {
            x = x.sort((a, b) => {
                return (opts.sortOrder === 'desc')
                    ? (new Date(b[opts.sortBy]) - new Date(a[opts.sortBy]))
                    : (new Date(a[opts.sortBy]) - new Date(b[opts.sortBy]))
            })
        }
        
        return x
    }

    async getVAFleet() {
        const x = await this.Api.getVirtualAirlineFleet();
        return x
    }
    
    async getVAMembers(opts) {
        let x = await this.Api.getVirtualAirlineMembers();

        if (opts?.sortBy) {
            if (opts.sortBy === 'Role') {
                x = x.sort((a, b) => {
                    return a.VARole.Permission - b.VARole.Permission;
                });
            }
        }
        return x
    }

    async getVAFbos() {
        const x = await this.Api.getVirtualAirlineFbos();
        return x
    }

    async refreshVADetails() {
        const self = this;

        if (self.Processing.VADetails) {
            Logger.warn('Aborting refresh of VA Details one is already in progress');
            return;
        }

        self.setProcessing('VADetails', true);
        const va = await self.getVADetail();
        if (!va) return;

        va.apiKey = self.ApiKey;

        const x = await VirtualAirlineRepo.upsertByGuid(va.Id, {
            ...va,
            onAirSyncedAt: new Date()
        }, {
            include: {
                owner: {
                    include: {
                        companies: {
                            include: {
                                employees: true,
                            }
                        },
                    },
                },
                members: {
                    include:{
                        owner: true,
                        employees: true
                    }
                }
            }
        });

        self.setProcessing('VADetails', false);
        
        return x;
    }

    async refreshVAFleet() {
        const self = this;

        return new Promise(async (resolve, reject) => {
            if (self.Processing.VAFleet === true) {
                Logger.warn('Aborting refresh of The VA Fleet as one is already in progress');
                return reject('Aborting refresh of The VA Fleet as one is already in progress');
            } else if (self.Processing.VAFleet === false && self.RefreshCounts.VAFleet > 0) {
                self.resetCount('VAFleet');
            }

            self.setProcessing('VAFleet', true);

            Logger.info('Refreshing VA Fleet');
            const x = await self.getVAFleet();

            if (!x) {
                Logger.debug(`No Aircraft in fleet`);
                return resolve(`No Aircraft in fleet`);
            }

            if (x.length > 0) {
                Logger.debug(`Found ${x.length} Aircraft in the fleet`);
                
                // iterate over the fleet and run processVAFleet on each aircraft
                self.setProcessing('VAFleet', false);
                self.setCount('VAFleet', x.length);

                return resolve({
                    count: self.RefreshCounts.VAFleet,
                    createdAt: new Date(),
                })
            }
        });
    }

    async refreshVANotifications() {
        const self = this;
        return new Promise(async (resolve, reject) => {

            if (self.Processing.Notifications === true) {
                Logger.warn('Aborting refresh of VA Notifications one is already in progress');
                return;
            } else if (self.Processing.Notifications === false && self.RefreshCounts.Notifications > 0) {
                self.resetCount('Notifications');
            }
            
            self.setProcessing('Notifications', true);

            Logger.info(`Refreshing VA Notifications`);
            const x = await self.Api.getVirtualAirlineNotifications();

            if (!x) {
                Logger.debug(`No notifications found`);
                return resolve();
            }

            if (x.length > 0) {
                Logger.debug(`Found ${x.length} notifications`);
                
                self.VA = await VirtualAirlineRepo.findFirst()
                .then(async (va) => {
                    if (!va) {
                        Logger.debug(`No VA found in the database, refreshing from OnAir`);
                        return await self.refreshVADetails();
                    }
                    return va;
                })
                .catch((err) => {
                    Logger.error(`RefreshNotifications::err - ${err}`);
                });
                    
                Logger.debug(`Found existing VA '${self.VA?.name}' in the database`);
                if (!self.VA) {
                    Logger.error(`RefreshNotifications::err - No VA found in the database`);
                    return reject(`RefreshNotifications::err - No VA found in the database`);
                }

                Logger.debug(`Looping through notifications`)
                // each x and update the db
                eachOfSeries(x, async (n, i) => {
                    Logger.debug(`Processing notification ${i+1} of ${x.length}`);
                    // n.va = self.VA;
                    
                    const results = await self.processVANotification(n);
                    self.updateCount('Notifications');

                    return results
                })
                .then(() => {
                    Logger.info(`Finished processing ${self.RefreshCounts.Notifications} notifications`);
                    self.setProcessing('Notifications', false);

                    return resolve({
                        count: self.RefreshCounts.Notifications,
                        createdAt: new Date(),
                    })
                })
                .catch((err) => {
                    self.setProcessing('Notifications', false);

                    if (err) {
                        Logger.error(`RefreshNotifications::err - ${err}`);
                    }

                    return reject(`RefreshNotifications::err - ${err}`)
                })
            }
        })

    }

    async processVAFleet(fleet) {
        const self = this;
    }

    async processVANotification(n) {
        const self = this;
        if (!n) throw new Error('No notification provided');
        // if a PeopleId is provided, we need to
        if (!self.VA) {
            throw new Error('No VA found');
        }

        if (!n.VirtualAirline && self.VA) {
            n.VirtualAirline = self.VA
        }

        // PeopleId does not exist
        if (!n.PeopleId) {
            // try to infer the Company by the ICAO provided in the description.
            if (n.Description) {
                const airlineCode = n.Description.split(' taken by ')[1];
                if (airlineCode) {
                    const company = await CompanyRepo.findByAirlineCode(airlineCode, {
                        include: {
                            owner: {
                                include: {
                                    person: true,
                                }
                            },
                        }
                    });

                    if (company) {
                        const personGuid = company.owner?.person?.guid;
                        if (personGuid) {
                            n.PeopleId = personGuid;
                        }
                    }
                }
            }
        }

        if (n.PeopleId) {
            // get the latest person details from the OnAir Api
            const p = await self.Api.getEmployee(n.PeopleId).then((x) => ({ ...x, onAirSyncedAt: new Date() }));
            if (!p) throw new Error('No person found for notification');

            if (p) {
                p.Company = await CompanyRepo.findByGuid(p.CompanyId);

                const company = await self.Api.getCompany(p.CompanyId).then((c) => ({ ...c, vaId: self.VA.id, onAirSyncedAt: new Date() }));

                n.Company = await CompanyRepo.upsertByGuid(p.CompanyId, company, {
                    include: {
                        owner: true,
                        virtualAirline: {
                            include: {
                                owner: true
                            }
                        },
                        employees:  true,
                    }
                });

                // upsert the person record
                n.Person = await PersonRepo.upsertByGuid(p.Id, p, {
                    include: {
                        company: {
                            include: {
                                owner: true,
                                virtualAirline: true,
                                employees: true,
                            }
                        }
                    }
                });
            }
        }

        let notification = await NotificationRepo.findByGuid(n.Id);
        
        if (!notification) {
            notification = await NotificationRepo.create(n, {
                include: {
                    person: {
                        include: {
                            company: true,
                        },
                    },
                },
                va: {
                    include: {
                        owner: {
                            include: {
                                companies: true,
                            },
                        },
                        members: {
                            include: {
                                owner: true,
                            }
                        }
                    }
                },
            });

            Logger.warn(`Sending a new discord VA Event: '${notification.description}'`)
            EventService.publish('onair-notifications', notification);

        } else {

            notification = await NotificationRepo.update(notification.id, n, {
                include: {
                    person: {
                        include: {
                            company: true,
                        },
                    },
                },
                va: {
                    include: {
                        owner: {
                            include: {
                                companies: true,
                            },
                        },
                        members: {
                            include: {
                                owner: true,
                            }
                        }
                    }
                },
            });
        }

        return notification;
        
    }

    resetProcessingState(type) {
        if (!type) throw new Error('No type provided');
        if (!Object.keys(this.Processing).filter((i) => i === type)) throw new Error('Invalid type provided');

        this.resetCount(type);
        this.setProcessing(type, false);
    }

}

module.exports = new OnAir()