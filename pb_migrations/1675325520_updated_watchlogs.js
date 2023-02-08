migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xkozxazfaizljlb")

  // remove
  collection.schema.removeField("6vpo2a4o")

  return dao.saveCollection(collection)
})
