export const signInControls = {
    Email: {
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


    Password: {
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
    Name: {
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

    Gender: {
        elementType: 'select',
        elementConfig: {
            options:[
                {value:  'Male', displayValue: 'Male'},
                {value:  'Female' , displayValue: 'Female'}
            ]
        },
        value: 'Male',
        validation: {
            required: true,
        },
        valid: true,
        touched: false
    },

    Email: {
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

    Password: {
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










export const editProfileControl = {
    Name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },

    Gender: {
        elementType: 'select',
        elementConfig: {
            options:[
                {value:  'Male', displayValue: 'Male'},
                {value:  'Female' , displayValue: 'Female'}
            ]
        },
        value: 'Male',
        validation: {
            required: true,
        },
        valid: true,
        touched: false
    },

    Email: {
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

    Password: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: '******'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
    },

    Phone: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: '******'
        },
        value: '',
        validation: {
            required: true,
            minLength: 10
        },
        valid: false,
        touched: false
    },

    Birthday: {
        elementType: 'input',
        elementConfig: {
            type: 'date',
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }
};