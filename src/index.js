import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
import {AutoForm, AutoField}  from 'uniforms-unstyled';
import LastName from "./LastName";
import {SubmitField} from "uniforms-unstyled";


const schema = {
    title: 'Guest',
    type: 'object',
    properties: {
        firstName: {type: 'string'},
        lastName: {type: 'string'},
    },
    required: ['firstName', 'lastName'],
};

const ajv = new Ajv({allErrors: true, useDefaults: true});

function createValidator(schema) {
    const validator = ajv.compile(schema);

    return (model) => {
        validator(model);
        return validator.errors?.length ? {details: validator.errors} : null;
    };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);


ReactDOM.render(
    <AutoForm schema={bridge}
              onSubmit={(...args)=>console.log('onSubmit',...args)}
              onChange={(...args)=>console.log('onChange',...args)}
              onChangeModel={(...args)=>console.log('onChangeModel',...args)}
    >
        <AutoField name={'firstName'}/>
        <LastName name={'lastName'}/>
        <SubmitField/>
    </AutoForm>

    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
