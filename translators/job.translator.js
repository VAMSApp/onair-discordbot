module.exports = async function (x, opts) {
    if (!x) return;
    if (!opts) opts = {};

    const translated = {
        Guid: x.Id,
        WorldGuid: x.WorldId,
        MissionTypeGuid: x.MissionTypeId,
        MissionType: {
            Guid: x.MissionType.Id,
            Name: x.MissionType.Name,
            ShortName: x.MissionType.ShortName,
            Description: x.MissionType.Description,
            BaseReputationImpact: x.MissionType.BaseReputationImpact,
            BasePayFactor: x.MissionType.BasePayFactor,
            BasePenalityFactor: x.MissionType.BasePenalityFactor,
        },
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

    if (opts.lookup) {
        if (opts.lookup.world) {
            translated.World = await WorldRepo.findByGuid(translated.WorldGuid);
        }

        if (opts.lookup.company) {
            translated.Company = await CompanyRepo.findByGuid(translated.CompanyGuid);
        }
    }

    return translated
}