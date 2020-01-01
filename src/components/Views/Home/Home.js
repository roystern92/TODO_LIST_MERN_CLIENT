import React, {Component} from 'react';
import classes from './Home.module.css';
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
                <h2>Looking For a Tailored Enterprise Solution?</h2>
                <p>MeisterTask Business offers large teams a simple, intuitive task management solution that can be customized to suit your business's specific needs. With features distinctly designed for enterprise use, such as: user roles, project access rights, time tracking, automations and more. Find out how exactly MeisterTask Business can help you and your team get more done together.</p>

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
                <button className={classes.Btn}>Get Started for Free</button>
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
