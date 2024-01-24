export function validate(type: string, value: string): boolean {
    if (type === "first_name" || type === "second_name") {
        const regexp = /^[A-ZА-ЯЁ]+([A-Za-zА-яЁа-яё-]+)*$/u;
        const isNorm = regexp.test(value);
        return isNorm;
    }
    if (type === "login") {
        const regexp = /(?=^.{3,20}$)(\w*[a-zA-Z-_]\w*)/;
        const isNorm = regexp.test(value);
        return isNorm;
    }
    if (type === "email") {
        const regexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/u;
        const isNorm = regexp.test(value);
        return isNorm;
    }
    if (type === "password" || type === "newPassword") {
        const regexp = /(?=^.{8,40}$)(?=.*\d)(?=.*[A-ZА-ЯЁ])/;
        const isNorm = regexp.test(value);
        return isNorm;
    }

    if (type === "phone") {
        const regexp = /(?=^.{10,15}$)(^\+?\d+$)/;
        const isNorm = regexp.test(value);
        return isNorm;
    }
    return true;
}
