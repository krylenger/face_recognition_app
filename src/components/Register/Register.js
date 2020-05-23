import React from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://aqueous-thicket-26773.herokuapp.com/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            }
        })
    }
    render() {
        return (
            <article className=" tc center br3 pa1 ba b--black-10 shadow-2">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <InputField name="Name" handleChange={this.onNameChange} />
                            <InputField name="Email" handleChange={this.onEmailChange} />
                            <InputField name="Password" handleChange={this.onPasswordChange} />
                        </fieldset>
                        <Button value="Register" handleSubmit={this.onSubmitSignIn} />
                    </div>
                </main>
            </article>
        );
    }
    
}

export default Register;