import { APIError } from "../src/api/type";

// export function apiHasError(response: any): response is APIError {
//     return response?.reason;
// }
export function apiHasError(
    response: unknown | APIError
): APIError | undefined {
    const res = response as APIError;
    if (res?.reason) return res;
    return undefined;
}
