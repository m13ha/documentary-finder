var currentVid = '';

var app = {
    vidGet: function (text) {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}documentary&type=video&videoEmbbeddable=true&maxResults=10&key=AIzaSyCTKSwKCtCvygxop6ceCc8Sf3HUuFwiN08`)
            .then(res => res.json())
            .then(data => this.vidCreate(data))
            .catch(data => this.errorMessage());
    },

    vidCreate: function (data) {
        let videos = data.items;
        let firstvid = videos[0].id.videoId;
        currentVid = firstvid;
        let vidContainer = $('.video-container');
        let vid = `<iframe class="video-frame" id="${firstvid}" height="405" src="https://www.youtube.com/embed/${firstvid}" frameborder="0"  encrypted-media" allowfullscreen></iframe>`;
        let title = `<h3>${videos[0].snippet.title}</h3>`
        vidContainer.append(title);
        vidContainer.append(vid);
        this.vidList(videos);
    },

    errorMessage: function () {
        let vidContainer = $('.video-container');
        vidContainer.addClass('error');
    },

    vidList: function (data) {
        var array = data;
        array.forEach(function (item, i) {
            let id = array[i].id.videoId;
            let snippet = item.snippet;
            let alternatives = $('.altList');
            let thumbnail = snippet.thumbnails.default;
            let img = `<li id="${id}"><img src="${thumbnail.url}" width="170" height="100">
                        <p>${snippet.title}</p>            
                        </li>`;
            alternatives.append(img);
        });
        this.vidChange()
    },

    vidChange: function () {
        let li = $('li');
        li.click(function (event) {
            let id = this.id;
            let p = this.querySelector('p');
            if (id === currentVid) {
                //do nothing
            } else {
                let vidContainer = $('.video-container');
                vidContainer.html(' ');
                let vid = `<iframe class="video-frame" id="${id}" height="405" src="https://www.youtube.com/embed/${id}" frameborder="0"  encrypted-media" allowfullscreen></iframe>`;
                let title = `<h3>${p.innerText}</h3>`
                vidContainer.append(title);
                vidContainer.append(vid);
                currentVid = id;
            }
        })
    },

    init: function () {
        let search = $('.searchBut');
        let doc = $('#searchText');
        search.click(function (e) {
            e.preventDefault();
            let searchText = $('#searchText').val();
            let text = searchText.replace(/\s/g, '+');
            if (searchText.length > 0) {
                let vidContainer = $('.video-container');
                vidContainer.html(' ');
                vidContainer.removeClass('error');
                let alternatives = $('.altList');
                alternatives.html(' ');
                app.vidGet(text);
                app.vidChange();

            } else {
                //do nothing
            }
        });

        doc.keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                let searchText = $('#searchText').val();
                let text = searchText.replace(/\s/g, '+');
                if (searchText.length > 0) {
                    let vidContainer = $('.video-container');
                    vidContainer.html(' ');
                    vidContainer.removeClass('error');
                    let alternatives = $('.altList');
                    alternatives.html(' ');
                    app.vidGet(text);
                    app.vidChange();
                };
            }
        });
    },


}


app.init();