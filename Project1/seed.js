var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var mongoose = require("mongoose");
var db = require('./models');

app.get('/scrape', function(req, res){

	var type =['','quell-nausea','stifle-hiccups','soothe-sore-throat','curb-cough','reduce-fever',
	'cool-burn','quiet-flatulence','stop-foot-odor','cut-cold-short','sweeten-bad-breath','soften-chapped-lips'
	,'relax-stiff-neck','end-snoring','beat-insomnia','revive-puffy-tired-eyes','whiten-stained-teeth',
	'prevent-headache','sidestep-hangover','relieve-menstrual-cramps','heal-dry-skin-rashes-and-eczema'];
	var url = 'http://www.prevention.com/health/healthy-living/natural-home-remedies/'

	for (var i=0; i<type.length; i++){
		url = url+type[i];


		url ='http://www.prevention.com/health/healthy-living/natural-home-remedies/';
	}
	var type2=['2,00.html','3,00.html','4,00.html','5,00.html','6,00.html','7,00.html','8,00.html','9,00.html',
				'10,00.html','11,00.html','12,00.html','13,00.html','14,00.html','15,00.html','16,00.html','17,00.html',
				'18,00.html'];
	var url2='http://www.health.com/health/gallery/0,,20669377_';
	for(i=0;i< type2.length;i++){
		url2= url2 + type2[i];

		url2='http://www.health.com/health/gallery/0,,20669377_';
	}

	var type3=['2,00.html','3,00.html','4,00.html','5,00.html','6,00.html','7,00.html','8,00.html','9,00.html',
				'10,00.html','11,00.html','12,00.html','13,00.html','14,00.html'];
	var url3='http://www.health.com/health/gallery/0,,20443624_';
	for(i=0;i< type3.length;i++){
		url3=url3 +type3[i];
		url3='http://www.health.com/health/gallery/0,,20443624_';
	}

	var type4=['1,00.html','2,00.html','3,00.html','4,00.html','5,00.html','6,00.html','7,00.html'];
	var url4='http://www.health.com/health/gallery/0,,20306929_'
	for(i=0;i< type4.length;i++){
		url4=url4 +type4[i];
		url4='http://www.health.com/health/gallery/0,,20443624_';
	}

	url5 ='http://www.everydayhealth.com/headache-migraine-pictures/8-home-remedies-for-headaches-and-migraines.aspx#01';
	url6=''
  //All the web scraping magic will happen here

});
 
 var keywords=["abrasion","acidity","acne","alcoholism","allergies","amnesia","anemia","angina","anorexia","appendicitis",
 "arthritis","arteriosclerosis","asthma","athlete's foot","backache","Bad breath","baldness","bed sores","bedwetting"
 ,"Belching","blackheads","body odor prespiration","body rash","boils","bone spurs","bronchitis","bruises","burning tongue",
 "burns","bursitis","canker sores","carpal tunner","cataract","chafing","cholesterol","chicken pox","cholera",
 "cirrhosis","cold sores","common cold","common fever","constipation","conjunctivitis"];
 var title='Aloe Vera Gel';
 var content ="Aloe vera is known to be one of the best home remedies for treating abrasions. This is because it helps in regenerating the skin tissues that are damaged.It is also known to be helpful in preventing the development of infection in the affected area, as it possesses antibacterial, antiviral and antifungal properties.The anti-inflammatory properties of this herb help in reducing the inflammation that affects those who have abrasions. This herb also helps in soothing the skin,as it possesses cooling properties. Health experts highly recommend the use of fresh aloe vera gel to treat abrasions. You can extract the juice by squeezing the juice of an aloe vera plant and apply it to the skin.";
 var title2='Gotu Kola';
 var content2= 'Gotu kola is a plant that is part of the parsley family and helps in treating abrasions effectively. The University of Michigan Health System states that gotu kola is effective in treating abrasions, as it possesses anti-oxidant properties that help in speeding up the process of healing. Gotu kola is effective in treating all types of abrasions, including deep abrasions. It is also known to be helpful in preventing large scars from developing after the wound has healed completely, as it decreases the production of collagen. In order to treat abrasions using gotu kola, you can either take it orally or apply it to the affected area. The University of Maryland Medical Centre recommends the usage of a topical cream that contains around 1 per cent of gotu kola for skin abrasions.';
 var title3='Astragalus';
 var content3='Astragalus is an effective herb that has been used extensively in Chinese medicine in order to treat a host of ailments. Astragalus is known to possess anti-bacterial and anti-inflammatory properties that help in the treatment of abrasions.Astragalus helps in the prevention as well as treatment of infections that may affect those who suffer from abrasions. The dried root of this herb is used to treat health conditions. You can take astragalus orally by making use of tablets and capsules or you can apply it to your skin in the form of a topical cream. Health experts suggest a dosage of 250-500 mg of this extract, four times in a day. The University of Maryland Medical Centre recommends the usage of a topical cream that contains around 10 per cent of astragalus. Do not apply the cream to an open wound without permission from your doctor, as it can be harsh on the open wound.';
 var title4='Green Tea';
 var content4='Green tea is considered to be effective in the treatment of several health conditions. The University of Maryland Medical Centre states that green tea possesses astringent properties that are known to be helpful in the treatment of wounds and controlling bleeding. It is also known to possess anti-oxidant properties that help in preventing damage to the cells by free radicals. You can consume around 2-3 cups of green tea each day in order to treat abrasions.'
 var title5='Turmeric';
 var content5="Turmeric is a beneficial herb that has been used for centuries to treat a host of health conditions. Turmeric is used widely in cooking as it adds flavour and colour to the food.Turmeric is used in Chinese and ayurvedic medicine to treat problems such as digestive conditions, liver problems and skin diseases. This is due to the fact that it possesses anti-inflammatory and anti-oxidant properties. Curcumin, an active ingredient present in turmeric is considered to be helpful in the treatment of abrasions as it prevents the body from the damage caused by free radicals. The antiseptic and antibacterial properties of turmeric help in preventing as well as treating any infection that may occur because of an abrasion. You can consume turmeric by adding it to your food or you can also consume it in the form of a supplement. It is recommended that you consult your doctor regarding the dosage of this herb as it can trigger side effects such as nausea and vomiting, when consumed in high amounts. You can also apply some turmeric paste to the affected area in order to treat this condition.";
 var title6='Burdock';
 var content6='Burdock is an effective herb that may prove to be beneficial in the treatment of abrasions. This is due to the fact that it possesses anti-inflammatory, anti-oxidant and anti-bacterial properties that may prove to be helpful in speeding up the process of healing as well as to prevent the occurrence of an infection in the wound.The dried root of this herb is used to treat several health conditions and is available in the form of a powder supplement. This herb is also available in the form of a cream that can be applied to your skin to promote healing. It is important that you avoid applying burdock directly to open wounds, unless recommended by your doctor. You can also prepare a tincture of this herb and apply a clean cloth soaked in the tincture, to the affected area. If you are suffering from dehydration, it is highly recommended that you avoid consuming burdock as it has the effect of a diuretic on the body, thereby causing the problem of dehydration to get worse.';
 var title7='Honey';
 var content7='Honey is considered to be very effective in the treatment of abrasions. Honey has been widely used for centuries in order to treat a host of skin ailments as it possesses anti-bacterial properties.It also acts as a disinfectant that helps in preventing the occurrence of any infection due to the abrasion. You can treat this condition by consuming honey orally or by applying it topically to the skin. To treat abrasions by consuming honey, add around three to four tablespoons of honey to warm water and consume it. This remedy is considered to be effective in reducing the pain associated with this condition. You could also apply some honey to the affected area to bring about a speedy recovery from the abrasions.';
 var title8='Slippery Elm';
 var content8='Slippery elm is a common herbal remedy that has been used extensively in order to treat skin conditions that are accompanied by inflammations. This herb has been used to treat boils, burns, eczema, psoriasis and abrasions, as it possesses anti-inflammatory properties.The inner bark of this herb is powdered and dried, and is used to treat a host of ailments. In order to treat abrasions by using slippery elm, you can consume it in the form of a tea by adding around 4-5 grams of the dried root to 2 cups of boiling water. Health experts suggest that you consume this tea at least three times in a day to treat this condition. You could also apply this herb topically to your skin by making a paste from the dried root of this herb. To prepare this paste, you should add the powdered form of the bark to boiling water, until it becomes a thick paste. You can apply it to the abrasion to relieve the pain and inflammation associated with it. It is highly recommended that you avoid applying the paste to an open abrasion.';
 var title10='Thyme Tea';
 var content10="Thyme tea is considered to be an effective remedy for treating abrasions as it possesses antiseptic, antifungal and antibacterial properties. This herb is also known to exhibit antioxidant properties and is able to promote healing of the abrasions. It is also helpful in preventing as well as treating any infection that may develop as a result of the abrasion.";
 var title11='Onions';
 var content11="Onions are known to possess antioxidant properties that help in stimulating the immune system of the body. This must be done in order to destroy the bacteria that trigger infections in the abrasion. Health experts highly recommend topical application of onion paste on the abrasions to reduce the risk of developing an infection as well as to boost the recovery of the wounds";
 var title12='Foods that contain Good Carbohydrates';
 var content12="Carbohydrates are the main energy source required by your body to promote the healing of abrasions.However, it is important that you consume good carbohydrates in your diet as refined carbohydrates can deter the healing process of the abrasion. Foods that contain high amount of good carbohydrates are oats, quinoa, whole wheat bread, brown rice and legumes";
 var title13='Abrasion Prevention';
 var content13='A person may suffer from abrasions by carrying out regular day-to-day activities. However, if you are involved in sports activities such as skateboarding, cricket or rugby, it is highly recommended that you make use of suitable protective gear to prevent the occurrence of abrasions.'
