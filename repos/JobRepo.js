const prisma = require('@lib/prisma')
const WorldRepo = require('./WorldRepo')
const CompanyRepo = require('./CompanyRepo')

const JobRepo = {
    findAll: async () => {
        return await prisma.job.findMany()
    },
    findByGuid: async (guid) => {
        if (!guid) return;

        return await prisma.job.findUnique({
            where: {
                Guid: guid
            }
        })
    },

    findById: async (id) => {
        if (!id) return;
        
        return await prisma.job.findUnique({
            where: {
                Id: id
            }
        })
    },

    translate: function translate (x) {
        const translated = {
            Guid: x.Id,
            WorldGuid: x.WorldId,
            MainAirportGuid: x.MainAirportId,
            BaseAirportGuid: x.BaseAirportId,
            ValuePerLbsPerDistance: x.ValuePerLbsPerDistance,
            IsGoodValue: x.IsGoodValue,
            MaxDistance: x.MaxDistance,
            TotalDistance: x.TotalDistance,
            MainAirportHeading: x.MainAirportHeading,
            Description: x.Description,
            ExpirationDate: (x.ExpirationDate) ? new Date(x.ExpirationDate) : null,
            Pay: x.Pay,
            PayLastMinuteBonus: x.PayLastMinuteBonus,
            Penality: x.Penality,
            ReputationImpact: x.ReputationImpact,
            CompanyGuid: x.CompanyId,
            CreationDate: (x.CreationDate) ? new Date(x.CreationDate) : null,
            TakenDate: (x.TakenDate) ? new Date(x.TakenDate) : null,
            TotalCargoTransported: x.TotalCargoTransported,
            TotalPaxTransported: x.TotalPaxTransported,
            Category: x.Category,
            State: x.State,
            XP: x.XP,
            SkillPoint: x.SkillPoint,
            MinCompanyReput: x.MinCompanyReput,
            RealPay: x.RealPay,
            RealPenality: x.RealPenality,
            CanAccess: x.CanAccess,
            CanAccessDisplay: x.CanAccessDisplay,
            IsLastMinute: x.IsLastMinute,
            IsFavorited: x.IsFavorited,
        }

        return translated
    }, 

    findPendingJobs: async () => {},

    upsert: async function upsert (newX) {
        if (!newX) return;

        return await prisma.job.upsert({
            where: {
                Guid: newX.Id
            },
            create: {
                Guid: newX.Id,
                WorldGuid: newX.WorldId,
                MissionTypeGuid: newX.MissionTypeId,
                MainAirportGuid: newX.MainAirportId,
                BaseAirportGuid: newX.BaseAirportId,
                ValuePerLbsPerDistance: newX.ValuePerLbsPerDistance,
                IsGoodValue: newX.IsGoodValue,
                MaxDistance: newX.MaxDistance,
                TotalDistance: newX.TotalDistance,
                MainAirportHeading: newX.MainAirportHeading,
                Description: newX.Description,
                ExpirationDate: (newX.ExpirationDate) ? new Date(newX.ExpirationDate) : null,
                Pay: newX.Pay,
                PayLastMinuteBonus: newX.PayLastMinuteBonus,
                Penality: newX.Penality,
                ReputationImpact: newX.ReputationImpact,
                CompanyGuid: newX.CompanyId,
                CreationDate: (newX.CreationDate) ? new Date(newX.CreationDate) : null,
                TakenDate: (newX.TakenDate) ? new Date(newX.TakenDate) : null,
                TotalCargoTransported: newX.TotalCargoTransported,
                TotalPaxTransported: newX.TotalPaxTransported,
                Category: newX.Category,
                State: newX.State,
                XP: newX.XP,
                SkillPoint: newX.SkillPoint,
                MinCompanyReput: newX.MinCompanyReput,
                RealPay: newX.RealPay,
                RealPenality: newX.RealPenality,
                CanAccess: newX.CanAccess,
                CanAccessDisplay: newX.CanAccessDisplay,
                IsLastMinute: newX.IsLastMinute,
                IsFavorited: newX.IsFavorited,
                World: {
                    connect: {
                        Guid: newX.WorldId
                    }
                },
                Company: {
                    connect: {
                        Guid: newX.CompanyId
                    }
                },
                MissionType: {
                    connectOrCreate: {
                        create: {
                            Guid: newX.MissionTypeId,
                            Name: newX.MissionType.Name,
                            ShortName: newX.MissionType.ShortName,
                            Description: newX.MissionType.Description,
                            BaseReputationImpact: newX.MissionType.BaseReputationImpact,
                            BasePayFactor: newX.MissionType.BasePayFactor,
                            BasePenalityFactor: newX.MissionType.BasePenalityFactor,
                        },
                        where: {
                            Guid: newX.MissionTypeId
                        }
                    }
                },
            },
            update: {
                Guid: newX.Id,
                WorldGuid: newX.WorldId,
                MissionTypeGuid: newX.MissionTypeId,
                MainAirportGuid: newX.MainAirportId,
                BaseAirportGuid: newX.BaseAirportId,
                ValuePerLbsPerDistance: newX.ValuePerLbsPerDistance,
                IsGoodValue: newX.IsGoodValue,
                MaxDistance: newX.MaxDistance,
                TotalDistance: newX.TotalDistance,
                MainAirportHeading: newX.MainAirportHeading,
                Description: newX.Description,
                ExpirationDate: (newX.ExpirationDate) ? new Date(newX.ExpirationDate) : null,
                Pay: newX.Pay,
                PayLastMinuteBonus: newX.PayLastMinuteBonus,
                Penality: newX.Penality,
                ReputationImpact: newX.ReputationImpact,
                CompanyGuid: newX.CompanyId,
                CreationDate: (newX.CreationDate) ? new Date(newX.CreationDate) : null,
                TakenDate: (newX.TakenDate) ? new Date(newX.TakenDate) : null,
                TotalCargoTransported: newX.TotalCargoTransported,
                TotalPaxTransported: newX.TotalPaxTransported,
                Category: newX.Category,
                State: newX.State,
                XP: newX.XP,
                SkillPoint: newX.SkillPoint,
                MinCompanyReput: newX.MinCompanyReput,
                RealPay: newX.RealPay,
                RealPenality: newX.RealPenality,
                CanAccess: newX.CanAccess,
                CanAccessDisplay: newX.CanAccessDisplay,
                IsLastMinute: newX.IsLastMinute,
                IsFavorited: newX.IsFavorited,
                World: {
                    connect: {
                        Guid: newX.WorldId
                    }
                },
                Company: {
                    connect: {
                        Guid: newX.CompanyId
                    }
                },
                MissionType: {
                    connectOrCreate: {
                        create: {
                            Guid: newX.MissionTypeId,
                            Name: newX.MissionType.Name,
                            ShortName: newX.MissionType.ShortName,
                            Description: newX.MissionType.Description,
                            BaseReputationImpact: newX.MissionType.BaseReputationImpact,
                            BasePayFactor: newX.MissionType.BasePayFactor,
                            BasePenalityFactor: newX.MissionType.BasePenalityFactor,
                        },
                        where: {
                            Guid: newX.MissionTypeId
                        }
                    }
                }
            },
        })
    },

    create: async (newX) => {
        if (!newX) return;

        return await prisma.job.create({
            data: newX,
        })
    },

    upsertCargo: async function upsertCargo (newX, JobId, CompanyId) {
        if (!newX || !JobId || !CompanyId) return reject('No cargo or job provided');

        
        const cargo = await prisma.cargo.upsert({
            where: {
                Guid: newX.Id
            },
            create: {
                Guid: newX.Id,
                CargoTypeGuid: newX.CargoTypeId,
                Distance: newX.Distance,
                Heading: newX.Heading,
                Description: newX.Description,
                HumanOnly: newX.HumanOnly,
                CompanyGuid: newX.CompanyId,
                InRecyclingPool: newX.InRecyclingPool,
                RaceValidated: newX.RaceValidated,
                IsInHangar: newX.IsInHangar,
                RescueValidated: newX.RescueValidated,
                RescueLate: newX.RescueLate,
                CompanyId: CompanyId,
                cargoType: {
                    connectOrCreate: {
                        create: {
                            Guid:newX.CargoType.Id,
                            Name:newX.CargoType.Name,
                            CargoTypeCategory:newX.CargoType.CargoTypeCategory,
                            MinLbs:newX.CargoType.MinLbs,
                            MaxLbs:newX.CargoType.MaxLbs,
                        },
                        where: {
                            Guid: newX.CargoType.Id
                        }
                    }
                },
                Job: {
                    connect: {
                        Id: JobId,
                    }
                },
                Company: {
                    connect: {
                        Id: CompanyId,
                    }
                },
                
                currentAircraft: (newX.CurrentAircraft) ? {
                    connectOrCreate: {
                        create: {
                            Guid: newX.CurrentAircraft.Id,
                            Identifier: newX.CurrentAircraft.Identifier,
                            Name: newX.CurrentAircraft.Name,
                            WorldGuid: newX.CurrentAircraft.WorldId,
                            CompanyGuid: newX.CurrentAircraft.CompanyId,
                            CurrentAirportGuid: newX.CurrentAircraft.CurrentAirportId,
                            AircraftStatus: newX.CurrentAircraft.AircraftStatus,
                            LastStatusChange: new Date (newX.CurrentAircraft.LastStatusChange),
                            AircraftTypeGuid: newX.CurrentAircraft.AircraftTypeId,
                            CurrentStatusDurationInMinutes: newX.CurrentAircraft.CurrentStatusDurationInMinutes,
                            AllowSell: newX.CurrentAircraft.AllowSell,
                            AllowRent: newX.CurrentAircraft.AllowRent,
                            AllowLease: newX.CurrentAircraft.AllowLease,
                            SellPrice: newX.CurrentAircraft.SellPrice,
                            RentHourPrice: newX.CurrentAircraft.RentHourPrice,
                            Heading: newX.CurrentAircraft.Heading,
                            Longitude: newX.CurrentAircraft.Longitude,
                            Latitude: newX.CurrentAircraft.Latitude,
                            FuelTotalGallons: newX.CurrentAircraft.FuelTotalGallons,
                            FuelWeight: newX.CurrentAircraft.FuelWeight,
                            Altitude: newX.CurrentAircraft.Altitude,
                            FlightState: newX.CurrentAircraft.FlightState,
                            LoadedWeight: newX.CurrentAircraft.LoadedWeight,
                            ZeroFuelWeight: newX.CurrentAircraft.ZeroFuelWeight,
                            AirframeHours: newX.CurrentAircraft.AirframeHours,
                            AirframeCondition: newX.CurrentAircraft.AirframeCondition,
                            AirframeMaxCondition: newX.CurrentAircraft.AirframeMaxCondition,
                            LastAnnualCheckup: new Date (newX.CurrentAircraft.LastAnnualCheckup),
                            Last100hInspection: new Date (newX.CurrentAircraft.Last100hInspection),
                            LastWeeklyOwnershipPayment: new Date (newX.CurrentAircraft.LastWeeklyOwnershipPayment),
                            LastParkingFeePayment: new Date (newX.CurrentAircraft.LastParkingFeePayment),
                            IsControlledByAI: newX.CurrentAircraft.IsControlledByAI,
                            HoursBefore100HInspection: newX.CurrentAircraft.HoursBefore100HInspection,
                            ConfigFirstSeats: newX.CurrentAircraft.ConfigFirstSeats,
                            ConfigBusSeats: newX.CurrentAircraft.ConfigBusSeats,
                            ConfigEcoSeats: newX.CurrentAircraft.ConfigEcoSeats,
                            SeatsReservedForEmployees: newX.CurrentAircraft.SeatsReservedForEmployees,
                            LastMagicTransportationDate: new Date (newX.CurrentAircraft.LastMagicTransportationDate),
                            CurrentCompanyGuid: newX.CurrentAircraft.CurrentCompanyGuid,
                            CurrentCompanyGuidIfAny: newX.CurrentAircraft.CurrentCompanyGuidIfAny,
                            ExtraWeightCapacity: newX.CurrentAircraft.ExtraWeightCapacity,
                            TotalWeightCapacity: newX.CurrentAircraft.TotalWeightCapacity,
                            CurrentSeats: newX.CurrentAircraft.CurrentSeats,
                            MustDoMaintenance: newX.CurrentAircraft.MustDoMaintenance,
                            // World: {
                            //     connect: {
                            //         Guid: newX.CurrentAircraft.WorldId,
                            //     }
                            // },
                            // Company: {
                            //     connect: {
                            //         Guid: newX.CurrentAircraft.CompanyId,
                            //     }
                            // },
                            // AircraftType: {
                            //     connectOrCreate: {
                            //         create: {
                            //             Guid: newX.CurrentAircraft.AircraftType.Id,
                            //             Name: newX.CurrentAircraft.AircraftType.Name,
                            //             CreationDate: new Date (newX.CurrentAircraft.AircraftType.CreationDate),
                            //             LastModerationDate: new Date (newX.CurrentAircraft.AircraftType.LastModerationDate),
                            //             DisplayName: newX.CurrentAircraft.AircraftType.DisplayName,
                            //             FlightsCount: newX.CurrentAircraft.AircraftType.FlightsCount,
                            //             TimeBetweenOverhaul: newX.CurrentAircraft.AircraftType.TimeBetweenOverhaul,
                            //             HightimeAirframe: newX.CurrentAircraft.AircraftType.HightimeAirframe,
                            //             AirportMinSize: newX.CurrentAircraft.AircraftType.AirportMinSize,
                            //             EmptyWeight: newX.CurrentAircraft.AircraftType.EmptyWeight,
                            //             MaximumGrossWeight: newX.CurrentAircraft.AircraftType.MaximumGrossWeight,
                            //             EstimatedCruiseFF: newX.CurrentAircraft.AircraftType.EstimatedCruiseFF,
                            //             Baseprice: newX.CurrentAircraft.AircraftType.Baseprice,
                            //             FuelTotalCapacityInGallons: newX.CurrentAircraft.AircraftType.FuelTotalCapacityInGallons,
                            //             EngineType: newX.CurrentAircraft.AircraftType.EngineType,
                            //             NumberOfEngines: newX.CurrentAircraft.AircraftType.NumberOfEngines,
                            //             Seats: newX.CurrentAircraft.AircraftType.Seats,
                            //             NeedsCopilot: newX.CurrentAircraft.AircraftType.NeedsCopilot,
                            //             FuelTypeId: newX.CurrentAircraft.AircraftType.FuelTypeId,
                            //             MaximumCargoWeight: newX.CurrentAircraft.AircraftType.MaximumCargoWeight,
                            //             MaximumRangeInHour: newX.CurrentAircraft.AircraftType.MaximumRangeInHour,
                            //             MaximumRangeInNM: newX.CurrentAircraft.AircraftType.MaximumRangeInNM,
                            //             DesignSpeedVS0: newX.CurrentAircraft.AircraftType.DesignSpeedVS0,
                            //             DesignSpeedVS1: newX.CurrentAircraft.AircraftType.DesignSpeedVS1,
                            //             DesignSpeedVC: newX.CurrentAircraft.AircraftType.DesignSpeedVC,
                            //             IsDisabled: newX.CurrentAircraft.AircraftType.IsDisabled,
                            //             LuxeFactor: newX.CurrentAircraft.AircraftType.LuxeFactor,
                            //             StandardSeatWeight: newX.CurrentAircraft.AircraftType.StandardSeatWeight,
                            //             IsFighter: newX.CurrentAircraft.AircraftType.IsFighter,
                            //             AircraftClass: (newX.CurrentAircraft.AircraftType.AircraftClass) ? {
                            //                 connectOrCreate: {
                            //                     create: {
                            //                         Guid: newX.CurrentAircraft.AircraftType.AircraftClass.Id,
                            //                         Name: newX.CurrentAircraft.AircraftType.AircraftClass.Name,
                            //                         ShortName: newX.CurrentAircraft.AircraftType.AircraftClass.ShortName,
                            //                         Order: newX.CurrentAircraft.AircraftType.AircraftClass.Order,
                            //                     },
                            //                     where: {
                            //                         Guid: newX.CurrentAircraft.AircraftType.AircraftClass.Id
                            //                     }
                            //                 }
                            //             } :undefined,
                            //             FuelType: {
                            //                 connect: {
                                             
                            //                     OnAirId: newX.CurrentAircraft.AircraftType.FuelType
                            //                 }
                            //             }
                            //         }
                            //     }
                            // }
                        }, 
                        where: {
                            Guid: newX.CurrentAircraft.Id
                        }
                    }
                } : undefined,
            },
            update: {
                CargoTypeGuid: newX.CargoTypeId,
                Distance: newX.Distance,
                Heading: newX.Heading,
                Description: newX.Description,
                HumanOnly: newX.HumanOnly,
                CompanyGuid: newX.CompanyId,
                InRecyclingPool: newX.InRecyclingPool,
                RaceValidated: newX.RaceValidated,
                IsInHangar: newX.IsInHangar,
                RescueValidated: newX.RescueValidated,
                RescueLate: newX.RescueLate,
                cargoType: {
                    connectOrCreate: {
                        create: {
                            Guid:newX.CargoType.Id,
                            Name:newX.CargoType.Name,
                            CargoTypeCategory:newX.CargoType.CargoTypeCategory,
                            MinLbs:newX.CargoType.MinLbs,
                            MaxLbs:newX.CargoType.MaxLbs,
                        },
                        where: {
                            Guid: newX.CargoType.Id
                        }
                    }
                },
                Job: {
                    connect: {
                        Id: JobId,
                    }
                },
                Company: {
                    connect: {
                        Id: CompanyId,
                    }
                },
                currentAircraft: (newX.CurrentAircraft) ? {
                    connectOrCreate: {
                        create: {
                            Guid: newX.CurrentAircraft.Id,
                            Identifier: newX.CurrentAircraft.Identifier,
                            Name: newX.CurrentAircraft.Name,
                            WorldGuid: newX.CurrentAircraft.WorldId,
                            CompanyGuid: newX.CurrentAircraft.CompanyId,
                            CurrentAirportGuid: newX.CurrentAircraft.CurrentAirportId,
                            AircraftStatus: newX.CurrentAircraft.AircraftStatus,
                            LastStatusChange: new Date (newX.CurrentAircraft.LastStatusChange),
                            AircraftTypeGuid: newX.CurrentAircraft.AircraftTypeId,
                            CurrentStatusDurationInMinutes: newX.CurrentAircraft.CurrentStatusDurationInMinutes,
                            AllowSell: newX.CurrentAircraft.AllowSell,
                            AllowRent: newX.CurrentAircraft.AllowRent,
                            AllowLease: newX.CurrentAircraft.AllowLease,
                            SellPrice: newX.CurrentAircraft.SellPrice,
                            RentHourPrice: newX.CurrentAircraft.RentHourPrice,
                            Heading: newX.CurrentAircraft.Heading,
                            Longitude: newX.CurrentAircraft.Longitude,
                            Latitude: newX.CurrentAircraft.Latitude,
                            FuelTotalGallons: newX.CurrentAircraft.FuelTotalGallons,
                            FuelWeight: newX.CurrentAircraft.FuelWeight,
                            Altitude: newX.CurrentAircraft.Altitude,
                            FlightState: newX.CurrentAircraft.FlightState,
                            LoadedWeight: newX.CurrentAircraft.LoadedWeight,
                            ZeroFuelWeight: newX.CurrentAircraft.ZeroFuelWeight,
                            AirframeHours: newX.CurrentAircraft.AirframeHours,
                            AirframeCondition: newX.CurrentAircraft.AirframeCondition,
                            AirframeMaxCondition: newX.CurrentAircraft.AirframeMaxCondition,
                            LastAnnualCheckup: new Date (newX.CurrentAircraft.LastAnnualCheckup),
                            Last100hInspection: new Date (newX.CurrentAircraft.Last100hInspection),
                            LastWeeklyOwnershipPayment: new Date (newX.CurrentAircraft.LastWeeklyOwnershipPayment),
                            LastParkingFeePayment: new Date (newX.CurrentAircraft.LastParkingFeePayment),
                            IsControlledByAI: newX.CurrentAircraft.IsControlledByAI,
                            HoursBefore100HInspection: newX.CurrentAircraft.HoursBefore100HInspection,
                            ConfigFirstSeats: newX.CurrentAircraft.ConfigFirstSeats,
                            ConfigBusSeats: newX.CurrentAircraft.ConfigBusSeats,
                            ConfigEcoSeats: newX.CurrentAircraft.ConfigEcoSeats,
                            SeatsReservedForEmployees: newX.CurrentAircraft.SeatsReservedForEmployees,
                            LastMagicTransportationDate: new Date (newX.CurrentAircraft.LastMagicTransportationDate),
                            CurrentCompanyGuid: newX.CurrentAircraft.CurrentCompanyGuid,
                            CurrentCompanyGuidIfAny: newX.CurrentAircraft.CurrentCompanyGuidIfAny,
                            ExtraWeightCapacity: newX.CurrentAircraft.ExtraWeightCapacity,
                            TotalWeightCapacity: newX.CurrentAircraft.TotalWeightCapacity,
                            CurrentSeats: newX.CurrentAircraft.CurrentSeats,
                            MustDoMaintenance: newX.CurrentAircraft.MustDoMaintenance,
                            World: {
                                connect: {
                                    Guid: newX.CurrentAircraft.WorldId,
                                }
                            },
                            Company: {
                                connect: {
                                    Guid: newX.CurrentAircraft.CompanyId,
                                }
                            },
                            // AircraftType: {
                            //     connectOrCreate: {
                            //         create: {
                            //             Guid: newX.CurrentAircraft.AircraftType.Id,
                            //             Name: newX.CurrentAircraft.AircraftType.Name,
                            //             CreationDate: new Date (newX.CurrentAircraft.AircraftType.CreationDate),
                            //             LastModerationDate: new Date (newX.CurrentAircraft.AircraftType.LastModerationDate),
                            //             DisplayName: newX.CurrentAircraft.AircraftType.DisplayName,
                            //             FlightsCount: newX.CurrentAircraft.AircraftType.FlightsCount,
                            //             TimeBetweenOverhaul: newX.CurrentAircraft.AircraftType.TimeBetweenOverhaul,
                            //             HightimeAirframe: newX.CurrentAircraft.AircraftType.HightimeAirframe,
                            //             AirportMinSize: newX.CurrentAircraft.AircraftType.AirportMinSize,
                            //             EmptyWeight: newX.CurrentAircraft.AircraftType.EmptyWeight,
                            //             MaximumGrossWeight: newX.CurrentAircraft.AircraftType.MaximumGrossWeight,
                            //             EstimatedCruiseFF: newX.CurrentAircraft.AircraftType.EstimatedCruiseFF,
                            //             Baseprice: newX.CurrentAircraft.AircraftType.Baseprice,
                            //             FuelTotalCapacityInGallons: newX.CurrentAircraft.AircraftType.FuelTotalCapacityInGallons,
                            //             EngineType: newX.CurrentAircraft.AircraftType.EngineType,
                            //             NumberOfEngines: newX.CurrentAircraft.AircraftType.NumberOfEngines,
                            //             Seats: newX.CurrentAircraft.AircraftType.Seats,
                            //             NeedsCopilot: newX.CurrentAircraft.AircraftType.NeedsCopilot,
                            //             FuelTypeId: newX.CurrentAircraft.AircraftType.FuelTypeId,
                            //             MaximumCargoWeight: newX.CurrentAircraft.AircraftType.MaximumCargoWeight,
                            //             MaximumRangeInHour: newX.CurrentAircraft.AircraftType.MaximumRangeInHour,
                            //             MaximumRangeInNM: newX.CurrentAircraft.AircraftType.MaximumRangeInNM,
                            //             DesignSpeedVS0: newX.CurrentAircraft.AircraftType.DesignSpeedVS0,
                            //             DesignSpeedVS1: newX.CurrentAircraft.AircraftType.DesignSpeedVS1,
                            //             DesignSpeedVC: newX.CurrentAircraft.AircraftType.DesignSpeedVC,
                            //             IsDisabled: newX.CurrentAircraft.AircraftType.IsDisabled,
                            //             LuxeFactor: newX.CurrentAircraft.AircraftType.LuxeFactor,
                            //             StandardSeatWeight: newX.CurrentAircraft.AircraftType.StandardSeatWeight,
                            //             IsFighter: newX.CurrentAircraft.AircraftType.IsFighter,
                            //             AircraftClass: (newX.CurrentAircraft.AircraftType.AircraftClass) ? {
                            //                 connectOrCreate: {
                            //                     create: {
                            //                         Guid: newX.CurrentAircraft.AircraftType.AircraftClass.Id,
                            //                         Name: newX.CurrentAircraft.AircraftType.AircraftClass.Name,
                            //                         ShortName: newX.CurrentAircraft.AircraftType.AircraftClass.ShortName,
                            //                         Order: newX.CurrentAircraft.AircraftType.AircraftClass.Order,
                            //                     },
                            //                     where: {
                            //                         Guid: newX.CurrentAircraft.AircraftType.AircraftClass.Id
                            //                     }
                            //                 }
                            //             } : undefined,
                            //             FuelType: {
                            //                 connect: {
                            //                     OnAirId: newX.CurrentAircraft.AircraftType.FuelType
                            //                 }
                            //             }
                            //         }
                            //     }
                            // }
                        }, 
                        where: {
                            Guid: newX.CurrentAircraft.Id
                        }
                    }
                } : undefined,
            },
        })

        return cargo
    },

    upsertCharter: async function upsertCharter (newX, Job) {
        if (!newX || !Job) return reject('No cargo or job provided');

        const JobId = Job.Id;
        const CompanyId = Job.CompanyId;
        
        const charter = await prisma.charter.upsert({
            where: {
                Guid: newX.Id
            },
            create: {
                Guid: newX.Id,
                CharterTypeGuid: newX.CharterTypeId,
                Distance: newX.Distance,
                Heading: newX.Heading,
                Description: newX.Description,
                HumanOnly: newX.HumanOnly,
                CompanyGuid: newX.CompanyId,
                InRecyclingPool: newX.InRecyclingPool,
                MinPAXSeatConf: newX.MinPAXSeatConf,
                BoardedPAXSeat: newX.BoardedPAXSeat,
                MinAircraftTypeLuxe: newX.MinAircraftTypeLuxe,
                RescueValidated: newX.RescueValidated,
                RescueLate: newX.RescueLate,
                CharterType: {
                    connectOrCreate: {
                        create: {
                            Guid:newX.CharterType.Id,
                            Name:newX.CharterType.Name,
                            CharterTypeCategory:newX.CharterType.CharterTypeCategory,
                            MinPAX:newX.CharterType.MinPAX,
                            MaxPAX:newX.CharterType.MaxPAX,
                        },
                        where: {
                            Guid: newX.CharterTypeId
                        }
                    }
                },
                Job: {
                    connect: {
                        Id: JobId,
                    }
                },
                Company: {
                    connect: {
                        Id: CompanyId,
                    }
                }
            },
            update: {
                Guid: newX.Id,
                CharterTypeGuid: newX.CharterTypeId,
                Distance: newX.Distance,
                Heading: newX.Heading,
                Description: newX.Description,
                HumanOnly: newX.HumanOnly,
                CompanyGuid: newX.CompanyId,
                InRecyclingPool: newX.InRecyclingPool,
                MinPAXSeatConf: newX.MinPAXSeatConf,
                BoardedPAXSeat: newX.BoardedPAXSeat,
                MinAircraftTypeLuxe: newX.MinAircraftTypeLuxe,
                RescueValidated: newX.RescueValidated,
                RescueLate: newX.RescueLate,
                CharterType: {
                    connectOrCreate: {
                        create: {
                            Guid:newX.CharterType.Id,
                            Name:newX.CharterType.Name,
                            CharterTypeCategory:newX.CharterType.CharterTypeCategory,
                            MinPAX:newX.CharterType.MinPAX,
                            MaxPAX:newX.CharterType.MaxPAX,
                        },
                        where: {
                            Guid: newX.CharterTypeId
                        }
                    }
                },
                Job: {
                    connect: {
                        Id: JobId,
                    }
                },
                Company: {
                    connect: {
                        Id: CompanyId,
                    }
                }
            },
        })

        return charter
    }
}
module.exports = JobRepo