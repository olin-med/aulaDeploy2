const express = require('express');
const sqlite3 = require('sqlite3').verbose();  
const DBPATH = 'database.db';
const app = express();
const port = 9696;
const hostname = 'localhost';
const db = new sqlite3.Database((DBPATH), (err) => {
if (err){
	console.error(err.message);
} else{
	console.log('Connected to the Database. ');
}});
   
app.use(express.static("../frontend/Main"));
app.use(express.static('/static'));
app.use(express.json());
app.listen(port, hostname, () => {
	console.log(`Server listening on http://${hostname}:${port}/`);
	});
	app.get('/vagao', (req, res) => {
		db.all('SELECT * FROM vagao', [], (err, rows) => {
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			});
	  });
	  app.get('/vagao/tipoE', (req, res) => {
		const get = 'SELECT * FROM vagao WHERE tipo_vagao = "e"';
		db.all(get, [], (err, rows) => {
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			});
	  });
	  app.get('/vagao/tipoF', (req, res) => {
		const get2 = 'SELECT * FROM vagao WHERE tipo_vagao = "f"';
		db.all(get2, [], (err, rows) => { 
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			
			});
	  });
	  app.post('/inserirVagao', (req, res) => { 
		const insert = 'INSERT INTO vagao (placa, tipo_vagao) VALUES (?, ?)';
		db.run(insert, [req.body.placa, req.body.tipo_vagao], (err) => {
		  if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Failed to insert row' });
		  } else {
			res.status(201).json({ message: 'Row inserted successfully' });
		  }
		});
	  });
	  app.put('/atualizarVagao', (req, res) => {
		const update = 'UPDATE vagao SET tipo_vagao = ? WHERE placa = ?';
		db.run(update, [req.body.tipo_vagao, req.body.placa], (err) => {
		  if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Failed to update row' });
		  } else {
			res.status(200).json({ message: 'Row updated successfully' });
		  }
		});	
	 });
	 app.delete('/deletarVagao', (req, res) => {
		const del = 'DELETE FROM vagao WHERE placa = ?';
		db.run(del, [req.body.placa], (err) => {
			if (err) {
				console.error(err.message);
				res.status(500).json({ error: 'Failed to delete row' });
		  	} else {
				res.status(200).json({ message: 'Row deleted successfully' });
		  }
		});
	  });
	  app.post('/inserirChoque', (req, res) => { 
		const insert = 'INSERT INTO choque (id_choque, velocidade, pg, forca_maxima, act, placa, id_ponto, tipo_choque, hora, dia) VALUES (?,?,?,?,?,?,?,?,?,?)';
		db.run(insert, [req.body.id_choque, req.body.velocidade, req.body.pg, req.body.forca_maxima, req.body.act, req.body.placa, req.body.id_ponto, req.body.tipo_choque, req.body.hora, req.body.dia], (err) => {
		  if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Failed to insert row' });
		  } else {
			res.status(201).json({ message: 'Row inserted successfully' });
		  }
		});
	  });
	  app.get('/choques', (req, res) => {
		const get2 = 'SELECT * FROM choque ';
		db.all(get2, [], (err, rows) => { 
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			
			});
		});
		app.post('/choqueVagao', (req, res) => {
			const select = 'SELECT * FROM choque WHERE placa = ?';
			db.all(select, [req.body.placa], (err, rows) => {
				if (err) {
					console.error(err.message);
				} else {
					if (rows.length > 0) {
						console.log(rows);
						res.status(200).json({rows});
					} else {
						res.status(401).json({ message: 'Login failed' });
					}
				}
			});
		});