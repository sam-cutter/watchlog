migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xkozxazfaizljlb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3728gwwh",
    "name": "description",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uztnccex",
    "name": "ratings",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xkozxazfaizljlb")

  // remove
  collection.schema.removeField("3728gwwh")

  // remove
  collection.schema.removeField("uztnccex")

  return dao.saveCollection(collection)
})
