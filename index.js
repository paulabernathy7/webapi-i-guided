const express = require("express"); // importing
const server = express();

const Hubs = require("./data/hubs-model");

server.use(express.json());

//read

server.get("/", (req, res) => {
  res.send({ Success: "sanity check..." });
});

//create
server.post("/hubs", (req, res) => {
  const hubInfo = req.body;
  Hubs.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
});

server.get("/hubs", (req, res) => {
  Hubs.find()
    .then(hub => {
      res.status(200).json(hub);
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
});

server.get("/hubs/:id", (req, res) => {
  const { id } = req.params;
  Hubs.findById(id)
    .then(hub => {
      res.status(200).json(hub);
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
});

// update
server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(hub => {
      res.status(200).json(changes);
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
});

//delete

server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;
  Hubs.remove(id)
    .then(hub => {
      if (hub) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ Error: "Cannot find the hub you are looking to delete" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
