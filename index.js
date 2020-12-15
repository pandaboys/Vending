const { License, licensedes }= require('./License/license.json')
const Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { adminid, prefix, status, Token, maxmoney, minmoney, setmoney } = require('./lib/set.json');
const commandrecently = new Set();

var warning = "false";
var ss = 0 ;

if(!Number(maxmoney) || !Number(minmoney) || !Number(setmoney) || Number(prefix.length) !== 1){
	var mms = "문제 없음"
	var mis = "문제 없음"
	var stm = "문제 없음"
	var ppm = "문제 없음"
	if(Number(prefix.length) !== 1){
		ppm = "문제 발생 - 한 글자의 prefix로 설정하세요. ( 예 : !, ?, -, +)"
	}
	if(!Number(maxmoney)){
		mms = "문제 발생 - 숫자로 입력하세요."
	}
if(!Number(minmoney)){
		mis = "문제 발생 - 숫자로 입력하세요."
	}	
	if(!Number(setmoney)){
		stm = "문제 발생 - 숫자로 입력하세요."
	}
	console.log("자판기봇을 실행하기 전, set.json파일이 제대로 저장되었는지 확인해주세요. 오류가 발생했습니다.");
	console.log(mms);
	console.log(mis);
	console.log(stm);
	console.log(ppm);
		stopp = 1 ;
}




fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("커맨드 파일을 찾을 수 없습니다\ncommand 폴더가 존재하는지 확인해주세요.\n");
        return;
    }

    console.log("──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────");
    //console.log(`${jsfile.length}개 의 명령어 불러오는중..`);
    
    var i = 0;
    console.clear()
    
    jsfile.forEach(jsfilesx => { 
        
        var jsfiles = jsfilesx.split(".js")[0] 
        
        try{
        console.log(`✅ㅣ${jsfiles}(이)가 성공적으로 불러왔습니다.`)
        i++;
        }catch(err){
        console.log(`❌ㅣ${jsfiles}(이)가 불러오는데 에러가 났습니다.`)
        console.log(err);
        }
    })
    console.log("──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────");
       
    
    console.log(`✅ㅣ${i}개 의 명령어를 정상적으로 불러왔습니다.`)
    setTimeout(function(){
    	console.clear()
    	
    	}, 1000); 
    	 
    

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
    });
});
setTimeout(function(){
    client.on('ready', () => {

        console.log("─────────────────────────────────────────────────────────정보──────────────────────────────────────────────────────────");
        
        console.log(`봇 이름 : ${client.user.username}`)
        console.log(`봇 아이디 : ${client.user.id}`)
        console.log("라이센스 여부 : "+License)
        console.log(licensedes)
        console.log("─────────────────────────────────────────────────────────로그──────────────────────────────────────────────────────────");
        
        
            setInterval(function() {
            if(ss == 0){     
            client.user.setActivity("최고급 센텀핵                                                                                  ", { url: 'https://www.twitch.tv/yosamonov1', type: 'STREAMING' });
            ss = ss + 1;
            }else{
                const xizy = client.users.cache.array().find(m => m.id === "703885094011797554")
                const xizy_tag = xizy.username + "#" + xizy.discriminator
                client.user.setActivity('충전문의 : '+xizy_tag+'                                                                                 ', { url: 'https://www.twitch.tv/yosamonov1', type: 'STREAMING' });
            ss = ss - 1;
            }
    
        }, 5000)
    
    
    });
}, 1000)


