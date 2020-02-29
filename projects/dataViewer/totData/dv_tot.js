const labelList = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink", 
    "azure",
    "orange",
    "purple",
    "brown",
    "grey",
    "black",
    "white"  
];
let data
var ctx = document.getElementById('myChart').getContext('2d');

let chart =  doChart();

function getData(){
    let DB_data=[];

    $.ajax({
        method: "POST",
        async:  false,
        url: "../colorFromDB.php?action=countColors"
    }).done(function( result ) {
        dataJSON = JSON.parse(result);
        console.log(dataJSON);
        DB_data =dataJSON;
    });
    return DB_data;

}


async function doChart(){
    data = await getData();



    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelList,
            datasets: [{
                label: '# in DB',
                data: [data.red,data.green,data.blue,data.yellow,data.pink,data.azure,
                       data.orange,data.purple,data.brown,data.grey,data.black,data.white],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 204, 255,0.2)',
                    'rgba(102, 153, 255,1)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(102, 51, 0,0.2)',
                    'rgba(128,128,128,0.2)',
                    'rgba(0,0,0,0.7)',
                    'rgba(255,255,255,0.2)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 204, 255,1)',
                    'rgba(102, 153, 255,1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(102, 51, 0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(,128,128,1)',
                    'rgba(128,128,128,1)',
    
                ],  
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });   


    return myChart;
}