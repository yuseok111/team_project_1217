var mysql = require('mysql');
const {
  connect
} = require('./app');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'team_bogo',
  dateStrings: 'date',
  multipleStatements: true
});

// 1221 석진 데이터베이스 추가

//공지사항 메인

// 알립니다 공지사항 작성 
function insertNoticeWrite(noticefile, noticetitle, noticecont, callback) {
  connection.query(`insert into notice(DATE, noticefile, noticetitle, noticecont)
  values(now(),'${noticefile}','${noticetitle}','${noticecont}')`, (err) => {
    if (err) throw err;
    callback();
  })
}
//공지사항 id값 받아오기

function getnoticemain(callback) {
  connection.query('SELECT * FROM notice ORDER BY id DESC', (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  })
}

//id값 받아서 공지사항 상세페이지 띄우기
function getnoticeById(id, callback) {
  connection.query(`select * from notice where id=${id}`, (err, row) => {
    if (err) throw err;
    callback(row)
  })
}



//수정페이지 데이터 넘기기

function updateNoticeWrite(noticefile, noticetitle, noticecont, id, callback) {
  connection.query(`update notice set DATE=now(),noticefile='${noticefile}',noticetitle='${noticetitle}',noticecont='${noticecont}' where id=${id}`, (err) => {
    if (err) throw err;
    callback();
  })
}
//데이터 지우기
function deleteBynotice(id, callback) {
  connection.query(`delete from notice where id=${id}`, (err) => {
    if (err) throw err;
    callback();
  })
}

//id값 받아서 카운트하기 

function getnoticecount(id, callback) {
  connection.query(`update notice set noticecount = noticecount+1 where id=${id}`, (err, rows, fields) => {
    if (err) throw err;
    callback(rows);

  })
}
//SELECT id FROM notice WHERE id IN(SELECT * from(SELECT id FROM notice WHERE id < ${id}  ORDER BY id DESC LIMIT 1)as t);
//이전글 다음글 받기
function getprenotice(id, callback) {
  connection.query(`SELECT id FROM notice WHERE id IN(SELECT * from(SELECT id FROM notice WHERE id < ${id}  ORDER BY id DESC LIMIT 1)as t)`, (err, row, fields) => {
    if (err) throw err;
    callback(row);
    // console.log(rows);
  })
}

function getnxtnotice(id, callback) {
  connection.query(`SELECT id FROM notice WHERE id IN(SELECT * from(SELECT id FROM notice WHERE id > ${id}  ORDER BY id LIMIT 1)as t)`, (err, row, fields) => {
    if (err) throw err;
    callback(row);
    // console.log(rows);
  })
}







//1226 청아 추가
// collection 추출
function getcollection(callback){
  connection.query(`SELECT * FROM bogo_collection ORDER BY id`,(err,rows)=>{
    if (err) throw err;
    callback(rows);
  })
}

//INSERT INTO 데이터를 추가
function insertcollection(img,name,writer,year,cont,callback){
  connection.query(`INSERT INTO bogo_collection(create_time,img,title,writer,collection_year,collection_cont) value (NOW(),'${img}','${name}','${writer}','${year}','${cont}')`,(err)=>{
    if (err) throw err;
    callback();
  })
}


//id 일치하는 데이터 추출
function getcollectionByid(id, callback){
  connection.query(`SELECT * FROM bogo_collection WHERE id = ${id}`, (err,row)=>{
    if (err) throw err;
    callback(row);
  })
}

//id가 일치하는 부분을 삭제하는 함수
function deleteByidcollec(id,callback){
  connection.query(`DELETE FROM bogo_collection WHERE id=${id}`,(err)=>{
    if (err) throw err;
    callback();
  })
}


//id가 일치하는 부분을 수정하는 함수
function updateprowrite(img,id,name,writer,year,cont,callback){
  connection.query(`UPDATE bogo_collection SET create_time= NOW(),img='${img}',title='${name}',writer='${writer}',collection_year='${year}',collection_cont='${cont}' WHERE id =${id}`,(err)=>{
    if (err) throw err;
    callback();
  })
}








//1226 유석 추가
//로그인연결//데이터
function logincheck(ids, pws, callback) {
  connection.query(
    `SELECT * FROM bogo_join WHERE ids = '${ids}' AND pws = '${pws}'`,
    (err, results) => {
      if (err) throw err;
      callback(results);
    }
  );
}
// 회원가입 연결//데이터
function Joins(ids, pws, repw, mail, names, callback) {
  connection.query(
    `INSERT INTO bogo_join (ids, pws,repw, mail, names) VALUES ('${ids}','${pws}','${repw}','${mail}','${names}')`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}





module.exports = {
  insertNoticeWrite,
  getnoticemain,
  getnoticecount,
  getnoticeById,
  getprenotice,
  getnxtnotice,
  updateNoticeWrite,
  deleteBynotice,

  //청아 추가
  getcollection,
  insertcollection,
  getcollectionByid,
  deleteByidcollec,
  updateprowrite,

  //유석 추가
  logincheck,
  Joins
}