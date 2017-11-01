var basic = require('./swaggerDef.json')

for (var i = 0; i < 2; i++) {
    basic.paths['/a' + i] = {
        "get": {
            "description": "Returns all pets from the system that the user has access to",
            "responses": {
                "200": {
                    "description": "A list of pets.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/pet"
                                }
                            }
                        }
                    }
                }
            },
            "parameters": [
                {
                    "name": "contextid",
                    "in": "query",
                    "description": "The id of the context",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "figure",
                    "in": "query",
                    "description": "The name of the figure",
                    "required": true,
                    "type": "string"
                },
                {
                    "name": "tupleidentifier",
                    "in": "query",
                    "description": "tupleidentifier",
                    "required": false,
                    "type": "string"
                }
            ]
        }
    }
}
require('fs').writeFileSync('./sw1.json', JSON.stringify(basic, null, 2))
exports.definition = basic;