client.on('message', message =>{

    if(message.guild !== null){
    if(message.channel.id !== "710881590443638834" && message.channel.id !== "710878363857977404") return;
    }
    


	let vending = JSON.parse(fs.readFileSync('./data/discordvending.json', 'utf8'));
	let hacklist = JSON.parse(fs.readFileSync('./data/list.json', 'utf8'));
    let hack = JSON.parse(fs.readFileSync('./data/hack.json', 'utf8'));
    let receipt = JSON.parse(fs.readFileSync('./data/receipt.json', 'utf8'));
    let setting = JSON.parse(fs.readFileSync('./data/setting.json', 'utf8'));
    let charge = JSON.parse(fs.readFileSync('./data/charge.json', 'utf8')); 
    let commandlogging = JSON.parse(fs.readFileSync('./log/command.json', 'utf8')); 

    function msgadmin(description){
      	 
        if(setting["server"].admin == null ||setting["server"].admin === ""){
                client.users.cache.get(adminid).send(description);
            return;
        }
        
        client.users.cache.get(adminid).send(description)
        
        var admin1 = setting["server"] .admin;
    
    admin1.split(" ").forEach( admin => {
        
        if(admin === "") return;
        client.users.cache.get(admin).send(description)
        
    })
    
    }

    function catchErr(err, message, a) {
        msgadmin("💥 오류가 발생했습니다 ! 💥");
         msgadmin("```" + err + "```");
     }

     try{
let sender = message.author;

function logging(ox){

    var d = new Date(); 
    var data = d.getFullYear() + "-" + ( d.getMonth() + 1 ) + "-" + d.getDate()

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
 
    var currentDate = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
   
    const logdes = message.author.tag+`(${message.author.id})님이 `+ cmd.slice(prefix.length) + " 명령어 실행." + "\n오류 : " + ox
    
    const logdescription = {
        time : data + " " +currentDate,
        user : message.author.tag + "(" + message.author.id + ")",
        usage: cmd.slice(prefix.length),
        error : ox
    }

    commandlogging.push(logdescription)

    fs.writeFile('./log/command.json', JSON.stringify(commandlogging, null, 2), err => {
        if (err) throw err;
    });

 }

function makecode(length) {
	var result = '';
	var characters = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허기니디리미비시이지치키티피히그느드르므브스으즈츠크트프흐구누두루무부수우주추쿠투푸후고노도로모보소오조초코토포호교뇨됴료묘뵤쇼요죠쵸쿄툐표효겨녀뎌려며벼셔여져쳐켜텨펴혀갸냐댜랴먀샤뱌야쟈챠캬탸퍄햐배재대개새매내애래해캐태채패베제데게세메네에레헤케테체페밥밪받박밧밤반방발밯밬밭밫밮잡잦잗작잣잠잔장잘잫잨잩잧잪각갑갖갇갓감간강갈갛갘같갗갚';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function makecode2(length) {
	var result = '';
	var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwerfyuiopasdfghjklzxcbm₩!@#%&?^><';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function makesimembed(title) {
	const mesd = new Discord.MessageEmbed() 
			.setColor("#303136")
			.setTitle("**"+title+"**")
		message.channel.send(mesd);
}


        
function makeembed(title, des, color) {
    if(color == "1"){
    const mesd = new Discord.MessageEmbed() 
        		.setColor("#303136")
            	.setTitle("**"+title+"**")
				.setDescription(des);
				
            message.channel.send(mesd);
    }else{
        	const mesd = new Discord.MessageEmbed() 
            	.setColor(color)
            	.setTitle("**"+title+"**")
            	.setDescription(des);
            	 		 	
            message.channel.send(mesd);
        	}
            
        }

    if(message.author.bot) return;
		
if (message.guild == null) {
    let today = new Date();
    
        console.log(`${today.toLocaleString()}ㅣ${message.author.tag}ㅣ` + message.content);
    }	
	
    if (!message.content.startsWith(prefix)) return;
    
    if (!message.content.startsWith(prefix + "서버설정") && !message.content.startsWith(prefix + "재고목록") && !message.content.startsWith(prefix + "백업") && !message.content.startsWith(prefix + "복원") && !message.content.startsWith(prefix + "종료") && !message.content.startsWith(prefix + "핀코드") && !message.content.startsWith(prefix + "충전수락") && !message.content.startsWith(prefix + "충전취소")) {
        if (message.content.startsWith(prefix)) {
    
            if (message.guild !== null){
            var rolec = "설정됨";
            var accc = "설정됨";
    
            if (!setting["server"]) {
                var rolec = "설정되지 않음"
                var accc = "설정되지 않음"
            } else {
                if (!setting["server"].role) {
                    var rolec = "설정되지 않음"
                } else if (!message.guild.roles.cache.find(role => role.name === setting["server"].role)) {
                    var rolec = "유효하지 않은 역할"
                }
                if (!setting["server"].acc) {
                    var accc = "설정되지 않음";
                }
            }
            if (warning === "false") {
                if (!setting["server"]) {
                    makeembed("자판기봇을 시작하기 위해선 서버 설정을 해주셔야 합니다!\n아래에 설정하시지 않은 설정이 있습니다. ``" + prefix + "서버설정``으로 마저 설정해주세요!", "역할 설정 : " + rolec + "\n계좌 설정 : " + accc, 1)
                    warning = "true";
                    return;
                }
                if (!setting["server"].role || !setting["server"].acc) {
                    makeembed("자판기봇을 시작하기 위해선 서버 설정을 해주셔야 합니다!\n아래에 설정하시지 않은 설정이 있습니다. ``" + prefix + "서버설정``으로 마저 설정해주세요!", "역할 설정 : " + rolec + "\n계좌 설정 : " + accc, 1)
                    warning = "true";
                    return;
                }
                if (!message.guild.roles.cache.find(role => role.name === setting["server"].role)) {
                    makeembed("자판기봇을 시작하기 위해선 서버 설정을 해주셔야 합니다!\n아래에 설정하시지 않은 설정이 있습니다. ``" + prefix + "서버설정``으로 마저 설정해주세요!", "역할 설정 : " + rolec + "\n계좌 설정 : " + accc, 1)
                    warning = "true";
                    return;
                }
            } else if (warning === "true") {
                return;
              }
         }
      }
    }
    
    

    
    if (message.content.startsWith(prefix)) {
        if( message.guild !== null ) {
        if (commandrecently.has("cooltime")) {
            //checkpointw
            message.delete({
                reason: ''
            })
    
            const mesd11 = new Discord.MessageEmbed()
                .setColor("#303136")
                .setTitle('**너무 연속적으로 메세지를 보냅니다...**')
    
            message.channel.send(mesd11).then(message => message.delete({
                timeout: 1000,
                reason: ''
            }));
            return;
        } else {
            commandrecently.add("cooltime");
            setTimeout(() => {
                commandrecently.delete("cooltime");
            }, 1700);
        }
    }
    }
    if(message.content.startsWith(prefix + '봇핑')) {
        var tos = 0;
        if(Math.round(client.ws.ping) <= 100){
                tos = "좋습니다"
        }else if(Math.round(client.ws.ping) < 150 && Math.round(client.ws.ping) > 100){
                tos ="괜찮습니다."
        }else if(150 <= Math.round(client.ws.ping)){
                tos = "안 좋습니다."
        }

makesimembed("오늘은 핑이 "+Math.round(client.ws.ping) + 'ms로 '+tos)

}
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	let commandfile = client.commands.get(cmd.slice(prefix.length));

    if(commandfile){
        try{      
            commandfile.run(client,message,args,commandrecently)
            error = "null"
                 }catch(err){
             error = err
                 }finally{
                     logging(error)
                 }
    }
    
}catch (err) {
    catchErr(err, message);
    message.channel.send('**! X ! [::ㅣwarningㅣ::] ! X !\n\n에러가 발생하였습니다.\n``'+err+'``**');
    console.log(err);
  }  

});
client.login(Token);
