const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({
  origin: true,
});

admin.initializeApp();

exports.fetchBeaches = functions.https.onRequest((request, response) => {

  cors(request, response, () => {

    const docs = admin.firestore().collection("beaches").get().then(snapshot => {
      beaches = {}
      snapshot.forEach(doc => {
        id = doc.id
        beaches[id] = doc.data()
      })
      response.status(200).send({data: beaches});
      return ""
    }).catch(exception => {
      response.status(200).send({error: exception})
    })

  })
})
