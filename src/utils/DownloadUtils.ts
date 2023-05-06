export class DownloadUtils {
    static download(dataURL: string, fileName: string) {
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = fileName;
        link.click();
    }
}
