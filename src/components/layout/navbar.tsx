export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    TickedOff
                </a>
            </div>
            <div className="navbar-right">
                <a href="/account">
                    Login
                </a>
            </div>
        </nav>
    )
}