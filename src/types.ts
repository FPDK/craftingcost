export type GetItemResponse = {
    server: string
    itemId: number
    name: string
    uniqueName: string
    icon: string
    tags: string[],
    requiredLevel: number
    itemLevel: number
    sellPrice: number
    vendorPrice: number | null
    itemLink: string
    tooltip: {
        label: string
        format?: string
    }[],
    stats: {
        lastUpdated?: string
        current: {
            historicalValue: number
            marketValue: number
            minBuyout: number
            numAuctions: number
            quantity: number
        },
        previous: Object
    }
}

export enum Professions {
    "ALCHEMY" = "ALCHEMY",
    "BLACKSMITHING" = "BLACKSMITHING",
    "ENCHANTING" = "ENCHANTING",
    "ENGINEERING" = "ENGINEERING",
    "HERBALISM" = "HERBALISM",
    "JEWELCRAFTING" = "JEWELCRAFTING",
    "LEATHERWORKING" = "LEATHERWORKING",
    "MINING" = "MINING",
    "SKINNING" = "SKINNING",
    "TAILORING" = "TAILORING",
}

export type DbItemReagent = {
    id: number
    href: string
    name: string
    quantity: number
    img: string
    historicalMarketValue?: number
    marketValue?: number
    marketQuantity?: number
    expectedCost?: number
}

export type DbItem = {
    name: string
    type: string
    reagents: DbItemReagent[]
}

export type CalculatedItem = {
    dbItem: DbItem,
    priceItem: GetItemResponse
}