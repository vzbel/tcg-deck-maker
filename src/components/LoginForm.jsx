import { useState, useEffect } from "react";
import { supabase } from "../client.js";

const LoginForm = ({ session, setSession }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const type = params.get("type");

    if (token_hash) {
      supabase.auth
        .verifyOtp({ token_hash, type: type || "email" })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            // Clear URL params from history
            window.history.replaceState({}, document.title, "/");
          }
          setVerifying(false);
        });
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h2>Authentication</h2>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth error
  if (authError) {
    return (
      <div>
        <h2>Authentication</h2>
        <p>Authentication Failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Auth all good, briefly show success before session loads
  if (authSuccess && !session) {
    return (
      <div>
        <h2>Authentication</h2>
        <p>Auth successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  // User is logged in, show the welcome screen
  if (session) {
    return (
      <div>
        <h2>Welcome to TCG Deck Maker!</h2>
        <p>You are signed in as {session.user.email}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <p>Sign in via magic link with your email below</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          required={true}
          onChange={handleEmailChange}
        />
        <button disabled={loading}>
          {loading ? "Loading..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
