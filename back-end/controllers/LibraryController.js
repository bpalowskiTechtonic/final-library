const { verifyJWT_MW } = require("../middlewares");
const express = require("express");
const router = express.Router();
const firebase = require("firebase");
const { db } = require("../libs/firebase");

router.all("*", verifyJWT_MW);

router.post("/", (req, res) => {
  let bookArr = req.body.books;
  let id = req.user.id;
  let batch = db.batch();

  bookArr.forEach((el, i) => {
    let docRef = db.collection("books").doc();
    el.bookId = docRef.id;
    el.userId = id;
    el.timeStamp = firebase.firestore.Timestamp.now();
    batch.set(docRef, el);
  });
  return batch.commit().then(function() {
    return res.status(200).send("add books");
  });
});

router.put("/update/:id", async (req, res) => {
  const {
    author,
    cover,
    numPages,
    pubDate,
    rating,
    synopsis,
    title
  } = req.body;
  const id = req.params.id;
  await db
    .collection("books")
    .doc(id)
    .update({
      author,
      cover,
      numPages,
      pubDate,
      rating,
      synopsis,
      title
    });
  return res.status(200).send("updated");
});

router.get("/random", (req, res) => {
  let id = firebase.firestore.FieldPath.documentId();
  let docRef = db.collection("books");
  var random = docRef.doc();
  docRef
    .where(id, ">=", random)
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        snapshot.forEach(doc => {
          return res.status(200).json({ RandomBook: doc.data() });
        });
      } else {
        docRef
          .where(id, "<", random)
          .limit(1)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              return res.status(200).json({ RandomBook: doc.data() });
            });
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });
      }
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

router.get("/searchBy/", (req, res) => {
  const title = req.query.title;
  let arr = [];
  let docRef = db.collection("books").where("title", "==", title);
  docRef
    .get()
    .then(querySnapshot => {
      let test = querySnapshot.forEach(doc => {
        arr.push(doc.data());
      });
      return res.status(200).send([...arr]);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

router.get("/totalCount", (req, res) => {
  let docRef = db.collection("books");
  let arr = [];
  let getRef = docRef
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        arr.push(doc.id);
      });
      return res.status(200).send(`Number of books:${arr.length}`);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

router.get("/:numResults/", (req, res) => {
  const number = Number(req.params.numResults);
  let docRef = db.collection("books");
  let arr = [];
  docRef
    .limit(number)
    .orderBy("timeStamp")
    .get()
    .then(doc => {
      doc.forEach(x => {
        arr.push(x.data());
      });
      return res.status(200).send(arr);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

router.delete("/deleteBy/", (req, res) => {
  const { title } = req.query;
  let docRef = db.collection("books").where("title", "==", title);

  docRef.get().then(snapshot => {
    let batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    batch.commit().then(() => {
      return res.status(200).send("Deleted");
    });
  });
});

router.delete("/deleteById/:id", (req, res) => {
  let id = req.params.id;
  let docRef = db.collection("books").doc(id);
  docRef.delete().then(() => {
    return res.status(200).send(`id:${id} Has been deleted`);
  });
});

module.exports = router;
