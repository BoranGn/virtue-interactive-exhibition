export class ARViewer {
    constructor(modelId, buttonId) {
        this.arModel = document.getElementById(modelId);
        this.openArButton = document.getElementById(buttonId);

        this.openArButton.disabled = true;

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
        this.arModel.src = path;
    }
    disable(){
        this.openArButton.hidden = true;
        this.arModel.removeAttribute("src");
    }
}
