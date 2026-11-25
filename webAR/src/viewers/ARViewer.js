export class ARViewer {
    constructor(modelId, buttonId) {
        this.arModel = document.getElementById(modelId);
        this.openArButton = document.getElementById(buttonId);

        this.arModel.addEventListener("load", () => {
            const dimensions = this.arModel.getDimensions();
            const modelHeight = dimensions.y;

            if (modelHeight <= 0) return;

            const scaleFactor = 0.3 / modelHeight;

            this.arModel.scale = [
                scaleFactor,
                scaleFactor,
                scaleFactor
            ];
        });


        this.openArButton.addEventListener('click',async() => {
            try{
                await this.arModel.activateAR();
            }catch(error){
                console.error("AR konnte nicht gestartet werden:", error);
            }


        });
    }
    setModel(path) {
        this.openArButton.hidden = false;
        this.arModel.scale = [1, 1, 1];
        this.arModel.src = path;
    }
    disable(){
        this.openArButton.hidden = true;
        this.arModel.removeAttribute("src");
    }
}
