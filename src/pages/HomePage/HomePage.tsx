import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.main__inner}>
        <div className={styles.title}>
          <h1>This site is a crud application written in React Vite + TS</h1>
          <h3>this is a test project i wrote on React Vite + TS</h3>
        </div>

        <div className={styles.main__icons}>
          <div className={styles.main__icon}>
            <img
              src="https://t3.ftcdn.net/jpg/01/20/68/68/360_F_120686889_nDaqiMH8I5AmT5B0hpuJ14ZasdrrgRAK.jpg"
              alt=""
            />
            <h4>Literally Me</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
