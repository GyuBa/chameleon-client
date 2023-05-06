export class DataUtils {
    public static restoreTimeProperty(object: any) {
        for (const key in object) {
            if (object[key] && typeof object[key] === 'object') {
                this.restoreTimeProperty(object[key]);
            } else if (typeof object[key] === 'string' && (key.toLowerCase().endsWith('date') || key.toLowerCase().endsWith('time'))) {
                object[key] = new Date(object[key]);
            }
        }
    }
}