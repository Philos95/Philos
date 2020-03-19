class GAN{
    constructor(model){

        this.SEED_SIZE = 40;
        this.SEED_STD = 3.5;

        this.seed= this.getSeed(this.SEED_SIZE,this.SEED_STD);

        if(model){
            this.model =model;
        }else{
            this.model =this.setModel();
        }

        this.gLayer0=this.model.getLayer(null,0);
        this.gLayer1=this.model.getLayer(null,1);
        this.gLayer2=this.model.getLayer(null,2);


        this.dLayer0=this.model.getLayer(null,3);
        this.dLayer1=this.model.getLayer(null,4);
        this.dLayer2=this.model.getLayer(null,5);

        this.data = new Data(TOT_DATA);
 
    }


    getSeed(SEED_SIZE,SEED_STD){
        return tf.randomNormal([1, SEED_SIZE], 0, SEED_STD);
    }



    setModel(){

        //SET Model
        let model = tf.sequential();
 
        //Add First layer
        model.add(tf.layers.dense({
            inputShape: [this.SEED_SIZE], 
            units: 100,
            activation: 'relu'
        }));

        

        //Add Second layer
        model.add(tf.layers.dense({
            units: 100, 
            activation: 'relu'
        }));

        //Add Third layer
        model.add(tf.layers.dense({
            units: 4, 
            activation: 'sigmoid'
        }));

        //Add Forth layer
        model.add(tf.layers.dense({
            //inputShape: [4], 
            units: 100,
            activation: 'relu'
        }));

        //Add Fifth layer
        model.add(tf.layers.dense({
            units: 100, 
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

        return model;
    }







    async train(){

        

    }




    generate(){
        this.seed = this.getSeed(this.SEED_SIZE,this.SEED_STD);
        let results =this.model.evaluate(this.seed,tf.tensor2d([[0,1]]));
        return results;
    }




}