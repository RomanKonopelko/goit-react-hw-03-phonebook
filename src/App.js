import { Component } from 'react';
import { v4 as randomID } from 'uuid';
import Form from './Components/Form';
import Filter from './Components/Filter';
import Container from './Components/Container';
import s from './form.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  randomID = randomID();

  componentDidMount() {
    console.log('ComponentisMounted');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.setState.contacts !== prevState.contacts) {
      console.log(this.state.contacts);
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  getFilteredContats = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(this.state.filter),
    );
  };

  onFilter = data => {
    console.log(data);
    return this.setState({
      filter: data,
    });
  };

  onSubmit = data => {
    const newContact = {
      id: randomID(),
      name: data.name,
      number: data.number,
    };
    const existedContact = this.state.contacts.filter(
      contact => contact.name === newContact.name || contact.number === newContact.number,
    );
    existedContact.length === 0
      ? this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }))
      : alert('this contact or number already exist');
  };

  render() {
    const filteredContacts = this.getFilteredContats() || this.getFilteredNumbers();
    return (
      <Container className={s.form__container} title="Phonebook">
        <Form onSubmit={this.onSubmit} />

        <Container className={s.list__container} title="Contacts">
          <Filter
            onFilter={this.onFilter}
            filteredContacts={filteredContacts}
            onDeleteContact={this.onDeleteContact}
          />
        </Container>
      </Container>
    );
  }
}
export default App;
