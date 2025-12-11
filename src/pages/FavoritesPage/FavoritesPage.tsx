import styles from './FavoritesPage.module.css'

function FavoritesPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.body}>
        Saved Pokemon will be listed here once favourites are wired to the mock storage API.
      </p>
    </section>
  )
}

export default FavoritesPage
