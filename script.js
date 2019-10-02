/*global mapboxgl*/
/*global axios*/
/*global $*/

/* global variables */
let all_markers = [];
let plot_marker = [];

/*Foursquare API. Constants are kept Capsed to differentiate them from Variables.*/
const API_URL_FSQ = "https://api.foursquare.com/v2";
const CLIENT_ID = "KU0V5J1DMMBMFD2XR2YNPDDQKIQJE5CMIKNB32YITZTXYXL4";
const CLIENT_SECRET = "4CDZXMM212D1JTYD0VJ055IA00G1EPIYLZRP2Q5ZR1FT3JCS";



mapboxgl.accessToken="pk.eyJ1IjoibXVoZGFyaWZyYXdpIiwiYSI6ImNrMHl3dDNycTBpdDkzaHJ4cHJtdnU0YXoifQ.8ceqA9s8SqMSbVa1rsZgvg"

let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v9",
    center: [103.8198, 1.3521],
    zoom: 11
});

let clickedLatLng = {};
/*   
function testFourSqAPI(){
    axios.get(API_URL_FSQ + "/venues/explore", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 50,
            "ll": '1.3521, 103.8198' ,
            "query": 'coffee',
            "sortByDistance": 1
        }
    })
.then(function(response){
    console.log(response.data.response.groups[0].items);
    console.log(response.data.response.groups[0].items[0].venue.name);
});

}
*/
// create a function where if i hover my cursor in map, it will indicate lng,lat
map.on("mousemove", function(e){ 
    $("#output").val(JSON.stringify(e.lngLat.wrap()));
    $("#c-long").html(e.lngLat.lng);
    $("#c-lat").html(e.lngLat.lat);
    clickedLatLng = e.lngLat;
    
});

map.on("click", function (){
    $("#plot-long").html(clickedLatLng.lng);
    $("#plot-lat").html(clickedLatLng.lat);
    
    for (let each_plot of plot_marker){
        each_plot.remove();
    };
    
    var el = document.createElement('div');
    el.className = 'marker';
   
    plot_marker = [];
    
    let plot = new mapboxgl.Marker(el);
            
            plot.setLngLat([clickedLatLng.lng,clickedLatLng.lat]);
            plot.addTo(map);
    
            plot_marker.push(plot);
            
    map.easeTo({
        zoom: 14,
        center: clickedLatLng
    });
            
    console.log("current plot" + clickedLatLng.lat);
    console.log("current plot" + clickedLatLng.lng);
    console.log(clickedLatLng);
});


//function reset will zoom out and clear the marker

$("#reset-button").click(function(){
    
    for (let each_plot of plot_marker){
        each_plot.remove();
    };
    
    $("#list").empty();
        
        for (let each_marker of all_markers)
        {
            each_marker.remove();
        }
    
    map.easeTo({
        zoom: 11,
        center: [103.8198, 1.3521]
    });

});

//create a function where if  i click search, it will return names to me.
$("#search-button").click(function(){
    // console.log("clicked");
    //  console.log($("#sheng:checkbox").prop("checked"));
    //  console.log($("#fairprice:checkbox").prop("checked"));
    
    let stores = [];
    let shengCheck = $("#sheng:checkbox").prop("checked");
    let fpCheck = $("#fairprice:checkbox").prop("checked");
    
    if (shengCheck == true){
        stores.push("shengsiong");
    };
    
    if (fpCheck == true){
        stores.push("fairprice, FairPrice")
    };

    if ($(":checkbox").prop("checked") == false){
        alert("Please select a choice.");
        return ; 
    };
    
    console.log(stores);
    let each = stores.toString();
    console.log(each);

    /*Using search instead of explore*/
    axios.get(API_URL_FSQ + "/venues/search", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 20 ,
            /*taking Long, lat from clicked*/
            "ll": clickedLatLng.lat + "," + clickedLatLng.lng ,
            "radius": 1000,
            "query": each,
            "sortByDistance": 1,
            "section":"supermarket"
        }
    }).then(function(response){
        // console.log(response);
        // console.log(response.data.response.venues[0].name);
        // console.log(response.data.response.venues[0].location.address);
        
        
        $("#list").empty();
        
        for (let each_marker of all_markers)
        {
            each_marker.remove();
        }
        
        let placeList = response.data.response.venues;
        all_markers = [];
        
        if (all_markers.length == 0){
           $("#list").append(`<li> No Results Found</li>`); 
        };
        
        
        for (let places of placeList){
            // console.log(places);
            console.log(places.name);
            
            let marker = new mapboxgl.Marker();
            marker.setLngLat([places.location.lng,places.location.lat]);
            marker.addTo(map);
            
            $("#list").append(`<li>${places.name}</li>`);
            $("#list").append(`<ul><li>${places.location.address}</li></ul>`)
          
            all_markers.push(marker);
            console.log(all_markers.length)
          
            }
           
    });
    
   
});

