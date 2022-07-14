import { useState, useEffect} from "react";
import From from "../Form/Form";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import s from './App.module.css';


function App() {
    const [contacts, setContacts] = useState(
        () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
    );

    const [filter, setFilter] = useState("");

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleSubmit = data => {
        let findName = contacts.find(item => item.name === data.name); 

        if (findName) { 
            return alert(`${data.name} is already in contact`)
        } else { 
            setContacts(contact => ([...contact, data]));
        };
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    const handleClickDeleteBtn = (id) => {
        setContacts(prevState => prevState.filter(contact => contact.id !== id));
    };

    const getVisibleContacts = () => {
        const filterTolowerCase = filter.toLowerCase();

        return contacts.filter(
            contact => contact.name.toLowerCase().includes(filterTolowerCase)
        );
    };

    let visibleContacts = [];
    visibleContacts = getVisibleContacts();


    return (
        <div className={s.container}>
            <h1>Phonebook</h1>
            <From
                onSubmit={handleSubmit}
            />

            <h2>Contacts</h2>
            <Filter
                value={filter}
                onChange={handleFilter}
            />

            <ContactList
                contacts={visibleContacts}
                onDeleteClick={handleClickDeleteBtn}
            />
        </div>
    );
};

export default App;


