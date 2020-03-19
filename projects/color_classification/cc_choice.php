<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <!-- First Row -->
    <div class="row">
        <div class="col-md-3"></div>

        <div class="col-md-3"></div>

        <div class="col-md-3">
            <label for="">Data</label>
        </div>

        <div class="col-md-2">
            <input type="number" class="form-control" id="data">
        </div>
        <div class="col-md-1">
            <small>x12</small>
        </div>
    </div>

    <!-- Second Row -->
    <div class="row">
        <div class="col-md-3">
            <button type="button" class="btn btn-primary" id="upload">Upload a model</button>
        </div>

        <div class="col-md-3">
            <button type="button" class="btn btn-secondary" id="train">Train a model</button>
        </div>

        <div class="col-md-3">
            <label for="">Train <small>(Training loops)</small></label>
        </div>

        <div class="col-md-2">
            <input type="number" class="form-control" id ="trainInput">
        </div>
    
    </div>

    <!-- Third Row -->
    <div class="row">
        <div class="col-md-3"></div>

        <div class="col-md-3"></div>

        <div class="col-md-3">
            <label for="">Epochs</label>
        </div>

        <div class="col-md-2">
            <input type="number" class="form-control" id ="epochs"> 
        </div>
    </div>

    <!-- Forth Row -->
    <div class="row">
        <div class="col-md-3"></div>

        <div class="col-md-3"></div>

        <div class="col-md-3">
            <label for="">LR at Start</label>
        </div>

        <div class="col-md-2">
            <input type="number" class="form-control" id ="learningRate"> 
        </div>
    </div>
    
    

   


<?php
    include($include_root."/body_bottom.php");
  
?>

<script>

    $.ajax({
        async: false,
        type:'POST',
        url: 'choiceDTE.php?actions=fillInput',
     
    }).done(function( result ) {
        let inputs = JSON.parse(result);
        $("#data").val(inputs.data);
        $("#trainInput").val(inputs.train);
        $("#epochs").val(inputs.epochs);
        $("#learningRate").val(inputs.lr);
    });






$("#train").on("click",function(){
    $.ajax({
        async: false,
        type:'POST',
        url: 'choiceDTE.php?actions=upload',
        data:{
            data :$("#data").val(),
            train :$("#trainInput").val(),
            epochs:$("#epochs").val(),
            lr:$("#learningRate").val()
        }
    }).done(function( result ) {
        if(result=="1"){
            window.location.replace("train/cc_train.php?data="+$("#data").val()+
                                    "&train="+$("#trainInput").val()+
                                    "&epochs="+$("#epochs").val()+
                                    "&lr="+$("#learningRate").val());
        }
        else{
            console.log(result);
        }
    });
    
});

$("#upload").on("click",function(){
    window.location.replace("upload/cc_upload.php");
})


   

</script>




<?php
    include($include_root."/footer.php");
  
?>