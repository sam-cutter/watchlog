migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xkozxazfaizljlb")

  // remove
  collection.schema.removeField("6vpo2a4o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fremopqh",
    "name": "author",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xkozxazfaizljlb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6vpo2a4o",
    "name": "author",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("fremopqh")

  return dao.saveCollection(collection)
})
