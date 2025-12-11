import styles from './LoginPage.module.css'

function LoginPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.body}>
        A simple auth form will live here; credentials will be stored via the mock auth API.
      </p>
    </section>
  )
}

export default LoginPage
