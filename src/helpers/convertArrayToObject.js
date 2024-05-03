export default function convertArrayToObject(values, key) {
    const object = {};
    for (let i = 0; i < values.length; i++) {
        if (values[i]) {
            object[`${key}_${i}`] = values[i];
        }
    }
    return object;
}