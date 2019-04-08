const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.countReposts = functions.firestore
  .document('posts/{postId}/reposts/{userRepostId}')
  .onWrite((change, context) => {
    const { postId } = context.params;
    if (!change.before.exists) {
      // New document Created : add one to count
      return db
        .collection('posts')
        .doc(postId)
        .get()
        .then(snap => {
          const newCount =
            snap.data().d.numReposts !== undefined
              ? snap.data().d.numReposts + 1
              : 1;
          console.log(snap.data());
          console.log(`Updating numReposts for ${postId} to ${newCount}`);
          return db
            .collection('posts')
            .doc(postId)
            .update({
              'd.numReposts': newCount,
            });
        })
        .catch(err => console.log(err));
    } else if (change.before.exists && change.after.exists) {
      // Updating existing document : Do nothing
      return null;
    } else if (!change.after.exists) {
      // Deleting document : subtract one from count
      return db
        .collection('posts')
        .doc(postId)
        .get()
        .then(snap => {
          const newCount =
            snap.data().d.numReposts !== undefined
              ? snap.data().d.numReposts - 1
              : 1;

          return db
            .collection('posts')
            .doc(postId)
            .update({
              'd.numReposts': newCount,
            });
        })
        .catch(err => console.log(err));
    }
  });
