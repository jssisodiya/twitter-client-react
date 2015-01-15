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

var SearchBox = React.createClass({
    render: function() {
        return (
            <div className="container-fluid"  style={{marginRight:'1%', marginTop:'5%'}}>
                <div className="row">
                    <div className="panel panel-info col-lg-6 col-lg-offset-6">
                        <div className="panel-body">
                            <input type="text" name="search_term" className="col-lg-3 form-control" placeholder="Search with keywords/hashtags"/>
                            <div className="col-lg-4" id="search-results">
                            </div>
                        </div>
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
