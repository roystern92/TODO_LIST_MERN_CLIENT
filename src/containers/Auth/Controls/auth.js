export const signInControls = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'exemple@site.com'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },

    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: '******'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    }
};

export const signUpControls = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'John Doe'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'exemple@site.com'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },

    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: '******'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    }
};