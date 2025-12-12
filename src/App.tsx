import { type ReactElement } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { HomePage, LoginPage, PokemonDetailPage } from "./pages";
import styles from "./App.module.css";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div className={styles.loading}>Loading session…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <Link to={user ? "/" : "/login"} className={styles.brand}>
          Pokemon Explorer
        </Link>
        <div className={styles.headerActions}>
          {user ? (
            <>
              <span className={styles.userBadge}>{user.username}</span>
              <button className={styles.secondaryButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.primaryButton}>
              Login
            </Link>
          )}
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.contentInner}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemon/:id"
              element={
                <ProtectedRoute>
                  <PokemonDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <footer className={styles.footer}>
        <small>Pokemon Explorer · Sample app · Built 2025 · by Andy Yu</small>
      </footer>
    </div>
  );
}

export default App;
