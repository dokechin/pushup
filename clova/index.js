const arrayShuffle = require('array-shuffle')
const uuid = require('uuid').v4
const _ = require('lodash')
const { DOMAIN, ExtensionId, DEBUG ,BOT_ACCESS_TOKEN} = require('../config')
var verifier = require('../util/verifier.js')
var SoxCommand = require('sox-audio');
const PUBLIC= "./public/clova";
const shortid = require('shortid');
const mp3Duration = require('mp3-duration');
const speeds = [60, 80, 100, 120];
const line = require('@line/bot-sdk');
const client = new line.Client({
  channelAccessToken: BOT_ACCESS_TOKEN //Messaging APIのアクセストークン
});

class Directive {
  constructor({namespace, name, payload}) {
    this.header = {
      messageId: uuid(),
      namespace: namespace,
      name: name,
    }
    this.payload = payload
  }
}

class CEKRequest {
  constructor (httpReq) {
    this.request = httpReq.body.request
    this.context = httpReq.body.context
    this.session = httpReq.body.session
    console.log(`CEK Request: ${JSON.stringify(this.context)}, ${JSON.stringify(this.session)}`)
  }

  do(cekResponse) {
    switch (this.request.type) {
      case 'LaunchRequest':
        return this.launchRequest(cekResponse)
      case 'IntentRequest':
        return this.intentRequest(cekResponse);
      case 'SessionEndedRequest':
        return this.sessionEndedRequest(cekResponse)
    }
  }

  launchRequest(cekResponse) {
    console.log('launchRequest')
    cekResponse.appendSpeechText({
      lang: 'ja',
      type: 'URL',
      value: `${DOMAIN}/drum-japanese2.mp3`
    })
    cekResponse.appendSpeechText("カウントする回数を指示してください")
    cekResponse.setMultiturn({state : 'initial'});
  }

  makePromise(command) {
    return new Promise( function(resolve, reject){
      command.on('start', function(commandLine) {
      });

      command.on('progress', function(progress) {
      });

      command.on('error', function(err, stdout, stderr) {
        console.log('Cannot process audio: ' + err.message);
        console.log('Sox Command Stdout: ', stdout);
        console.log('Sox Command Stderr: ', stderr)
        reject();
      });

      command.on('end', function (){
        console.log("end!!")
        resolve();
      })
    });
  }
  mp3duration(filename) {
    return new Promise( function(resolve, reject){
      mp3Duration(filename, function (err, duration) {
        if (err) {
          console.log(err.message);
          reject();
        }
        resolve(duration);
      })
    });
  }
  async makeAudio(count,speed){
    console.log("triming")

    var command1 = SoxCommand();
    var id = shortid.generate();
    var x = Math.floor((Math.random() * 7) + 1);
    command1.input(`${PUBLIC}/count_` + speed + '_' + x + '.wav');
    command1.output(`${PUBLIC}/generated_${id}.wav`).trim(0,count * (120 / speed));
  
    var promise1 = this.makePromise(command1);
    command1.run();
    await promise1;

    return id;
  }
  
