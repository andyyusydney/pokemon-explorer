import styles from './PokemonDetailPage.module.css'

function PokemonDetailPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Pokemon Details</h1>
      <p className={styles.body}>
        Detailed stats, abilities, and favourite toggles will be rendered here for a selected Pokemon.
      </p>
    </section>
  )
}

export default PokemonDetailPage
