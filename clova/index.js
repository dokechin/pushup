const arrayShuffle = require('array-shuffle')
const uuid = require('uuid').v4
const _ = require('lodash')
const { DOMAIN, ExtensionId, DEBUG } = require('../config')
var verifier = require('../util/verifier.js')

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
        return this.intentRequest(cekResponse)
      case 'SessionEndedRequest':
        return this.sessionEndedRequest(cekResponse)
    }
  }

  launchRequest(cekResponse) {
    console.log('launchRequest')
    cekResponse.appendSpeechText({
      lang: 'ja',
      type: 'URL',
      value: '${DOMAIN}/drum-japanese2.mp3'
    })
    cekResponse.appendSpeechText("10まで数えて、のように指示してください")
    cekResponse.setMultiturn({mode : 'play'});
  }

  intentRequest(cekResponse) {
    console.log('intentRequest')
    console.dir(this.request)
    const intent = this.request.intent.name
    const slots = this.request.intent.slots
    var count = 10

    switch (intent) {
    case 'CountIntent':
      if (slots && slots.CountSlot && slots.CountSlot.value ) {
        count = slots.CountSlot.value
      }
      else {
        cekResponse.setSimpleSpeechText("10まで数えて、のように指示してください") 
        break
      }
      if (count < 1 || count > 100) {
        count = 10
      }
      cekResponse.appendSpeechText({
        lang: 'ja',
        type: 'URL',
        value: '${DOMAIN}/info-girl1_info-girl1-start1.mp3'
      })
      var spart = false
      for(var i=0;i<count;i++){
        cekResponse.appendSpeechText({
          lang: 'ja',
          type: 'URL',
          value: `${DOMAIN}/` + (i+1) + '.mp3'
        })
        if (i == count) {
          break;
        }
        if(i > count*0.8 && !spart){
          spart = true
          cekResponse.appendSpeechText({
            lang: 'ja',
            type: 'URL',
            value: `${DOMAIN}/line-girl1_line-girl1-atochotto1.mp3`
          })  
        } else {
          var value = Math.random();
          if (value > 0.8) {
            cekResponse.appendSpeechText({
              lang: 'ja',
              type: 'URL',
              value: `${DOMAIN}/line-girl1_line-girl1-ganbare1.mp3`
            })
          } else if ( value > 0.6){
            cekResponse.appendSpeechText({
              lang: 'ja',
              type: 'URL',
              value: `${DOMAIN}/line-girl1_line-girl1-sonotyoushisonotyousi1.mp3`
            })
          } else {
            cekResponse.appendSpeechText({
              lang: 'ja',
              type: 'URL',
              value: `${DOMAIN}/mute_01sec.mp3`
            })
          }
        }
      }
      cekResponse.appendSpeechText({
        lang: 'ja',
        type: 'URL',
        value: `${DOMAIN}/mute_01sec.mp3`
      })
      cekResponse.appendSpeechText({
        lang: 'ja',
        type: 'URL',
        value: `${DOMAIN}/info-girl1_info-girl1-yokudekimashita1.mp3`
      })
      break;
    case 'Clova.GuideIntent': 
    default: 
      cekResponse.setSimpleSpeechText("10まで数えて、のように指示してください") 
  }
    cekResponse.setMultiturn({mode : 'play'});
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

const clovaReq = function (httpReq, httpRes, next) {
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
  cekRequest.do(cekResponse)
  console.log(`CEKResponse: ${JSON.stringify(cekResponse)}`)
  return httpRes.send(cekResponse)
};

module.exports = clovaReq;
