<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>
 <link rel="stylesheet" href="rgb_upload.css">
    <br><br>

    <div class="row">
        <div class ="col-md-6"> 
            <label for="fileJS">Model Json</label>
        </div>
        
        <div class ="col-md-6">
            <label for="fileWE">Model's Weights</label>    
        </div>
    </div>
    
    <div class="row">
        <div class ="col-md-6"> 

            <div id="json-dropzone-wrapper">
                <form action="/file-upload" class="dropzone needsclick dz-clickable" id="dropzoneJson" method="post">
                    <div class="fallback" id="fallback">
                        <input name="fileJS" type="file" multiple />
                    </div>
                </form>
            </div>

            <div id = "json-file-wrapper" style="display: none;" >
                <div class="row">
                    <div class="col-md-6">
                        <div class="file-container"><span class="file-container-span"> model.json</span></div>
                    </div>
                    <div class="col-md-6">
                        <div class="remove-container"><center> <span data-type="json"  class="remove-file-span"> <img class="img-remove-file" src="/philos/img/ico_cancella.gif" height="14" width="14" alt="Remove" title="Remove"> </span></center></div>  
                    </div>
                </div> 
            </div>  
        </div>
        <div class ="col-md-6">

            <div id="weights-dropzone-wrapper">
                <form action="/file-upload" class="dropzone needsclick dz-clickable" id="dropzoneWeights" method="post">
                    <div class="fallback" id="fallback">
                        <input name="fileWE" type="file" multiple />
                    </div>
                </form>
            </div>

            <div id = "weights-file-wrapper" style="display: none;" >
                <div class="row">
                    <div class="col-md-6">
                        <div class="file-container"><span class="file-container-span">model.weights.bin</span> </div>
                    </div>
                    <div class="col-md-6">
                        <div class="remove-container"> <center> <span data-type="weights" class="remove-file-span"><img class="img-remove-file" src="/philos/img/ico_cancella.gif" height="14" width="14" alt="Remove" title="Remove"> </span></center></div>  
                    </div>
                </div>             
            </div>  

        </div>
    </div>

    <br><br>

    <div class="row">
        <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="playButton" disabled>Play</button>
        </div>
    
    </div>

    
 
    

   


<?php
    include($include_root."/body_bottom.php");
  
?>

<script>

//DROPZONE :
Dropzone.autoDiscover = false;

var dropzoneJson = DropZone("dropzoneJson",".json","json");
var dropzoneWeights = DropZone("dropzoneWeights",".bin","weights");

function DropZone(idDrop,accepted,type){
    
    var dropzoneObj= new Dropzone(
        //id of drop zone element 1
        '#'+idDrop,
        {
            url: "fileManagement.php?action=upload&type="+type,
            init: function() {
                this.on("success", function(file,response) {  
                    //showFiles(file,type);
                    checkFiles();
                    console.log("miao");
                    that = this;
                    setTimeout(function(){
                        that.removeFile(file); 
                    }, 100);
                });
                this.on("error", function(file) {  
                    that = this;
                    setTimeout(function(){
                        that.removeFile(file); 
                    }, 2000);
                });
            }, 
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 256, // MB
        addRemoveLinks: false,
        dictDefaultMessage: "Drop files here to upload",
        dictRemoveFile: "Remove the File" ,
        dictCancelUpload: "Stop the upload",
        dictCancelUploadConfirmation : "Are you sure to interrupt?",
        dictInvalidFileType : "File not supported",
        acceptedFiles: accepted  
        }
    );
    return dropzoneObj
}

$(".remove-file-span").on("click",function(){
    var fileType = $(this).data("type");


    $.ajax({
        async: false,
        type:'POST',
        url: 'fileManagement.php?action=delete',
        data:{
            type:fileType
        }
    }).done(function( result ) {
        if(result =="1"){
            console.log("File "+fileType+" deleted");
            $("#"+fileType+"-dropzone-wrapper").show();
            $("#"+fileType+"-file-wrapper").hide();
           
            checkFiles();

        }else{
            console.log(result);
        }
             
    });
    
});

checkFiles();



async function checkFiles(){
    fileJson = await getFile("json");
    fileWeights = await getFile("weights");
    var isFileJson = showFiles(fileJson,"json");
    var isFileWeights = showFiles(fileWeights,"weights");

    if(isFileJson && isFileWeights){
       $("#playButton").prop('disabled', false);
    }else{
        $("#playButton").prop('disabled', true);
    }
    
    
}

function showFiles(file, type){
    var isFile=false;
    if(file!=""){

        $("#"+type+"-dropzone-wrapper").hide();
        $("#"+type+"-file-wrapper").show();

        isFile=true;

    }else{
        console.log("nessun "+type);
    }

    return isFile;

}

function getFile(fileType){
    var fileName="";

    $.ajax({
        async: false,
        type:'POST',
        url: 'fileManagement.php?action=fetch',
        data:{
            type:fileType
        }
    }).done(function( file ) {
            if(file){
                fileName=file;
            }  
    });
    return fileName;

}



$("#playButton").on("click",function(){
    window.location.replace("/philos/projects/nn/nn_rgb/nn_rgb_tf/load/rgb_load.php");
});
</script>




<?php
    include($include_root."/footer.php");
  
?>