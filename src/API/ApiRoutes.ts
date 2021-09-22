const apiServer = "https://api.nexushub.co"

export const API_BASE_URL = apiServer
export const API_WOW = apiServer + "/wow-classic/v1"
export const WOW_SERVER = "firemaw-alliance"

export const API_ROUTES = {

    // Root route
    root: "/",

    // ...
    //https://api.nexushub.co/wow-classic/v1/crafting/:server/deals
    //https://api.nexushub.co/wow-classic/v1/crafting/:server?/:item
    //https://api.nexushub.co/wow-classic/v1/crafting/professions


    //Get basic item stats.
    //https://api.nexushub.co/wow-classic/v1/items/:server/:item
    items: `${API_WOW}/items/${WOW_SERVER}/`,


}