//for (i=0; i< keywords.length; i++){
	var key= {
		content : keywords[0]
	}
	db.Keyword.create(key, function (error, keyw){
		if(error){
			console.log("error :", error);
		}
		console.log("the keyword created successfully", keyw);
		db.Advice.create({title:title,
			content:content,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/Aloe.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);

		});
		db.Advice.create({title:title2,
			content:content2,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/gotocola.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);

		});
		db.Advice.create({title:title3,
			content:content3,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/astragalus.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);

		});
		db.Advice.create({title:title4,
			content:content4,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/astragalus.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);

		});
		db.Advice.create({title:title5,
			content:content5,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/turmeric_abration.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);

		});
		db.Advice.create({title:title6,
			content:content6,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/burdock.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);

		});
		db.Advice.create({title:title7,
			content:content7,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/honey_abration.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);
		});
		
		db.Advice.create({title:title8,
			content:content8,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/slipperyelm.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);
		});
		
		db.Advice.create({title:title10,
			content:content10,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/thymetea.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);
		});
		db.Advice.create({title:title11,
			content:content11,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/onion.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);
		});
		db.Advice.create({title:title12,
			content:content12,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/foodscarbo.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);
		});
		db.Advice.create({title:title13,
			content:content13,
			keywords:[],
			img:'http://www.natural-homeremedies.com/images/herbal/AbrasionPrevention.jpg'}, 
			function (error, adviceNew){
			if(error){
				console.log('error : ',error);
			}
			adviceNew.keywords.push(keyw);
			adviceNew.save();
			console.log("advice created with successfully", adviceNew);
		});
		//process.exit();
	});
//}

 


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;