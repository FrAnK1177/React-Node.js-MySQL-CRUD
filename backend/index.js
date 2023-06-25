import express  from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"railway",
    port:"8889"
});

app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
});

app.get("/books", (req,res)=>{
    const q = "select * from books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "insert into books (`title`, `descr`, `price`, `cover`) values (?)";
    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been added successfully.")
    })
});

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "delete from books where id = ?";

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has ben deleted successfully.")
    });
});

app.get("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "select * from books where id = ?";
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "update books set `title` = ?, `descr` = ?, `cover` = ?, `price` = ? where id = ?";

    const values = [
        req.body.title,
        req.body.descr,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[...values, bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has ben updated successfully.")
    });
});

app.listen(8800, ()=> {
    console.log("Connected to backend");
})
