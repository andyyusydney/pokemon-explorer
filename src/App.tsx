import HomePage from './pages/HomePage/HomePage'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.brand}>Pokemon Explorer</div>
      </header>
      <main className={styles.content}>
        <HomePage />
      </main>
      <footer className={styles.footer}>
        <small>Interface scaffolding in progress</small>
      </footer>
    </div>
  )
}

export default App
