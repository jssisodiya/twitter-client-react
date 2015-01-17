var TweetContainer = React.createClass({
    render: function(){
        return (
            <div className="main-container">
                <NavBar />
                <div className="container" style={{marginTop:'5%'}}>
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
                    <h3 style={{color: 'white'}} className="col-lg-offset-5">Twitter</h3>
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
    handleSubmit: function(e) {
        e.preventDefault();
        var screen_name = this.refs.screen_name.getDOMNode().value.trim();
        console.log(screen_name);
        if (!screen_name ) {
          return;
        }
        $.ajax({
            url: "home_timeline?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            async: false,
            success: function(homeData) {
                this.setState({home_timeline:homeData});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: "user_timeline?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            async: false,
            success: function(userData) {
                this.setState({user_timeline:userData});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: "favorites?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            async: false,
            success: function(userData) {
                this.setState({favorites:userData});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: "followers?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            async: false,
            success: function(userData) {
                this.setState({followers:userData});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        $.ajax({
            url: "friends?screen_name="+screen_name,
            dataType: 'json',
            type: 'GET',
            async: false,
            success: function(userData) {
                this.setState({following:userData});
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
                        <div className="row">
                            <form action="" className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label >Enter any user screen name</label>
                                    <input type="text" name="search_term" className="form-control" placeholder="eg. jsinghsisodiya, WeAreMumbai" ref="screen_name"/>
                                </div>
                                <button type="submit" className="btn btn-default btn-sm">Search</button>
                            </form>
                        </div>
                        <div className="row">
                            <ul className="nav nav-pills">
                                <li className="active">
                                    <a data-toggle="tab" href="#home-timeline-div">
                                        <i className="fa fa-home"></i>&nbsp;
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#user-timeline-div">
                                        <i className="fa fa-user"></i>&nbsp;
                                        User
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#favorites-div">
                                        <i className="fa fa-star"></i>&nbsp;
                                        Favorites
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#followers-div">
                                        <i className="fa  fa-mail-forward"></i>&nbsp;
                                        Followers
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#following-div">
                                        <i className="fa fa-mail-reply-all"></i>&nbsp;
                                        Following
                                    </a>
                                </li>
                            </ul>
                        </div>
                         <div className="tab-content">
                            <div id="home-timeline-div" className="tab-pane fade in active">
                                <TweetList data={this.state.home_timeline} />
                            </div>
                            <div id="user-timeline-div" className="tab-pane fade">
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
        return {data: []};
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var search_term = this.refs.search_term.getDOMNode().value.trim();
        console.log(search_term);
        if (!search_term ) {
          return;
        }
        $.ajax({
            url: "search?term="+escape(search_term),
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                this.setState({data: data});
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
                            <div className="row">
                                <form action="" className="form-inline" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" name="search_term" className="form-control" placeholder="Search with keywords/hashtags" ref="search_term"/>
                                    </div>
                                    <button type="submit" className="btn btn-default btn-sm">Search</button>
                                </form>
                            </div>
                            <div className="row" id="search-results">
                                <TweetList data={this.state.data} />
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
                            <div className="col-lg-1">
                                <img className="img-circle" src={this.props.image}/>
                            </div>
                            <div className="col-lg-11">
                                <label>{this.props.name} @{this.props.screenName}</label>
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

React.render(
  <TweetContainer />,
  document.getElementById('content')
);
