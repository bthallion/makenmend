import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

let currentItem = 'Container with Beads'

async function checkItems() {
	try {
		const response = await fetch("https://makeandmendshop.com/collections/shop-all?page=1", {
		  "headers": {
		    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		    "accept-language": "en-US,en;q=0.9,fi;q=0.8",
		    "cache-control": "max-age=0",
		    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
		    "sec-ch-ua-mobile": "?0",
		    "sec-fetch-dest": "document",
		    "sec-fetch-mode": "navigate",
		    "sec-fetch-site": "none",
		    "sec-fetch-user": "?1",
		    "upgrade-insecure-requests": "1"
		  },
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": null,
		  "method": "GET",
		  "mode": "cors",
		  "credentials": "include"
		});

		const doc = new DOMParser().parseFromString(await response.text(), "text/html")!;
		const item = doc.querySelector('.grid .grid--uniform')!
			.children[0]!
			.childNodes[5]!
			.textContent
			.split(/\W/)
			.filter(Boolean)
			.join(' ');
		if (item !== currentItem) {
			console.log('NEW ITEM ALERT', item);
		} else {
			console.log('No new items');
		}
	} catch (err) {
		console.log('Failed to get response', err);
	}

	setTimeout(checkItems, 5000);
}

checkItems();
