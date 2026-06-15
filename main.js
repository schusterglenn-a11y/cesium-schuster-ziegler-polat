import "./style.css";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMjVjYzQ5Ni0wZjBlLTQ2MmEtODA0ZS1iY2UxYzNlNGM3NmYiLCJpZCI6NDQ0NzMwLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODE1MjY5NDN9.qtUR0cwIerZN7dp1FmflXrLiZjgTqzxpsdO3g1sMtNM';

const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

// Die modernisierte und sicherste Schreibweise für die Gebäude:
Cesium.Cesium3DTileset.fromIonAssetId(4944770)
    .then(function (tileset) {
        viewer.scene.primitives.add(tileset);
        viewer.zoomTo(tileset); // Nutzt zoomTo statt flyTo, um sicherzugehen

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
    .catch(function (error) {
        console.log("Fehler beim Laden:", error);
    });

viewer.shadows = true;
viewer.scene.skyAtmosphere.show = true;
