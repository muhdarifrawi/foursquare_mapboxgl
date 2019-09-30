/*global mapboxgl*/
/*global axios*/
/*global $*/

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
   
function testFourSqAPI(){
    axios.get(API_URL_FSQ + "/venues/explore", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 10 ,
            "ll": '1.3521, 103.8198' ,
            "query": 'coffee'
        }
    })
.then(function(response){
    console.log(response.data.response.groups[0].items);
    console.log(response.data.response.groups[0].items[0].venue.name);
});

}

//create a function where if  i click search, it will return names to me.

$("#search-button").click(function(){
    console.log("clicked");
    
    let searchQuery = $("#search-box").val();
    console.log(searchQuery);
    
    axios.get(API_URL_FSQ + "/venues/explore", {
        params: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET, 
            "v":'20180323' , 
            "limit": 1000 ,
            "ll": '1.3521, 103.8198' ,
            "query": searchQuery
        }
    }).then(function(response){
        console.log(response);
        console.log(response.data.response.groups[0].items);
        console.log(response.data.response.groups[0].items[0].venue.name);
        
        let placeList = response.data.response.groups[0].items;
        $("#list").empty();
        for (let places of placeList){
            console.log(places.venue.name);

            $("#list").append(`<li>${places.venue.name}</li>`);
            $("#list").append(`<ul><li>${places.venue.location.address}</li></ul>`)
            
        }
    });
    
   
});