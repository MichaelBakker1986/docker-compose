export const APIDefinition ={
  "swagger": "2.0",
  "info": {
    "title": "LME API",
    "version": "1.0.0",
    "description": "REST LME API"
  },
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "host": "127.0.0.1",
  "basePath": "/",
  "paths": {},
  "definitions": {
    "Value": {
      "properties": {
        "id": {
          "type": "string"
        }
      }
    }
  },
  "responses": {},
  "parameters": {
    "ContextId": {
      "name": "id",
      "description": "Unique ID",
      "in": "path",
      "required": true,
      "type": "string"
    },
    "DataId": {
      "name": "dataId",
      "description": "Unique data ID",
      "in": "path",
      "required": true,
      "type": "string"
    },
    "Times": {
      "name": "times",
      "description": "ammount of years",
      "in": "body",
      "required": true,
      "type": "number"
    },
    "ContextIds": {
      "name": "ids",
      "in": "path",
      "required": true,
      "type": "string"
    },
    "Value": {
      "name": "value",
      "required": true,
      "type": "string"
    },
    "FigureName": {
      "name": "figureName",
      "in": "path",
      "required": false,
      "type": "string",
      "enum": []
    }
  },
  "securityDefinitions": {},
  "tags": []
}