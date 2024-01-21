const express = require("express");
const app = express();
const db = require("../dbConnection.js");
let getAllTickets = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  const offset = (page - 1) * pageSize;
  try {
    db.query(`SELECT * FROM tickets`, [pageSize, offset], (err, results) => {
      if (err) {
        console.error("Error executing MySQL query222222:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        res.status(200).send({ tickets: results });
      } else {
        res.status(401).json({ error: "No tickets found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

let createTickets = async (req, res) => {
  const sets = parseInt(req.params.sets);

  const tickets = generateTambolaTickets(sets);

  try {
    for (let i = 0; i < tickets.length; i++) {
      const query1 = "INSERT INTO tickets (data) VALUES (?)";
      db.query(query1, [JSON.stringify(tickets[i])], (err, results) => {
        if (err) {
          console.error("Error:", err);
        } else {
          console.log("@@res", results);
        }
      });
    }

    // await Promise.all(promises);

    // await db.commit();

    res.json({ tickets });
  } catch (error) {
    // await db.rollback();
    throw error;
  } finally {
    // db.release();
  }
};

function generateTambolaTickets(sets) {
  const tickets = [];

  for (let setIndex = 1; setIndex <= sets; setIndex++) {
    const ticket = [];
    const columns = Array.from({ length: 9 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => i * 10 + j + 1)
    );

    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const numbersInColumn = columns[j].filter((num) => num !== 0);
        const randomIndex = Math.floor(Math.random() * numbersInColumn.length);
        const selectedNumber = numbersInColumn.splice(randomIndex, 1)[0];
        row.push(selectedNumber);
      }
      ticket.push(row);
    }

    tickets.push({ [setIndex]: ticket });
  }

  return tickets;
}

module.exports = { getAllTickets, createTickets };
