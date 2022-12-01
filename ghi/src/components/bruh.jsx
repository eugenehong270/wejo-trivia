<div>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.0/css/hover-min.css" />
    <section id="section-one">
        <div className="login-modal">
            <div className="close-btn">
                <a href="#">×</a>

            </div>
            <h1>Login</h1>
            <form method="POST" action="/api/user/login">
                <input type="text" name="email" placeholder="Your email" required />
                <input type="password" name="password" placeholder="Your password" required />
            </form>
            <a href="#" className="forgot-password">Forgot password ?</a>
            <input type="submit" name="login" defaultValue="Login" />
        </div>
    </section>
</div>
