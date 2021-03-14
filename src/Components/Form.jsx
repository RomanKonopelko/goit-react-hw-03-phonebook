import { Component } from 'react'
import { v4 as randomID } from 'uuid';
import s from '../form.module.css'

export default class Form extends Component {
    state = {
        name: '',
        number: ''
    }

    phonenumber = (input) => {
        const phoneRegex = /^\d{10}$/;
        return input.match(phoneRegex) ? true : false
    }
    nameInputId = randomID();
    numberInputId = randomID();

    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    };

    handleChange = e => {
        const { value, name } = e.currentTarget;
        if (name === 'number') {
            if (isNaN(value)) {
                return
            }
        }
        if (name === 'name') {
            const letters = /^[a-zA-Z ]+(?:\s[a-zA-Z]+)?$/
            if (!value.match(letters) && value.length > 0) {
                return
            }
        }
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.name.length === 0) {
            return alert('Write your name')

        }
        if (!this.phonenumber(this.state.number)) {
            return alert('An invalid number')
        }
        this.props.onSubmit(this.state)
        this.reset();
    }


    render() {
        return <form className={s.form} onSubmit={this.handleSubmit}>
            <label htmlFor={this.nameInputId} className={s.label}>Name</label>
            <input
                type="text"
                id={this.nameInputId}
                className={s.input}
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder='your name'
            />
            <br />
            <label htmlFor={this.numberInputId} className={s.label}>Number</label>
            <input
                type="text"
                id={this.numberInputId}
                className={s.input}
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
                placeholder="1234567890"
            />
            <br />
            <button type="submit" className={s.button}>Add contact</button>
        </form>
    }
}