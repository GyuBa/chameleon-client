export class DownloadUtils {
    static download(dataURL: string, fileName: string) {
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = fileName;
        link.click();
    }
    static imageToBlob = async (url: string) => {
        return new Promise<Blob>((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        });
    };

    static videoToBlob = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    };

    static createObjectURLFromBlob = async (blob : Blob) => {
        const url = window.URL.createObjectURL(blob);
        return url
    };

    static computeFileSize = async (blob : Blob) => {
        const rawSize = blob.size
        return rawSize
    }
}
