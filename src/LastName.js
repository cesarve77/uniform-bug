import React from 'react';
import {connectField, filterDOMProps} from 'uniforms';


function Text({
                  disabled,
                  id,
                  inputRef,
                  label,
                  name,
                  onChange,
                  placeholder,
                  type,
                  value,
                  ...props
              }) {

    const _onChange=(event)=>{
        event.persist()
        setTimeout(()=>onChange(event.target.value),1000)
    }
    return (
        <div {...filterDOMProps(props)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                disabled={disabled}
                id={id}
                name={name}
                onChange={_onChange}
                placeholder={placeholder}
                ref={inputRef}
                type={type}
                value={value ?? ''}
            />
        </div>
    );
}

Text.defaultProps = {type: 'text'};

export default connectField(Text, {kind: 'leaf'});
