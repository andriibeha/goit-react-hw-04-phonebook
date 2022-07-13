import React, { Component } from "react";
import { nanoid } from 'nanoid';
import s from './Form.module.css';

class Form extends Component {
    state = {
        name: "",
        number: "",
        id: ""
    };

    inputNameId = nanoid();
    inputTelId = nanoid();

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
            id: nanoid()
        });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            name: "",
            number: "",
            id: ""
        })
    };
    
    render() { 
        return (
            <div>
                <form onSubmit={this.handleSubmit} className={s.form}>
                    <label htmlFor={this.inputNameId} className={s.label}>Name:</label>
                    <input onInput={this.handleInputChange}
                        className={s.input}
                        value={this.state.name}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        id={this.inputNameId}
                    />
                    
                    <label htmlFor={this.inputTelId} className={s.label}>Number:</label>
                        <input onInput={this.handleInputChange}
                        className={s.input}
                        value={this.state.number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            id={this.inputTelId}
                    />
                        
                    <button type="submit" className={s.button}>Add contact</button>
                </form>
            </div>
        );
    }
}
 


export default Form;