
var app = new Vue({
    el: '#app',
    data: {
        token:'IGQVJYSThGZAGN4SkphZAlJCUkY2T25QTDh1Rm91QV9Cck5oOFlqTzhXTDZAtb3B5ME9tV3JKeU1ZARUVQUHhmM0hnNHNpd2tQZAzFZAWTlEa2hjMGNEaHBrWU80a3N2SEt6ZAlVzSW16NjdNcmZAkY0NfZAHI2RwZDZD',
        graphToken:'EAASXFlXGiowBAEZA1dvBFs3gE89DZAU1SkZB51DATdpVtWVCThlvrkZCFjKoYhwMtg9IgJmOcHM21DZBFLeJ5aHRFmtZBAYEgQjzGMiZBt0sDhIOxrNugxQo6w3pRgck5ZBWDwg80jLjjdgLDJB6ZC0G1RmNvCKoALZA0qTw9a49Hwnxthue0bB77N',
        albumId: '17985531010306288',
        instaUserId: '17841440982352962',
        graphAlbumId:'17881706284745087',
        media:[],
        album:[],
        graphApiMedia:[],
        graphApiAlbum:[],
        hashtagMedia:[],
        hashtagMediaTop:[],
    },
    mounted:function(){
        this.getImages();
        this.getAlbum();
        this.getGraphImages();
        this.getGraphAlbum();
        this.hashtagSearch();
        
    },
    methods: {
        getImages: function(){
            var _this = this;
            axios.get('https://graph.instagram.com/me/media?fields=caption,media_url,media_type,permalink,username&access_token=' + this.token)
                .then(function (response) {
                    // handle success
                    // console.log(response);
                    // console.log(response.data.data);
                    _this.media = response.data.data;
                    //console.log(_this.media);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        },

        getAlbum: function(){
            var _this = this;
            axios.get('https://graph.instagram.com/'+this.albumId+'/children?fields=media_url,media_type,permalink,username&access_token='+this.token)
                .then(function (response) {
                    // handle success
                    //console.log('get Album');
                    //console.log(response);
                    //console.log(response.data.data);
                    _this.album = response.data.data;
                    //console.log(_this.album);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        },
        getGraphImages: function(){
            // console.log('Graph API')
            var _this = this;
            axios.get('https://graph.facebook.com/'+this.instaUserId+'/media?fields=caption,media_url,media_type,permalink,username&access_token=' + this.graphToken)
                .then(function (response) {
                    // handle success
                    // console.log('Graph API Response')
                    // console.log(response);
                    // console.log(response.data.data);
                    _this.graphApiMedia = response.data.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        getGraphAlbum: function(){
            // console.log('get Graph Album');
            var _this = this;
            axios.get('https://graph.facebook.com/'+this.graphAlbumId+'/children?fields=media_url,media_type,permalink,username&access_token='+this.graphToken)
                .then(function (response) {
                    // handle success
                    // console.log('get Graph Album');
                    //console.log(response);
                    // console.log(response.data.data);
                    _this.graphApiAlbum = response.data.data;
                    // console.log(_this.graphApiAlbum);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        hashtagSearch: function(){ //returns a hashtag id which can be used to grab the hashtag media
            // console.log('hashtag search');
            var _this = this;
            axios.get('https://graph.facebook.com/ig_hashtag_search?user_id='+this.instaUserId+'&q=guitar&access_token='+this.graphToken)
                .then(function (response) {
                    // handle success
                    // console.log('hashtag search response');
                    //console.log(response);
                    // console.log(response);
                    _this.getHastagMedia(response.data.data[0].id);
                    _this.getHastagMediaTop(response.data.data[0].id);
                    //_this.graphApiAlbum = response.data.data;
                    //console.log(_this.graphApiAlbum);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
                
        },
        getHastagMedia: function(id){
            //{ig-hashtag-id}/recent_media?user_id={user-id}&fields={fields}
            // console.log('get hastag media');
            var _this = this;
            axios.get('https://graph.facebook.com/'+id+'/recent_media?user_id='+this.instaUserId+'&fields=media_url,media_type,permalink,caption'+'&access_token='+this.graphToken)
                .then(function (response) {
                    // handle success
                    // console.log('hashtag get media response');
                    //console.log(response);
                    // console.log(response);
                    //_this.hashtagMedia = response.data.data;
                    response.data.data.forEach(function(x){
                        if(x.media_type == "IMAGE")
                        _this.hashtagMedia.push(x);
                    });

                    //console.log(_this.graphApiAlbum);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        getHastagMediaTop: function(id){
            //{ig-hashtag-id}/recent_media?user_id={user-id}&fields={fields}
            // console.log('get hastag media top');
            var _this = this;
            axios.get('https://graph.facebook.com/'+id+'/top_media?user_id='+this.instaUserId+'&fields=media_url,media_type,permalink,caption'+'&access_token='+this.graphToken)
                .then(function (response) {
                    // handle success
                    // console.log('hashtag get media response');
                    //console.log(response);
                    // console.log(response);
                    //_this.hashtagMediaTop = response.data.data;

                    response.data.data.forEach(function(x){
                        if(x.media_type == "IMAGE")
                        _this.hashtagMediaTop.push(x);
                    });
                    // console.log(_this.hashtagMediaTop);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        }

    }
})

