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
        return {home_timeline:[],user_timeline:[],favorites:[],followers:[],following:[]};
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
        $('#user-search-box').after("<span id='user-message'>fetching data for you</span>");
        $.ajax({
            url: "user_timeline?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({user_timeline:userData});
                $('#user-message').remove();
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
        $('#user-search-box').after("<span id='user-message'>fetching data for you</span>");
        $.ajax({
            url: "favorites?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({favorites:userData});
                $('#user-message').remove();
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
        $('#user-search-box').after("<span id='user-message'>fetching data for you</span>");
        $.ajax({
            url: "followers?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({followers:userData});
                $('#user-message').remove();
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
        $('#user-search-box').after("<span id='user-message'>fetching data for you</span>");
        $.ajax({
            url: "friends?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({following:userData});
                $('#user-message').remove();
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
        $('#user-search-box').after("<span id='user-message'>fetching data for you</span>");
        $.ajax({
            url: "user_timeline?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            success: function(userData) {
                this.setState({user_timeline:userData});
                $('#user-message').remove();
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
                            <form action="" className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group" style={{width:"92%"}}>
                                    <input type="text" name="search_term" className="form-control" style={{width:"100%"}} placeholder="Enter user screen name eg. jsinghsisodiya, WeAreMumbai" ref="screen_name"/>
                                </div>
                                <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div className="row">
                            <ul className="nav nav-pills">
                                <li className="active">
                                    <a data-toggle="tab" id="user-timeline-click" href="#user-timeline-div" onClick={this.handleUserTimelineClick}>
                                        <i className="fa fa-user"></i>&nbsp;
                                        User
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#favorites-div" onClick={this.handleFavoritesClick}>
                                        <i className="fa fa-star"></i>&nbsp;
                                        Favorites
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#followers-div" onClick={this.handleFollowersClick}>
                                        <i className="fa  fa-mail-forward"></i>&nbsp;
                                        Followers
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#following-div" onClick={this.handleFollowingClick}>
                                        <i className="fa fa-mail-reply-all"></i>&nbsp;
                                        Following
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
        return {data:[],trendsData:[]};
    },
    componentDidMount: function(){
        $.ajax({
            url: "trends",
            dataType: 'json',
            type: 'GET',
            async:false,
            success: function(data) {
                this.setState({trendsData:data});
                console.log("state is assigned with data");
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
        $('#search-box').after("<span id='search-message'>fetching data for you</span>");
        $.ajax({
            url: "search?term="+escape(search_term),
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                this.setState({data: data});
                $('#search-tab').click();
                $('#search-message').remove();
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
                                <form action="" className="form-inline" onSubmit={this.handleSubmit}>
                                    <div className="form-group" style={{width:"92%"}}>
                                        <input type="text" name="search_term" className="form-control" placeholder="Search with keywords/hashtags" style={{width:"100%"}} ref="search_term"/>
                                    </div>
                                    <button type="submit" className="btn btn-default"><i className="fa fa-search"></i></button>
                                </form>
                            </div>
                            <div className="row">
                                <ul className="nav nav-pills">
                                    <li className="active">
                                        <a data-toggle="tab" href="#trends-div">
                                            <i className="fa fa-home"></i>&nbsp;
                                            Trends
                                        </a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#search-res-div" id="search-tab">
                                            <i className="fa fa-user"></i>&nbsp;
                                            Search Results
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
                    <Tweet name={tweet.name} screenName={tweet.screenName} image={tweet.profile_image_url} text={tweet.text}>
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
    render: function(){
        return (
                <li className="list-group-item">
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

React.render(
  <TweetContainer />,
  document.getElementById('content')
);
