//기본설정

const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("./../db.js");

//메인페이지 연결
router.get("/", (req, res) => {
  res.render("main");
});

//1212석진 서브페이지 연결
//공지사항메인
router.get("/notice-main", (req, res) => {
  db.getnoticemain((rows) => {
    res.render("notice-main", {
      rows: rows,
    });
  });
});
//공지사항상세
router.get("/notice-detail", (req, res) => {
  res.render("notice-detail");
});
//공지사항작성
router.get("/notice-write", (req, res) => {
  res.render("notice-write");
});
//화가 장욱진
router.get("/artist-chang", (req, res) => {
  res.render("artist-chang");
});

//1221 석진 데이터베이스 연결

//파일 업로드 관련

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // done(null, 'public/upload/');
      done(null, "../public/upload/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //파일의 확장자
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); //파일명 + 날짜 + 확장자명
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

//메모 작성 notice write
router.post("/notice-writememo", upload.single("noticefile"), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let noticefile = "upload/" + req.file.filename;
  let noticetitle = param["notice-title"];
  let noticecont = param["notice-cont"];
  db.insertNoticeWrite(noticefile, noticetitle, noticecont, () => {
    res.redirect("/notice-main");
  });
});

//메모 수정

router.get("/notice-writememo-e", (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.getnoticeById(id, (row) => {
    res.render("notice-detailEdit", {
      row: row[0],
    });
  });
});

//수정시 넘어가는 데이터
router.post(
  "/notice-writememo-edit",
  upload.single("noticefile"),
  (req, res) => {
    let param = JSON.parse(JSON.stringify(req.body));
    let noticefile = "upload/" + req.file.filename;
    let noticetitle = param["notice-title"];
    let noticecont = param["notice-cont"];
    let id = param["id"];
    db.updateNoticeWrite(noticefile, noticetitle, noticecont, id, () => {
      res.redirect("/notice-main");
    });
  }
);

//데이터 삭제 시도

router.get("/notice-writememo-d", (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.deleteBynotice(id, () => {
    res.redirect("/notice-main");
  });
});

//메모 누를시 내용이 보이는거
router.get("/notice-detailM", (req, res) => {
  let id = req.query.id;
  db.getnoticecount(id, (row) => {
    db.getnoticeById(id, (row) => {
      res.render("notice-detailM", {
        row: row[0],
      });
      // console.log(row[0]);
    });
  });
});

//이전글 누를시 내용이 보이는거
router.get("/notice-detailMP", (req, res) => {
  let id = req.query.id;
  console.log(id);
  if (id > 1) {
    db.getprenotice(id, (row) => {
      db.getnoticeById(row[0].id, (rows) => {
        res.render("notice-detailM", {
          row: rows[0],
        });
        // console.log(row[0]);
      });
    });
  } else {
    res.send(
      `<script>alert('이전글이 존재하지 않습니다.');document.location="/notice-main";</script>`
    );
  }
  // console.log(row[0]);
});
//다음글 누를시 내용이 보이는거
router.get("/notice-detailMN", (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.getnxtnotice(id, (row) => {
    if (row.length == "0") {
      res.send(`
        <script>
          alert('다음글이 존재하지 않습니다.');document.location="/notice-main";
        </script>`);
    } else {
      db.getnoticeById(row[0].id, (rows) => {
        res.render("notice-detailM", {
          row: rows[0],
        });
        // console.log(row[0]);
      });
    }
    // console.log(row[0]);
  });
});

//1212청아 서브페이지 연결
//오시는 길 연결
router.get("/map", (req, res) => {
  res.render("map");
});
//공간소개 연결
router.get("/space", (req, res) => {
  res.render("space");
});
//전시 연결
router.get("/exhibition", (req, res) => {
  res.render("exhibition");
});
//관람안내 연결
router.get("/viewguide", (req, res) => {
  res.render("viewguide");
});

//소장품 연결
router.get("/collection", (req, res) => {
  db.getcollection((rows) => {
    res.render("collection", {
      rows: rows,
    });
  });
});

//소장품 작성페이지 연결
router.get("/collection_write", (req, res) => {
  res.render("collection_write");
});

router.post("/collection_w", upload.single("collection_img"), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let img = "upload/" + req.file.filename;
  let name = param["collection_name"];
  let writer = param["collection_writer"];
  let year = param["collection_year"];
  let cont = param["collection_cont"];
  db.insertcollection(img, name, writer, year, cont, () => {
    res.redirect("/collection");
  });
});

//삭제 collection_view 파일의 버튼에 있음
router.get("/deletecollec", (req, res) => {
  let id = req.query.id;
  db.deleteByidcollec(id, () => {
    res.redirect("/collection");
  });
});

//수정 collection_view 파일의 버튼에 있음
router.get("/updatecollec", (req, res) => {
  let id = req.query.id;
  db.getcollectionByid(id, (row) => {
    res.render("up_collection_write", {
      row: row[0],
    });
  });
});

//소장품 뷰어
router.get("/collection_view", (req, res) => {
  let id = req.query.id;
  db.getcollectionByid(id, (row) => {
    res.render("collection_view", {
      row: row[0],
    });
  });
});
router.post(
  "/up_collection_w",
  upload.single("up_collection_img"),
  (req, res) => {
    let param = JSON.parse(JSON.stringify(req.body));
    let img = "upload/" + req.file.filename;
    let id = param["up_collection_id"];
    let name = param["up_collection_name"];
    let writer = param["up_collection_writer"];
    let year = param["up_collection_year"];
    let cont = param["up_collection_cont"];
    db.updateprowrite(img, id, name, writer, year, cont, () => {
      res.redirect("/collection");
    });
  }
);

//12 16유석 서브페이지연결
//예약메인
router.get("/rev_main", (req, res) => {
  res.render("rev_main");
});
//예약상세
router.get("/rev_Detail", (req, res) => {
  res.render("rev_Detail");
});
//회원가입1//
router.get("/rev_join", (req, res) => {
  res.render("rev_join");
});
//회원가입 데이터 연결//
router.post("/writeJoin", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let names = param["names"];
  let mail = param["mail"];
  let ids = param["ids"];
  let pws = param["pws"];
  let repw = param["repw"];
  db.Joins(ids, pws, repw, mail, names, () => {
    res.redirect("/rev_login");
  });
});
//로그인
router.get("/rev_login", (req, res) => {
  res.render("rev_login");
});
router.post("/rev_login", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let ids = param["idd"];
  let pws = param["pwd"];
  db.logincheck(ids, pws, (results) => {
    if (results.length > 0) {
      res.send(
        `<script>alert("${ids}님 환영합니다!"); document.location.href="/rev_check"</script>`
      );
    } else {
      res.send(
        `<script>alert("로그인 또는 비밀번호가 틀립니다"); document.location.href="/rev_login"</script>`
      );
    }
  });
});
//예약 내역조회///
router.get("/rev_check", (req, res) => {
  res.render("rev_check");
});

module.exports = router;
