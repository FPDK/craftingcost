import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import {API_BASE_URL, API_ROUTES} from "./ApiRoutes"
import {GetItemResponse} from "../types";
// Todo: check if "API_BASE_URL" is set and is valid url (and is https)

/**
 * Create an instance
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        //"X-Requested-With": "bo2",
    },
    crossDomain: true,
    //withCredentials: true,
    validateStatus: (status) => {
        return status >= 200 && status < 300 // `validateStatus` defines whether to resolve or reject the promise for a given HTTP response status code.
    },
} as AxiosRequestConfig)


/**
 * Validate the route to the API
 */
const validateRoute = (resource: string): boolean => {
    return true
    /*
    if (Object.values(API_ROUTES).indexOf(resource) < 0) {
        throw Error("Route \"" + resource + "\" is invalid.")
    }
    return true
    */
}


/**
 * Todo: Describe me..
 */
const get = (resource: string, params: Pick<AxiosRequestConfig, "params"> = {}) => {
    validateRoute(resource)
    return apiClient.get(resource, params)
}


/**
 * Generic POST request
 */
const post = (resource: string, params: object) => {
    validateRoute(resource)
    return apiClient.post(resource, params)
}


/**
 * Generic PUT request
 */
const put = (resource: string, entityId: number | string, payload: object) => {
    validateRoute(resource)
    return apiClient.request({
        url: resource + "/" + entityId,
        method: "put",
        data: payload,
        headers: {
            "Content-Type": "application/json", // "application/ld+json", "application/json", "text/html".
        },
    })
}


/**
 * Generic PATCH request
 * TODO: Simplify once this issue is fixed: https://github.com/axios/axios/issues/2623
 */
const patch = (resource: string, entityId: number | string, payload: object) => {
    validateRoute(resource)
    return apiClient.request({
        url: resource + "/" + entityId,
        method: "patch",
        data: payload,
        headers: {
            "Content-Type": "application/merge-patch+json",
        },
    })
}


/**
 * Delete a specific entity
 */
const deleteEntity = (resource: string, entityId: number | string) => {
    validateRoute(resource)
    return apiClient.delete(resource + "/" + entityId)
}


const handleNexusResponse = <R extends object = {}>(response: AxiosResponse<{
    error?: string
    reason?: string
}>): R => {

    if (response.status !== 200) {
        throw new Error(`${response.status} ${response.statusText}`)
    }

    if (response.data.error) {
        throw new Error(`${response.data.error}\n${response.data.reason}`)
    }

    return response.data as R

}


const getItem = async (itemNameOrId: string | number) => {

    const response = await apiClient
        .get(API_ROUTES.items + itemNameOrId);

    return handleNexusResponse<GetItemResponse>(response);
}


/**
 * API
 */
const Api = {
    client: apiClient,
    routes: API_ROUTES,
    operations: {
        get: get,
        post: post,
        put: put,
        patch: patch,
        delete: deleteEntity,

        getItem: getItem,

    },
}

export default Api
