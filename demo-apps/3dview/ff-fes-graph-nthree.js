var graph = require('./fes-dependency')
var nthree = require('ngraph.three');

function create3DRenderer(renderer) {
    var THREE = renderer.THREE;
    var scene = renderer.scene;
    var lights = addLights(scene);
    var camera = renderer.camera;

    renderer.renderer.setClearColor(0x36394A, 1);

    renderer.createNodeUI(nodeUI).createLinkUI(linkUI);
    return {
        run: renderer.run,
        dispose: renderer.dispose,
        layout: renderer.layout,

        exportSTL: function () {
            var three2stl = require('three2stl');
            var layout = renderer.layout;
            var scene = renderer.scene;

            var linkMaterial = new THREE.LineBasicMaterial({
                color: 0x5A5D6E
            });
            // todo: this should be configurable
            graph.forEachNode(function (node) {
                var pos = layout.getNodePosition(node.id);
                var size = 1.25;
                pos.x *= size;
                pos.y *= size;
                pos.z *= size;
            });

            var lineMaterial = new THREE.LineBasicMaterial({
                color: 0x222222,
                linewidth: 0.2
            });
            graph.forEachLink(function (link) {
            });
            renderer.renderOneFrame();

            return three2stl.scene(renderer.scene);
        }
    };

    function nodeUI(node) {
        var nodeGeometry = new THREE.SphereGeometry(3);
        var nodeMaterial = new THREE.MeshPhongMaterial({
            color: 0xCFCCDF
        });
        return new THREE.Mesh(nodeGeometry, nodeMaterial);
    }

    function linkUI(link) {
        var linkGeometry = new THREE.Geometry();
        linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
        linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

        var linkMaterial = new THREE.LineBasicMaterial({
            color: 0x5A5D6E
        });

        return new THREE.Line(linkGeometry, linkMaterial);
    }

    function addLights(scene) {
        var light = new THREE.DirectionalLight(0xffffff);
        scene.add(light);

        return light;
    }
}

function Graph() {
}
Graph.prototype.createThree = function () {
    var graphics = nthree(graph, {
        interactive: true,
        physicsSettings: {
            interactive: true,
            physicsSettings: {
                springLength: 80,
                springCoeff: 0.0008,
                gravity: -1.2,
                theta: 0.8,
                dragCoeff: 0.02
            }
        }
    });
    if (true) {
        graphics = create3DRenderer(graphics);
    }
    graphics.run();
    return graphics;
}
module.exports = Graph.prototype;