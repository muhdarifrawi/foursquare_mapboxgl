/*global mapboxgl*/
/*global axios*/
/*global $*/

/* global variables */
let all_markers = [];
let plot_marker = [];
let stores = [];
let testArray = [];
let listNumber = 0;

$("#shengsiong-list").click(function(){
    $("#navbarDropdown").text("Sheng Siong")
    listNumber = 1;
});

$("#ntuc-list").click(function(){
    $("#navbarDropdown").text("NTUC Fairprice")
    listNumber = 2;
});

$("#giant-list").click(function(){
    $("#navbarDropdown").text("Giant")
    listNumber = 3;
});

$("#coldstorage-list").click(function(){
    $("#navbarDropdown").text("Cold Storage")
    listNumber = 4;
});


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
   
function testFourSqAPI(){
    axios.get(API_URL_FSQ + "/venues/explore", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 1,
            "ll": '1.3521, 103.8198' ,
            "query": 'coffee',
            "sortByDistance": 1
        }
    })
.then(function(response){
    console.log(response);
    console.log("Test Response A: "+response.data.response.groups[0].name);
    console.log("Test response B: "+response.data.response.groups[0].items[0].venue.name);
});

}

//create a function to push checkboxes value up to here and return back.
function searchTopLocations(cata){
    axios.get(API_URL_FSQ + "/venues/search", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 5 ,
            /*taking Long, lat from clicked*/
            "ll": clickedLatLng.lat + "," + clickedLatLng.lng ,
            "query": cata,
            "sortByDistance": 1
        }
    }).then(function(response){
        console.log("Axios Responded");
        console.log(response.data.response.venues); 
        let venues = response.data.response.venues
        
        //create a for function to start calculating distances of every location. then use an if loop to find within 10km. 
        testArray = [];
        
        
        
        getDistanceFromLatLonInKm();
        
        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          console.log("calculator responded");
          
          for (let eachVenues of venues){
        //   lat1 = venues[0].location.lat; 
        //   lon1 = venues[0].location.lng;
          let venueName = eachVenues.name;
          let venueAddress = eachVenues.location.address;
          lat1 = eachVenues.location.lat;
          lon1 = eachVenues.location.lng;
          lat2 = clickedLatLng.lat;
          lon2 = clickedLatLng.lng;
          
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          
          let testObject = {
              name: venueName,
              location: [lat1, lon1],
              address: venueAddress,
              dist: d
          };
          // limit distance to 3km
          if (testObject.dist <= 3){
            testArray.push(testObject);
            }
            
            
          }
        console.log("internal testArray")
        console.log(testArray);
        }
        
        function deg2rad(deg)
        {   
            console.log("deg2 responded");
            return deg * (Math.PI/180);
        }
        
        // console.log(getDistanceFromLatLonInKm());
        //return getDistanceFromLatLonInKm();
        //let info = getDistanceFromLatLonInKm();
        console.log("Axios test array")
        console.log(testArray)
        pinMarkers(testArray);
        return;
    })
   
};

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
    
    // let shengCheck = $("#sheng:checkbox").prop("checked");
    
    // let fpCheck = $("#fairprice:checkbox").prop("checked");
    
    let giantCheck = $("#giant:checkbox").prop("checked");
    let coldStorageCheck = $("#cold-storage:checkbox").prop("checked");
    
    if (listNumber == 1){
        let cata = "shengsiong"
        console.log("jumped from shengsiong")
        searchTopLocations(cata);
    };
    
    if (listNumber == 2){
        let cata = "fairprice"
        console.log("kumped from NTUC")
        searchTopLocations(cata);
    };
    
    if (listNumber == 3){
        let cata = "giant"
        searchTopLocations(cata);
    };
    
    if (listNumber == 4){
        let cata = "cold storage"
        searchTopLocations(cata);
    };

    if (listNumber != 1 || 2 || 3 || 4){
        alert("Please select a choice.");
        return ; 
    };
    
    
    console.log("Checked box: "+$("input[type='checkbox']:checked").length);
    // let each = stores.toString();
    // console.log(each);
    
    // /*Using search instead of explore*/
    // axios.get(API_URL_FSQ + "/venues/search", {
    //     params: {
    //         "client_id": CLIENT_ID,
    //         "client_secret": CLIENT_SECRET, 
    //         "v":'20180323' , 
    //         "limit": 50 ,
    //         /*taking Long, lat from clicked*/
    //         "ll": clickedLatLng.lat + "," + clickedLatLng.lng ,
    //         "query": each,
    //         "radius": 1000,
    //         "sortByDistance": 1,
    //         "intent": "checkin"
            
    //     }
        
}); 
        
function pinMarkers(testArray){
        console.log("is this an array? ");
        console.log(testArray);
        // console.log(response.data.response.venues[0].name);
        // console.log(response.data.response.venues[0].location.address);
        
        
        $("#list").empty();
        
        for (let each_marker of all_markers)
        {
            each_marker.remove();
        }
        
        let info=testArray;
        all_markers = [];
        
        for (let eachInfo of info){
            // console.log(places);
            console.log(eachInfo.name);
            
            let marker = new mapboxgl.Marker();
            marker.setLngLat([eachInfo.location[1],eachInfo.location[0]]);
            marker.addTo(map);
            
            $("#list").append(`<li>${eachInfo.name}</li>`);
            $("#list").append(`<ul><li>${eachInfo.address}</li></ul>`)
            
            all_markers.push(marker);
            
            }
            
            if (all_markers.length == 0){
              $("#list").append(`<li>No Results Found</li>`);  
            };
            
           console.log(all_markers.length)
    };
    
   

