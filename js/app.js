// var token = 'IGQVJYSThGZAGN4SkphZAlJCUkY2T25QTDh1Rm91QV9Cck5oOFlqTzhXTDZAtb3B5ME9tV3JKeU1ZARUVQUHhmM0hnNHNpd2tQZAzFZAWTlEa2hjMGNEaHBrWU80a3N2SEt6ZAlVzSW16NjdNcmZAkY0NfZAHI2RwZDZD'






var app = new Vue({
    el: '#app',
    data: {
        token:'IGQVJYSThGZAGN4SkphZAlJCUkY2T25QTDh1Rm91QV9Cck5oOFlqTzhXTDZAtb3B5ME9tV3JKeU1ZARUVQUHhmM0hnNHNpd2tQZAzFZAWTlEa2hjMGNEaHBrWU80a3N2SEt6ZAlVzSW16NjdNcmZAkY0NfZAHI2RwZDZD',
        albumId: '17985531010306288',
        media:[],
        album:[]

    },
    mounted:function(){
        this.getImages();
        this.getAlbum();

    },
    methods: {
        getImages: function(){
            var _this = this;
            axios.get('https://graph.instagram.com/me/media?fields=caption,media_url,media_type,permalink,username&access_token=' + this.token)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    console.log(response.data.data);
                    _this.media = response.data.data;
                    console.log(_this.media);
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
                    console.log('get Album');
                    //console.log(response);
                    //console.log(response.data.data);
                    _this.album = response.data.data;
                    console.log(_this.album);
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

