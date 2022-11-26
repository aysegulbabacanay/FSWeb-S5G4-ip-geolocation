//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	{
  "sorgu":"88.236.241.246",
  "durum":"OK",
  "kıta":"Asia",
  "ülke":"Turkey",
  "ülkeKodu":"TR",
  "ülkebayrağı":"https:\/\/apis.ergineer.com\/ulkebayraklari\/TR",
  "bölge":"34",
  "bölgeAdı":"Istanbul",
  "şehir":"Istanbul",
  "zip":"34110",
  "enlem":41.01970000000000027284841053187847137451171875,
  "boylam":28.975699999999999789679350215010344982147216796875,
  "saatdilimi":"Europe\/Istanbul",
  "parabirimi":"TRY",
  "isp":"TurkTelecom",
  "organizasyon":"Turk Telekomunikasyon A.S",
  "as":"AS47331 TTNet A.S."
}
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
function cardMarker(object){
let divcard_=document.createElement("div");
divcard_.classList.add("card");

let img_=document.createElement("img");
// img_.setAttribute("src", object["ülkebayrağı"]) ;
img_.src=object["ülkebayrağı"]
divcard_.appendChild(img_)

let divCardInfo_=document.createElement("div");
divCardInfo_.classList.add("card-info");
divcard_.appendChild(divCardInfo_)

let h3_=document.createElement("h3");
h3_.classList.add("ip");
h3_.textContent=object["sorgu"];
divCardInfo_.appendChild(h3_)

let ulke =document.createElement("p");
ulke.classList.add("ülke");
ulke.textContent=object["ülke"] + " ("+ object["ülkeKodu"]+")";
divCardInfo_.appendChild(ulke)


let enlem=document.createElement("p");
enlem.textContent= `Enlem: ${object["enlem"]} Boylam: ${object["boylam"]}` ;
divCardInfo_.appendChild(enlem)

let sehir=document.createElement("p");
sehir.textContent= object["şehir"] ;
divCardInfo_.appendChild(sehir)


let saat=document.createElement("p");
saat.textContent= `Saat dilimi : ${object["saatdilimi"]}` ;
divCardInfo_.appendChild(saat)

let para=document.createElement("p");
para.textContent= `Para birimi : ${object["parabirimi"]}` ;
divCardInfo_.appendChild(para)

let isp=document.createElement("p");
isp.textContent= `ISP: ${ object["isp"]}` ;
divCardInfo_.appendChild(isp)


return divcard_;
}
let cards = document.querySelector(".cards");

async function getData(){
  await ipAdresimiAl();
 axios
 .get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
.then(response=>{
  return response.data;
})
.then (function (ipDatasi){
  cards.appendChild(cardMarker(ipDatasi));
});

  }

  getData()




















