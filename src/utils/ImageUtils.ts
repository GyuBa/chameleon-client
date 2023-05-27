export class ImageUtils {
    static getImageInfo(url: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            let image = document.createElement('img');
            image.src = url;
            image.onload = function () {
                resolve(image);
            }
        })
    }
}