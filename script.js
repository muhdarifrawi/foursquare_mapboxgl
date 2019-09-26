/*global mapboxgl*/
/*global axios*/

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
   
function testAPI(){
    axios.get("https://api.foursquare.com/v2/venues/explore?client_id=KU0V5J1DMMBMFD2XR2YNPDDQKIQJE5CMIKNB32YITZTXYXL4&client_secret=4CDZXMM212D1JTYD0VJ055IA00G1EPIYLZRP2Q5ZR1FT3JCS&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee")
.then(function(response){
    console.log(response.data);
});

}