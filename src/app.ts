const countries: any = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}
class Translate {
    textarea = document.querySelectorAll('textarea')
    exchangeEl=document.getElementById('exchange') as HTMLSpanElement
    selectTag = document.querySelectorAll('select')
    btnicon=document.querySelectorAll('.ts-btn-icon') 
    btn = document.getElementById('translatebtn') as HTMLButtonElement
    constructor() {
        this.addoption()
        this.Translate()
        this.exchange()
        this.btnevent()
    }
    addoption() {
        this.selectTag.forEach((select, id) => {
            for (const cs in countries) {
                let selected = '';
                if (id == 0 && cs == 'fa-IR') {
                    selected = 'selected'
                } else if (id == 1 && cs == 'en-GB') {
                    selected = 'selected'

                }
                let options = `<option value="${cs}" ${selected}>${countries[cs]}</option>`
                select.insertAdjacentHTML('beforeend', options)
            }
        })
    }
    Translate() {
        this.btn.addEventListener('click', () => {

            let text = this.textarea[0].value
            let translateFrom = this.selectTag[0].value
            let translateTo = this.selectTag[1].value
            if(text=='') text=' '
            let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
            fetch(apiUrl).then(res => res.json()).then(data => {
                this.textarea[1].value = data.responseData.translatedText
            }).catch(errpr => {
                this.textarea[1].value="oops there are errors do not honor"
            })
        })


    }
    exchange(){
        this.exchangeEl.addEventListener('click',()=>{
            let tm=this.textarea[0].value
            this.textarea[0].value=this.textarea[1].value
            this.textarea[1].value=tm
            let ex=this.selectTag[0].value
            this.selectTag[0].value=this.selectTag[1].value
            this.selectTag[1].value=ex
        })
    }
    btnevent(){

        this.btnicon.forEach(icon=>{
            icon.addEventListener('click',({target})=>{
            if(icon.textContent?.trim()=="content_copy"){
                if(icon.getAttribute('data-id')=='from'){
                    navigator.clipboard.writeText(this.textarea[0].value)
                }else{
                    navigator.clipboard.writeText(this.textarea[1].value)

                }
            }else{
                let utter;
                if(icon.getAttribute('data-id')=='from'){
                    utter=new SpeechSynthesisUtterance(this.textarea[0].value)
                    utter.lang=this.selectTag[0].value
                }else{
                    utter=new SpeechSynthesisUtterance(this.textarea[1].value)
                    utter.lang=this.selectTag[1].value
                }
                speechSynthesis.speak(utter)
            }
        
            })
        })
    }
}
new Translate