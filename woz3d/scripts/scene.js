class Scene {
    constructor(gl, width, height, tiles, entities, sky, programInfo) {
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.entities = entities;
        this.sky = sky;

        let verticies = [];
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] == 0) continue;
            verticies.push(Math.floor(i / width), -0.5, i % width);
            verticies.push(Math.floor(i / width), 0.5, i % width);
            verticies.push(Math.floor(i / width) + 1, -0.5, i % width);
            verticies.push(Math.floor(i / width), 0.5, i % width);
            verticies.push(Math.floor(i / width) + 1, -0.5, i % width);
            verticies.push(Math.floor(i / width) + 1, 0.5, i % width);

            verticies.push(Math.floor(i / width), -0.5, i % width + 1);
            verticies.push(Math.floor(i / width), 0.5, i % width + 1);
            verticies.push(Math.floor(i / width) + 1, -0.5, i % width + 1);
            verticies.push(Math.floor(i / width), 0.5, i % width + 1);
            verticies.push(Math.floor(i / width) + 1, -0.5, i % width + 1);
            verticies.push(Math.floor(i / width) + 1, 0.5, i % width + 1);

            verticies.push(Math.floor(i / width), -0.5, i % width + 1);
            verticies.push(Math.floor(i / width), 0.5, i % width + 1);
            verticies.push(Math.floor(i / width), -0.5, i % width);
            verticies.push(Math.floor(i / width), 0.5, i % width + 1);
            verticies.push(Math.floor(i / width), -0.5, i % width);
            verticies.push(Math.floor(i / width), 0.5, i % width);

            verticies.push(Math.floor(i / width) + 1, -0.5, i % width + 1);
            verticies.push(Math.floor(i / width) + 1, 0.5, i % width + 1);
            verticies.push(Math.floor(i / width) + 1, -0.5, i % width);
            verticies.push(Math.floor(i / width) + 1, 0.5, i % width + 1);
            verticies.push(Math.floor(i / width) + 1, -0.5, i % width);
            verticies.push(Math.floor(i / width) + 1, 0.5, i % width);
        }

        this.model = {positions: gl.createBuffer(), vertexCount: Math.floor(verticies.length / 3)};

        gl.bindBuffer(gl.ARRAY_BUFFER, this.model.positions);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);
        
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
