var categoria = "Gemplugs"
var get_webm
var get_mp4
var get_src_mp4 = document.getElementById("videoplay");

NextVideo()

function NextVideo() {

    var client = new XMLHttpRequest();
    client.open("POST", "https://api.scrolller.com/api/v2/graphql");
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(JSON.stringify({ "query": " query SubredditQuery( $url: String! $filter: SubredditPostFilter $iterator: String ) { getSubreddit(url: $url) { children( limit: 1 iterator: $iterator filter: $filter ) { iterator items { __typename url title subredditTitle subredditUrl redditPath isNsfw albumUrl isFavorite mediaSources { url width height isOptimized } } } } } ", "variables": { "url": `/r/${categoria}`, "filter": "VIDEO" }, "authorization": null }));

    client.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let text = JSON.parse(this.responseText)
            let urls = text.data.getSubreddit.children.items[0].mediaSources
            get_webm = urls.find(r => r.url.match("webm"))
            get_mp4 = urls.find(r => r.url.match("mp4"))

            if (get_webm) {
                get_src_mp4.setAttribute("src", get_webm.url.replace("-mobile", ""));
            } else {
                get_src_mp4.setAttribute("src", get_mp4.url.replace("-mobile", ""))

            }
        }
    }

}

