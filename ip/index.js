//axios import buraya gelecek
import axios from 'axios';
var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");

async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
	 return response.data
	})

	
	.then(function (a) {
		benimIP=a
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
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
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

const cardOlusturma = (veri) => {

	const divCard = document.createElement("div");
	divCard.classList.add("card");
  
	const imgCard = document.createElement("img");
	const divCardInfo = document.createElement("div");
	const h3Ip = document.createElement("h3");
	const pUlke = document.createElement("p");
	const pEnlemBoylam = document.createElement("p");
	const pSehir = document.createElement("p");
	const pSaat = document.createElement("p");
	const pPara = document.createElement("p");
	const pISP = document.createElement("p");
  
	imgCard.src = veri.data["ülkebayrağı"];
	divCardInfo.classList.add("card-info");
	h3Ip.classList.add("ip");
	pUlke.classList.add("ulke");
  
	h3Ip.textContent = veri.data.sorgu;
	pUlke.textContent = `${veri.data.ülke} (${veri.data.ülkeKodu})`;
	pEnlemBoylam.textContent = `Enlem: ${veri.data.enlem} Boylam: ${veri.data.boylam}`;
	pSehir.textContent = `Şehir: ${veri.data.bölgeAdı}`;
	pSaat.textContent = `Saat dilimi: ${veri.data.saatdilimi}`;
	pPara.textContent = `Para birimi: ${veri.data.parabirimi}`;
	pISP.textContent = `ISP: ${veri.data.isp}`;
  
	divCardInfo.appendChild(h3Ip);
	divCardInfo.appendChild(pUlke);
	divCardInfo.appendChild(pEnlemBoylam);
	divCardInfo.appendChild(pSehir);
	divCardInfo.appendChild(pSaat);
	divCardInfo.appendChild(pPara);
	divCardInfo.appendChild(pISP);
  
	divCard.appendChild(imgCard);
	divCard.appendChild(divCardInfo);
	return divCard;
  };

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/
const divCard2 = document.querySelector("div.cards");

const axiosCekme = async () => {
  await ipAdresimiAl();

  axios
    .get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
    .then((resp) => {
      return resp;
    })
    .then((veriler) => {
      divCard2.appendChild(cardOlusturma(veriler));
    })
    .catch(new Error("Hata"));
};

axiosCekme();


/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek