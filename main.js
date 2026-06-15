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

// Cesium Ion token is read from the environment (see .env.local).
// Set VITE_CESIUM_ION_TOKEN there; never commit a real token to git.
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

const viewer = new Viewer("cesiumContainer", {
    terrain: Terrain.fromWorldTerrain(),
});

const tileset = viewer.scene.primitives.add(
    await Cesium3DTileset.fromIonAssetId(4943263)
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