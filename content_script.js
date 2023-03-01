async function catsInstead() {
    let regexp;

    chrome.storage.local.get(["key"]).then((result) => {
        if (result.key === undefined || result.key == null || result.key == '') {
            return 0;
        }
        else {
            regexp = new RegExp(result.key, "gi");

            let imgTag = document.querySelectorAll('img');
            const sourceTag = document.querySelectorAll("source");
            const filteredImages = [];

            for (let image of imgTag) {
                if (
                    image.outerHTML.match(regexp) ||
                    image.baseURI.match(regexp) ||
                    image.src.match(regexp) ||
                    image.alt.match(regexp)
                ) {
                    filteredImages.push(image);
                }
            }

            for (let image of sourceTag) {
                if (image.outerHTML.match(regexp)) {
                    filteredImages.push(image);
                }
            }

            for (let node of filteredImages) {
                const newImage = node => `https://placekitten.com/${node.clientWidth || 400}/${node.clientHeight || 250}`;
                // or const newImage = node => `https://thiscatdoesnotexist.com/?width=${node.clientWidth || 400}&height=${node.clientHeight || 250}`;
                // or const newImage = node => `https://cataas.com/?width=${node.clientWidth || 400}&height=${node.clientHeight || 250}`;

                if (node.src) {
                    node.src = newImage(node);
                }

                if (node.srcset) {
                    node.srcset = newImage(node);
                }
            }
        }

    }).catch((error) => {
        console.error("CatsInstead Extension Error");
    });;


}

document.addEventListener("load", catsInstead);
document.addEventListener("DOMNodeInserted", catsInstead);

