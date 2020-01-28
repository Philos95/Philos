class Matrix{
    constructor(rows,cols){
        this.rows=rows;
        this.cols=cols;
        this.data = [];

        for(var i =0;i<this.rows;i++){
            this.data[i]=[]
            for( var j=0;j<this.cols;j++){
                this.data[i][j]=0;
            }
        }

    }


    copy() {
        let m = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            m.data[i][j] = this.data[i][j];
          }
        }
        return m;
    }



    randomize(){
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                this.data[i][j] = Math.random()*2 - 1;
            }
        }

    }

    static transpose(matrix){
        let result = new Matrix (matrix.cols,matrix.rows)

        for(var i=0;i<matrix.rows;i++){
            for(var j=0;j<matrix.cols;j++){
                result.data[j][i] = matrix.data[i][j];
            }
        }
        return result;
    }

    add(n){
        if(n instanceof Matrix){
            for(var i=0;i<this.rows;i++){
                for(var j=0;j<this.cols;j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        }else{
            for(var i=0;i<this.rows;i++){
                for(var j=0;j<this.cols;j++){
                    this.data[i][j] += n;
                }
            }
        }

    }

    static subtract(a,b){
        let result = new Matrix(a.rows,a.cols);
        
        for(var i=0;i<result.rows;i++){
            for(var j=0;j<result.cols;j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    static fromArray(arr){
        let m = new Matrix(arr.length,1);
        for(var i =0; i<arr.length;i++){
            m.data[i][0]=arr[i];
        }
        return m;
    }

    toArray(){
        let arr =[];
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                arr.push(this.data[i][j]);
            }
        }
        return arr;

    }

    static multiply(a,b){
        //MatrixProduct
        if(a.cols!==b.rows){
            console.log("Columns of A must match rows of B");
            return undefined;
        }
        let result = new Matrix(a.rows,b.cols);

        for(var i=0;i<result.rows;i++){
            for(var j=0;j<result.cols;j++){
                let sum =0;
                for( var k =0;k<a.cols;k++){
                    sum+= a.data[i][k] * b.data[k][j];
                }
                result.data[i][j]=sum;
            }
        }
        return result;
    }

    multiply(n){
        if(n instanceof Matrix){
            for(var i=0;i<this.rows;i++){
                for(var j=0;j<this.cols;j++){
                    this.data[i][j] *= n.data[i][j];
                }
            }
        }else{
            //ScalarProduct
            for(var i=0;i<this.rows;i++){
                for(var j=0;j<this.cols;j++){
                    this.data[i][j] *= n;
                }
            }
        }

    }

    map(func){
        //Apply func Function to every element of the array
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    static map(matrix,func){
        let result = new Matrix(matrix.rows,matrix.cols);
        //Apply func Function to every element of the array
        for(var i=0;i<matrix.rows;i++){
            for(var j=0;j<matrix.cols;j++){
                let val = matrix.data[i][j];
                result.data[i][j] = func(val);
            }
        }
        return result;
    }

    print(){
        console.table(this.data);
    }
}