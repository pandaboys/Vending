const fs = require("fs");

module.exports = (bot) => {
    fs.readdir("./Events/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.log("읽을 이벤트가 존재 하지 않습니다.");
        console.log("───────────────────────────────────────────────────────────");
        console.log(`${jsfiles.length}개 의 이벤트 불러오는중..`);
        jsfiles.forEach((f, i) => {
            require(`./Events/${f}`);
        });
    });
    fs.readdir("./Commands/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.log("읽을 명령어가 존재 하지 않습니다.");
        console.log("───────────────────────────────────────────────────────────");
        console.log(`${jsfiles.length}개 의 명령어 불러오는중..`);
        jsfiles.forEach((f, i) => {
            require(`./Commands/${f}`);
        });
    });
    setTimeout(() => {  console.clear(); console.log(""); console.log("───────────────────────────　로그 ───────────────────────────"); }, 5000);
};