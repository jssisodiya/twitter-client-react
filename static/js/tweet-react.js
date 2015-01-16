var TweetContainer = React.createClass({
    render: function(){
        return (
            <div className="main-container">
                <NavBar />
                <SearchBox />
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

var data = [
  {"name": "Pete Hunt", "text": "This is one tweet", "screenName":"@PeteHunt", "profile_image_url" :"http://pbs.twimg.com/profile_images/527865014011432961/Tr3IDBXM_normal.jpeg"},
  {"name": "Jordan Walke", "text": "This is another tweet", "screenName" : "@jordanWalke", "profile_image_url" : "http://pbs.twimg.com/profile_images/425960656047579136/v2ZqO_bI_normal.jpeg"},
  {"name": "Jitendra Sisodiya", "text": "This is third tweet", "screenName" : "@jssisodiya", "profile_image_url" : "http://pbs.twimg.com/profile_images/425960656047579136/v2ZqO_bI_normal.jpeg"}
];

var SearchBox = React.createClass({
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
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        this.refs.search_term.getDOMNode().value = '';
        return;
    },
    render: function() {
        return (
            <div className="container-fluid"  style={{marginRight:'1%', marginTop:'5%'}}>
                // <div className="row">
                    <div className="panel panel-info col-lg-6 col-lg-offset-6">
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
                // </div>
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
                {tweetNodes}
            </div>
        );
    }
});

var Tweet = React.createClass({
    render: function(){
        return (
                <div className="tweet-container">
                    <div className="row">
                        <div className="col-lg-4">
                            <img src={this.props.image}/>{this.props.name} @{this.props.screenName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            {this.props.text}
                        </div>
                    </div>
                </div>
            );
    }
});

React.render(
  <TweetContainer />,
  document.getElementById('content')
);
