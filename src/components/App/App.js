import React, { Component } from "react";
import From from "../Form/Form";
import ContactList from "../ContactList/ContactList";
import Filter from "../Form/Form";
import s from './App.module.css'


class App extends Component { 
    state = {
        contacts: [],
        filter: ""
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);

        if (parsedContacts) { 
            this.setState({ contacts: parsedContacts })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) { 
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    };

    onSubmit = data => {
        let findName = this.state.contacts.find(item => item.name === data.name)

        if (findName) { 
            return alert(`${data.name} is already in contact`)
        } else { 
            this.setState(({contacts}) => ({
            contacts: [...contacts, data]
            }))
            
        }
    };

    onFilter = (e) => {
        this.setState({filter: e.target.value})
    };

    handleClickDeleteBtn = (id) => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(
                contact => contact.id !== id
            )
        }))
    }

    getVisibleContacts = () => {
        const { contacts, filter } = this.state
        const filterTolowerCase = filter.toLowerCase();

        return contacts.filter(
            contact => contact.name.toLowerCase().includes(filterTolowerCase) 
        )
    };

    render() { 
        const { filter } = this.state;
        const visibleContacts = this.getVisibleContacts()

        return (
            <div className={s.container}>
                <h1>Phonebook</h1>
                <From
                    onSubmit={this.onSubmit}
                />

                <h2>Contacts</h2>
                <Filter
                    value={filter}
                    onChange={this.onFilter}
                />

                <ContactList
                    contacts={visibleContacts}
                    onDeleteClick={this.handleClickDeleteBtn}
                />
            </div>
        ) 
    }
}

export default App