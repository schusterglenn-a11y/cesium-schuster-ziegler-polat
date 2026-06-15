import {
    Cartesian3,
    Math as CesiumMath,
    Terrain,
    Viewer,
    createOsmBuildingsAsync,
    Ion,
    Cesium3DTileset,
    ShadowMode,
    Cesium3DTileStyle
} from "cesium";
import "./style.css";


// Ändert Zeile 14 ab zu:
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjVjYzQ5Ni0wZjBlLTQ2MmEtODA0ZS1iY2UxYzNlNGM3NmYiLCJpZCI6NDQ0NzMwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODE1MjY5NDN9.qtUR0cwIerZN7dp1FmflXrLiZjgTqzxpsdO3g1sMtNM';

const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
});

const tileset = viewer.scene.primitives.add(
    Cesium3DTileset.fromIonAssetId(4943263)
);

viewer.flyTo(tileset);
// Feature 1: Schatten aktivieren
viewer.shadows = true;


viewer.scene.skyAtmosphere.show = true;


tileset.style = new Cesium3DTileStyle({
    color: {
        conditions: [
            ["${Height} >= 40", "color('darkred')"],   // 1. Sehr hoch (Wolkenkratzer/Türme)
            ["${Height} >= 30", "color('red')"],       // 2. Hoch (Große Wohnblöcke)
            ["${Height} >= 25", "color('orangered')"], // 3. Überdurchschnittlich
            ["${Height} >= 20", "color('orange')"],    // 4. Mittelhoch (Bürogebäude)
            ["${Height} >= 15", "color('gold')"],      // 5. Normal hoch
            ["${Height} >= 10", "color('yellow')"],    // 6. Niedrigere Mehrfamilienhäuser
            ["${Height} >= 5",  "color('limegreen')"], // 7. Kleine Häuser / Bungalows
            ["true",            "color('deepskyblue')"] // 8. Alles unter 5m (Garagen/Schuppen)
        ]
    }
});
