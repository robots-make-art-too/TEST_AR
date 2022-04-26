window.onload = () => {
    let places = staticLoadPlaces(); //loads the setting of the longtitude/latitude; what the camera projects
    renderPlaces(places);

};


function staticLoadPlaces() {
     return [
         {
             name: 'myModels',  //loads the models and states the coordinates at which they should apppear
             location: {
                 lat: 43.8518856,
                 lng: -79.516,
             }
         },
     ];
}

var models = [     //this is where you add your objects; in this case step 6 requires 4 copies of the object, hence why there are 4
    {
        url: "assets/Gumball.gltf",
        scale: '0.5 0.5 0.5',        //in each object you can adjust the scale and rotation and it applies to the model
        rotation: '0 180 0',
    },
    {
        url: "assets/Gumball1.gltf",
        scale: '0.2 0.2 0.2',
        rotation: '180 360 0',
    },

    {
        url: "assets/Gumball2.gltf",
        scale: '0.5 0.5 0.5',
        rotation: '0 360 0',
    },

    {
        url: "assets/Gumball3.gltf",
        scale: '0.4 0.4 0.4',
        rotation: '270 180 0',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {  //this is where you load the different attributes including position, rotation and scale
    if (model.scale) {                      //in this case you are defining what each attribute means
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
     let scene = document.querySelector('a-scene'); //this is where you define each function including latitude and longitude so the coordinates are effective

     places.forEach((place) => {
         let latitude = place.location.lat;
         let longitude = place.location.lng;

         let model = document.createElement('a-entity');
         model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

         setModel(models[modelIndex], model);

         model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

         scene.appendChild(model);
     });
}
