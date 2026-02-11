import Image from "next/image";
import styles from "./hero.module.css";
import profileImg from "../../public/images/profile-img.jpg"

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image src={profileImg} alt="Profile image of Kevin" width={500} height={100} />
      </div>
      <h1>Hi, I'm Kevin</h1>
      <p>
        I blog about web development - especially frameworks about React and
        NextJS
      </p>
    </section>
  );
}

export default Hero;
