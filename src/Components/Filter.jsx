import s from '../form.module.css'
import Contact from './Contact'
import { v4 as randomID } from 'uuid';

export default function Filter({ onFilter, filteredContacts, onDeleteContact }) {
    const contacts = filteredContacts

    function handleOnFilter(e) {
        onFilter(e.currentTarget.value)
    }
    return (<>
        <label htmlFor="filter">Search contact by number or name</label>
        <br />
        <input
            type="text"
            name="filter"
            id="filter"
            onChange={handleOnFilter}
        />
        <ul className={s.form}>
            {contacts.map(({ id, name, number }) => {
                return <Contact key={randomID()} id={id} name={name} number={number} onDeleteContact={() => {
                    onDeleteContact(id)
                }} s={s} />
            })}
        </ul>
    </>
    )
}