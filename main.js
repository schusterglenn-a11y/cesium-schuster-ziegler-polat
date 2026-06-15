
import "./style.css";


// Ändert Zeile 14 ab zu:
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjVjYzQ5Ni0wZjBlLTQ2MmEtODA0ZS1iY2UxYzNlNGM3NmYiLCJpZCI6NDQ0NzMwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODE1MjY5NDN9.qtUR0cwIerZN7dp1FmflXrLiZjgTqzxpsdO3g1sMtNM';

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

// Hier nutzen wir die absolut sichere Methode für das Tileset:
Cesium.Cesium3DTileset.fromIonAssetId(4943263)
    .then((tileset) => {
        viewer.scene.primitives.add(tileset);
        viewer.flyTo(tileset);

        // Styling wird erst angewendet, wenn das Tileset geladen ist
        tileset.style = new Cesium.Cesium3DTileStyle({
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
    })
    .catch((error) => {
        console.error("Fehler beim Laden des Tilesets:", error);
    });

// Feature 1: Schatten aktivieren
viewer.shadows = true;
viewer.scene.skyAtmosphere.show = true;
