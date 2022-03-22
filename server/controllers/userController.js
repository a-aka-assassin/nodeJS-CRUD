const mysql =require('mysql');
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password            : process.env.DB_PASS,
    database            : process.env.DB_NAME
});


//view users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;  //Not Connected error
        console.log("Database is connected as " + connection.threadId);
         //Use The Connection
        connection.query("SELECT * FROM user where status = 'active'", (err, rows) => {
        connection.release();

            if(!err){
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
            }else{
                console.log('there has been an Error');
            }

        });
    });
}   


//Find users
exports.find = (req, res) => {
 pool.getConnection((err, connection) => {
        if(err) throw err;  //Not Connected error
        console.log("Database is connected as " + connection.threadId);

        let searchTerm = req.body.search;
         //Use The Connection
        connection.query("SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
        connection.release();

            if(!err){
                res.render('home', { rows });
            }else{
                console.log('there has been an Error');
            }

        });
    });
}



//Add new users
exports.form = (req, res) => {
    res.render('adduser');
}


//Create users
exports.create = (req, res) => {
    const {first_name, last_name, phone, email, comment} = req.body;
    pool.getConnection((err, connection) => {
           if(err) throw err;  //Not Connected error
           console.log("Database is connected as " + connection.threadId);
   
           let searchTerm = req.body.search;
            //Use The Connection
           connection.query("INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?", [first_name, last_name, email, phone, comment], (err, rows) => {
           connection.release();
   
               if(!err){
                   res.render('adduser', {alert: 'User added Successfully.'});
               }else{
                   console.log('there has been an Error');
               }
   
           });
       });
   }


   //Edit users
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;  //Not Connected error
        console.log("Database is connected as " + connection.threadId);
         //Use The Connection
        connection.query("SELECT * FROM user where id = ?", [req.params.id], (err, rows) => {
        connection.release();

            if(!err){
                res.render('edituser', { rows });
            }else{
                console.log('there has been an Error');
            }

        });
    });
   }

   //Update user
   
exports.update = (req, res) => {
    const {first_name, last_name, phone, email, comment} = req.body;
    pool.getConnection((err, connection) => {
           if(err) throw err;  //Not Connected error
           console.log("Database is connected as " + connection.threadId);
   
           let searchTerm = req.body.search;
            //Use The Connection
           connection.query("UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ? WHERE id = ?", [first_name, last_name, email, phone, comment, req.params.id], (err, rows) => {
           connection.release();
   
               if(!err){
                pool.getConnection((err, connection) => {
                    if(err) throw err;  //Not Connected error
                    console.log("Database is connected as " + connection.threadId);
                     //Use The Connection
                    connection.query("SELECT * FROM user where id = ?", [req.params.id], (err, rows) => {
                    connection.release();
            
                        if(!err){
                            res.render('edituser', { rows, alert:'User has been Updated.' });
                        }else{
                            console.log('there has been an Error');
                        }
            
                    });
                });
               }else{
                   console.log('there has been an Error');
               }
   
           });
       });
   }
   //Delete users
   exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;  //Not Connected error
        console.log("Database is connected as " + connection.threadId);
         //Use The Connection
        connection.query("Delete FROM user where id = ?", [req.params.id], (err, rows) => {
        connection.release();

            if(!err){
                let userRemoved = encodeURIComponent('User Successfully Remved');
                res.redirect('/?removed=' + userRemoved);
            }else{
                console.log('there has been an Error');
            }

        });
    });
   }

   //view Single user
exports.viewuser = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;  //Not Connected error
        console.log("Database is connected as " + connection.threadId);
         //Use The Connection
        connection.query("SELECT * FROM user where id = ?", [req.params.id], (err, rows) => {
        connection.release();

            if(!err){
                res.render('viewuser', { rows });
            }else{
                console.log('there has been an Error');
            }

        });
    });
}   