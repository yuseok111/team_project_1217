let app = require('../app');

let port = process.env.PORT || 3000;

app.listen(port,() => {
  console.log(`${port} 로 express 실행`);
})


// let PORT = 3000;

// app.listen(process.env.PORT || PORT)