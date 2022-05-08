const router = require("express").Router();
let Faq = require("../models/faq.model");

//get all records
router.route("/").get((req, res) => {
  Faq.find()
    .then((faqs) => res.json(faqs))
    .catch((err) => res.status(400).json("Error: " + err));
});

//insret a new faq
router.route("/add").post((req, res) => {
  const questionId = req.body.questionId;
  const question = req.body.question;
  const answer = req.body.answer;
  const addDate = Date.parse(req.body.addDate);

  const newFaq = new Faq({
    questionId,
    question,
    answer,
    addDate,
  });

  newFaq
    .save()
    .then(() => res.json("New FAQ added successfully..."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//get record by using ID
router.route("/:id").get((req, res) => {
  Faq.findById(req.params.id)
    .then((faq) => res.json(faq))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete
router.route("/:id").delete((req, res) => {
  Faq.findByIdAndDelete(req.params.id)
    .then(() => res.json("FAQ details deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update function
router.route("/update/:id").put((req, res) => {
  Faq.findById(req.params.id)
    .then((faq) => {
      faq.question = req.body.question;
      faq.answer = req.body.answer;
      faq.addDate = Date.parse(req.body.addDate);

      faq
        .save()
        .then(() => res.json("FAQ details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
