import React from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import './Signin.css'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://aqueous-thicket-26773.herokuapp.com/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            }
        })
        // .catch(err => console.log(err))
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className=" tc center br3 pa1 ba b--black-10 shadow-2">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Log In</legend>
                            <InputField name="Email" handleChange={this.onEmailChange} />
                            <InputField name="Password" handleChange={this.onPasswordChange} />
                        </fieldset>
                        <Button value="Sign In" handleSubmit={this.onSubmitSignIn} />
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}> Register </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default Signin;