import { Viewer, Cesium3DTileset, Cesium3DTileStyle } from "cesium";
import "./style.css";

// Euer neuer Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNmMzN2IwZi1lOTkzLTRiZjgtYmE2Ni0yZGIzNGYyMWQwYWYiLCJpZCI6NDQ0NzMwLCJzdWIiOiJzY2h1c3RlcmdsZW5uIiwiaXNzIjoiaHR0cHM6Ly9hcGkuY2VzaXVtLmNvbSIsImF1ZCI6IlVudGl0bGVkIiwiaWF0IjoxNzgxNTQ1MjA1fQ.ATKApLYOxh_G3ScLkdQ-nWBxX35wnwR-Of2kutOGt68';

const viewer = new Viewer("cesiumContainer", {
    terrainProvider: null // Flacher Boden, damit nichts versinkt
});

// Wir laden das Tileset asynchron, wie von Vite/Cesium gewollt
Cesium3DTileset.fromIonAssetId(4944770)
    .then((tileset) => {
        viewer.scene.primitives.add(tileset);
        viewer.zoomTo(tileset);

        // Styling
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
        console.log("Tileset erfolgreich geladen!");
    })
    .catch((error) => {
        console.error("KRITISCHER FEHLER BEIM LADEN:", error);
    });

viewer.shadows = true;
viewer.scene.skyAtmosphere.show = true;
