import React, {Component} from 'react';
import classes from './Test.module.css';

class Test extends Component {
    state = {
        fuck: null
    }


    componentDidMount() {
        console.log("FFFFFFF");
        this.props.history.push("/test/1");
    };






    render() {

        console.log(this.state.fuck);

        // let routes = 
        // <Switch>
        //     <Route path={this.props.match.url + "/list/:listName"} exact component={Loader} />
        //     <Route  path={this.props.match.url + "/list/edit/:listName"} exact component={Loader} />
        //     <Route  path={this.props.match.url + "/1"} exact component={Loader}/>
        // </Switch>;

        let routes =
            <div className={classes.Routes} >
                <div className={classes.Test2}>
                    {/*<input type="text" onBlur={() => {*/}
                        {/*this.setState({fuck: "asdfasdf"});*/}
                    {/*} } />*/}

                </div>

                <div className={classes.Test}>

                </div>

            </div>


        return routes;
    };

};


export default Test;