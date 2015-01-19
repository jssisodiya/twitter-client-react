var TweetContainer = React.createClass({
    render: function(){
        return (
            <div className="main-container">
                <NavBar />
                <div className="container" style={{marginTop:'3%'}}>
                    <div className="row">
                        <UserSeachBox />
                        <TweetSearchBox />
                    </div>
                </div>
            </div>
        );
    }
})

var NavBar = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <i className="fa fa-3x fa-twitter col-lg-offset-6" style={{color:"white;"}}></i>
                </div>
            </nav>
        );
    }
});

//dummy tweets
// var data = [
//   {"name": "Pete Hunt", "text": "This is one tweet", "screenName":"@PeteHunt", "profile_image_url" :"http://pbs.twimg.com/profile_images/527865014011432961/Tr3IDBXM_normal.jpeg"},
//   {"name": "Jordan Walke", "text": "This is another tweet", "screenName" : "@jordanWalke", "profile_image_url" : "http://pbs.twimg.com/profile_images/425960656047579136/v2ZqO_bI_normal.jpeg"},
//   {"name": "Jitendra Sisodiya", "text": "This is third tweet", "screenName" : "@jssisodiya", "profile_image_url" : "http://pbs.twimg.com/profile_images/425960656047579136/v2ZqO_bI_normal.jpeg"}
// ];

