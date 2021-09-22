import {enchanting} from "./enchanting";
import {DbItem, Professions} from "../types";

const itemDatabase: Record<Professions, DbItem[]> = {
    ALCHEMY: [],
    BLACKSMITHING: [],
    ENCHANTING: enchanting,
    ENGINEERING: [],
    HERBALISM: [],
    JEWELCRAFTING: [],
    LEATHERWORKING: [],
    MINING: [],
    SKINNING: [],
    TAILORING: [],
}

export default itemDatabase