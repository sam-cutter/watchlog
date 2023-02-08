migrate((db) => {
  const collection = new Collection({
    "id": "xkozxazfaizljlb",
    "created": "2023-02-02 08:04:46.163Z",
    "updated": "2023-02-02 08:04:46.163Z",
    "name": "watchlogs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ascvmzgt",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "svcrtw0p",
        "name": "poster_url",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "4xwvmori",
        "name": "year",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 4,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xkozxazfaizljlb");

  return dao.deleteCollection(collection);
})
