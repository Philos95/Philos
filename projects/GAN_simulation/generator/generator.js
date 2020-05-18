class Generator{
    
    constructor(){
        this.SEED_SIZE = 40;
        this.SEED_STD = 3.5;
        this.batch = 40;

        this.seed= this.getSeed(this.SEED_SIZE,this.SEED_STD);


       
        this.setModel();
        

        this.gLayer0=this.model.getLayer(null,0);
        this.gLayer1=this.model.getLayer(null,1);
        this.gLayer2=this.model.getLayer(null,2);

        
        
    }

    getSeed(SEED_SIZE,SEED_STD,BATCH){
        let b=1;
        if(BATCH){b=BATCH}
        
         return tf.randomNormal([b, SEED_SIZE], 0, SEED_STD);
    }


    setModel(modelSet){
       //SET Model
        let  model = tf.sequential();
        if(modelSet){
            model.add(modelSet.getLayer(null,0));
            model.add(modelSet.getLayer(null,1));
            model.add(modelSet.getLayer(null,2));
        }else{
            
           

            //Add hidden layer
            model.add(tf.layers.dense({
                inputShape: [this.SEED_SIZE], 
                units: 120,
                activation: 'relu'
            }));

            //Add hidden layer
            model.add(tf.layers.dense({
                units: 90, 
                activation: 'relu'
            }));

            //Add output layer
            model.add(tf.layers.dense({
                units: 4, 
                activation: 'sigmoid'
            }));
        }
        const sgdOpt = tf.train.sgd(0.025);

        model.compile({
            optimizer: sgdOpt,
        /*  loss:'meanSquaredError', */
            loss: tf.losses.softmaxCrossEntropy,
            metrics: ['accuracy']
        })
        
        this.model = model;

        
    }



    generate(){
        
        this.seed = this.getSeed(this.SEED_SIZE,this.SEED_STD);
        let results =this.model.predict(this.seed);

        let response = [results.dataSync()[0],results.dataSync()[1],results.dataSync()[2],results.dataSync()[3]];
    
        return response;
    }

}