var UserSeachBox = React.createClass({
    getInitialState:function(){
        return {home_timeline:[],user_timeline:[],favorites:[],followers:[],following:[],isUserFetched:false,isFavoriteFetched:false,isFollowersFetched:false,isFollowingFetched:false};
    },
    // handleHomeTimelineClick:function(){
    //     var screen_name = this.refs.screen_name.getDOMNode().value.trim();
    //     console.log(screen_name);
    //     if (!screen_name ) {
    //       return;
    //     }
    //     $('#user-search-box').after("<span id='user-message'>fetching data for you</span>");
    //     $.ajax({
    //         url: "home_timeline?screen_name="+screen_name,
    //         dataType: 'json',
    //         type: 'GET',
    //         success: function(homeData) {
    //             this.setState({home_timeline:homeData});
    //             $('#user-message').remove();
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }.bind(this)
    //     });
        
    // },
    handleUserTimelineClick:function(){
        var screen_name = this.refs.screen_name.getDOMNode().value.trim();
        console.log(screen_name);
        if (!screen_name ) {
          return;
        }
        this.setState({isUserFetched:true});
        $.ajax({
            url: "user_timeline?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({user_timeline:userData});
                this.setState({isUserFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleFavoritesClick:function(){
        var screen_name = this.refs.screen_name.getDOMNode().value.trim();
        console.log(screen_name);
        if (!screen_name ) {
          return;
        }
        this.setState({isFavoriteFetched:true});
        $.ajax({
            url: "favorites?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({favorites:userData});
                this.setState({isFavoriteFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },
    handleFollowersClick:function(){
        var screen_name = this.refs.screen_name.getDOMNode().value.trim();
        console.log(screen_name);
        if (!screen_name ) {
          return;
        }
        this.setState({isFollowersFetched:true});
        $.ajax({
            url: "followers?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({followers:userData});
                this.setState({isFollowersFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleFollowingClick:function(){
        var screen_name = this.refs.screen_name.getDOMNode().value.trim();
        console.log(screen_name);
        if (!screen_name ) {
          return;
        }
        this.setState({isFollowingFetched:true});
        $.ajax({
            url: "friends?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({following:userData});
                this.setState({isFollowingFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var screen_name = this.refs.screen_name.getDOMNode().value.trim();
        console.log(screen_name);
        if (!screen_name ) {
          return;
        }
        this.setState({isUserFetched:true});
        $.ajax({
            url: "user_timeline?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({user_timeline:userData});
                this.setState({isUserFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        
        return;
    },
    render: function(){
        return (
                <div className="panel panel-info col-lg-6">
                    <div className="panel-body">
                        <div className="row" id="user-search-box">
                            <form action="" className="" onSubmit={this.handleSubmit}>
                                <div className="input-group" style={{width:"100%"}}>
                                    <input type="text" name="search_term" className="form-control" style={{width:"92%",height:'28px'}} placeholder="Enter user screen name eg. jsinghsisodiya, WeAreMumbai" ref="screen_name"/>
                                    <span className="input-group-button">
                                        <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                                    </span>
                                </div>
                                
                            </form>
                        </div>
                        <div className="row">
                            <ul className="nav nav-pills">
                                <li className="active">
                                    <a data-toggle="tab" id="user-timeline-click" href="#user-timeline-div" onClick={this.handleUserTimelineClick}>
                                        <i className="fa fa-user"></i>&nbsp;
                                        User { this.state.isUserFetched ? <i className="fa fa-refresh fa-spin"></i> : null }
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#favorites-div" onClick={this.handleFavoritesClick}>
                                        <i className="fa fa-star"></i>&nbsp;
                                        Favorites { this.state.isFavoriteFetched ? <i className="fa fa-refresh fa-spin"></i> : null }
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#followers-div" onClick={this.handleFollowersClick}>
                                        <i className="fa  fa-mail-forward"></i>&nbsp;
                                        Followers { this.state.isFollowersFetched ? <i className="fa fa-refresh fa-spin"></i> : null }
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#following-div" onClick={this.handleFollowingClick}>
                                        <i className="fa fa-mail-reply-all"></i>&nbsp;
                                        Following { this.state.isFollowingFetched ? <i className="fa fa-refresh fa-spin"></i> : null }
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <br/>
                         <div className="tab-content">
                            <div id="user-timeline-div" className="tab-pane fade in active">
                                <TweetList data={this.state.user_timeline} />
                            </div>
                            <div id="favorites-div" className="tab-pane fade">
                                <TweetList data={this.state.favorites} />
                            </div>
                            <div id="followers-div" className="tab-pane fade">
                                <UserList data={this.state.followers} />
                            </div>
                            <div id="following-div" className="tab-pane fade">
                                <UserList data={this.state.following} />
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
});

// var UserTimeline = React.createClass({

// });

var TweetSearchBox = React.createClass({
    getInitialState: function() {
        return {data:[],trendsData:[],isTrendsFetched:false,isSearchFetched:false};
    },
    componentDidMount: function(){
        this.setState({isTrendsFetched:true});
        $.ajax({
            url: "trends",
            dataType: 'json',
            type: 'GET',
            async:false,
            success: function(data) {
                this.setState({trendsData:data});
                this.setState({isTrendsFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var search_term = this.refs.search_term.getDOMNode().value.trim();
        console.log(search_term);
        if (!search_term ) {
          return;
        }
        this.setState({isSearchFetched:true});
        $.ajax({
            url: "search?term="+escape(search_term),
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                this.setState({data: data});
                $('#search-tab').click();
                this.setState({isSearchFetched:false});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        return;
    },
    render: function() {
        return (
                    <div className="panel panel-info col-lg-6">
                        <div className="panel-body">
                            <div className="row" id="search-box">
                                <form action="" className="" onSubmit={this.handleSubmit}>
                                <div className="input-group" style={{width:"100%"}}>
                                    <input type="text" name="search_term" className="form-control" style={{width:"92%",height:'28px'}} placeholder="Search with keywords/Hashtags" ref="search_term"/>
                                    <span className="input-group-button">
                                        <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                                    </span>
                                </div>
                                
                            </form>
                            </div>
                            <div className="row">
                                <ul className="nav nav-pills">
                                    <li className="active">
                                        <a data-toggle="tab" href="#trends-div">
                                            <i className="fa fa-home"></i>&nbsp;
                                            Trends { this.state.isTrendsFetched ? <i className="fa fa-refresh fa-spin"></i> : null }
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#search-res-div" id="search-tab">
                                            <i className="fa fa-user"></i>&nbsp;
                                            Search Results { this.state.isSearchFetched ? <i className="fa fa-refresh fa-spin"></i> : null }
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <br/>
                            <div className="tab-content">
                                <div id="trends-div" className="tab-pane fade in active">
                                    <TrendList data={this.state.trendsData} />
                                </div>
                                <div id="search-res-div" className="tab-pane fade">
                                    <TweetList data={this.state.data} />
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
});


var TweetList = React.createClass({
    // getInitialState: function() {
    //     return {data: []};
    // },
    render: function(){
        var tweetNodes = this.props.data.map(function (tweet) {
            return (
                    <Tweet name={tweet.name} screenName={tweet.screenName} image={tweet.profile_image_url} text={tweet.text} retweet_count={tweet.retweet_count} favorite_count={tweet.favorite_count} created_at={tweet.created_at} entities={tweet.entities}>
                    </Tweet>
            );
        });
        return (
            <div className="tweetList">
                <ul className="list-group">
                    {tweetNodes}
                </ul>
            </div>
        );
    }
});

var Tweet = React.createClass({
    showHide:function(){
        if(this.state.showInfo)
            this.setState({showInfo:false});
        else
            this.setState({showInfo:true});
    },
    getInitialState: function(){
        return {showInfo:false};
    },
    render: function(){
        return (
                <li className="list-group-item" onClick={this.showHide}>
                        <div className="row">
                            <div className="col-lg-2">
                                <img className="img-circle" src={this.props.image}/>
                            </div>
                            <div className="col-lg-10">
                                <label>{this.props.name} <a target="_blank" href={'http://www.twitter.com/'+this.props.screenName}>@{this.props.screenName}</a></label>
                                <br/>
                                {this.props.text}
                            </div>
                        </div>
                        { this.state.showInfo ? <TweetMoreInfo retweet_count={this.props.retweet_count} favorite_count={this.props.favorite_count} created_at={this.props.created_at} entities={this.props.entities} /> : null }
                </li>
            );
    }
});

var UserList = React.createClass({
    render: function(){
        var userNodes = this.props.data.map(function (user) {
            return (
                    <Tweet name={user.name} screenName={user.screenName} image={user.profile_image_url} followers_count={user.followers_count} friends_count={user.friends_count}>
                    </Tweet>
            );
        });
        return (
            <div className="userList">
                <ul className="list-group">
                    {userNodes}
                </ul>
            </div>
        );
    }
});

var User = React.createClass({
    render: function(){
        return (
                <li className="list-group-item">
                        <div className="row">
                            <div className="col-lg-1">
                                <img className="img-circle" src={this.props.image}/>
                            </div>
                            <div className="col-lg-11">
                                <label>{this.props.name} @{this.props.screenName}</label>
                                <br/>
                                <label>Followers : {this.props.followers_count}</label>
                                <label>Following : {this.props.friends_count}</label>
                            </div>
                        </div>
                </li>
            );
    }
});

var TrendList = React.createClass({
    render: function(){
        var trendNodes = this.props.data.map(function(trend){
            return (
                    <Trend name={trend.name} url={trend.url}>
                    </Trend>
                );
        })
        return (
            <div className="trendList">
                <ul className="list-group">
                    {trendNodes}
                </ul>
            </div>
            );
    }
});

var Trend = React.createClass({
    render:function(){
        return (
                <div className="trendContainer">
                    <li className="list-group-item">
                        <a href={this.props.url} target="_blank">{this.props.name}</a>
                    </li>
                </div>
            );
    }
});

var TweetMoreInfo =React.createClass({
    render:function(){
        // var hashtags = this.props.data.map(function(trend){
        //     return (
        //             <Trend name={trend.name} url={trend.url}>
        //             </Trend>
        //         );
        // });
        var hashtags = this.props.entities.hashtags;
        var user_mentions = this.props.entities.user_mentions;
        var urls = this.props.entities.urls;
        console.log(urls);
        return (
            <div className="expand">
                <div className="col-lg-offset-2">
                    <label className="h4" style={{margin:'1%',color:'lightblue'}}><i className="fa fa-retweet"></i><strong>{this.props.retweet_count}</strong></label>
                    <label className="h4" style={{margin:'1%',color:'lightblue'}}><i className="fa fa-star"></i><strong>{this.props.favorite_count}</strong></label>
                </div>
                <div className="col-lg-offset-2">
                    <label>{this.props.created_at.replace(' +0000','')}</label>
                </div>
                <div className="col-lg-offset-2">
                    {hashtags.length ? <Hashtags hashtags={hashtags} /> : null}
                    {user_mentions.length ? <Mentions mentions={user_mentions} /> : null}
                    {urls.length ? <Urls urls={urls} /> : null}
                </div>
            </div>
            );
        
    }
});

var Hashtags = React.createClass({
    render:function(){
        var hashtags = this.props.hashtags.map(function(hashtag){
            return (
                    <Hashtag text={hashtag.text}></Hashtag>
                );
        })
        return(
                <div>{hashtags}</div>
            );
    }
});

var Hashtag = React.createClass({
    render:function(){
        return(
            <a target="_blank" href={"http://www.twitter.com/search?q="+this.props.text}>#{this.props.text} </a>
            );
    }
});

var Mentions = React.createClass({
    render:function(){
        var mentions = this.props.mentions.map(function(mention){
            return (
                    <Mention screen_name={mention.screen_name}></Mention>
                );
        })
        return(
                <div>{mentions}</div>
            );
    }
});

var Mention = React.createClass({
    render:function(){
        return(
            <a target="_blank" href={"http://www.twitter.com/"+this.props.screen_name}>@{this.props.screen_name} </a>
            );
    }
});

var Urls = React.createClass({
    render:function(){
        var urls = this.props.urls.map(function(url){
            return (
                    <Url display_url={url.display_url}></Url>
                );
        })
        return(
                <div>{urls}</div>
            );
    }
});

var Url = React.createClass({
    render:function(){
        return(
            <a target="_blank" href={'http://'+this.props.display_url}>{this.props.display_url} </a>
            );
    }
});



React.render(
  <TweetContainer />,
  document.getElementById('content')
);
