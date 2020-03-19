class Discriminator{
    
    constructor(){
        this.model =this.setModel();
        
        this.data=[];
        this.data_fake=[];
        this.sample=[];

        this.dLayer0=this.model.getLayer(null,0);
        this.dLayer1=this.model.getLayer(null,1);
        this.dLayer2=this.model.getLayer(null,2);

        
    }


    setModel(modelSet){
        let model
        if(modelSet){
            model =modelSet;
        }else{
           //SET Model
            model = tf.sequential();

            //Add hidden layer
            model.add(tf.layers.dense({
                inputShape: [4], 
                units: 100,
                activation: 'relu'
            }));

            //Add output layer
            model.add(tf.layers.dense({
                units: 80, 
                activation: 'relu'
            }));

        

            //Add output layer
            model.add(tf.layers.dense({
                units: 2, 
                activation: 'softmax'
            }));

            const sgdOpt = tf.train.sgd(0.5);

            model.compile({
                optimizer: sgdOpt,
            /*  loss:'meanSquaredError', */
                loss: tf.losses.softmaxCrossEntropy,
                metrics: ['accuracy']
            })
        }
        return model;
    }

    async setData(totData){
        this.data = await this.getData(totData,0);
        this.data_fake = await this.getData(totData,1);
        this.sample = await this.getData(1000,2)



        for (let i=0;i<this.data.length;i++) {
            this.data[i].fake = 0;
        }

        for (let i=0;i<this.data_fake.length;i++) {
            this.data_fake[i].fake = 1;
        }
        
  
        this.allData = shuffle(this.data.concat(this.data_fake));
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




    async train(){
        let xs;
        let ys;
 
        let colors = [];
        let labels = [];
        for (let record of this.allData) {
            let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255), labelToValue(record.color,labelList,this.sample)];
            colors.push(col);

            if(record.fake==1){
                labels.push([0,1]);
            }else if(record.fake==0){
                labels.push([1,0]);
            }
             
        }

        /* console.log(colors);
        console.log(labels); */
        xs = tf.tensor2d(colors);
        ys = tf.tensor2d(labels);

        xs.print();
        ys.print();


        const NUM_EPOCHS = 50;
        const tot_train = NUM_EPOCHS;
        let actual_train = -1;
        let steps=[3/4,1/2,1/4,1/8];
        let i_steps =0;


        const config={
            shuffle:true,
            epochs:NUM_EPOCHS,
            validationSplit:0.1,
            batchSize:512,
            callbacks:{
                onEpochBegin:(epochs,logs)=>{
                    if(actual_train>=(tot_train-(tot_train*steps[i_steps]))){
                        this.model.optimizer.setLearningRate(this.model.optimizer.learningRate/2);
                        i_steps++;
                        console.log("LR: "+this.model.optimizer.learningRate);
                    }
                    actual_train++;
                   
                },
                onEpochEnd:(epochs,logs)=>{
                    console.log("E: "+epochs+" L: "+logs.loss.toFixed(5));
              
                },
                onBatchEnd: async (batch, logs) => {
                    await tf.nextFrame();
                }
            }
        }

       let response = await this.model.fit(xs,ys,config); 
       console.log("response:");
       console.log(response);

       return response;
    }


    async trainSingleBatch(batchSize){


        let xs;
        let ys;
        
 
        let colors = [];
        let labels = [];
        for (let i=0;i<batchSize; i++ ) {
            let record = this.allData[i];

            let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255), labelToValue(record.color,labelList,this.sample)];
            colors.push(col);

            if(record.fake==1){
                labels.push([0,1]);
            }else if(record.fake==0){
                labels.push([1,0]);
            }
             
        }

        

        /* console.log(colors);
        console.log(labels); */
        xs = tf.tensor2d(colors);
        ys = tf.tensor2d(labels);

        let response = this.model.trainOnBatch(xs,ys);
        /* console.log("response:");
        console.log(response);
 */
        return response;



    }

    discriminate(color,data){
        let input = data;
         if(color){
            let input_array = [parseFloat(color.r/255),parseFloat(color.g/255),parseFloat(color.b/255),labelToValue(color.name,labelList,this.sample)];
    
            input = tf.tensor2d([input_array.flat()]);
        }

        let results =this.model.predict(input);
        /* let yes = results.dataSync()[0];
        let no = results.dataSync()[1]; */
      
        
        let response = [results.dataSync()[0],results.dataSync()[1]];
    
        return response;

    }

}