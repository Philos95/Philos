class NeuralNetwork{

    constructor(numI,numH,numO){

        if (numI instanceof NeuralNetwork) {
            let a = numI;
            this.input_nodes = a.input_nodes;
            this.hidden_nodes = a.hidden_nodes;
            this.output_nodes = a.output_nodes;
      
            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();
      
            this.bias_h = a.bias_h.copy();
            this.bias_o = a.bias_o.copy();
        } else {
            this.input_nodes=numI;
            this.hidden_nodes=numH;
            this.output_nodes=numO;

            this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes);
            this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes);
            this.weights_ih.randomize();
            this.weights_ho.randomize();

            this.bias_h= new Matrix(this.hidden_nodes,1);
            this.bias_o= new Matrix(this.output_nodes,1);
            this.bias_h.randomize();
            this.bias_o.randomize();
            this.setLearningRate();
        }
    }


    predict(input_array){
        //MATRIX MATH HERE!!!

        //Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih,inputs);
        hidden.add(this.bias_h);
        //activation function
        hidden.map(sigmoid);

        //Generating the Output's Output
        let output = Matrix.multiply(this.weights_ho,hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        //Sending Back to the caller
        return output.toArray();
    }

    setLearningRate(learning_rate = 0.1) {
        this.learning_rate = learning_rate;
    }

    train(input_array, target_array){
        //Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih,inputs);
        hidden.add(this.bias_h);
        //activation function
        hidden.map(sigmoid);

        //Generating the Output's Output
        let outputs = Matrix.multiply(this.weights_ho,hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);


        //Converting Array to Matrix objects
        let targets = Matrix.fromArray(target_array);

        //Calculate the error
        let output_errors = Matrix.subtract(targets,outputs);


        //calculate Gradient
        let gradients = Matrix.map(outputs,dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);


        //Calculate hidden->output Deltas
        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients,hidden_T);
        

        //Adjust the weights with deltas
        this.weights_ho.add(weights_ho_deltas);
        //Adjust the bias with deltas (which is just the gradient)
        this.bias_o.add(gradients);

        //Calculate the hidden layer errors
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t,output_errors);

        //Calculate hidden gradient
        let hidden_gradients = Matrix.map(hidden,dsigmoid);
        hidden_gradients.multiply(hidden_errors);
        hidden_gradients.multiply(this.learning_rate);

        //calculate input->hidden deltas
        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradients,inputs_T);

        //Adjust the weights with deltas
        this.weights_ih.add(weights_ih_deltas);
        //Adjust the bias with deltas (which is just the gradient)
        this.bias_h.add(hidden_gradients);


    }


    // Adding function for neuro-evolution
    copy() {
        return new NeuralNetwork(this);
    }

    // Accept an arbitrary function for mutation
    mutate(func) {
        this.weights_ih.map(func);
        this.weights_ho.map(func);
        this.bias_h.map(func);
        this.bias_o.map(func);
    }

}

function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
    return y * (1-y);
}