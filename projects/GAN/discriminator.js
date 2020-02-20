class Discriminator{
    constructor(){
        this.model =this.setModel();
    }



    setModel(){

        //SET Model
        let model = tf.sequential();

        //Add hidden layer
        model.add(tf.layers.dense({
            inputShape: [18], 
            units: 10,
            activation: 'sigmoid'
        }));

        //Add hidden layer
        model.add(tf.layers.dense({units: 8, activation: 'sigmoid'}));

        //Add output layer
        model.add(tf.layers.dense({
            units: 1, 
            activation: 'sigmoid'
        }));

        const sgdOpt = tf.train.sgd(0.25);

        model.compile({
            optimizer: sgdOpt,
            //loss:'meanSquaredError',
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        })

        return model;
    }




    async train(){

        const config={
            shuffle:true,
            epochs:2,
            validationSplit:0.1,
        }
        
        await model.fit(xs,ys,config);

        
    }
    

}