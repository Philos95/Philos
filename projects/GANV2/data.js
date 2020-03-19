class Data{
    constructor(totData){
        this.totData = totData;
        this.real=[];
        this.fake=[];
        this.sample=[];
    }


    async load(){

        this.real = await this.getData(this.totData,0);
        this.fake = await this.getData(this.totData,1);
        this.sample = await this.getData(1000,2)


        for (let i=0;i<this.real.length;i++) {
            this.real[i].fake = 0;
        }

        for (let i=0;i<this.fake.length;i++) {
            this.fake[i].fake = 1;
        }
        
  
        this.allData = shuffle(this.real.concat(this.fake));
    }


    //GET Data
    async  getData(totData,fake){

        let ws;
        if(fake==0){
            ws = '/philos/webservices/dataFromDB.php?action=takeData&fake=0&limit='+totData;
        }else if(fake==1){
            ws = '/philos/webservices/dataFromDB.php?action=takeData&fake=1&limit='+totData;
        }else if(fake==2){
            ws = '/philos/webservices/dataFromDB.php?action=takeSample&limit='+totData;
        }
   
        const colorsDataReq = await fetch(ws);  
        const colorsData = await colorsDataReq.json();  
        const cleaned = colorsData.map(colorS => ({
            R: colorS.R,
            G: colorS.G,
            B: colorS.B,
            color:colorS.color,
        }))
        .filter(colorS => (colorS.R != null && colorS.G != null && colorS.B != null && colorS.color != null));
        
        return cleaned;
    }

    

     

}