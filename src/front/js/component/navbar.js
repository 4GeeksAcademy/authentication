import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate()

    function logout() {
        // Clear the token from session storage or any other storage you are using
        sessionStorage.removeItem("token")
        
        // Navigate to login or any other public page
        navigate("/login")
    }

    return (
        <button className="btn btn-secondary" onClick={logout}>Logout</button>
    )
}




export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">login</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">signup</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/private">
						<button className="btn btn-primary">private</button>
					</Link>
					<div className="ml-auto">
                            {/* Directly using the Logout component */}
                            <Logout />
                        </div>
				
					
				</div>
			</div>
		</nav>
	);
};
