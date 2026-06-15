import {
    Viewer,
    Terrain,
    Cesium3DTileset,
    Cesium3DTileStyle
} from "cesium";
import "./style.css";

// Hier euren echten Token fest eintragen, da .env.local auf GitHub ignoriert wird
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjVjYzQ5Ni0wZjBlLTQ2MmEtODA0ZS1iY2UxYzNlNGM3NmYiLCJpZCI6NDQ0NzMwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODE1MjY5NDN9.qtUR0cwIerZN7dp1FmflXrLiZjgTqzxpsdO3g1sMtNM';

const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
});

// Originale Schreibweise laut eurer Vorlage
const tileset = viewer.scene.primitives.add(
    await Cesium3DTileset.fromIonAssetId(4943263)
);

viewer.flyTo(tileset);
viewer.shadows = true;
viewer.scene.skyAtmosphere.show = true;

tileset.style = new Cesium3DTileStyle({
    color: {
        conditions: [
            ["${Height} >= 40", "color('darkred')"],
            ["${Height} >= 30", "color('red')"],
            ["${Height} >= 25", "color('orangered')"],
            ["${Height} >= 20", "color('orange')"],
            ["${Height} >= 15", "color('gold')"],
            ["${Height} >= 10", "color('yellow')"],
            ["${Height} >= 5",  "color('limegreen')"],
            ["true",            "color('deepskyblue')"]
        ]
    }
});
