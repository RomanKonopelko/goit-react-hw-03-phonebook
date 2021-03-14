export default function Container({ className, title, children }) {
    return <div className={className}><h2>{title}</h2>{children}</div>
}