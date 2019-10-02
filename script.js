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
    zoom: 10.5
});

let m = new mapboxgl.Marker()
   .setLngLat([103.8198, 1.3521])
   .addTo(map);
   
let clickedLatLng = {};
   
function testFourSqAPI(){
    axios.get(API_URL_FSQ + "/venues/explore", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 50,
            "ll": '1.3521, 103.8198' ,
            "query": 'coffee'
        }
    })
.then(function(response){
    console.log(response.data.response.groups[0].items);
    console.log(response.data.response.groups[0].items[0].venue.name);
});

}

// create a function where if i hover my cursor in map, it will indicate lng,lat
map.on("mousemove", function(e){ 
    $("#output").val(JSON.stringify(e.lngLat.wrap()));
    clickedLatLng = e.lngLat;
    
});

map.on("click", function (){
    $("#html-plot").val("longtitude: "+clickedLatLng.lng +" latitude: "+ clickedLatLng.lat);
    
    for (let each_plot of plot_marker){
        each_plot.remove();
    };
    
    
    plot_marker = [];
    
    let plot = new mapboxgl.Marker();
            
            plot.setLngLat([clickedLatLng.lng,clickedLatLng.lat]);
            plot.addTo(map);
    
            plot_marker.push(plot);
            
    console.log("current plot" + clickedLatLng.lat);
    console.log("current plot" + clickedLatLng.lng);
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
        stores.push($("#sheng:checkbox").attr("id"))
    };
    
    if (fpCheck == true){
        stores.push($("#fairprice:checkbox").attr("id"))
    };

    console.log(stores);
    let each = stores.toString();

    /*Using search instead of explore*/
    axios.get(API_URL_FSQ + "/venues/search", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 50 ,
            /* if i add radius, json file is changed*/ 
            /*taking Long, lat from clicked*/
            "ll": clickedLatLng.lat + "," + clickedLatLng.lng ,
            "radius": 1000,
            "query": each
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
        
        
        
        for (let places of placeList){
            // console.log(places);
            console.log(places.name);
            
            let marker = new mapboxgl.Marker();
            marker.setLngLat([places.location.lng,places.location.lat]);
            marker.addTo(map);
            
            $("#list").append(`<li>${places.name}</li>`);
            $("#list").append(`<ul><li>${places.location.address}</li></ul>`)
          
            all_markers.push(marker);
          
            }
           
    });
    
   
});