  intentRequest(cekResponse) {
    var that = this;
    return new Promise( function(resolve, reject){

      console.log('intentRequest')
      console.dir(that.request)
      const intent = that.request.intent.name
      const slots = that.request.intent.slots
      var count = 10
      var speed = 80
      var type = ''
  
      switch (intent) {
      case 'CountIntent':
      case 'RepeatIntent':
        if (intent == "RepeatIntent"){
          if (that.session.sessionAttributes.state == 'end'){
            type = that.session.sessionAttributes.type;
            count = that.session.sessionAttributes.count;
            speed = that.session.sessionAttributes.speed;
          } else {
            cekResponse.appendSpeechText("腕立て10回のように指示してください")
            cekResponse.setMultiturn({state : 'error'});
            resolve();
          }
        } else {
          if (slots && slots.CountSlot && slots.CountSlot.value && slot.TypeSlot && slots.TypeSlot.value) {
            type = slots.TypeSlot.value
            count = slots.CountSlot.value
          }
          else {
            cekResponse.appendSpeechText("腕立て10回のように指示してください")
            cekResponse.setMultiturn({state : 'error'});
            resolve();
            return;
          }
          if (slots && slots.SpeedSlot && slots.SpeedSlot.value ) {
            speed = slots.SpeedSlot.value * 2;
            if (!speeds.includes(speed)){
              speed = 80;
            }
          }
          console.log("speed:" + speed)

          if (count < 1 || count > 100) {
            cekResponse.setSimpleSpeechText("カウント数は1から100の間で指定してください。") 
            cekResponse.setMultiturn({state : 'error'});
            resolve();
            return;
          }
        }
        cekResponse.appendSpeechText( type + count + "回")
        cekResponse.appendSpeechText({
          lang: 'ja',
          type: 'URL',
          value: `${DOMAIN}/info-girl1_info-girl1-youi1.mp3`
        })      

        cekResponse.appendSpeechText({
          lang: 'ja',
          type: 'URL',
          value: `${DOMAIN}/gong-played1.mp3`
        })      

        that.makeAudio(count, speed).then(function (id){
          cekResponse.appendSpeechText({
            lang: 'ja',
            type: 'URL',
            value: `${DOMAIN}/generated_${id}.wav`
          })    
    
          cekResponse.appendSpeechText({
            lang: 'ja',
            type: 'URL',
            value: `${DOMAIN}/gong-played2.mp3`
          })    
          cekResponse.setMultiturn({state : 'end', count: count, speed : speed});
          const userId = that.session.user.userId;
          client.pushMessage(userId, {
            type: 'text',
            text: type + count + '回、よくできました。'
          });
          resolve();
          return;
        })
        break;
      
      case 'Clova.GuideIntent': 
      default: 
        cekResponse.appendSpeechText("腕立て10回のように指示してください")
        cekResponse.setMultiturn({state : 'initial'});
        resolve();
      }
  
    });

  }

  sessionEndedRequest(cekResponse) {
    console.log('sessionEndedRequest')
    cekResponse.clearMultiturn()
  }
}

class CEKResponse {
  constructor () {
    console.log('CEKResponse constructor')
    this.response = {
      directives: [],
      shouldEndSession: true,
      outputSpeech: {}
    }
    this.version = '0.1.0'
    this.sessionAttributes = {}
  }

  setMultiturn(sessionAttributes) {
    this.response.shouldEndSession = false
    this.sessionAttributes = _.assign(this.sessionAttributes, sessionAttributes)
  }

  clearMultiturn() {
    this.response.shouldEndSession = true
    this.sessionAttributes = {}
  }

  setSimpleSpeechText(outputText, lang = 'ja') {
    this.response.outputSpeech = {
      type: 'SimpleSpeech',
      values: {
          type: 'PlainText',
          lang: lang,
          value: outputText,
      },
    }
  }

  appendSpeechText(outputText) {
    const outputSpeech = this.response.outputSpeech
    if (outputSpeech.type != 'SpeechList') {
      outputSpeech.type = 'SpeechList'
      outputSpeech.values = []
    }
    if (typeof(outputText) == 'string') {
      outputSpeech.values.push({
        type: 'PlainText',
        lang: 'ja',
        value: outputText,
      })
    } else {
      outputSpeech.values.push(outputText)
    }
  }
}

const clovaReq = async function (httpReq, httpRes, next) {
  const signature = httpReq.headers.signaturecek
  var cekResponse = new CEKResponse()
  var cekRequest = new CEKRequest(httpReq)
  if (!DEBUG) {
    try {
      verifier(signature, ExtensionId, JSON.stringify(httpReq.body))
    } catch (e) {
      return httpRes.status(400).send(e.message)
    }
  }
  await cekRequest.do(cekResponse)
  console.log(`CEKResponse: ${JSON.stringify(cekResponse)}`)
  return httpRes.send(cekResponse)
};

module.exports = clovaReq;
