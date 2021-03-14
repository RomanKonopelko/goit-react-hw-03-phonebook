export default function Contact({ id, name, number, onDeleteContact, s }) {
    return (<li className="contact" key={id}>
        {name} {number}
        <button
            type="button"
            onClick={onDeleteContact}
            className={s.button}>
            delete
                </button>
    </li>)
}