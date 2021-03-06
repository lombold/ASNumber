function nsGhipUtil_load(){
	
	var tabId = parseInt(window.location.hash.replace('#','')) ;
	
	var asn = chrome.extension.getBackgroundPage().asn[tabId]  ;

	for (var i in asn ){
		var a = document.createElement('a');
		var br = document.createElement('br');
		a.href = 'https://bgp.he.net/AS'+asn[i].asn;
		a.text = "AS" + asn[i].asn + ' ' + asn[i].asname;
		var im = document.createElement('img');
		im.src = "icons/clipboard.png";
		im.data = {asn : asn[i].asn};
		im.className="copy";
		im.onclick = copyToClipboard ;
		document.querySelector('#asn').appendChild(im);
		document.querySelector('#asn').appendChild(a);
		document.querySelector('#asn').appendChild(br);
	}
	
	
	var ips = chrome.extension.getBackgroundPage().ipData[tabId]  ;
	var prefix = chrome.extension.getBackgroundPage().prefix[tabId]  ;
	for (var i in asn ){
		var docFragment = document.createDocumentFragment();
		var text = document.createTextNode("AS: " + asn[i].asn);
		docFragment.appendChild(text);

		var br = document.createElement('BR');
		docFragment.appendChild(br);
		var text_0 = document.createTextNode("Prefixes: " + asn[i].prefixes);
		docFragment.appendChild(text_0);

		var br_0 = document.createElement('BR');
		docFragment.appendChild(br_0);
		var text_1 = document.createTextNode("AS name: " + asn[i].asname);
		docFragment.appendChild(text_1);

		var br_1 = document.createElement('BR');
		docFragment.appendChild(br_1);
		var text_2 = document.createTextNode("AS desc: " + asn[i].asdesc);
		docFragment.appendChild(text_2);

		var br_2 = document.createElement('BR');
		docFragment.appendChild(br_2);
		var text_3 = document.createTextNode("Country: " + asn[i].country);
		docFragment.appendChild(text_3);

		var br_3 = document.createElement('BR');
		docFragment.appendChild(br_3);
		var text_4 = document.createTextNode("RIR: " + asn[i].rir);
		docFragment.appendChild(text_4);

		var br_4 = document.createElement('BR');
		docFragment.appendChild(br_4);
		for (var p in prefix[asn[i].asn]){
			var text_5 = document.createTextNode("Prefix: " + prefix[asn[i].asn][p]);
			docFragment.appendChild(text_5);
			var br_5 = document.createElement('BR');
			docFragment.appendChild(br_5);
		}
		var br_6 = document.createElement('BR');
		docFragment.appendChild(br_6);
		var br_7 = document.createElement('div')
		docFragment.appendChild(br_7);

		document.querySelector('#asns').appendChild(docFragment);
		for (var count in ips[asn[i].asn] ){
			var a = document.createElement('div');
			var text = document.createTextNode(ips[asn[i].asn][count].hostname + ' ('+ips[asn[i].asn][count]['type'].join(", ")+') : ' + count);
			a.appendChild(text)
			document.querySelector('#ips').appendChild(a);
		}
	}
	
}
window.addEventListener("load", nsGhipUtil_load ,false);

function copyToClipboard(){
	var copyFrom = document.createElement("textarea");
	  copyFrom.textContent = this.data.asn;
	  var body = document.getElementsByTagName('body')[0];
	  body.appendChild(copyFrom);
	  copyFrom.select();
	  document.execCommand('copy');
	  body.removeChild(copyFrom);  
	  this.style.border= "1px solid red";
	  var that  = this;
	  setTimeout(function(){
		  that.style.border = 'none';
	  },1000);
}

