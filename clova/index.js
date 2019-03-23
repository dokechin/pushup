const arrayShuffle = require('array-shuffle')
const uuid = require('uuid').v4
const _ = require('lodash')
const { DOMAIN, ExtensionId, DEBUG } = require('../config')
var verifier = require('../util/verifier.js')
const b = [
  'info-girl1_info-girl1-ichi1.mp3',
  'info-girl1_info-girl1-ni1.mp3',
  'info-girl1_info-girl1-san1.mp3',
  'info-girl1_info-girl1-yon1.mp3',
  'info-girl1_info-girl1-go1.mp3',
  'info-girl1_info-girl1-roku1.mp3',
  'info-girl1_info-girl1-nana1.mp3',
  'info-girl1_info-girl1-hachi1.mp3',
  'info-girl1_info-girl1-kyuu1.mp3'
];

const t = [
  ['info-girl1_info-girl1-zyu1.mp3', 'info-girl1_info-girl1-zyuu2.mp3'],
  ['info-girl1_info-girl1-nizyuu1.mp3', 'info-girl1_info-girl1-nizyuu2.mp3'],
  ['info-girl1_info-girl1-sanzyuu1.mp3', 'info-girl1_info-girl1-sanzyu1.mp3'],
  ['info-girl1_info-girl1-yonzyuu1.mp3', 'info-girl1_info-girl1-yonzyu1.mp3'],
  ['info-girl1_info-girl1-gozyuu1.mp3', 'info-girl1_info-girl1-gozyu1.mp3'],
  ['info-girl1_info-girl1-rokuzyuu1.mp3', 'info-girl1_info-girl1-rokuzyuu1.mp3'],
  ['info-girl1_info-girl1-nanazyuu1.mp3', 'info-girl1_info-girl1-nanazyu1.mp3'],
  ['info-girl1_info-girl1-hachizyuu1.mp3', 'info-girl1_info-girl1-hachizyu1.mp3'],
  ['info-girl1_info-girl1-kyuuzyuu1.mp3', 'info-girl1_info-girl1-kyuuzyu1.mp3'],
  ['info-girl1_info-girl1-hyaku1.mp3', ''],
];

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
    cekResponse.appendSpeechText("カウントする回数を言ってね")
    cekResponse.setMultiturn({mode : 'play'});
  }

  intentRequest(cekResponse) {
    console.log('intentRequest')
    console.dir(this.request)
    const intent = this.request.intent.name
    const slots = this.request.intent.slots

    switch (intent) {
    case 'CountIntent':
      var count = slots.CountSlot.value
      if (count < 1 || count > 100) {
        count = 10
      }
      for (var i=0; i < count; i++) {
        var ten = Math.floor((i+1) / 10)
        if ( ten > 0 ) {
          cekResponse.appendSpeechText({
            lang: 'ja',
            type: 'URL',
            value: `${DOMAIN}/` + ((i+1) % 10 == 0)? t[ten-1][0] : t[ten-1][1]
          })
        }
        if ((i+1) % 10 != 0){
          console.log(ten)
          console.log(i)

          cekResponse.appendSpeechText({
            lang: 'ja',
            type: 'URL',
            value: `${DOMAIN}/` + b[i]
          })
        }
      }
      break;
    case 'Clova.GuideIntent': 
    default: 
      cekResponse.setSimpleSpeechText("カウントする数を言ってね") 
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
      outputSpeech: {},
      card: {},
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
