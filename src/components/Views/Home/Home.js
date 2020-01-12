import React, {Component} from 'react';
import classes from './Home.module.css';
import {NavLink} from 'react-router-dom';

class Home extends Component {

    createPageTop = () => {
        let top =
            <div className={classes.Top}>

                <div className={classes.Content}>
                    <h2>Your powerful task management solution</h2>
                    <p>Pick a tool that works for you. Tasks lets you plan, collaborate and track so you can achieve more and get work done.</p>
                    <div className={classes.Image}/>
                </div>

                <div className={classes.Right}/>
            </div>;
        return top;

    };

    createPageMiddle = () => {
        let middle =
            <div className={classes.Middle}>
                <div className={classes.DeadlineImage}/>
                <h2>Looking for a new way to manage your day?</h2>
                <p>Tasks offers a simple, intuitive task management solution that can be customized to suit your day specific needs. With features distinctly designed for personal use. Find out how exactly TASKS can help you manage your day better.</p>

            </div>;

        return middle;

    };

    createPageBottom = () => {

        let bottom =
            <div className={classes.Bottom}>
                <div>

                </div>

                <div>

                </div>
            </div>;

        return bottom;
    };

    createHeader = () => {
    let header =
        <div className={classes.Header}>
                <h1 className={classes.MainTitle}>Manage Less. Do More.</h1>
                <h1 className={classes.SeconderyTitle}>Manage your day in just one click.</h1>
            <NavLink
                exact
                to='/signUp'
                className={classes.Logo}
            >
                <button className={classes.Btn}>Get Started for Free</button>

            </NavLink>

        </div>;

    return header;
};



createLandingPage = () => {
        let header = this.createHeader();
        let top = this.createPageTop();
        let middle = this.createPageMiddle();
        let bottom = this.createPageBottom();

        let homePage =
            <div className={classes.Home}>
                {header}
                {top}
                {middle}
                {bottom}
            </div>;

        return homePage;
    };


    render() {
        let home = this.createLandingPage();
        return home;
    };
};

export default Home;
