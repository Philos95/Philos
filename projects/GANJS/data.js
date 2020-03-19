class Data{
    constructor(totData){
        this.totData = totData;
        this.shuffledTrainIndex = 0;
        this.data=[];
        this.sample=[];
    }


    async load(){

        this.data = await this.get(this.totData,0);

        this.data = shuffle(this.data);
        this.sample = await this.get(1000,2)
        /* this.data_fake = await this.getData(totData,1);
       */


        // Create shuffled indices into the train/test set for when we select a
        // random dataset element for training / validation.
       /*  this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
        this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS); */
    }



     //GET Data
     async  get(totData,fake){

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

    

      nextTrainBatch(batchSize,index){
        /* if(this.data.length===0){ 
            let xs =tf.variable(tf.tensor([1, 2, 3]));
            let labels = tf.variable(tf.tensor([1])) 
            return {xs,labels } 
        } */
        let count = 0;
       
        
        let colorsArray = [];
        let labelsArray = [];


        for(let i =0;i<batchSize;i++){
            let record =this.data[Math.floor(Math.random()*this.data.length)];
            let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255), labelToValue(record.color,labelList,this.sample)];
            colorsArray.push(col);

            labelsArray.push([parseFloat(labelToValue(record.color,labelList,this.sample))]);
            //labelsArray.push(labelToArray(record.color));
         
         
            count++;
        }

        /* for (let record of this.data) {
            if(batchSize===0){break;}
            let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255)];
            colorsArray.push(col);

            labelsArray.push([parseFloat(labelToValue(record.color,labelList,this.sample))]);
            //labelsArray.push(labelToArray(record.color));
         
            batchSize--;
            count++;
        }

        this.data.splice(0,count); */
        let xs = tf.tensor2d(colorsArray);
        let labels = tf.tensor2d(labelsArray);

        return{xs,labels};

  
    }

}