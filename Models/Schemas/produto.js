module.exports = {
    "title": "produto",
    "type": "object",
    "definitions": {
        "categoria": {
            "type": "object",
            "properties": {
                "nome": {
                    "type": "string"
                }
            },
            "required": [
                "nome"
            ]
        },
        "marca": {
            "type": "object",
            "properties": {
                "nome": {
                    "type": "string"
                }
            },
            "required": [
                "nome"
            ]
        }
    },
    "properties": {
        "nome": {
            "description": "Nome do Produto",
            "type": "string"
        },
        "descricao": {
            "description": "Descrição do Produto",
            "type": "string"
        },
        "preco": {
            "description": "Preço do Produto",
            "type": "number"
        },
        "stock": {
            "description": "Stock do Produto",
            "type": "integer"
        },
        "categoria": {
            "$ref": "#/definitions/categoria"
        },
        "marca": {
            "$ref": "#/definitions/marca"
        }
    },
    "required": [
        "nome",
        "descricao",
        "preco",
        "stock"
    ],
    "references": [
        {
            "model": "marca",
            "relation": "1-M"
        },
        {
            "model": "categoria",
            "relation": "1-M"
        }
    ]
}