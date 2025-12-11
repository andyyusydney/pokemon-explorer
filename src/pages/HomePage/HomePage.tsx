import styles from './HomePage.module.css'

function HomePage() {
  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <p className={styles.kicker}>Browse</p>
        <h1 className={styles.title}>Pokemon Explorer</h1>
        <p className={styles.subtitle}>
          Netflix-style browsing, search, filters, and favourites will live here.
        </p>
      </div>
      <div className={styles.placeholderCard}>
        <div className={styles.placeholderTitle}>Pokemon grid coming soon</div>
        <p className={styles.placeholderBody}>
          Cards, search, and filtering UI will replace this placeholder during implementation.
        </p>
      </div>
    </section>
  )
}

export default HomePage
