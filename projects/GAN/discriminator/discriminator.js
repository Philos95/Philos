class Discriminator{
    
    constructor(){
        this.model =this.setModel();

        this.data=[];
    }





    setModel(){

        //SET Model
        let model = tf.sequential();

        //Add hidden layer
        model.add(tf.layers.dense({
            inputShape: [15], 
            units: 5,
            activation: 'sigmoid'
        }));


        //Add output layer
        model.add(tf.layers.dense({
            units: 2, 
            activation: 'softmax'
        }));

        const sgdOpt = tf.train.sgd(0.25);

        model.compile({
            optimizer: sgdOpt,
            loss:'meanSquaredError',
           /*  loss: 'categoricalCrossentropy', */
            metrics: ['accuracy']
        })

        return model;
    }

    async setData(totData){
        this.data = await this.getData(totData);
    }


    //GET Data
    async  getData(totData){
   
        const colorsDataReq = await fetch('../dataFromDB.php?action=takeData&limit='+totData);  
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




    async train(inputs){
        let xs;
        let ys;

        let colors=[];
        //console.log(inputs); 
        if(!inputs){
            //console.log("non ci sono");
           
            let record = this.data[Math.floor(Math.random()*this.data.length)];

            let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255), labelToArray(record.color)];
            colors.push(col.flat());

            xs = tf.tensor2d(colors);

            //Colore Vero
            ys = tf.tensor2d([[1,0]]);

        }else{
            //console.log(inputs);
            xs = tf.tensor2d(inputs);

            //Colore Finto
            ys = tf.tensor2d([[0,1]]); 
        } 
            
/* 
        xs.print();
        ys.print(); */
 
        const config={
            shuffle:true,
            epochs:2,
            validationSplit:0.1,
        }
        
        await this.model.fit(xs,ys,config);

    }
    
    
    discriminate(color){

        let input_array = [parseFloat(color.r/255),parseFloat(color.g/255),parseFloat(color.b/255),labelToArray(color.name)];
    
        let input = tf.tensor2d([input_array.flat()]);
        //input.print();
        let results =this.model.predict(input);
        /* let yes = results.dataSync()[0];
        let no = results.dataSync()[1]; */
      
        
        let response = [results.dataSync()[0],results.dataSync()[1]];
    
        return response;

    }

}